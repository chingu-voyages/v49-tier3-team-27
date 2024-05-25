import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Nest-Ring Hotel",
    default: "Nest-Ring Hotel",
  },
  description:
    "Nest-Ring Hotel; Food Delivery, Dine In, Events, Recipes, and a Cuisine Enthusiast Community. Be Part of the culture. Developed by: @Jaweki, @Jd, @SimonC137, @Mariana, @Chukuli | Chingu.io Voyage 49 - team 27 tier 3.",
  metadataBase: new URL("https://nest-ring.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
