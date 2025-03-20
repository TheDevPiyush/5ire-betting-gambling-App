import type { Metadata } from "next";
import "./globals.css";
import Providers from "./_components/Providers";


export const metadata: Metadata = {
  title: "5ire Native App",
  description: "Stake your 5ire tokens easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <Providers children={children} />
    </html>
  );
}
