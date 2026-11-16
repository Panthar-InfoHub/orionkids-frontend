"use client";

import React from "react";
import { CheckCircle2, Clock, Loader2, MailX, Mail } from "lucide-react";

export type ReportEmailStatusValue = "NOT_SENT" | "PENDING" | "SENT" | "FAILED";

/** "parent.name@gmail.com" -> "pa*********@gmail.com" */
export function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!local || !domain) return email;
  const visible = local.slice(0, Math.min(2, local.length));
  return `${visible}${"*".repeat(Math.max(1, local.length - visible.length))}@${domain}`;
}

function formatDateTime(iso?: string | null): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

interface ReportEmailStatusProps {
  status?: ReportEmailStatusValue | null;
  recipient?: string | null;
  sentAt?: string | null;
  error?: string | null;
  /** Show the full address (admin) instead of a masked one (school) */
  showFullEmail?: boolean;
  /** Show the failure reason (admin) */
  showError?: boolean;
  className?: string;
}

/**
 * One-line status of the "report ready" email sent to the parent.
 */
export function ReportEmailStatus({
  status,
  recipient,
  sentAt,
  error,
  showFullEmail = false,
  showError = false,
  className = "",
}: ReportEmailStatusProps) {
  const who = recipient ? (showFullEmail ? recipient : maskEmail(recipient)) : null;
  const base = `inline-flex items-start gap-1.5 text-[11px] font-bold leading-4 ${className}`;

  switch (status) {
    case "SENT":
      return (
        <span className={`${base} text-emerald-700`}>
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span>
            Emailed{who ? ` to ${who}` : ""}
            {sentAt ? ` on ${formatDateTime(sentAt)}` : ""}
          </span>
        </span>
      );
    case "PENDING":
      return (
        <span className={`${base} text-sky-700`}>
          <Loader2 className="w-3.5 h-3.5 shrink-0 animate-spin" />
          <span>Sending email to the parent…</span>
        </span>
      );
    case "FAILED":
      return (
        <span className={`${base} text-rose-600`}>
          <MailX className="w-3.5 h-3.5 shrink-0" />
          <span>
            Email could not be sent{who ? ` to ${who}` : ""}
            {showError && error ? ` (${error})` : ""}
          </span>
        </span>
      );
    case "NOT_SENT":
      return (
        <span className={`${base} text-slate-500`}>
          <Mail className="w-3.5 h-3.5 shrink-0" />
          <span>Not emailed to the parent yet</span>
        </span>
      );
    default:
      return (
        <span className={`${base} text-slate-400`}>
          <Clock className="w-3.5 h-3.5 shrink-0" />
          <span>Email status unavailable</span>
        </span>
      );
  }
}
