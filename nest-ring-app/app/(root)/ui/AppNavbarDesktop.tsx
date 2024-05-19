import { Input } from "@/components/ui/input";
import TabNavButton from "./TabNavButton";
import AppIconButton from "./AppIconButton";

const AppNavbar = async () => {
  return (
    <section className="max-md:hidden w-full h-[48px] px-28 flex flex-row items-center justify-between ">
      <div className=" flex flex-row items-center gap-[23px]">
        <AppIconButton />
        <Input
          id="global-search-bar"
          type="text"
          aria-label="Search Input; global app search."
          aria-atomic
          placeholder="Search"
          className=" focus:border-figma-brown focus-visible:border-2 transition-all duration-300 ease-linear"
        />
      </div>

      {/* Navigation links */}
      <nav className=" flex flex-row items-center gap-16">
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
