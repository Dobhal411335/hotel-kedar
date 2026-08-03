import { LoginPage } from "@/components/admin/auth/LoginPage";
import { getCompanyBasicInfo } from "@/services/companyBasicInfo.service";

export async function generateMetadata() {
  const company = await getCompanyBasicInfo();
  const companyName = company?.companyName || "Admin";
  return {
    title: `Admin Login | ${companyName} CMS`,
    description: `Sign in to manage the ${companyName} website.`,
  };
}

export default async function AdminLoginPage() {
  const company = await getCompanyBasicInfo();
  return <LoginPage company={company} />;
}
