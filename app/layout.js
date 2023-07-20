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
        <div>
          <AuthContextProvider>
            <MenuSidebar
              isMenuShown={isMenuShown}
              setIsMenuShown={setIsMenuShown}
            />
            {children}
          </AuthContextProvider>
        </div>
      </body>
    </html>
  );
}
