import MenuSidebar from "@/components/MenuSidebar/MenuSidebar";
import "./globals.css";
import { AuthContextProvider } from "@/Context/AuthContext";

export const metadata = {
  title:
    "KhouryChat - A forum for students at Khoury College of Computer Sciences",
  description:
    "KhouryChat is the premier online forum dedicated to fostering discussions among students at Khoury College of Computer Sciences. Join a vibrant community of computer science enthusiasts, engage in insightful conversations, seek and provide academic support, and stay updated with the latest trends and news in the world of technology. Connect, learn, and collaborate with fellow Khoury students on topics ranging from algorithms, programming languages, software engineering, and more. Your gateway to a dynamic exchange of ideas and knowledge within the Khoury College community.",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <div>
          <AuthContextProvider>
            <MenuSidebar />
            {children}
          </AuthContextProvider>
        </div>
      </body>
    </html>
  );
}
