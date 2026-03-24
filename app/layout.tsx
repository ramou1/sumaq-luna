import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Great_Vibes } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
});

const siteTitle = "Sumaq Luna — Pisco premium";
const siteDescription =
  "Sumaq Luna: pisco premium con alma andina. Herencia, terroir y legado peruano.";

/** URL absoluta do site em produção (previews em redes sociais). Ex.: https://sumaqluna.com */
const metadataBase = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
);

export const metadata: Metadata = {
  metadataBase,
  title: siteTitle,
  description: siteDescription,
  icons: {
    icon: [{ url: "/images/logo-sumaq.png", type: "image/png" }],
    apple: [{ url: "/images/logo-sumaq.png", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "es",
    siteName: "Sumaq Luna",
    title: siteTitle,
    description: siteDescription,
    url: "/",
    images: [
      {
        url: "/images/logo-sumaq.png",
        alt: "Sumaq Luna",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/logo-sumaq.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${cinzel.variable} ${cormorant.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
