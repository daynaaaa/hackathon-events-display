"use client";
import Header from "../_components/header";
import { AuthProvider } from "../_context/AuthContext";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <AuthProvider>
      <div className="bg-sky-50 font-sans min-h-screen">
        <Header />
        <main className="pt-30 pb-10">{children}</main>
      </div>
    </AuthProvider>
  );
};

export default Layout;
