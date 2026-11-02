"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  LogOut,
  ChevronRight,
  ExternalLink,
  Lock,
} from "lucide-react";
import {
  fetchRegistrationStatus,
  submitAcceptTerms,
  CURRENT_TERMS_VERSION,
  CURRENT_PRIVACY_POLICY_VERSION,
} from "@/lib/api/registration";
import { performSignOut } from "@/lib/api/auth";

export default function TermsAndConditionsPage() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);
  const [activeTab, setActiveTab] = useState<"TERMS" | "PRIVACY">("TERMS");
  const [isChecking, setIsChecking] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function checkState() {
      try {
        const regStatus = await fetchRegistrationStatus();
        if (isCancelled) return;

        if (!regStatus) {
          router.replace("/login?redirect=/terms-and-conditions");
          return;
        }

        setUserEmail(regStatus.email);

        // If terms are already accepted for the current version, proceed to next destination
        if (regStatus.termsAccepted) {
          router.replace(regStatus.destination || "/access-request");
          return;
        }
      } catch {
        if (!isCancelled) {
          router.replace("/login?redirect=/terms-and-conditions");
        }
      } finally {
        if (!isCancelled) {
          setIsChecking(false);
        }
      }
    }

    checkState();

    return () => {
      isCancelled = true;
    };
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setErrorMessage("Please review and accept the terms and privacy policy to continue.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const updatedStatus = await submitAcceptTerms({
        termsVersion: CURRENT_TERMS_VERSION,
        privacyPolicyVersion: CURRENT_PRIVACY_POLICY_VERSION,
      });

      router.push(updatedStatus.destination || "/access-request");
    } catch (err: unknown) {
      console.error("[Terms] Acceptance error:", err);
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to record terms acceptance. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6">
        <Loader2 className="w-8 h-8 text-[#00BCD4] animate-spin mb-3" />
        <p className="text-xs font-bold text-slate-500">Loading terms & conditions...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between selection:bg-[#FFE066] selection:text-[#0A1D3D]">
      {/* Accent top stripe */}
      <div className="w-full h-[6px] bg-[#00BCD4]" />

      {/* Header bar */}
      <header className="w-full bg-white border-b border-[#E7EDF6] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto h-[76px] px-4 sm:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center" aria-label="OrionKids Home">
            <Image
              src="/svg/Logo.svg"
              alt="OrionKids Logo"
              width={125}
              height={58}
              priority
              className="h-10 w-auto object-contain"
            />
          </Link>

          <button
            onClick={performSignOut}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-rose-600 transition-colors py-2 px-3 rounded-lg hover:bg-slate-50 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="bg-white rounded-3xl border-2 border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-6 sm:p-10">
          {/* Header pill & title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E0F7FA] text-[#00838F] font-bold text-[11px] mb-3 border border-[#B2EBF2]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>STEP 1 OF 3 · TERMS & PRIVACY ACCEPTANCE</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#0A1D3D] tracking-tight">
                Terms of Service & Privacy Policy
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Version {CURRENT_TERMS_VERSION} · Please review and accept before requesting account access.
              </p>
            </div>

            {userEmail && (
              <div className="self-start sm:self-center px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600">
                Signing as: <span className="text-[#0A1D3D] font-bold">{userEmail}</span>
              </div>
            )}
          </div>

          {/* Tab selector */}
          <div className="flex border-b border-slate-200 mb-6 gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("TERMS")}
              className={`pb-3 px-4 font-bold text-sm transition-all border-b-2 cursor-pointer ${
                activeTab === "TERMS"
                  ? "border-[#00BCD4] text-[#00838F]"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Terms & Conditions
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("PRIVACY")}
              className={`pb-3 px-4 font-bold text-sm transition-all border-b-2 cursor-pointer ${
                activeTab === "PRIVACY"
                  ? "border-[#00BCD4] text-[#00838F]"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Privacy Policy
            </button>
          </div>

          {/* Document Content Viewport */}
          <div className="bg-slate-50/70 rounded-2xl p-6 sm:p-8 border border-slate-200/80 max-h-[380px] overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal mb-8">
            {activeTab === "TERMS" ? (
              <>
                <h3 className="font-bold text-sm sm:text-base text-[#0A1D3D]">
                  1. Acceptance of Terms
                </h3>
                <p>
                  By registering for an OrionKids account, using our educational brain quests, or accessing child progress dashboards, you agree to comply with and be bound by these Terms and Conditions. OrionKids is designed for parents, legal guardians, and authorized educators to support developmental milestones in children.
                </p>

                <h3 className="font-bold text-sm sm:text-base text-[#0A1D3D] pt-2">
                  2. Parental & Guardian Responsibility
                </h3>
                <p>
                  You confirm that you are at least 18 years of age and the parent or lawful legal guardian of any child whose profile you register on this platform. You are responsible for maintaining the confidentiality of your credentials and supervising child gameplay sessions.
                </p>

                <h3 className="font-bold text-sm sm:text-base text-[#0A1D3D] pt-2">
                  3. Administrative Access & Verification Policy
                </h3>
                <p>
                  To prevent unauthorized access and maintain safety, all newly registered parent accounts require administrative review. Submitting an access request does not guarantee immediate platform activation. OrionKids reserves the right to review, approve, or deny access requests in accordance with child protection standards.
                </p>

                <h3 className="font-bold text-sm sm:text-base text-[#0A1D3D] pt-2">
                  4. Assessment Telemetry & Game Progression
                </h3>
                <p>
                  Game attempts, reaction times, accuracy, and cognitive facet observations are recorded solely for formative developmental tracking and personalized learning reports. These observations are developmental indicators and do not replace clinical or medical evaluations.
                </p>

                <h3 className="font-bold text-sm sm:text-base text-[#0A1D3D] pt-2">
                  5. Termination & Suspension
                </h3>
                <p>
                  Accounts violating safety guidelines or providing fraudulent information may be suspended, restricted, or terminated by OrionKids administrators.
                </p>
              </>
            ) : (
              <>
                <h3 className="font-bold text-sm sm:text-base text-[#0A1D3D]">
                  1. Child Privacy Protection (COPPA & GDPR-K Compliance)
                </h3>
                <p>
                  OrionKids prioritizes child privacy. We do not sell, rent, or monetize child profile data or behavioral assessment telemetry. Child profiles are strictly scoped to the authorized parent account and cannot be viewed by third parties.
                </p>

                <h3 className="font-bold text-sm sm:text-base text-[#0A1D3D] pt-2">
                  2. Information We Collect
                </h3>
                <p>
                  We collect account authentication information (parent name and Google email), child educational indicators (grade, age range, preferred language), and game performance telemetry (reaction times, trial accuracy, completion status).
                </p>

                <h3 className="font-bold text-sm sm:text-base text-[#0A1D3D] pt-2">
                  3. Use of Telemetry Data
                </h3>
                <p>
                  Collected telemetry is processed in real time to calculate cognitive milestones (attention, working memory, cognitive flexibility) and render printable learning journey reports for parents.
                </p>

                <h3 className="font-bold text-sm sm:text-base text-[#0A1D3D] pt-2">
                  4. Parental Rights & Data Deletion
                </h3>
                <p>
                  Parents have the right to inspect, export, or request deletion of their child profiles and assessment reports at any time by contacting our support team or through their dashboard settings.
                </p>
              </>
            )}
          </div>

          {/* Acceptance Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMessage && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-semibold flex items-center gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <label className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 hover:border-[#00BCD4] transition-colors cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked);
                  if (errorMessage) setErrorMessage(null);
                }}
                className="mt-0.5 w-5 h-5 rounded text-[#00BCD4] focus:ring-[#00BCD4] border-slate-300 cursor-pointer"
                required
              />
              <span className="text-xs sm:text-sm font-semibold text-[#0A1D3D] leading-snug">
                I have read, understood, and accept the{" "}
                <span className="text-[#00838F] font-bold">OrionKids Terms of Service ({CURRENT_TERMS_VERSION})</span> and{" "}
                <span className="text-[#00838F] font-bold">Privacy Policy ({CURRENT_PRIVACY_POLICY_VERSION})</span>. I certify that I am a parent or legal guardian.
              </span>
            </label>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <Lock className="w-4 h-4 text-emerald-600" />
                <span>Acceptance is securely timestamped and recorded in PostgreSQL.</span>
              </div>

              <button
                type="submit"
                disabled={!agreed || isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-[#00BCD4] text-[#0A1D3D] font-black text-sm tracking-wide shadow-md hover:bg-[#26C6DA] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving Acceptance...</span>
                  </>
                ) : (
                  <>
                    <span>Accept & Continue</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-[#E7EDF6] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left text-xs text-[#526176] font-medium">
          <span>© 2026 OrionKids Digital Solutions Pvt. Ltd. All rights reserved.</span>
          <span className="text-slate-400">
            Terms version: {CURRENT_TERMS_VERSION} · Policy version: {CURRENT_PRIVACY_POLICY_VERSION}
          </span>
        </div>
      </footer>
    </div>
  );
}
