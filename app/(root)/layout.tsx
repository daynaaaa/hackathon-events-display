import { AuthProvider } from "../_context/AuthContext";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <main>{children}</main>
        </body>
      </html>
    </AuthProvider>
  );
};

export default DashboardLayout;
