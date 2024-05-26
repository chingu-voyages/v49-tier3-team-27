import { Input } from "@/components/ui/input";
import TabNavButton from "./TabNavButton";
import AppIconButton from "./AppIconButton";

const AppNavbar = async () => {
  return (
    <section className="max-md:hidden w-full h-[48px] xl:px-28 lg:px-20 md:px-10 flex flex-row items-start justify-between sticky top-0 bg-white z-50 pt-1">
      <div className=" w-[40%] flex flex-row items-center xl:gap-[23px] gap-3">
        <AppIconButton />
        <Input
          id="global-search-bar"
          type="text"
          aria-label="Search Input; global app search."
          aria-atomic
          placeholder="Search"
          className=" grow max-w-[250px] focus:border-figma-brown focus-visible:border-2 transition-all duration-300 ease-linear"
        />
      </div>

      {/* Navigation links */}
      <nav className=" w-1/2 flex flex-row items-center justify-between">
        <TabNavButton tabName="community" />
        <TabNavButton tabName="events" />
        <TabNavButton tabName="order-meal" />
        <TabNavButton tabName="recipes" />
        <TabNavButton tabName="notifications" />
        <TabNavButton tabName="profile" />
      </nav>
    </section>
  );
};

export default AppNavbar;
