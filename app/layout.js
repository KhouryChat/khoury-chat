"use client";
import MenuSidebar from "@/components/MenuSidebar/MenuSidebar";
import "./globals.css";
import { AuthContextProvider } from "@/Context/AuthContext";
import { useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { motion } from "framer-motion";

export default function RootLayout({ children }) {
  const [isMenuShown, setIsMenuShown] = useState(false);
  return (
    <html>
      <body>
        <div>
          <AuthContextProvider>
            {/* <AnimatePresence mode="wait" initial={false}> */}
            <MenuSidebar
              isMenuShown={isMenuShown}
              setIsMenuShown={setIsMenuShown}
            />
            {children}
            {/* </AnimatePresence> */}
          </AuthContextProvider>
        </div>
      </body>
    </html>
  );
}
