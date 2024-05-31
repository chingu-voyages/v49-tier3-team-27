"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const TabNavButton = ({
  tabName,
}: {
  tabName:
    | "community"
    | "events"
    | "order-meal"
    | "recipes"
    | "notifications"
    | "profile";
}) => {
  const pathname = usePathname();

  return (
    <Link
      replace
      href={`/${tabName}`}
      className={" flex flex-col items-center"}
    >
      {pathname.startsWith(`/${tabName}`) ? (
        <Image
          src={`/nav-icons/${tabName}-icon-active.svg`}
          alt={`${tabName} tab`}
          width={45}
          height={35}
          className=" w-auto h-auto"
        />
      ) : (
        <Image
          src={`/nav-icons/${tabName}-icon-inactive.svg`}
          alt={`${tabName} tab`}
          width={45}
          height={35}
          className=" w-auto h-auto"
        />
      )}
      <hr
        className={clsx({
          "w-full h-1 bg-figma-brown max-md:hidden mt-1": pathname.startsWith(
            `/${tabName}`
          ),
        })}
      />
    </Link>
  );
};

export default TabNavButton;
