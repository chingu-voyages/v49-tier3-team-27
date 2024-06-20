import { Button } from "@/components/ui/button";
import { CheckCircle2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

const Success = () => {
  const router = useRouter();
  return (
    <section className="w-full flex flex-col items-center justify-center gap-2">
      <span className="text-lg font-bold font-mono">
        New Event Created Successfuly
      </span>
      <CheckCircle2Icon />

      <Button
        onClick={() => {
          window.location.reload();
          router.push("/events");
        }}
        className=" bg-interactive-green hover:bg-interactive-green text-white hover:bg-opacity-80 transition-colors duration-300"
      >
        Dismiss
      </Button>
    </section>
  );
};

export default Success;
