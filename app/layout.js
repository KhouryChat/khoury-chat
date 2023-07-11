"use client";
import "./globals.css";
import { AuthContextProvider } from "@/Context/AuthContext";
export default function RootLayout({ children }) {
  return (
    <html>
      <body className="">
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
