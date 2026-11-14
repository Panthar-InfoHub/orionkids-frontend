"use client";

import React, { useState, useMemo } from "react";

export type ProfileAvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | number;
export type ProfileAvatarShape = "circle" | "rounded";

export interface ProfileAvatarProps {
  src?: string | null;
  name?: string | null;
  alt?: string;
  size?: ProfileAvatarSize;
  shape?: ProfileAvatarShape;
  className?: string;
  imageClassName?: string;
  borderClassName?: string;
  fallbackBgClassName?: string;
  fallbackTextClassName?: string;
  priority?: boolean;
}

/**
 * Extracts clean, deterministic 1-2 character uppercase initials from a user's name.
 * Fallbacks gracefully to "OK" (OrionKids) when no valid name is provided.
 */
export function getInitials(name?: string | null): string {
  if (!name || typeof name !== "string") {
    return "OK";
  }

  const cleaned = name.trim();
  if (!cleaned) {
    return "OK";
  }

  const words = cleaned
    .split(/\s+/)
    .map((w) => w.replace(/[^a-zA-Z0-9]/g, ""))
    .filter((w) => w.length > 0);

  if (words.length === 0) {
    const alphanumericOnly = cleaned.replace(/[^a-zA-Z0-9]/g, "");
    return (alphanumericOnly.slice(0, 2) || "OK").toUpperCase();
  }

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return (words[0][0] + words[1][0]).toUpperCase();
}

/**
 * Maps standard OrionKids size presets to Tailwind classes for container dimensions and typography.
 */
function getSizeClasses(size: ProfileAvatarSize): { container: string; text: string } {
  switch (size) {
    case "xs":
      return { container: "w-7 h-7", text: "text-[10px]" };
    case "sm":
      return { container: "w-8 h-8 sm:w-9 sm:h-9", text: "text-xs font-black" };
    case "md":
      return { container: "w-9 h-9 sm:w-10 sm:h-10", text: "text-xs sm:text-sm font-black" };
    case "lg":
      return { container: "w-10 h-10 sm:w-12 sm:h-12", text: "text-sm sm:text-base font-black" };
    case "xl":
      return { container: "w-16 h-16 sm:w-20 sm:h-20", text: "text-xl sm:text-2xl font-black" };
    case "2xl":
      return { container: "w-20 h-20 sm:w-24 sm:h-24", text: "text-2xl sm:text-3xl font-black" };
    default:
      return { container: "", text: "text-sm font-black" };
  }
}

function ProfileAvatarInner({
  validSrc,
  name,
  alt,
  size,
  shape,
  className,
  imageClassName,
  borderClassName,
  fallbackBgClassName,
  fallbackTextClassName,
  priority,
}: {
  validSrc: string | null;
  name?: string | null;
  alt?: string;
  size: ProfileAvatarSize;
  shape: ProfileAvatarShape;
  className: string;
  imageClassName: string;
  borderClassName: string;
  fallbackBgClassName: string;
  fallbackTextClassName: string;
  priority: boolean;
}) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const initials = useMemo(() => getInitials(name), [name]);
  const altText = alt || (name ? `${name}'s profile avatar` : "User profile avatar");

  const shapeClass = shape === "circle" ? "rounded-full" : "rounded-2xl";
  const sizeConfig = useMemo(() => getSizeClasses(size), [size]);

  const customStyle: React.CSSProperties =
    typeof size === "number"
      ? { width: size, height: size, minWidth: size, minHeight: size }
      : {};

  const shouldRenderImage = Boolean(validSrc && !imageError);

  return (
    <div
      role="img"
      aria-label={altText}
      style={customStyle}
      className={`relative inline-flex items-center justify-center shrink-0 select-none overflow-hidden ${shapeClass} ${sizeConfig.container} ${borderClassName} ${className}`}
    >
      {shouldRenderImage ? (
        <>
          {/* Fallback underneath image while loading */}
          {!imageLoaded && (
            <div
              className={`absolute inset-0 flex items-center justify-center ${fallbackBgClassName} ${fallbackTextClassName} ${sizeConfig.text}`}
              aria-hidden="true"
            >
              <span>{initials}</span>
            </div>
          )}

          {/* Actual Profile Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={validSrc!}
            alt={altText}
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover ${shapeClass} transition-opacity duration-200 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            } ${imageClassName}`}
          />
        </>
      ) : (
        /* Deterministic Initial Badge when image is null, empty, or failed */
        <div
          className={`w-full h-full flex items-center justify-center ${fallbackBgClassName} ${fallbackTextClassName} ${sizeConfig.text}`}
          aria-hidden="true"
        >
          <span>{initials}</span>
        </div>
      )}
    </div>
  );
}

/**
 * Enterprise-grade, resilient Profile Avatar component for OrionKids.
 *
 * Guarantees:
 * 1. Automatically strips cross-origin Referer headers (`referrerPolicy="no-referrer"`)
 *    preventing Google User Content / CDN hotlink blocking (403/429).
 * 2. Instant fallback to brand-consistent initials badge on any loading/network error.
 * 3. Never renders native broken image icons or clipped alt text.
 * 4. Zero layout shift during image loading with placeholder/shimmer.
 * 5. Full support for custom dimensions, responsive sizes, and accessibility roles.
 */
export function ProfileAvatar({
  src,
  name,
  alt,
  size = "md",
  shape = "circle",
  className = "",
  imageClassName = "",
  borderClassName = "",
  fallbackBgClassName = "bg-[#0A1D3D]",
  fallbackTextClassName = "text-white",
  priority = false,
}: ProfileAvatarProps) {
  // Normalize image source
  const validSrc = useMemo(() => {
    if (!src || typeof src !== "string") return null;
    const trimmed = src.trim();
    return trimmed.length > 0 ? trimmed : null;
  }, [src]);

  return (
    <ProfileAvatarInner
      key={validSrc || "no-src"}
      validSrc={validSrc}
      name={name}
      alt={alt}
      size={size}
      shape={shape}
      className={className}
      imageClassName={imageClassName}
      borderClassName={borderClassName}
      fallbackBgClassName={fallbackBgClassName}
      fallbackTextClassName={fallbackTextClassName}
      priority={priority}
    />
  );
}

export default ProfileAvatar;
