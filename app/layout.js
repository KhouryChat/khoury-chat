"use client";
import "./globals.css";
import { AuthContextProvider } from "@/Context/AuthContext";
export default function RootLayout({ children }) {
  return (
    <html>
      <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">

      <body className="">
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
