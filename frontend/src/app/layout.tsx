import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
  title: "ERKA Construction Materials",
  description: "E-commerce platform for construction materials",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <Toaster position="bottom-right" />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
