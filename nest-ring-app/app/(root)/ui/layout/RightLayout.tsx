"use client";

import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import NotificationOverviewCard from "./NotificationOverviewCard";
import OrderAgainCard from "./OrderAgainCard";
import { signOut } from "next-auth/react";

const FooterLinks = () => {
  const router = useRouter();
  const links = [
    {
      name: "Privacy Policy",
      address: "/extras/privacy-policy",
    },
    {
      name: "Terms",
      address: "/extras/terms",
    },
    {
      name: "About Us",
      address: "/extras/about-us",
    },
    {
      name: "Developers",
      address: "/extras/developers",
    },
    {
      name: "Data Policy",
      address: "/extras/privacy-policy?section=data",
    },
    {
      name: "Advertising",
      address: "/extras/advertising",
    },
  ];
  return (
    <div className=" p-4 w-full max-w-[300px] flex flex-col items-center">
      <div className=" flex justify-center flex-wrap gap-4 font-bold ">
        {links.map((link) => (
          <Link
            key={`session-footer-${link.address}-${link.name}`}
            href={link.address}
            className=" underline hover:no-underline"
          >
            {link.name}
          </Link>
        ))}
      </div>
      <button
        aria-label="logout"
        aria-atomic
        onClick={() => {
          router.push("/home");
          setTimeout(() => {
            signOut();
          }, 1000);
        }}
      >
        <Image
          src={"/nav-icons/nest-ring-logo-footer.svg"}
          alt=""
          width={500}
          height={500}
          className=" w-auto h-auto"
        />
      </button>
    </div>
  );
};

const RightLayout = () => {
  const pathname = usePathname();

  return (
    <div className=" max-md:hidden w-[30%] sticky top-16">
      {/* notification overview card */}
      {(pathname.startsWith("/community") ||
        pathname.startsWith("/events")) && <NotificationOverviewCard />}

      {/* order again card */}
      {pathname.startsWith("/order-meal") && <OrderAgainCard />}

      {/* footer links */}
      {!pathname.startsWith("/profile") && <FooterLinks />}
    </div>
  );
};

export default RightLayout;
