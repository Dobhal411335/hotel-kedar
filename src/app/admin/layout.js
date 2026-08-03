import { getCompanyBasicInfo } from "@/services/companyBasicInfo.service";

export async function generateMetadata() {
  const company = await getCompanyBasicInfo();
  const companyName = company?.companyName || "Admin";
  return {
    title: {
      default: `${companyName} CMS`,
      template: `%s | ${companyName} CMS`,
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function AdminRootLayout({ children }) {
  return <>{children}</>;
}
