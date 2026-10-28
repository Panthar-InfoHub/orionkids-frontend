import { AdminDashboardView } from "@/components/admin/admin-dashboard-view";

// Opt this authenticated administrative segment out of instant-navigation dropped segment validation
export const instant = false;

export default function AdminPage() {
  return <AdminDashboardView />;
}
