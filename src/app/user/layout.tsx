"use client";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "@/context/AuthProvider";
import { useEffect } from "react";
import axios from "axios";
import SideNav from "./SideNav";

const Component = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { setUser } = useAuth();
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    const res = await axios.get("/api/auth/verifytoken");
    if (res.data) {
      setUser(res.data.user);
    }
  };
  return (
    <html lang="en" data-theme="forest">
      <head>
        <title>Block-Certify: Blockchain-Powered Certificate Generator</title>
        <meta
          name="description"
          content="Generate, verify, and store certificates securely on the blockchain.
            Ensure authenticity with tamper-proof digital certificates and
            unique certificate IDs."
        />
      </head>
      <body className={`antialiased`}>
        <Toaster />
        <SideNav>{children}</SideNav>
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
