import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { profile } from "@/content/profile";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  // Set metadataBase once a domain is live so social cards resolve absolute URLs.
  title: {
    default: `${profile.name} · ${profile.headline}`,
    template: `%s · ${profile.name}`,
  },
  description:
    "Nakul Iyer — Computer Engineering student at Purdue University. Undergraduate researcher in computer vision and generative models, EPICS design lead, and software developer at Hack the Future.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="flex min-h-screen flex-col">
        <Nav />
        <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
