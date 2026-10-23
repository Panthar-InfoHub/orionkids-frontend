import React from "react";
import { Download } from "lucide-react";
import { PrintableItem } from "@/types/printables";

const JAKARTA = "font-[family-name:var(--font-plus-jakarta),sans-serif]";

/* ------------------------------------------------------------------ */
/* 1. PrintableCardRoot (The Outer Card Frame & Hover Lift)           */
/* ------------------------------------------------------------------ */
export interface PrintableCardRootProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  role?: string;
  tabIndex?: number;
  ariaLabel?: string;
}

export function PrintableCardRoot({
  children,
  className = "",
  onClick,
  role = "button",
  tabIndex = 0,
  ariaLabel,
}: PrintableCardRootProps) {
  return (
    <article
      onClick={onClick}
      role={role}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`group relative bg-white rounded-[24px] border-2 border-[#0A1D3D] shadow-[3px_3px_0px_0px_#0A1D3D] hover:-translate-y-1 hover:shadow-[5px_5px_0px_0px_#0A1D3D] transition-all duration-200 overflow-hidden flex flex-col justify-between p-3.5 sm:p-4 select-none ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
    >
      {children}
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* 2. PrintableCardAgeBadge (Top-left Pill Badge)                     */
/* ------------------------------------------------------------------ */
export interface PrintableCardAgeBadgeProps {
  ageRange: string;
  className?: string;
}

export function PrintableCardAgeBadge({
  ageRange,
  className = "",
}: PrintableCardAgeBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-xs text-[#0A1D3D] border border-slate-200/80 text-[10px] font-black tracking-wide shadow-2xs ${className}`}
    >
      {ageRange}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* 3. PrintableCardCategoryBadge (Top-right Icon Circle Badge)        */
/* ------------------------------------------------------------------ */
export interface PrintableCardCategoryBadgeProps {
  icon: React.ReactNode;
  bgColor?: string;
  className?: string;
}

export function PrintableCardCategoryBadge({
  icon,
  bgColor = "bg-[#0D9488]",
  className = "",
}: PrintableCardCategoryBadgeProps) {
  return (
    <span
      className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-[11px] shadow-2xs ${bgColor} ${className}`}
    >
      {icon}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* 4. PrintableCardPreview (Reusable Responsive Image Container)       */
/* ------------------------------------------------------------------ */
export interface PrintableCardPreviewProps {
  image: string;
  title: string;
  ageRange?: string;
  badgeIcon?: React.ReactNode;
  badgeBg?: string;
  priority?: boolean;
}

export function PrintableCardPreview({
  image,
  title,
  ageRange,
  badgeIcon,
  badgeBg = "bg-[#0D9488]",
  priority = false,
}: PrintableCardPreviewProps) {
  return (
    <div className="relative w-full aspect-[238/179] bg-[#F1F5F9] rounded-[18px] overflow-hidden border border-slate-100 flex items-center justify-center p-1 select-none">
      {/* High-quality responsive SVG illustration */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={title}
        width={238}
        height={179}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-[1.03] drop-shadow-2xs"
      />

      {/* Top-Left Target Age Badge */}
      {ageRange && (
        <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
          <PrintableCardAgeBadge ageRange={ageRange} />
        </div>
      )}

      {/* Top-Right Circular Category Icon Badge */}
      {badgeIcon && (
        <div className="absolute top-2.5 right-2.5 z-10 pointer-events-none">
          <PrintableCardCategoryBadge icon={badgeIcon} bgColor={badgeBg} />
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 5. PrintableCardSubcategory (Uppercase Category Header)            */
/* ------------------------------------------------------------------ */
export interface PrintableCardSubcategoryProps {
  children: React.ReactNode;
  colorClass?: string;
}

export function PrintableCardSubcategory({
  children,
  colorClass = "text-[#D97706]",
}: PrintableCardSubcategoryProps) {
  return (
    <div
      className={`text-[10px] sm:text-[11px] font-black uppercase tracking-wider mb-1 mt-3 ${colorClass}`}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 6. PrintableCardTitle (Card Title Heading)                         */
/* ------------------------------------------------------------------ */
export interface PrintableCardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function PrintableCardTitle({
  children,
  className = "",
}: PrintableCardTitleProps) {
  return (
    <h3
      className={`text-sm sm:text-[15px] font-black text-[#0A1D3D] leading-snug tracking-tight mb-1.5 line-clamp-1 ${JAKARTA} ${className}`}
    >
      {children}
    </h3>
  );
}

/* ------------------------------------------------------------------ */
/* 7. PrintableCardDescription (Card Description Paragraph)           */
/* ------------------------------------------------------------------ */
export interface PrintableCardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function PrintableCardDescription({
  children,
  className = "",
}: PrintableCardDescriptionProps) {
  return (
    <p
      className={`text-xs text-[#526176] leading-relaxed line-clamp-2 mb-3.5 font-normal ${className}`}
    >
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* 8. PrintableCardBody (Modular Text Container)                      */
/* ------------------------------------------------------------------ */
export interface PrintableCardBodyProps {
  subcategory?: string;
  subcategoryColor?: string;
  title: string;
  description: string;
}

export function PrintableCardBody({
  subcategory,
  subcategoryColor = "text-[#D97706]",
  title,
  description,
}: PrintableCardBodyProps) {
  return (
    <div className="flex-1 flex flex-col justify-between">
      <div>
        {subcategory && (
          <PrintableCardSubcategory colorClass={subcategoryColor}>
            {subcategory}
          </PrintableCardSubcategory>
        )}
        <PrintableCardTitle>{title}</PrintableCardTitle>
        <PrintableCardDescription>{description}</PrintableCardDescription>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 9. PrintableCardDownloadCount (Prints metric badge)                */
/* ------------------------------------------------------------------ */
export interface PrintableCardDownloadCountProps {
  countText?: string;
}

export function PrintableCardDownloadCount({
  countText = "1.8k prints",
}: PrintableCardDownloadCountProps) {
  return (
    <div className="flex items-center gap-1 text-[11px] font-bold text-[#64748B]">
      <Download className="w-3 h-3 stroke-[2.2] text-[#64748B]" />
      <span>{countText}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 10. PrintableCardAction (Get PDF Pill Action)                       */
/* ------------------------------------------------------------------ */
export interface PrintableCardActionProps {
  label?: string;
  href?: string;
  onClick?: () => void;
}

export function PrintableCardAction({
  label = "Get PDF",
  href,
  onClick,
}: PrintableCardActionProps) {
  const content = (
    <>
      <span>{label}</span>
      <span className="text-xs font-bold leading-none">↓</span>
    </>
  );

  const className =
    "inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#FFF4D6] hover:bg-[#FFE9A6] active:scale-95 text-[#D97706] text-xs font-black transition-all shadow-2xs select-none";

  if (href) {
    return (
      <a
        href={href}
        onClick={(e) => {
          if (onClick) {
            e.preventDefault();
            e.stopPropagation();
            onClick();
          }
        }}
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      className={`${className} cursor-pointer`}
    >
      {content}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* 11. PrintableCardFooter (Footer Row with Download Count & Action)   */
/* ------------------------------------------------------------------ */
export interface PrintableCardFooterProps {
  printCountText?: string;
  downloadUrl?: string;
  onDownload?: () => void;
}

export function PrintableCardFooter({
  printCountText = "1.8k prints",
  downloadUrl,
  onDownload,
}: PrintableCardFooterProps) {
  return (
    <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between mt-auto">
      <PrintableCardDownloadCount countText={printCountText} />
      <PrintableCardAction
        href={downloadUrl}
        onClick={onDownload}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 12. Main PrintableCard Component (Server Component & Composable)    */
/* ------------------------------------------------------------------ */
export interface PrintableCardProps {
  item: PrintableItem;
  onDownload?: (item: PrintableItem) => void;
  priority?: boolean;
  className?: string;
}

export function PrintableCard({
  item,
  onDownload,
  priority = false,
  className = "",
}: PrintableCardProps) {
  const imageUrl = item.image || item.cardImage || "/svg/201.svg";

  return (
    <PrintableCardRoot
      onClick={onDownload ? () => onDownload(item) : undefined}
      ariaLabel={`Printable worksheet: ${item.title}`}
      className={className}
    >
      {/* 1. Preview Area */}
      <PrintableCardPreview
        image={imageUrl}
        title={item.title}
        ageRange={item.ageRange}
        badgeIcon={item.badgeIcon}
        badgeBg={item.badgeBg}
        priority={priority}
      />

      {/* 2. Text Content */}
      <PrintableCardBody
        subcategory={item.subcategory}
        subcategoryColor={item.subcategoryColor}
        title={item.title}
        description={item.description}
      />

      {/* 3. Footer Action */}
      <PrintableCardFooter
        printCountText={item.printCountText}
        downloadUrl={item.downloadUrl}
        onDownload={onDownload ? () => onDownload(item) : undefined}
      />
    </PrintableCardRoot>
  );
}
