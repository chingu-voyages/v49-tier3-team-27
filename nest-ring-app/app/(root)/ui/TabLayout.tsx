const TabLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className=" w-full md:h-[90%] max-md:h-full md:px-28 bg-slate-100 flex flex-row justify-between items-start">
      {/* Left side layout */}
      <div className=" max-md:hidden">Left layout</div>
      {/* children */}
      {children}
      {/* Right side layout */}
      <div className=" max-md:hidden">Right layout</div>
    </div>
  );
};

export default TabLayout;
