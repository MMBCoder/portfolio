import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Navigation from "@/components/layout/Navigation";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mirzaminhazbaig.space"),
  title: "Mirza Minhaz Baig – AI Transformation Leader | Data Scientist | Enterprise AI",
  description:
    "AI Transformation Leader and Data Scientist with 12+ years of enterprise experience. Building Agentic AI, RAG architectures, and data platforms that transform financial services.",
  keywords: [
    "AI Transformation Leader", "AI Transformation", "Data Scientist", "Agentic AI", "LangChain", "RAG",
    "Enterprise AI", "Analytics Leader", "Mirza Minhaz Baig",
    "Data Engineering", "Machine Learning", "LLM Orchestration"
  ],
  authors: [{ name: "Mirza Minhaz Baig" }],
  creator: "Mirza Minhaz Baig",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mirzaminhazbaig.space",
    title: "Mirza Minhaz Baig – AI Transformation Leader & Data Scientist",
    description: "AI Transformation Leader and Data Scientist with 12+ years transforming enterprise analytics with AI.",
    siteName: "Mirza Minhaz Baig",
    images: [
      {
        url: "https://mirzaminhazbaig.space/og-image.jpg",
        width: 1600,
        height: 900,
        alt: "Mirza Minhaz Baig – AI Transformation Leader & Data Scientist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mirza Minhaz Baig – AI Transformation Leader & Data Scientist",
    description: "AI Transformation Leader and Data Scientist with 12+ years transforming enterprise analytics with AI.",
    images: ["https://mirzaminhazbaig.space/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico",        sizes: "any" },
      { url: "/favicon-16x16.png",  sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png",  sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  robots: { index: true, follow: true },
  verification: { google: "1defa1fe11866bca" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
          <Navigation />
          <main style={{ paddingTop: "68px" }}>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
