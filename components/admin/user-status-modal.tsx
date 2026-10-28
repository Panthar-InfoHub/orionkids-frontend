"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle, ShieldAlert, Loader2, AlertCircle } from "lucide-react";
import type { AdminUserItem } from "@/lib/api/admin";

interface UserStatusModalProps {
  user: AdminUserItem | null;
  mode: "approve" | "restrict" | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (userId: string, payload: { status: "ACTIVE" | "RESTRICTED"; reason?: string }) => Promise<void>;
}

export function UserStatusModal({
  user,
  mode,
  isOpen,
  onClose,
  onConfirm,
}: UserStatusModalProps) {
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setReason("");
      setError(null);
      setIsSubmitting(false);
    }
  }, [isOpen, mode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen || !user || !mode) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === "restrict") {
      const trimmedReason = reason.trim();
      if (trimmedReason.length < 3) {
        setError("A reason of at least 3 characters is required to restrict an account.");
        return;
      }
      if (trimmedReason.length > 500) {
        setError("Reason cannot exceed 500 characters.");
        return;
      }

      setIsSubmitting(true);
      try {
        await onConfirm(user.id, {
          status: "RESTRICTED",
          reason: trimmedReason,
        });
        onClose();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to restrict user");
        setIsSubmitting(false);
      }
    } else {
      // Approve mode
      setIsSubmitting(true);
      try {
        await onConfirm(user.id, {
          status: "ACTIVE",
        });
        onClose();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to approve user");
        setIsSubmitting(false);
      }
    }
  };

  const isApprove = mode === "approve";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        className="w-full max-w-[480px] bg-white rounded-2xl border-2 border-[#0A1D3D] shadow-[4px_4px_0px_#0A1D3D] p-6 sm:p-7 relative animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors disabled:opacity-50 cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Icon & Header */}
        <div className="flex items-start gap-3.5 mb-4">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
              isApprove
                ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                : "bg-rose-50 text-rose-600 border-rose-200"
            }`}
          >
            {isApprove ? <CheckCircle className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
          </div>

          <div>
            <h2 id="modal-title" className="text-lg font-black text-[#0A1D3D] leading-snug">
              {isApprove ? "Approve User Account" : "Restrict User Account"}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Target: <span className="font-bold text-slate-700">{user.name}</span> ({user.email})
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isApprove ? (
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              Approving this account will set the user&apos;s status to{" "}
              <strong className="text-emerald-700">ACTIVE</strong>. They will immediately gain access
              to OrionKids quests, games, and learning reports.
            </p>
          ) : (
            <div>
              <p className="text-xs text-slate-600 leading-relaxed mb-3 bg-rose-50/70 p-3 rounded-xl border border-rose-100 text-rose-900">
                Restricting this account will immediately revoke access and terminate all active
                sessions for this user.
              </p>

              <label
                htmlFor="moderation-reason"
                className="block text-xs font-black text-[#0A1D3D] uppercase tracking-wider mb-1.5"
              >
                Reason for Restriction <span className="text-rose-500">*</span>
              </label>

              <textarea
                id="moderation-reason"
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Specify reason for moderation (e.g. Terms violation, unverified school domain)..."
                disabled={isSubmitting}
                className="w-full text-xs sm:text-sm rounded-xl border-2 border-slate-200 p-3 focus:outline-hidden focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4]/20 transition-all resize-none text-slate-800 disabled:bg-slate-50"
                maxLength={500}
                required
              />

              <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1">
                <span>Minimum 3 characters</span>
                <span>{reason.length}/500</span>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-50 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-black transition-all border-2 border-[#0A1D3D] shadow-[2px_2px_0px_#0A1D3D] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer disabled:opacity-50 ${
                isApprove
                  ? "bg-[#059669] hover:bg-[#047857] text-white"
                  : "bg-[#E11D48] hover:bg-[#BE123C] text-white"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : isApprove ? (
                <span>Confirm Approval</span>
              ) : (
                <span>Confirm Restriction</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
