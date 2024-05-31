import React from "react";
import TabNavButton from "./TabNavButton";

const AppNavbarMobile = () => {
  return (
    <nav className=" md:hidden w-full h-[48px] fixed bottom-0 bg-white flex flex-row items-center justify-between px-2">
      <TabNavButton tabName="community" />
      <TabNavButton tabName="events" />
      <TabNavButton tabName="order-meal" />
      <TabNavButton tabName="recipes" />
      <TabNavButton tabName="notifications" />
      <TabNavButton tabName="profile" />
    </nav>
  );
};

export default AppNavbarMobile;
