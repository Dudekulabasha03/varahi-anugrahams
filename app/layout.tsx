import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://varahianugrahams.com"),
  title: "VARAHI ANUGRAHAMS — A Gated Community | Luxury Villas in Tadipatri",
  description:
    "Discover Varahi Anugrahams, an exclusive gated residential community featuring signature contemporary 3-level luxury villas, 30 FT tree-lined avenue, private 23x30 terrace garden, and smart floor plans in Tadipatri.",
  keywords: [
    "Varahi Anugrahams",
    "Gated Community Tadipatri",
    "Luxury Villas Tadipatri",
    "Rangaiah Kotra",
    "Sri Murali Cotton Press",
    "3 BHK Villas with Lift and Pooja",
    "Terrace Garden Pergola",
  ],
  openGraph: {
    title: "VARAHI ANUGRAHAMS — A Gated Community",
    description:
      "A Home Beyond the Ordinary. Contemporary luxury villas with curved facade, private rooftop terrace, and 30 FT tree-lined boulevard.",
    images: ["/assets/exterior/signature-villa-facade.jpg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0b0907",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-forest-950 text-ivory-100 antialiased min-h-screen selection:bg-gold-400 selection:text-forest-950">
        {children}
      </body>
    </html>
  );
}
