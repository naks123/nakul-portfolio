import type { Metadata } from "next";
// ── Font: the one place to change it. Swap the import and the call below
//    (keep `variable: "--font-brand"`); globals.css reads that variable.
import { Geist } from "next/font/google";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import RevealObserver from "@/components/RevealObserver";
import { profile } from "@/content/profile";
import "./globals.css";

const brandFont = Geist({
  subsets: ["latin"],
  variable: "--font-brand",
  display: "swap",
});

// Runs before paint. Motion styles only apply under .motion-ok, so visitors
// who prefer reduced motion (or have JS off) see everything, statically.
// Failsafe: if the app bundle never loads, RevealObserver can't reveal
// anything, so drop motion after 4s rather than leave content hidden.
// RevealObserver cancels this timer as soon as it starts.
const motionGate = `if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){var d=document.documentElement;d.classList.add('motion-ok');window.__motionFailsafe=setTimeout(function(){d.classList.remove('motion-ok')},4000)}`;

export const metadata: Metadata = {
  // Set metadataBase once a domain is live so social cards resolve absolute URLs.
  title: {
    default: profile.name,
    template: `%s · ${profile.name}`,
  },
  description:
    "Nakul Iyer — Computer Engineering student at Purdue University. Undergraduate researcher in computer vision and generative models, EPICS design lead, and software developer at Hack the Future.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // The motion gate adds a class to <html> before React hydrates.
    <html lang="en" className={brandFont.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionGate }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
