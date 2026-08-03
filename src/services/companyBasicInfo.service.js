import { cache } from "react";
import connectDB from "@/lib/connectDB";
import CompanyBasicInfo from "@/models/Admin/CompanyBasicInfo";

function serializeImage(image) {
  return {
    url: image?.url || "",
    key: image?.key || "",
  };
}

function serializeCompanyBasicInfo(record) {
  if (!record) return null;

  return {
    _id: String(record._id),
    id: String(record._id),
    companyName: record.companyName || "",
    companyDomainName: record.companyDomainName || "",
    contactNumbers: Array.isArray(record.contactNumbers)
      ? record.contactNumbers.filter(Boolean)
      : [],
    mainLogo: serializeImage(record.mainLogo),
    footerLogo: serializeImage(record.footerLogo),
    mobileUiLogo: serializeImage(record.mobileUiLogo),
    emails: Array.isArray(record.emails) ? record.emails.filter(Boolean) : [],
    officeAddresses: Array.isArray(record.officeAddresses)
      ? record.officeAddresses.filter(Boolean)
      : [],
    googleAddress: record.googleAddress || "",
    facebookLink: record.facebookLink || "",
    instagramLink: record.instagramLink || "",
    youtubeLink: record.youtubeLink || "",
    googleMapLink: record.googleMapLink || "",
    googleTrackingTag: record.googleTrackingTag || "",
    titleTagForMainLandingPage: record.titleTagForMainLandingPage || "",
    keywords: Array.isArray(record.keywords) ? record.keywords.filter(Boolean) : [],
  };
}

function normalizeSiteUrl(domainName) {
  const value = String(domainName || "").trim();
  if (!value) return `${process.env.NEXT_PUBLIC_SITE_URL}`;

  if (/^https?:\/\//i.test(value)) {
    return value.replace(/\/$/, "");
  }

  return `https://${value.replace(/\/$/, "")}`;
}

export const getCompanyBasicInfo = cache(async () => {
  try {
    await connectDB();
    const record = await CompanyBasicInfo.findOne()
      .sort({ updatedAt: -1 })
      .lean();
    return serializeCompanyBasicInfo(record);
  } catch (error) {
    console.error("Failed to load company basic info:", error);
    return null;
  }
});

export function buildCompanyMetadata(company) {
  const siteName = company?.companyName || "";
  const title = company?.titleTagForMainLandingPage || siteName || "";
  const keywords = company?.keywords?.length > 0 ? company.keywords : [];
  const siteUrl = normalizeSiteUrl(company?.companyDomainName);
  const ogImage = company?.mainLogo?.url || "/logo.png";

  let metadataBase;
  try {
    metadataBase = new URL(siteUrl);
  } catch {
    metadataBase = new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`);
  }

  return {
    metadataBase,
    title: {
      default: title,
      template: siteName ? `%s | ${siteName}` : "%s",
    },
    description: "",
    keywords,
    icons: {
      icon: [
        { url: "/favicon/favicon.ico" },
        {
          url: "/favicon/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png",
        },
        {
          url: "/favicon/favicon-32x32.png",
          sizes: "32x32",
          type: "image/png",
        },
      ],
      apple: "/favicon/apple-touch-icon.png",
    },
    manifest: "/favicon/site.webmanifest",
    openGraph: {
      title,
      description: "",
      images: [ogImage],
      url: siteUrl,
      siteName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: "",
      images: [ogImage],
    },
    authors: [{ name: siteName }],
    robots: {
      index: true,
      follow: true,
    },
  };
}

