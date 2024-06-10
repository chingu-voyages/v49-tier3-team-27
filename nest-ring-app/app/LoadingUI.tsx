import Image from "next/image";

export default function LoadingUI() {
  return (
    <main className=" w-full flex items-center justify-center">
      <Image
        src={"/app-logo-png.png"}
        alt="Welcome to Nestring Hotel Website."
        width={1400}
        height={1000}
        loading="lazy"
        className=" w-[100px] h-[130px] animate-bounce ease-in-out repeat-infinite duration-1000"
      />
    </main>
  );
}
