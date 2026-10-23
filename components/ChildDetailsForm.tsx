"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, ChevronDown, Clock, HeartHandshake, Loader2, ArrowRight, School, Smile, } from "lucide-react";

const JAKARTA = "[font-family:var(--font-plus-jakarta),sans-serif]";

const LABEL = "block mb-2 text-[13px] leading-[18px] font-semibold text-[#0B2A5B]";
const FIELD =
  "w-full h-[47px] px-[14px] rounded-[14px] bg-white border border-[#DCE4EF] text-[13px] font-medium text-[#0B2A5B] placeholder:text-[#8793A8] placeholder:font-normal focus:outline-none focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4]/15 transition-all";

const CLASSES = [
  { label: "Classes 1", locked: false },
  { label: "Classes 2", locked: false },
  { label: "Classes 3", locked: false },
  { label: "Classes 4", locked: false },
];

function SectionHead({
  icon,
  tint,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  tint: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div
        className={`w-[34px] h-[34px] rounded-[10px] flex items-center justify-center shrink-0 ${tint}`}
      >
        {icon}
      </div>
      <div>
        <h3 className={`text-[16px] leading-5 font-bold text-[#0B2A5B] ${JAKARTA}`}>{title}</h3>
        <p className="mt-[3px] text-[11px] leading-4 text-[#5F6C82]">{subtitle}</p>
      </div>
    </div>
  );
}
export default function ChildDetailsForm() {
  const router = useRouter();
  const [childName, setChildName] = useState("");
  const [age, setAge] = useState("");
  const [language, setLanguage] = useState("");
  const [school, setSchool] = useState("");
  const [selectedClass, setSelectedClass] = useState("Classes 1");
  const [studentId, setStudentId] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [parentMobile, setParentMobile] = useState("");
  const [isGuardian, setIsGuardian] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/warm-up");
    }, 600);
  };

  return (
    <div className="w-full max-w-[824px] bg-white rounded-[24px] border border-[#E1E8F3] shadow-[0_8px_30px_rgba(10,29,61,0.04)] p-6 sm:p-[36px] flex flex-col gap-[26px] select-none text-[#10345B]">
      {/* Meta row */}
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] leading-4 font-medium uppercase text-[#0B2A5B]">
          LET&apos;S GET TO KNOW YOUR CHILD
        </span>
        <span className="inline-flex items-center gap-1.5 text-[12px] leading-4 text-[#4B5870] shrink-0">
          <Clock className="w-[14px] h-[14px]" strokeWidth={1.8} aria-hidden="true" />
          About 2 minutes
        </span>
      </div>

      <h2
        className={`mt-3 text-[24px] sm:text-[28px] leading-[34px] font-extrabold tracking-[-0.02em] text-[#0B2A5B] ${JAKARTA}`}
      >
        A little about your child
      </h2>
      <p className="mt-2.5 mb-7 text-[13px] leading-5 text-[#4B5870]">
        Please fill in the details below. Fields marked optional can be left blank.
      </p>

      <form onSubmit={handleSubmit}>
        {/* ============ 1. CHILD DETAILS ============ */}
        <div className="border-t border-[#E7EDF6] pt-[30px] pb-[26px]">
          <SectionHead
            tint="bg-[#DDF1FC]"
            icon={<Smile className="w-[18px] h-[18px] text-[#0B2A5B]" strokeWidth={1.9} />}
            title="Child details"
            subtitle="The little things that help us get started."
          />

          <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_180px] gap-x-5 gap-y-[18px]">
            <div>
              <label htmlFor="childName" className={LABEL}>
                Child Name
              </label>
              <input
                id="childName"
                type="text"
                required
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="Enter your child's full name"
                className={FIELD}
              />
            </div>
            <div>
              <label htmlFor="age" className={LABEL}>
                Age
              </label>
              <input
                id="age"
                type="text"
                inputMode="numeric"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Age in years"
                className={FIELD}
              />
            </div>
          </div>

          <div className="mt-[18px]">
            <label htmlFor="language" className={LABEL}>
              Preferred language
            </label>
            <div className="relative">
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={`${FIELD} appearance-none pr-11 cursor-pointer ${language === "" ? "!text-[#8793A8] !font-normal" : ""
                  }`}
              >
                <option value="" disabled>
                  Select home language
                </option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Bengali">Bengali</option>
                <option value="Tamil">Tamil</option>
                <option value="Telugu">Telugu</option>
                <option value="Marathi">Marathi</option>
                <option value="Gujarati">Gujarati</option>
              </select>
              <ChevronDown
                className="absolute right-[18px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#2B3A55] pointer-events-none"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* ============ 2. SCHOOL DETAILS ============ */}
        <div className="border-t border-[#E7EDF6] pt-[30px] pb-[26px]">
          <SectionHead
            tint="bg-[#E2F6EA]"
            icon={<School className="w-[18px] h-[18px] text-[#0B2A5B]" strokeWidth={1.9} />}
            title="School details"
            subtitle="Tell us about your child's learning environment."
          />

          <div>
            <label htmlFor="school" className={LABEL}>
              School
            </label>
            <input
              id="school"
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              placeholder="Enter school name"
              className={FIELD}
            />
          </div>

          <div className="mt-[18px]">
            <span id="class-label" className={LABEL}>
              Class
            </span>
            <div
              role="radiogroup"
              aria-labelledby="class-label"
              className="rounded-[16px] border border-[#DCE4EF] bg-white p-2 flex flex-col gap-2"
            >
              {CLASSES.map((c) => {
                const isSelected = selectedClass === c.label;
                return (
                  <button
                    key={c.label}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    disabled={c.locked}
                    onClick={() => setSelectedClass(c.label)}
                    className={`w-full h-[47px] px-[14px] rounded-[12px] flex items-center justify-between text-left text-[13px] text-[#0B2A5B] transition-colors disabled:cursor-not-allowed ${isSelected
                        ? "bg-[#EDE4FF] font-semibold"
                        : "font-medium hover:bg-[#F6F2FF]"
                      } ${c.locked ? "hover:bg-transparent" : "cursor-pointer"}`}
                  >
                    <span>{c.label}</span>
                    {c.locked && (
                      <svg
                        className="w-[19px] h-[19px] mr-0.5 text-[#22385E]"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        role="img"
                        aria-label="Locked"
                      >
                        <path d="M7 10V8a5 5 0 0 1 10 0v2h1a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 18 21H6a1.5 1.5 0 0 1-1.5-1.5v-8A1.5 1.5 0 0 1 6 10h1zm2.2 0h5.6V8a2.8 2.8 0 0 0-5.6 0v2z" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-[18px]">
            <label htmlFor="studentId" className={LABEL}>
              Student ID · <span className="font-normal text-[#4B5870]">If available</span>
            </label>
            <input
              id="studentId"
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="Enter student ID, if available"
              className={FIELD}
            />
          </div>
        </div>

        {/* ============ 3. PARENT / GUARDIAN ============ */}
        <div className="border-t border-[#E7EDF6] pt-[30px]">
          <SectionHead
            tint="bg-[#FDE8F0]"
            icon={<HeartHandshake className="w-[18px] h-[18px] text-[#0B2A5B]" strokeWidth={1.9} />}
            title="Parent / guardian"
            subtitle="A way to keep you involved in your child's journey."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-[18px]">
            <div>
              <label htmlFor="parentEmail" className={LABEL}>
                Parent Email
              </label>
              <input
                id="parentEmail"
                type="email"
                required
                value={parentEmail}
                onChange={(e) => setParentEmail(e.target.value)}
                placeholder="you@example.com"
                className={FIELD}
              />
            </div>
            <div>
              <label htmlFor="parentMobile" className={LABEL}>
                Parent Mobile Number
              </label>
              <input
                id="parentMobile"
                type="tel"
                required
                value={parentMobile}
                onChange={(e) => setParentMobile(e.target.value)}
                placeholder="+91 98765 43210"
                className={FIELD}
              />
            </div>
          </div>

          {/* Consent */}
          <div className="mt-[18px] rounded-[16px] bg-[#F1ECFF] border border-[#E7DFFF] p-4 flex items-start gap-3">
            <span className="relative mt-px shrink-0 w-[19px] h-[19px]">
              <input
                id="guardian"
                type="checkbox"
                required
                checked={isGuardian}
                onChange={(e) => setIsGuardian(e.target.checked)}
                className="peer appearance-none w-full h-full rounded-[5px] border-2 border-[#7C7B96] bg-white checked:bg-[#0B2A5B] checked:border-[#0B2A5B] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00BCD4]/50"
              />
              <Check
                className="pointer-events-none absolute inset-0 m-auto w-3 h-3 text-white opacity-0 peer-checked:opacity-100"
                strokeWidth={3.5}
                aria-hidden="true"
              />
            </span>
            <div className="min-w-0">
              <label
                htmlFor="guardian"
                className="block text-[13px] leading-[21px] text-[#1F2E4D] cursor-pointer"
              >
                I am this child&apos;s parent or guardian. I agree to OrionKids using the details I
                provide to create my child&apos;s learning profile and support their learning
                activities.
              </label>
              <Link
                href="/privacy"
                className="mt-0.5 inline-block text-[13px] leading-5 font-medium text-[#4338CA] underline underline-offset-2 hover:text-[#0B2A5B]"
              >
                Read how we use your information
              </Link>
            </div>
          </div>
        </div>

        {/* Action bar */}
        <div className="mt-7 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          <span className="text-[11px] leading-4 text-[#55627A]">
            Next: Review your child&apos;s profile
          </span>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-6 rounded-[14px] bg-[#4FDDA6] border-2 border-[#0A1D3D] shadow-[3px_3px_0_0_#0A1D3D] text-[14px] font-extrabold text-[#0A1D3D] transition-all cursor-pointer hover:-translate-y-px active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_0_#0A1D3D] disabled:opacity-60 disabled:cursor-progress ${JAKARTA}`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
