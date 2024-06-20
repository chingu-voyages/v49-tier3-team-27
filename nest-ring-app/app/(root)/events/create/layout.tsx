import React, { ReactNode } from "react";
import CreateEventContextProvider from "./ui/CreateEventContext";

const CreateEventLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return <CreateEventContextProvider>{children}</CreateEventContextProvider>;
};

export default CreateEventLayout;
