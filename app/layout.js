import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/partials/header/Header";
import Footer from "@/partials/footer/Footer"; // Adjust the path if needed
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        
        {children}

        {/* Footer at the bottom of every page */}
        {/* <Footer /> */}

        <ToastContainer draggable theme="dark" />
      </body>
    </html>
  );
}
