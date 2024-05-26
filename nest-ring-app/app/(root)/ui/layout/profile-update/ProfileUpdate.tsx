"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Sidebar from "./Sidebar";
import ActiveTab from "./ActiveTab";
import { useContext, useState } from "react";
import { ProfileUpdateContext } from "./ProfileUpdateContext";
import clsx from "clsx";
import Consent from "./steps/Consent";

/*
 1. Appearance: - Update Users Profile avatar
                - Update Users Profile banner
 2. Personal Details - Update Names (first, middle and last)
                     - Description
                     - Date of Birth
3. More - User Role (customer, admin, customer support)
        - Input for auth_token
        - Location (dropdown of location) - state, county, town
         - Delivery Address (a descriptive string)
 4. Confirm - email address
            - password
*/

const ProfileUpdate = ({
  showByDefault = false,
  hideTrigger = true,
}: Readonly<{ showByDefault: boolean; hideTrigger?: boolean }>) => {
  const { profileUpdateComplete, consentConclude } =
    useContext(ProfileUpdateContext);
  const { data } = useSession() as any;

  return (
    <Dialog defaultOpen={showByDefault && !profileUpdateComplete}>
      <DialogTrigger
        id="update-profile-trigger"
        className={`${hideTrigger ? "hidden" : "block"}`}
      >
        <Image
          src={data?.user?.avatarUrl || "/random-images/profile-avatar.png"}
          alt=""
          width={1400}
          height={1000}
          className=" w-[8vw] h-[8vw] rounded-full bg-white"
        />
      </DialogTrigger>
      <DialogContent className={clsx(" w-full md:h-[80%] h-full bg-white")}>
        {consentConclude.consent && !consentConclude.conclude ? (
          <div className=" flex flex-col gap-1">
            <Sidebar />
            <ActiveTab />
          </div>
        ) : (
          <Consent />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProfileUpdate;
