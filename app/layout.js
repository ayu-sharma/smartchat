import "./globals.css";

export const metadata = {
  title: "AI Chatbot",
  description: "An intelligent AI-powered chatbot built with Next.js",
  keywords: ["AI", "chatbot", "Next.js", "artificial intelligence", "conversation"],
  authors: [{ name: "AI Chatbot Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "AI Chatbot",
    description: "An intelligent AI-powered chatbot built with Next.js",
    url: "https://ai-chatbot.com",
    siteName: "AI Chatbot",
    images: [
      {
        url: "/images/image.png",
        width: 1200,
        height: 630,
        alt: "AI Chatbot Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Chatbot",
    description: "An intelligent AI-powered chatbot built with Next.js",
    images: ["/images/image.png"],
    creator: "@aichatbot",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  themeColor: "#ffffff",
  verification: {
    google: "your-google-site-verification",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
