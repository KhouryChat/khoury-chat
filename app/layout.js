"use client";
import MenuSidebar from "@/components/MenuSidebar/MenuSidebar";
import "./globals.css";
import { AuthContextProvider } from "@/Context/AuthContext";
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <MenuSidebar />
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
