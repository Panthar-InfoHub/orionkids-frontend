"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Baby,
  Gamepad2,
  Sparkles,
  Clock,
  Plus,
  RefreshCw,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Award,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { fetchCurrentUserProfile, performSignOut, type UserProfile } from "@/lib/api/auth";
import { fetchChildren, type ChildWithStats } from "@/lib/api/children";
import { ChildCard } from "@/components/dashboard/child-card";
import { AddChildModal } from "@/components/dashboard/add-child-modal";
import { PageCurtain } from "@/components/layout/page-curtain";
import { FooterSection } from "@/components/layout/footer-section";

const JAKARTA = "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif";

export default function ParentDashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [children, setChildren] = useState<ChildWithStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadDashboardData = useCallback(async () => {
    try {
      setErrorMessage(null);
      const userProfile = await fetchCurrentUserProfile();
      if (!userProfile) {
        router.replace("/login?redirect=/dashboard");
        return;
      }

      if (userProfile.status === "RESTRICTED") {
        router.replace("/access-denied");
        return;
      }

      setProfile(userProfile);
      const childrenData = await fetchChildren();
      setChildren(childrenData);
    } catch (err) {
      console.error("[Dashboard] Failed to load data:", err);
      setErrorMessage("Unable to fetch dashboard data. Please try again.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [router]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadDashboardData();
  };

  const handleChildCreated = (newChild: ChildWithStats) => {
    setChildren((prev) => [...prev, newChild]);
    // Optionally open fresh quest for newly created child
    setIsAddModalOpen(false);
  };

  // Aggregate statistics across all children
  const totalChildProfiles = children.length;
  const totalSessions = children.reduce(
    (acc, c) => acc + (c.stats?.totalQuests || 0),
    0
  );
  const totalCompletedQuests = children.reduce(
    (acc, c) => acc + (c.stats?.completedQuests || 0),
    0
  );
  const inProgressQuests = children.filter(
    (c) => c.stats?.hasInProgressQuest
  ).length;
  const totalCompletedLevels = children.reduce(
    (acc, c) => acc + (c.stats?.completedLevelsCount || 0),
    0
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center">
        <Loader2 className="w-10 h-10 text-[#00BCD4] animate-spin mb-4" />
        <h2 className="text-lg font-black text-[#0A1D3D]" style={{ fontFamily: JAKARTA }}>
          Loading Your Family Quests...
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Fetching children learning profiles and quest progression.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col selection:bg-[#FFE066] selection:text-[#0A1D3D]">
      {/* Top Banner */}
      <div className="w-full h-[6px] bg-[#00BCD4]" />

      <PageCurtain className="pb-16">
        {/* Navigation Bar */}
        <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black text-[#0A1D3D] tracking-tight" style={{ fontFamily: JAKARTA }}>
                  Orion<span className="text-[#00BCD4]">Kids</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#E0F2FE] border border-[#BAE6FD] text-[10px] font-black text-[#0369A1] uppercase">
                  Family Hub
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2 sm:px-3 sm:py-2 rounded-xl text-slate-600 hover:text-[#0A1D3D] hover:bg-slate-100 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Refresh children data"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-[#00BCD4]" : ""}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>

              <button
                type="button"
                onClick={() => performSignOut()}
                className="p-2 sm:px-3 sm:py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 flex-1 space-y-6 sm:space-y-8">
          {/* Welcome & Primary Launch Header */}
          <div className="p-6 sm:p-8 rounded-[28px] bg-white border-2 border-[#0A1D3D] shadow-[6px_6px_0_0_#0A1D3D] flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE066] border border-[#0A1D3D] text-[11px] font-black text-[#0A1D3D]">
                <span>🌟 Parent Explorer Dashboard</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0A1D3D] tracking-tight" style={{ fontFamily: JAKARTA }}>
                Welcome, {profile?.name || "Parent"}!
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl">
                Onboard new children, track active 18-level cognitive quests, and view assessment reports. Every Launch Free Quest creates an independent child journey.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              {/* PRIMARY ACTION: Launch Free Quest (Always opens a new onboarding form) */}
              <Link
                href="/onboarding"
                className="h-12 sm:h-13 px-6 rounded-2xl bg-[#D8F3FF] hover:bg-[#c2ebfc] text-[#0A1D3D] font-black text-sm border-2 border-[#0A1D3D] shadow-[3px_3px_0_0_#0A1D3D] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer"
                style={{ fontFamily: JAKARTA }}
              >
                <span>🎮 Launch Free Quest! 🚀</span>
              </Link>

              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="h-12 sm:h-13 px-5 rounded-2xl bg-[#4FDDA6] hover:bg-[#3ec491] text-[#0A1D3D] font-black text-xs sm:text-sm border-2 border-[#0A1D3D] shadow-[3px_3px_0_0_#0A1D3D] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer"
                style={{ fontFamily: JAKARTA }}
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add Child Profile</span>
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Parent-Level Aggregated Analytics Grid */}
          <section aria-label="Family Analytics">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-wider mb-3">
              Family Learning Metrics
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
              {/* Total Child Profiles */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#0A1D3D] shadow-[3px_3px_0_0_#0A1D3D]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Children
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-[#D8F3FF] text-[#00838F] flex items-center justify-center">
                    <Baby className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#0A1D3D]">
                  {totalChildProfiles}
                </div>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                  Registered profiles
                </p>
              </div>

              {/* Total Quest Sessions */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#0A1D3D] shadow-[3px_3px_0_0_#0A1D3D]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Quest Sessions
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-[#EDE4FF] text-[#6366F1] flex items-center justify-center">
                    <Gamepad2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#0A1D3D]">
                  {totalSessions}
                </div>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                  Total initialized
                </p>
              </div>

              {/* Completed Quests */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#0A1D3D] shadow-[3px_3px_0_0_#0A1D3D]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Completed
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-[#EAF7EF] text-emerald-700 flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-800">
                  {totalCompletedQuests}
                </div>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                  18-level completions
                </p>
              </div>

              {/* In-Progress Quests */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#0A1D3D] shadow-[3px_3px_0_0_#0A1D3D]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    In Progress
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-[#FEF3C7] text-amber-700 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-amber-800">
                  {inProgressQuests}
                </div>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                  Active quests
                </p>
              </div>

              {/* Total Completed Levels */}
              <div className="col-span-2 lg:col-span-1 p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#0A1D3D] shadow-[3px_3px_0_0_#0A1D3D]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Levels Finished
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-[#FFE066] text-[#0A1D3D] flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#0A1D3D]">
                  {totalCompletedLevels}
                </div>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                  Aggregated levels
                </p>
              </div>
            </div>
          </section>

          {/* Children List Section */}
          <section aria-label="Children Profiles" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#0A1D3D]" style={{ fontFamily: JAKARTA }}>
                  My Children Profiles ({children.length})
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Each card represents a distinct child profile record with independent quest telemetry.
                </p>
              </div>

              <Link
                href="/onboarding"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#00838F] hover:text-[#0A1D3D] transition-colors"
              >
                <span>+ Launch New Child Quest</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {children.length === 0 ? (
              <div className="p-10 sm:p-14 rounded-[28px] bg-white border-2 border-[#0A1D3D] shadow-[4px_4px_0_0_#0A1D3D] text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#D8F3FF] text-[#00838F] flex items-center justify-center mx-auto border border-[#0A1D3D]">
                  <Baby className="w-8 h-8" />
                </div>
                <div className="max-w-md mx-auto space-y-1.5">
                  <h3 className="text-xl font-black text-[#0A1D3D]" style={{ fontFamily: JAKARTA }}>
                    No Child Profiles Created Yet
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Start your family&apos;s journey by onboarding your child. It only takes about 2 minutes to begin their 18-level cognitive adventure!
                  </p>
                </div>
                <div className="pt-2">
                  <Link
                    href="/onboarding"
                    className="inline-flex h-12 px-6 rounded-2xl bg-[#FFD028] text-[#0A1D3D] font-black text-xs border-2 border-[#0A1D3D] shadow-[3px_3px_0_0_#0A1D3D] hover:-translate-y-0.5 active:translate-y-0 transition-all items-center gap-2"
                    style={{ fontFamily: JAKARTA }}
                  >
                    <span>🎮 Launch Free Quest! 🚀</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {children.map((child) => (
                  <ChildCard key={child.id} child={child} />
                ))}
              </div>
            )}
          </section>
        </main>

        {/* Modal to Add Another Child */}
        {profile?.email && (
          <AddChildModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onChildCreated={handleChildCreated}
            parentEmail={profile.email}
            parentMobileDefault={profile.childProfile?.parentMobile || ""}
          />
        )}
      </PageCurtain>

      <FooterSection />
    </div>
  );
}
