import type { Metadata } from "next";
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });
const ibmPlex = IBM_Plex_Mono({ variable: "--font-ibm-plex", subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: "SaaStack — Multi-Tenant SaaS Dashboard",
  description: "Production-ready multi-tenant SaaS with authentication, role-based access, team management, subscriptions, and activity logs.",
  openGraph: { title: "SaaStack", description: "Multi-tenant SaaS dashboard", images: ["/og-image.svg"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${ibmPlex.variable} h-full antialiased`}>
      <head><link rel="icon" href="/favicon.svg" type="image/svg+xml" /></head>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-jakarta)]">{children}</body>
    </html>
  );
}
