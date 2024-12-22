import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dreh am Rad",
  description: "Crazy Christm Wheel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
