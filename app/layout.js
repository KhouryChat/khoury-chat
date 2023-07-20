"use client";
import MenuSidebar from "@/components/MenuSidebar/MenuSidebar";
import "./globals.css";
import { AuthContextProvider } from "@/Context/AuthContext";
import { useState } from "react";

export default function RootLayout({ children }) {
  const [isMenuShown, setIsMenuShown] = useState(false);

  return (
    <html>
      <body>
        <MenuSidebar
          isMenuShown={isMenuShown}
          setIsMenuShown={setIsMenuShown}
        />
        <div>
          <AuthContextProvider>{children}</AuthContextProvider>
        </div>
      </body>
    </html>
  );
}
