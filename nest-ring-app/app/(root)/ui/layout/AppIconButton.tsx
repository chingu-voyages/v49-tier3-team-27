"use client";
import appLogo from "@/public/app-logo-png.png";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AppIconButton = () => {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => {
        router.push("/home");
        setTimeout(() => {
          signOut();
        }, 1000);
      }}
      aria-label="logout the session"
      aria-atomic
      className="w-[35px]"
    >
      <Image src={appLogo} alt="" aria-hidden width={32} height={39} />
    </button>
  );
};

export default AppIconButton;
