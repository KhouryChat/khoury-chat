"use client";
import MenuSidebar from "@/components/MenuSidebar/MenuSidebar";
import "./globals.css";
import { AuthContextProvider } from "@/Context/AuthContext";
import { useState } from "react";
import { LazyMotion, domAnimation } from "framer-motion";

export default function RootLayout({ children }) {
  const [isMenuShown, setIsMenuShown] = useState(false);

  return (
    <html>
      <body>
        <div>
          <AuthContextProvider>
            {/* <LazyMotion features={domAnimation}> */}
            <MenuSidebar
              isMenuShown={isMenuShown}
              setIsMenuShown={setIsMenuShown}
            />
            {children}
            {/* </LazyMotion> */}
          </AuthContextProvider>
        </div>
      </body>
    </html>
  );
}
