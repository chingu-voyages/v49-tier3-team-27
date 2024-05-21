import LeftLayout from "./LeftLayout";
import RightLayout from "./RightLayout";

const TabLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className=" w-full md:h-[90%] max-md:h-full xl:px-28 lg:px-20 md:px-10 bg-slate-100 flex flex-row justify-between items-start">
      {/* Left side layout */}
      <LeftLayout />
      {/* children */}
      {children}
      {/* Right side layout */}
      <RightLayout />
    </div>
  );
};

export default TabLayout;
