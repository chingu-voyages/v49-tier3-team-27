"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import appLogo from "@/public/app-logo-png.png";
import Image from "next/image";

const AppIconButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        await signOut();
        router.push("/home");
      }}
    >
      <Image src={appLogo} alt="" aria-hidden width={32} height={39} />
    </button>
  );
};

export default AppIconButton;
