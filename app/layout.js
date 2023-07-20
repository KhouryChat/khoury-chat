"use client";
import "./globals.css";
import { AuthContextProvider } from "@/Context/AuthContext";
export default function RootLayout({ children }) {
  return (
    <html>
      <body className="main_body">
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
