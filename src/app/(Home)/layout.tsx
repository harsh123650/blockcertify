"use client";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthProvider";

const Component = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" data-theme="forest">
      <head>
        <title>Block-Certify: Blockchain-Powered Certificate Generator</title>
        <meta
          name="description"
          content=" Generate, verify, and store certificates securely on the blockchain.
            Ensure authenticity with tamper-proof digital certificates and
            unique certificate IDs."
        />
      </head>
      <body className={`antialiased`}>
        <Toaster />
        <Navbar />
        {children}
      </body>
    </html>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <Component>{children}</Component>
    </AuthProvider>
  );
}
