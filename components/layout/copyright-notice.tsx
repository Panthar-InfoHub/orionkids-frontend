"use client";

import React, { useState, useEffect } from "react";

interface CopyrightNoticeProps {
  className?: string;
}

export function CopyrightNotice({ className }: CopyrightNoticeProps) {
  const [year, setYear] = useState<number>(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <span className={className}>© {year} OrionKids. All rights reserved.</span>;
}

