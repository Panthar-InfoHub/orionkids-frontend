"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, User, Lock, ArrowRight, Loader2, Clock, Check } from "lucide-react";

export default function LoginForm() {
  const [role, setRole] = useState<"parent" | "school">("parent");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Please fill in both your email and password.");
      return;
    }

    if (!agreeTerms) {
      setErrorMessage("Please accept the terms to proceed.");
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert(`Welcome back! Signed in as ${role}: ${email}`);
    } catch {
      setErrorMessage("Unable to sign in. Please verify your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-[28px] border border-slate-200/90 shadow-[0_12px_45px_-10px_rgba(15,23,42,0.07)] p-6 sm:p-9 lg:p-10 select-none">
      {/* Card Header matching Figma Wireframe */}
      <div className="flex items-center justify-between gap-3 mb-2">
        <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#00BCD4]">
          LET&apos;S GET YOU SIGNED IN
        </span>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 text-[11px] font-semibold">
          <Clock className="w-3 h-3" />
          <span>About 1 minute</span>
        </div>
      </div>

      <h2 className="text-2xl sm:text-[26px] font-black text-[#0A1D3D] tracking-tight mb-1">
        A little about your account
      </h2>
      <p className="text-xs sm:text-[13px] text-slate-500 mb-6">
        Please fill in the details below. Fields marked with an asterisk (<span className="text-rose-500">*</span>) are required.
      </p>

      {/* Role Toggle matching Wireframe */}
      <div className="flex bg-[#F1F5F9] p-1 rounded-xl mb-6 border border-slate-200">
        <button
          type="button"
          onClick={() => setRole("parent")}
          className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
            role === "parent"
              ? "bg-white text-[#0A1D3D] shadow-sm border border-slate-200"
              : "text-slate-500 hover:text-[#0A1D3D]"
          }`}
        >
          👨‍👩‍👧 Parent Portal
        </button>
        <button
          type="button"
          onClick={() => setRole("school")}
          className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
            role === "school"
              ? "bg-white text-[#0A1D3D] shadow-sm border border-slate-200"
              : "text-slate-500 hover:text-[#0A1D3D]"
          }`}
        >
          🏫 School / Educator
        </button>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Account Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
              <User className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-[#0A1D3D]">
                {role === "parent" ? "Parent details" : "Educator details"}
              </h3>
              <p className="text-[11px] text-slate-400">
                Tell us how to identify your account
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0A1D3D] mb-1">
              Email or Parent ID <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={role === "parent" ? "parent@example.com" : "teacher@school.edu"}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-medium text-[#0A1D3D] placeholder-slate-400 focus:outline-none focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4]/15 transition-all"
            />
          </div>
        </div>

        {/* Section 2: Security */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Lock className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-[#0A1D3D]">
                Account security
              </h3>
              <p className="text-[11px] text-slate-400">
                Enter your password to sign in safely
              </p>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-bold text-[#0A1D3D]">
                Password <span className="text-rose-500">*</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-semibold text-[#00BCD4] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-medium text-[#0A1D3D] placeholder-slate-400 focus:outline-none focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4]/15 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Agreement / Disclaimer Box matching Figma wireframe */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#00BCD4] focus:ring-[#00BCD4]"
            />
            <span className="text-xs text-slate-600 font-medium leading-relaxed">
              Remember my login on this device and keep me signed in.
            </span>
          </label>

          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#00BCD4] focus:ring-[#00BCD4]"
            />
            <span className="text-[11px] text-slate-500 leading-snug">
              I state I am this child&apos;s parent or guardian. I agree to OrionKids using the details I provide to support their learning activities.{" "}
              <Link href="/privacy" className="text-[#00BCD4] hover:underline font-semibold">
                Read how we use your information.
              </Link>
            </span>
          </label>
        </div>

        {/* Action Bar matching Figma Bottom row */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-500 text-center sm:text-left">
            New here?{" "}
            <Link href="/register" className="font-bold text-[#0A1D3D] hover:text-[#00BCD4] underline">
              Create an account
            </Link>
          </span>

          {/* Mint/Teal Green Continue Button matching Figma */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#00C9A7] hover:bg-[#00b596] active:scale-95 text-[#0A1D3D] font-extrabold text-sm shadow-[0_4px_14px_rgba(0,201,167,0.35)] transition-all cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#0A1D3D]" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
