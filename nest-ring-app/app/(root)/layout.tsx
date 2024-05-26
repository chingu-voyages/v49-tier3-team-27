import AppNavbarDesktop from "./ui/layout/AppNavbarDesktop";
import AppNavbarMobile from "./ui/layout/AppNavbarMobile";
import Provider from "./ui/next-auth-client/Provider";
import TabLayout from "./ui/layout/TabLayout";

export default function RootAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" h-screen max-md:h-[80vh] relative overflow-hidden">
      <Provider>
        {/* AppNavbar */}
        <AppNavbarDesktop />
        {/* TabLayout */}
        <TabLayout>{children}</TabLayout>
        <AppNavbarMobile />
      </Provider>
    </div>
  );
}
