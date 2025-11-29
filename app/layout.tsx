import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ToolTrek - Professional Tool Starter Packs",
  description: "Hand-curated tool kits designed by professionals for every trade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
