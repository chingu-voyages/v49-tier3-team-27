"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Sidebar from "./Sidebar";
import ActiveTab from "./ActiveTab";

/*
 1. Appearance: - Update Users Profile avatar
                - Update Users Profile banner
 2. Personal Details - Update Names (first, middle and last)
                     - Description
                     - Date of Birth
                     - Location (dropdown of location) - state, county, town
 3. More - User Role (customer, admin, customer support)
         - Input for auth_token
         - Delivery Address (a descriptive string)
 4. Confirm - email address
            - password
*/

const ProfileUpdate = ({
  hideTrigger = true,
}: Readonly<{ hideTrigger?: boolean }>) => {
  const { data } = useSession() as any;

  return (
    <Dialog defaultOpen={!data?.user?.isProfileComplete}>
      <DialogTrigger
        id="update-profile-trigger"
        className={`${hideTrigger ? "hidden" : "block"}`}
      >
        <Image
          src={data?.user?.avatarURL || "/random-images/profile-avatar.png"}
          alt=""
          width={1400}
          height={1000}
          className=" w-[8vw] h-[8vw] rounded-full bg-white"
        />
      </DialogTrigger>
      <DialogContent className=" w-full md:h-[80%] h-full bg-white">
        <div className=" flex flex-col gap-1">
          <Sidebar />
          <ActiveTab />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileUpdate;
