import React, { ReactNode } from "react";
import { EventsTabContextProvider } from "./ui/EventsTabContext";

const layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return <EventsTabContextProvider>{children}</EventsTabContextProvider>;
};

export default layout;
