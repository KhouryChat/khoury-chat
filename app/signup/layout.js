import "./../globals.css";

export default function RootLayout({ children }) {
  return (
    <html>
      <body className="bg-black">{children}</body>
    </html>
  );
}
