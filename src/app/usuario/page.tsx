import { CreatorDashboard } from "@/components/dashboard/CreatorDashboard";
import { SeoDocumentationSection } from "@/components/dashboard/SeoDocumentationSection";

export default function UsuarioPage() {
  return <CreatorDashboard footerSlot={<SeoDocumentationSection />} />;
}
