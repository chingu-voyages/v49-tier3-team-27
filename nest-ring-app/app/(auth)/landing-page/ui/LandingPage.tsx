import heroBgVector from "./landing-page-assets/hero-bg-vector.svg";
import welcomeSectionInfo from "./landing-page-assets/welcome-info-section.svg";
import sectionImageOrderMeal from "./landing-page-assets/section-image-order-meal.svg";
import timelinePath from "./landing-page-assets/timeline-path.svg";
import dineInSection from "./landing-page-assets/dine in section.svg";
import eventSectionMessage from "./landing-page-assets/event-section-message.svg";
import eventNavButton from "./landing-page-assets/event-navigation-button.svg";
import eventSectionImages from "./landing-page-assets/event-section-images.svg";
import recipeSectionImages from "./landing-page-assets/receipe-section-images.svg";
import recipeSectionMessage from "./landing-page-assets/recipe-section-message.svg";
import recipeNavButton from "./landing-page-assets/browse-receipe-button.svg";
import communitySectionMessage from "./landing-page-assets/community-section-message.svg";
import communityNavButton from "./landing-page-assets/community-nav-button.svg";
import Footer from "./Footer";
import Image from "next/image";
import Link from "next/link";

const nav_links = [
  {
    name: "Community",
    address: "community",
  },
  {
    name: "Events",
    address: "events",
  },
  {
    name: "Order",
    address: "order-meals",
  },
  {
    name: "Recipes",
    address: "recipes",
  },
];

const LandingPage = () => {
  return (
    <main className="w-full">
      {/* hero section */}
      <div className="relative">
        <div className=" max-sm:hidden absolute top-14 right-20 text-white font-semibold lg:text-4xl text-lg max-sm:text-2xl flex flex-row items-center gap-7">
          {nav_links.map((link) => (
            <a
              key={`${link.address}-${link.name}`}
              href={link.address}
              className=" hover:underline underline-offset-8 hover:text-figma-orange duration-150 ease-in"
            >
              {link.name}
            </a>
          ))}
        </div>
        <Image
          src={heroBgVector}
          alt=""
          width={1400}
          height={1000}
          className=" w-full h-auto"
        />
        <div className=" absolute lg:right-[15%] md:right-[10%] right-[5%] top-[50%] text-white font-bold md:text-3xl text-lg max-sm:text-sm flex sm:gap-3 gap-1 md:items-center max-sm:flex-col">
          <Link
            href="http://localhost:3000/signup"
            className=" max-sm:w-[100px] bg-interactive-green rounded-md md:h-14 sm:px-6 md:pt-2 text-center hover:scale-105 transition-transform duration-300 ease-linear"
          >
            Get Started
          </Link>
          <Link
            href="http://localhost:3000/login"
            className=" max-sm:w-[100px] bg-interactive-green rounded-md md:h-14 sm:px-6 md:pt-2 text-center hover:scale-105 transition-transform duration-300 ease-linear"
          >
            Login
          </Link>
        </div>
      </div>
      {/* Invite message */}
      <div>
        <Image src={welcomeSectionInfo} alt="" width={1400} height={1000} />
      </div>
      {/* app features */}
      <div className=" w-full relative flex flex-col px-20 max-lg:px-10 max-sm:px-5">
        {/* timeline path */}
        <Image
          src={timelinePath}
          alt=""
          width={1400}
          height={1000}
          className=" absolute top-0 -z-40 max-sm:hidden w-[90vw] h-auto"
        />

        {/* Order meal section */}
        <section className="w-full xl:h-[500px] -z-50 relative bg-figma-orange p-5 sm:pl-20 rounded-3xl flex sm:flex-row flex-col">
          <div className=" xl:mt-[100px] sm:mt-[10%] text-white flex flex-col gap-3 xl:ml-20 lg:ml-16 sm:ml-[6%] ">
            <h3 className=" lg:text-3xl sm:text-xl font-semibold">
              Food Delivery Near you.
            </h3>
            <p className=" xl:text-2xl lg:text-xl md:text-lg font-normal md:mt-[34px] 2xl:w-1/2 xl:w-[450px] sm:w-1/2 ">
              Order from our Menu, fresh from the kitchen, and get your meal
              delivered to you on time, well packed, ready for you to enjoy to
              your satisfaction. Delivery at minimal delivery fee.
            </p>

            <Link
              href="http://localhost:3000/signup"
              className="w-[155px] bg-white rounded-md px-2 py-3 hover:scale-105 transition-transform duration-300 ease-linear text-lg font-bold"
            >
              <span className="w-full bg-interactive-green p-2 px-5 rounded-lg">
                Order Now
              </span>
            </Link>
          </div>
          <Image
            src={sectionImageOrderMeal}
            alt=""
            width={400}
            height={800}
            className=" sm:absolute lg:top-8 sm:top-5 lg:right-8 sm:right-5 xl:w-[400px] lg:w-80 sm:w-64 max-sm:mt-7 w-auto h-auto"
          />
        </section>

        {/* Dine in section */}
        <div className="relative md:ml-[14%] sm:ml-24 lg:mt-[27%] md:mt-[21%] sm:mt-[11%] mt-10 pr-5 ">
          <Image src={dineInSection} alt="" width={1400} height={1000} />
          <Link
            href="http://localhost:3000/signup"
            className=" xl:w-[400px] lg:w-[300px] md:w-[270px] max-sm:w-[120px] border-4 max-sm:border-2 border-interactive-green rounded-md md:h-14 sm:px-6 md:pt-2 text-center hover:scale-105 transition-transform duration-300 ease-linear bg-transparent absolute right-[8%] bottom-[14%] text-white sm:font-bold font-semibold md:text-2xl sm:text-xl text-sm"
          >
            Get Our Location
          </Link>
        </div>

        {/* Events section */}
        <div className="lg:pt-44 md:pt-32 sm:pt-48 pt-20  flex flex-row items-center gap-5">
          <div className=" w-1/2 flex flex-col gap-3">
            <Image
              src={eventSectionMessage}
              alt=""
              width={1400}
              height={1000}
            />
            <Link href="http://localhost:3000/events">
              <Image src={eventNavButton} alt="" width={300} height={300} />
            </Link>
          </div>
          <Image
            src={eventSectionImages}
            alt=""
            width={1400}
            height={1000}
            className=" lg:w-1/2 w-[40%] h-auto"
          />
        </div>

        {/* Recipes section */}
        <div className="flex flex-row items-center gap-5">
          <Image
            src={recipeSectionImages}
            alt=""
            width={1400}
            height={1000}
            className=" w-[40%] h-auto"
          />
          <div className=" md:mt-36 md:w-[35%] w-1/2 flex flex-col gap-3">
            <Image
              src={recipeSectionMessage}
              alt=""
              width={1400}
              height={1000}
            />
            <Link href="http://localhost:3000/events">
              <Image src={recipeNavButton} alt="" width={300} height={300} />
            </Link>
          </div>
        </div>

        {/* Community section  */}
        <div className=" relative lg:mt-60 sm:mt-40 mt-10">
          <Image
            src={communitySectionMessage}
            alt=""
            width={1400}
            height={1000}
          />
          <Link href="http://localhost:3000/community">
            <Image
              src={communityNavButton}
              alt=""
              width={400}
              height={400}
              className=" absolute left-20 bottom-[20%] w-1/4 hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default LandingPage;
