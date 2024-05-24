"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { ProfileUpdateContextProvider } from "../layout/profile-update/ProfileUpdateContext";
import ProfileUpdate from "../layout/profile-update/ProfileUpdate";

const Provider = ({
  children,
  session,
}: {
  children: ReactNode;
  session?: Session;
}) => {
  return (
    <SessionProvider session={session}>
      <ProfileUpdateContextProvider>
        <ProfileUpdate hideTrigger />
        {children}
      </ProfileUpdateContextProvider>
    </SessionProvider>
  );
};

export default Provider;
