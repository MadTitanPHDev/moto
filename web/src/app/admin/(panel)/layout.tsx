import { AdminShell } from "@/components/AdminShell";
import { DemoBanner } from "@/components/DemoBanner";

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DemoBanner />
      <AdminShell>{children}</AdminShell>
    </>
  );
}
