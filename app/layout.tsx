import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components-ui/ThemeProvider";
import Navbar from "./components-ui/Navbar";
import Footer from "./components-ui/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NodeBackend - Production-Ready Node.js Components",
  description: "Copy-paste ready Node.js backend components for authentication, payments, chat, file storage, and more. Own your code, own your data.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen bg-primary text-primary flex flex-col transition-colors duration-300">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}