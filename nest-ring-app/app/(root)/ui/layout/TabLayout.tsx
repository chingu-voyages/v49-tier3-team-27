import LeftLayout from "./LeftLayout";
import RightLayout from "./RightLayout";

const TabLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className=" pt-6 w-full h-full xl:px-28 lg:px-20 md:px-10 bg-slate-100 flex flex-row justify-between items-start gap-7 overflow-hidden">
      {/* Left side layout */}
      <LeftLayout />
      {/* children */}
      <div className=" h-full overflow-hidden">{children}</div>
      {/* Right side layout */}
      <RightLayout />
    </div>
  );
};

export default TabLayout;
