"use client";
import MenuSidebar from "@/components/MenuSidebar/MenuSidebar";
import "./globals.css";
import { AuthContextProvider } from "@/Context/AuthContext";
import { useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { motion } from "framer-motion";

export const metadata = {
  title: 'KhouryChat - A forum for students at Khoury College of Computer Sciences',
  description: 'KhouryChat is the premier online forum dedicated to fostering discussions among students at Khoury College of Computer Sciences. Join a vibrant community of computer science enthusiasts, engage in insightful conversations, seek and provide academic support, and stay updated with the latest trends and news in the world of technology. Connect, learn, and collaborate with fellow Khoury students on topics ranging from algorithms, programming languages, software engineering, and more. Your gateway to a dynamic exchange of ideas and knowledge within the Khoury College community.',
}

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
