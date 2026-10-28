import type { Metadata } from "next";
import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminHeader } from "@/components/admin/admin-header";

export const instant = false;

export const metadata: Metadata = {
  title: "Admin Dashboard | OrionKids",
  description:
    "Secure administrative control center for OrionKids user management and approvals.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans selection:bg-[#FFE066] selection:text-[#0A1D3D]">
        <AdminHeader />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          {children}
        </main>
        <footer className="w-full bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-400 font-medium">
          © 2026 OrionKids Digital Solutions Pvt. Ltd. • Internal Admin Console
        </footer>
      </div>
    </AdminGuard>
  );
}
