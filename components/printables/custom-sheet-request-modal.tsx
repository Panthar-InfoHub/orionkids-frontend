"use client";

import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { X, Loader2, CheckCircle2, Send, AlertCircle } from "lucide-react";
import {
  CUSTOM_SHEET_GRADE_LEVELS,
  CUSTOM_SHEET_TYPES,
  REQUESTER_ROLE_LABELS,
  CustomSheetRequestError,
  submitCustomSheetRequest,
  type CustomSheetRequesterRole,
} from "@/lib/api/custom-sheets";

const JAKARTA = "font-[family-name:var(--font-plus-jakarta),sans-serif]";
const DETAILS_MAX = 2000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s-]{6,19}$/;

interface FormState {
  name: string;
  email: string;
  requesterRole: CustomSheetRequesterRole | "";
  organizationName: string;
  phone: string;
  gradeLevel: string;
  sheetType: string;
  details: string;
  website: string; // honeypot
}

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  requesterRole: "",
  organizationName: "",
  phone: "",
  gradeLevel: "",
  sheetType: "",
  details: "",
  website: "",
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

/** Same rules as the backend, so most mistakes are caught before sending. */
function validate(form: FormState): FieldErrors {
  const errors: FieldErrors = {};
  const name = form.name.trim();
  if (name.length < 2) errors.name = "Please enter your name";
  else if (name.length > 100) errors.name = "Name must be at most 100 characters";

  const email = form.email.trim();
  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    errors.email = "Please enter a valid email address";
  }

  if (!form.requesterRole) {
    errors.requesterRole = "Please tell us whether you are a parent, teacher or school";
  }

  if (form.organizationName.trim().length > 150) {
    errors.organizationName = "School / organisation name must be at most 150 characters";
  }

  const phone = form.phone.trim();
  if (phone && !PHONE_RE.test(phone)) errors.phone = "Please enter a valid phone number";

  if (!form.gradeLevel) errors.gradeLevel = "Please choose a grade level";

  const details = form.details.trim();
  if (details.length < 10) {
    errors.details = "Please describe the sheet you need (at least 10 characters)";
  } else if (details.length > DETAILS_MAX) {
    errors.details = `Description must be at most ${DETAILS_MAX} characters`;
  }

  return errors;
}

interface CustomSheetRequestModalProps {
  open: boolean;
  onClose: () => void;
}

export function CustomSheetRequestModal({ open, onClose }: CustomSheetRequestModalProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const uid = useId();
  const fid = (name: string) => `${uid}-${name}`;

  // Closing clears messages but keeps an unsent draft (e.g. after an accidental
  // outside click). The form itself is emptied only after a successful submit.
  const handleClose = useCallback(() => {
    if (isSubmitting) return;
    setErrors({});
    setFormError(null);
    setSuccessMessage(null);
    onClose();
  }, [isSubmitting, onClose]);

  // Escape to close, lock page scroll, focus first field, restore focus on close
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => firstFieldRef.current?.focus(), 50);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open, handleClose]);

  if (!open) return null;

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const clientErrors = validate(form);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setFormError("Please fix the highlighted fields.");
      return;
    }

    setIsSubmitting(true);
    setFormError(null);
    try {
      const result = await submitCustomSheetRequest({
        name: form.name.trim(),
        email: form.email.trim(),
        requesterRole: form.requesterRole as CustomSheetRequesterRole,
        organizationName: form.organizationName.trim() || undefined,
        phone: form.phone.trim() || undefined,
        gradeLevel: form.gradeLevel,
        sheetType: form.sheetType || undefined,
        details: form.details.trim(),
        website: form.website,
      });
      setSuccessMessage(result.message);
      setForm(EMPTY_FORM);
    } catch (err) {
      if (err instanceof CustomSheetRequestError) {
        setErrors(err.fieldErrors as FieldErrors);
        setFormError(err.message);
      } else {
        setFormError("Unable to submit your request right now. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full h-11 px-3.5 rounded-xl border-2 bg-white text-sm text-[#0A1D3D] placeholder:text-slate-400 outline-none transition-colors ${
      hasError
        ? "border-rose-400 focus:border-rose-500"
        : "border-slate-200 focus:border-[#0A1D3D]"
    }`;

  const labelClass = "block text-xs font-black text-[#0A1D3D] mb-1.5";
  const errorText = (key: keyof FormState) =>
    errors[key] ? (
      <p id={fid(`${key}-error`)} className="mt-1 text-[11px] font-semibold text-rose-600">
        {errors[key]}
      </p>
    ) : null;
  const a11y = (key: keyof FormState) => ({
    "aria-invalid": Boolean(errors[key]) || undefined,
    "aria-describedby": errors[key] ? fid(`${key}-error`) : undefined,
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={fid("title")}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A1D3D]/70 backdrop-blur-sm p-3 sm:p-6"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white border-[3px] border-[#0A1D3D] shadow-[6px_6px_0px_0px_#0A1D3D]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-5 sm:px-7 pt-5 sm:pt-6 pb-4 bg-white border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E0F2FE] text-[#0284C7] border border-[#7DD3FC] text-[10px] font-black uppercase tracking-wider mb-2">
              <span>✏️</span>
              <span>Custom Printable Request</span>
            </div>
            <h2 id={fid("title")} className={`text-xl sm:text-2xl font-black text-[#0A1D3D] leading-tight ${JAKARTA}`}>
              Request a Custom Sheet
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Tell us what you need and our team will get back to you by email.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            aria-label="Close"
            className="shrink-0 w-9 h-9 rounded-full bg-[#FFD54F] text-[#0A1D3D] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_0px_#0A1D3D] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer disabled:opacity-50"
          >
            <X className="w-4 h-4" strokeWidth={3} />
          </button>
        </div>

        {successMessage ? (
          /* Success state */
          <div className="px-5 sm:px-7 py-10 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-100 border-2 border-[#0A1D3D] flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-700" />
            </div>
            <h3 className={`text-lg font-black text-[#0A1D3D] ${JAKARTA}`}>Request received!</h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">{successMessage}</p>
            <button
              type="button"
              onClick={handleClose}
              className={`h-11 px-6 rounded-xl bg-[#0A1D3D] hover:bg-[#122b54] text-white text-xs font-black transition-colors cursor-pointer ${JAKARTA}`}
            >
              Done
            </button>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} noValidate className="px-5 sm:px-7 py-5 space-y-4">
            {/* Honeypot: invisible to people, bots fill it in */}
            <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
              <label htmlFor={fid("website")}>Leave this field empty</label>
              <input
                id={fid("website")}
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(e) => setField("website", e.target.value)}
              />
            </div>

            {/* I am a */}
            <fieldset>
              <legend className={labelClass}>
                I am a <span className="text-rose-500">*</span>
              </legend>
              <div className="grid grid-cols-3 gap-2" role="radiogroup" {...a11y("requesterRole")}>
                {(Object.keys(REQUESTER_ROLE_LABELS) as CustomSheetRequesterRole[]).map((role) => {
                  const selected = form.requesterRole === role;
                  return (
                    <label
                      key={role}
                      className={`h-11 rounded-xl border-2 flex items-center justify-center text-xs font-black cursor-pointer transition-all select-none ${
                        selected
                          ? "bg-[#FFD54F] border-[#0A1D3D] text-[#0A1D3D] shadow-[2px_2px_0px_0px_#0A1D3D]"
                          : errors.requesterRole
                            ? "bg-white border-rose-400 text-slate-600 hover:border-rose-500"
                            : "bg-white border-slate-200 text-slate-600 hover:border-slate-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="requesterRole"
                        value={role}
                        checked={selected}
                        onChange={() => setField("requesterRole", role)}
                        className="sr-only"
                      />
                      {REQUESTER_ROLE_LABELS[role]}
                    </label>
                  );
                })}
              </div>
              {errorText("requesterRole")}
            </fieldset>

            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={fid("name")} className={labelClass}>
                  Your name <span className="text-rose-500">*</span>
                </label>
                <input
                  ref={firstFieldRef}
                  id={fid("name")}
                  type="text"
                  autoComplete="name"
                  maxLength={100}
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  className={inputClass(Boolean(errors.name))}
                  placeholder="e.g. Priya Sharma"
                  {...a11y("name")}
                />
                {errorText("name")}
              </div>
              <div>
                <label htmlFor={fid("email")} className={labelClass}>
                  Email <span className="text-rose-500">*</span>
                </label>
                <input
                  id={fid("email")}
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  className={inputClass(Boolean(errors.email))}
                  placeholder="you@example.com"
                  {...a11y("email")}
                />
                {errorText("email")}
              </div>
            </div>

            {/* School + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={fid("organizationName")} className={labelClass}>
                  School / organisation <span className="font-semibold text-slate-400">(optional)</span>
                </label>
                <input
                  id={fid("organizationName")}
                  type="text"
                  autoComplete="organization"
                  maxLength={150}
                  value={form.organizationName}
                  onChange={(e) => setField("organizationName", e.target.value)}
                  className={inputClass(Boolean(errors.organizationName))}
                  placeholder="e.g. Sunrise Public School"
                  {...a11y("organizationName")}
                />
                {errorText("organizationName")}
              </div>
              <div>
                <label htmlFor={fid("phone")} className={labelClass}>
                  Phone / WhatsApp <span className="font-semibold text-slate-400">(optional)</span>
                </label>
                <input
                  id={fid("phone")}
                  type="tel"
                  autoComplete="tel"
                  maxLength={20}
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  className={inputClass(Boolean(errors.phone))}
                  placeholder="+91 98765 43210"
                  {...a11y("phone")}
                />
                {errorText("phone")}
              </div>
            </div>

            {/* Grade + Sheet type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={fid("gradeLevel")} className={labelClass}>
                  Grade level <span className="text-rose-500">*</span>
                </label>
                <select
                  id={fid("gradeLevel")}
                  value={form.gradeLevel}
                  onChange={(e) => setField("gradeLevel", e.target.value)}
                  className={`${inputClass(Boolean(errors.gradeLevel))} cursor-pointer ${form.gradeLevel ? "" : "text-slate-400"}`}
                  {...a11y("gradeLevel")}
                >
                  <option value="" disabled>
                    Choose a grade
                  </option>
                  {CUSTOM_SHEET_GRADE_LEVELS.map((g) => (
                    <option key={g} value={g} className="text-[#0A1D3D]">
                      {g}
                    </option>
                  ))}
                </select>
                {errorText("gradeLevel")}
              </div>
              <div>
                <label htmlFor={fid("sheetType")} className={labelClass}>
                  Sheet type <span className="font-semibold text-slate-400">(optional)</span>
                </label>
                <select
                  id={fid("sheetType")}
                  value={form.sheetType}
                  onChange={(e) => setField("sheetType", e.target.value)}
                  className={`${inputClass(Boolean(errors.sheetType))} cursor-pointer ${form.sheetType ? "" : "text-slate-400"}`}
                  {...a11y("sheetType")}
                >
                  <option value="">Any / not sure</option>
                  {CUSTOM_SHEET_TYPES.map((t) => (
                    <option key={t} value={t} className="text-[#0A1D3D]">
                      {t}
                    </option>
                  ))}
                </select>
                {errorText("sheetType")}
              </div>
            </div>

            {/* Details */}
            <div>
              <label htmlFor={fid("details")} className={labelClass}>
                What sheet do you need? <span className="text-rose-500">*</span>
              </label>
              <textarea
                id={fid("details")}
                rows={4}
                maxLength={DETAILS_MAX}
                value={form.details}
                onChange={(e) => setField("details", e.target.value)}
                className={`${inputClass(Boolean(errors.details))} h-auto py-3 resize-y min-h-[110px]`}
                placeholder="e.g. A space-themed addition worksheet for Class 2, 20 problems, with an answer key."
                {...a11y("details")}
              />
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">{errorText("details")}</div>
                <span className="mt-1 text-[10px] text-slate-400 tabular-nums">
                  {form.details.length}/{DETAILS_MAX}
                </span>
              </div>
            </div>

            {formError && (
              <div role="alert" className="flex items-start gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <p className="text-xs font-semibold text-rose-700">{formError}</p>
              </div>
            )}

            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
              <p className="text-[10px] text-slate-400 leading-relaxed">
                We only use these details to reply to your request.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`h-11 px-6 rounded-xl bg-[#FFC72C] hover:bg-[#FFD233] border-2 border-[#0A1D3D] shadow-[2px_2px_0px_0px_#0A1D3D] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#0A1D3D] active:translate-y-0.5 active:shadow-none text-xs font-black text-[#0A1D3D] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shrink-0 ${JAKARTA}`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending…</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Request</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
