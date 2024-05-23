"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { ProfileUpdateContextProvider } from "../layout/profile-update/ProfileUpdateContext";

const Provider = ({
  children,
  session,
}: {
  children: ReactNode;
  session?: Session;
}) => {
  return (
    <SessionProvider session={session}>
      <ProfileUpdateContextProvider>{children}</ProfileUpdateContextProvider>
    </SessionProvider>
  );
};

export default Provider;
