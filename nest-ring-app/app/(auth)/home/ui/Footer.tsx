import nestringLogo from "./landing-page-assets/nest-ring-logo-named.svg";
import appleButton from "./landing-page-assets/download-app-apple.svg";
import googleButton from "./landing-page-assets/download-app-google.svg";

import twitterIcon from "./landing-page-assets/twitter-icon.svg";
import facebookICon from "./landing-page-assets/facebook-icon.svg";
import gmailIcon from "./landing-page-assets/gmail-icon.svg";
import instagramIcon from "./landing-page-assets/instagram-icon.svg";

import Image from "next/image";
import Link from "next/link";

const links_v1 = [
  {
    name: "Get Started",
    address: "signup",
  },
  {
    name: "Customer Support",
    address: "customer-support",
  },
  {
    name: "After Sales",
    address: "customer-support/after-sales",
  },
  {
    name: "Manage Your User Data",
    address: "profile",
  },
  {
    name: "Cuisine Community",
    address: "community",
  },
  {
    name: "Recipes",
    address: "recipes",
  },
  {
    name: "Our Location",
    address: "nestring-location",
  },
  {
    name: "About Us",
    address: "extras/about-us",
  },
  {
    name: "FAQ",
    address: "extras/FAQ",
  },
  {
    name: "Developed By",
    address: "extras/developers",
  },
];

const social_links = [
  {
    icon: twitterIcon,
    address: "https://twitter.com/nest-ring",
  },
  {
    icon: facebookICon,
    address: "https://facebook.com/nest-ring",
  },
  {
    icon: gmailIcon,
    address: "mailto:waruimkinyua@gmail.com",
  },
  {
    icon: instagramIcon,
    address: "https://instagram.com/nest-ring",
  },
];

const link_v2 = [
  {
    name: "Privacy Policy",
    address: "extras/privacy-policy",
  },
  {
    name: "Terms",
    address: "extras/terms",
  },
  {
    name: "Do not sell or share my personal information",
    address: "extras/profile/data-sharing",
  },
];
const Footer = () => {
  return (
    <section className=" w-full bg-figma-brown md:h-[90vh] mt-20 md:px-14 p-5 flex flex-col justify-between max-sm:gap-5">
      <div className=" flex sm:flex-row flex-col sm:justify-between mr-10">
        <Image
          src={nestringLogo}
          alt=""
          width={100}
          height={100}
          className=" sm:w-1/4 w-1/2 h-auto"
        />
        <div className="text-white flex sm:flex-row flex-col gap-6 md:gap-20 mt-10">
          <div className=" flex flex-col gap-1">
            {links_v1.map(
              (link, index) =>
                index < 4 && (
                  <Link
                    key={link.name}
                    href={link.address}
                    target="_blank"
                    className=" hover:underline hover:underline-offset-8 hover:text-figma-orange transition-colors duration-150 ease-in"
                  >
                    {link.name}
                  </Link>
                )
            )}
          </div>
          <div className=" flex flex-col gap-1">
            {links_v1.map(
              (link, index) =>
                index > 4 && (
                  <Link
                    key={link.name}
                    href={link.address}
                    target="_blank"
                    className=" hover:underline hover:underline-offset-8 hover:text-figma-orange transition-colors duration-150 ease-in"
                  >
                    {link.name}
                  </Link>
                )
            )}
          </div>
        </div>
      </div>

      <div className=" flex flex-col gap-3">
        <div className=" flex flex-row max-sm:flex-col gap-3">
          <a
            href="https://google.com/search?q=nestring+app+iphone"
            target="_blank"
          >
            <Image src={appleButton} alt="" width={100} height={50} />
          </a>
          <a
            href="https://google.com/search?q=nestring+app+playstore"
            target="_blank"
          >
            <Image src={googleButton} alt="" width={100} height={50} />
          </a>
        </div>

        <hr className=" w-full h-[2px] " />

        <div>
          <div className=" mt-1 flex md:flex-row flex-col gap-3 md:justify-between">
            <div className=" flex flex-row gap-4">
              {social_links.map((link) => (
                <Link key={link.address} href={link.address} target="_blank">
                  <Image src={link.icon} alt="" width={26} height={26} />
                </Link>
              ))}
            </div>
            <div className=" flex md:flex-row md:gap-4 sm:gap-1 flex-col ">
              {link_v2.map((link) => (
                <Link
                  key={link.address}
                  href={link.address}
                  className=" hover:underline hover:underline-offset-8 text-white text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-row justify-end">
            <span className=" text-white">
              &copy; {new Date().getFullYear()} Nest-Ring Hotel
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
