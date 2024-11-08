import type { Metadata } from "next";
import "./globals.css";
import { Rye } from 'next/font/google'
import { BalanceProvider } from "./contexts/balanceContext";


export const metadata: Metadata = {
  title: "Lucky Wheel",
  description: "Spin to Win",
};

const rye = Rye({
  subsets:['latin'],
  weight:["400"],
  variable: '--font-rye'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <BalanceProvider>
          {children}
        </BalanceProvider>
      </body>
    </html>
  );
}
