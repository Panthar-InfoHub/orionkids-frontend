"use client";

import React, { useState } from "react";
import { X, Loader2, Baby, School, HeartHandshake, Check, AlertCircle } from "lucide-react";
import { createChild, type ChildWithStats } from "@/lib/api/children";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";
const LABEL = "block mb-1.5 text-xs font-bold text-[#0B2A5B]";
const FIELD =
  "w-full h-11 px-3.5 rounded-xl bg-white border border-[#DCE4EF] text-xs font-semibold text-[#0B2A5B] placeholder:text-slate-400 focus:outline-none focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4]/15 transition-all";

const CLASSES = [
  { label: "Classes 1", locked: false },
  { label: "Classes 2", locked: false },
  { label: "Classes 3", locked: true },
  { label: "Classes 4", locked: true },
];

interface AddChildModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChildCreated: (child: ChildWithStats) => void;
  parentEmail: string;
  parentMobileDefault?: string;
}

export function AddChildModal({
  isOpen,
  onClose,
  onChildCreated,
  parentEmail,
  parentMobileDefault = "",
}: AddChildModalProps) {
  const [childName, setChildName] = useState("");
  const [age, setAge] = useState("");
  const [language, setLanguage] = useState("English");
  const [school, setSchool] = useState("");
  const [selectedClass, setSelectedClass] = useState("Classes 1");
  const [studentId, setStudentId] = useState("");
  const [parentMobile, setParentMobile] = useState(parentMobileDefault);
  const [isGuardian, setIsGuardian] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 18) {
      setErrorMessage("Please enter a valid age between 1 and 18.");
      return;
    }

    if (!childName.trim()) {
      setErrorMessage("Child name is required.");
      return;
    }

    if (!isGuardian) {
      setErrorMessage("Parent or guardian consent is required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const newChild = await createChild({
        childName: childName.trim(),
        age: ageNum,
        language,
        school: school.trim() || undefined,
        selectedClass,
        studentId: studentId.trim() || undefined,
        parentEmail: parentEmail.trim(),
        parentMobile: parentMobile.trim() || "+91 9876543210",
        isGuardian,
        idempotencyKey: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : undefined,
      });

      onChildCreated(newChild);
      onClose();
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while adding child. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-[560px] bg-white rounded-[24px] border-2 border-[#0A1D3D] shadow-[6px_6px_0_0_#0A1D3D] p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
        style={{ fontFamily: JAKARTA }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-[#0A1D3D] hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#D8F3FF] border border-[#0A1D3D] flex items-center justify-center shrink-0">
            <Baby className="w-5 h-5 text-[#00838F]" />
          </div>
          <div>
            <h2 className="text-xl font-black text-[#0A1D3D]">Add Another Child</h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Register an additional child profile under your parent account.
            </p>
          </div>
        </div>

        {errorMessage && (
          <div
            role="alert"
            className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="modalChildName" className={LABEL}>
                Child&apos;s Name *
              </label>
              <input
                id="modalChildName"
                type="text"
                required
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="e.g. Diya Sharma"
                className={FIELD}
              />
            </div>

            <div>
              <label htmlFor="modalAge" className={LABEL}>
                Age *
              </label>
              <input
                id="modalAge"
                type="number"
                min="1"
                max="18"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Age in years (1-18)"
                className={FIELD}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="modalLanguage" className={LABEL}>
                Preferred Language *
              </label>
              <select
                id="modalLanguage"
                required
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={FIELD}
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
            </div>

            <div>
              <label className={LABEL}>Grade / Class *</label>
              <div className="grid grid-cols-2 gap-2">
                {CLASSES.map((c) => (
                  <button
                    key={c.label}
                    type="button"
                    disabled={c.locked}
                    onClick={() => !c.locked && setSelectedClass(c.label)}
                    className={`h-11 px-2 rounded-xl text-xs font-bold border transition-all ${
                      c.locked
                        ? "bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed opacity-60"
                        : selectedClass === c.label
                        ? "bg-[#FFE066] text-[#0A1D3D] border-[#0A1D3D] shadow-[1px_1px_0_0_#0A1D3D]"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="modalSchool" className={LABEL}>
                School / Institution
              </label>
              <input
                id="modalSchool"
                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="School name (optional)"
                className={FIELD}
              />
            </div>

            <div>
              <label htmlFor="modalStudentId" className={LABEL}>
                Student ID
              </label>
              <input
                id="modalStudentId"
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Student ID (optional)"
                className={FIELD}
              />
            </div>
          </div>

          <div>
            <label htmlFor="modalParentMobile" className={LABEL}>
              Parent Mobile Contact *
            </label>
            <input
              id="modalParentMobile"
              type="tel"
              required
              value={parentMobile}
              onChange={(e) => setParentMobile(e.target.value)}
              placeholder="+91 98765 43210"
              className={FIELD}
            />
          </div>

          {/* Consent */}
          <div className="rounded-xl bg-[#F0F6FA] border border-[#DCE4EF] p-3 flex items-start gap-2.5">
            <input
              id="modalGuardianConsent"
              type="checkbox"
              required
              checked={isGuardian}
              onChange={(e) => setIsGuardian(e.target.checked)}
              className="mt-0.5 rounded cursor-pointer"
            />
            <label
              htmlFor="modalGuardianConsent"
              className="text-[11px] text-slate-600 leading-relaxed cursor-pointer"
            >
              I confirm that I am this child&apos;s parent or legal guardian and consent to creating
              their cognitive learning profile.
            </label>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 h-11 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 h-11 rounded-xl bg-[#4FDDA6] hover:bg-[#3ec491] text-[#0A1D3D] font-black text-xs border-2 border-[#0A1D3D] shadow-[2px_2px_0_0_#0A1D3D] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Adding Child...</span>
                </>
              ) : (
                <span>Save & Add Child</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
