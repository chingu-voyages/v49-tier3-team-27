import AppNavbarDesktop from "./ui/AppNavbarDesktop";
import AppNavbarMobile from "./ui/AppNavbarMobile";
import TabLayout from "./ui/TabLayout";

export default function RootAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-white h-screen max-md:h-[80vh] relative">
      {/* AppNavbar */}
      <AppNavbarDesktop />
      {/* TabLayout */}
      <TabLayout>{children}</TabLayout>
      <AppNavbarMobile />
    </div>
  );
}
