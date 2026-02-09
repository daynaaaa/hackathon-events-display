"use client";
import Link from "next/link";
import Header from "./_components/header";
import { AuthProvider } from "./_context/AuthContext";

const NotFound = () => {
  return (
    <AuthProvider>
      <div className="bg-sky-50 font-sans min-h-screen">
        <Header />
        <div className="text-xl pt-50 text-center mx-auto my-auto">
          <div className=" text-3xl">404: Page not found</div>
          <Link href="/" className="text-sky-900 ">Return Home</Link>
        </div>
      </div>
    </AuthProvider>
  );
};

export default NotFound;
