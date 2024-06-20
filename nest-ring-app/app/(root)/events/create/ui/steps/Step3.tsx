"use client";
import { z } from "zod";
import { useContext, useEffect, useState } from "react";
import AsyncSelect from "react-select";
import { CreateEventContext } from "../CreateEventContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { EventUserType } from "../interface";
import { Eraser } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import clsx from "clsx";

const DropDownUser = ({
  containerKey,
  imageUrl,
  usersName,
}: Readonly<{
  containerKey: string;
  imageUrl: string | null;
  usersName: string;
}>) => {
  return (
    <div key={containerKey} className="w-full flex flex-row items-center gap-3">
      <Image
        src={imageUrl || "/random-images/profile-avatar.png"}
        alt=""
        width={20}
        height={20}
        className="rounded-full "
      />
      <span className=" text-md">{usersName}</span>
    </div>
  );
};

const formSchema = z.object({
  monetization: z.string({
    required_error: "Please whether to monetizatize or not",
  }),
  amount: z.string(),
});

/* 3. Invite guests */
const Step3 = () => {
  const { step3Values, updateStep3Values, updateActiveStep } =
    useContext(CreateEventContext);
  const [foundUserObjs, setFoundUserObjs] = useState<EventUserType[]>([]);
  const [loadingOptions, setLoadingOptions] = useState<any>([]);
  const [keyword, setKeyword] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monetization: step3Values.monetization.type,
      amount: String(step3Values.monetization.amount),
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    updateStep3Values({
      ...step3Values,
      monetization: {
        type: step3Values.monetization.type,
        amount: Number(data.amount) || 0,
      },
    });
    updateActiveStep("step_4");
  };

  const fetchUserObj = async (name: string) => {
    try {
      const response = await fetch(
        `/api/events/create/filter-guests?name=${name}`
      );

      if (response.status === 200) {
        const userObjs = (await response.json()) as EventUserType[];
        setFoundUserObjs([...userObjs]);
      } else {
        toast({
          title: "Alert!",
          description: "Internal System Error. Contact System Develovpers.",
        });
      }
    } catch (error) {
      console.error("Create Event Tab Error: Failed to fetch users", error);
      toast({
        title: "Guest Lookup Failed!",
        description: "Your Disconnected from the Internet.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const options = foundUserObjs.map((user) => ({
      value: user.userId,
      label: (
        <DropDownUser
          containerKey={user.userId}
          imageUrl={user.imageUrl}
          usersName={user.name}
        />
      ),
    }));

    setLoadingOptions(options);
  }, [foundUserObjs]);

  useEffect(() => {
    const debounce = setTimeout(() => fetchUserObj(keyword), 700);
    return () => clearTimeout(debounce);
  }, [keyword]);

  return (
    <section className="w-full flex flex-col gap-4 p-5">
      {/* Introductory message */}
      <h1 className="text-xl font-semibold font-serif text-figma-brown">
        Invitations and Monetization,
      </h1>

      {/* Invite the guests */}
      <div className="flex flex-col gap-1">
        <div className=" flex flex-row max-sm:flex-col sm:justify-between sm:items-center">
          <span className="text-md">
            Search a person&apos;s name to add them as your guest. They&apos;ll
            be notified.
          </span>
          <Button
            variant={"ghost"}
            disabled={step3Values.isOpenToAll}
            className="border  hover:underline"
            onClick={() => {
              updateStep3Values({
                ...step3Values,
                isOpenToAll: true,
              });
            }}
          >
            {step3Values.isOpenToAll ? "Everyone is Invited" : "Invite All"}
          </Button>
        </div>
        <AsyncSelect
          placeholder="Search your guest's name here..."
          // loadingMessage={({ inputValue }) => (
          //   <span>Searching... {inputValue}</span>
          // )}
          onInputChange={(newValue) => {
            console.log(newValue);
            setKeyword(newValue);
          }}
          options={loadingOptions}
          onChange={(event: any) => {
            const selectedGuest = foundUserObjs.find(
              (obj) => obj.userId == event.value
            );
            const userInvited = step3Values.invitedGuests.find(
              (guest) => guest.userId == event.value
            );
            if (selectedGuest && !userInvited) {
              updateStep3Values({
                ...step3Values,
                invitedGuests: [...step3Values.invitedGuests, selectedGuest],
              });
            } else if (userInvited) {
              toast({
                title: "Wait, mmh!",
                description: (
                  <span>
                    <span className="font-bold">{userInvited.name}</span> is
                    already on your guest list.
                  </span>
                ),
                variant: "destructive",
                duration: 5000,
              });
            }
          }}
        />
        {/* selected guests */}
        <div className=" w-full border rounded-lg p-3 flex flex-col gap-2 mt-3 max-h-[300px] overflow-hidden overflow-y-auto">
          {step3Values.isOpenToAll ? (
            <div className="flex flex-row items-center justify-between">
              <span className="text-md font-bold text-center">Invited All</span>
              <button
                className="flex flex-row items-center justify-center gap-1 border border-destructive p-2 rounded-md text-destructive hover:bg-destructive hover:text-white transition-colors duration-300"
                onClick={() => {
                  updateStep3Values({
                    ...step3Values,
                    isOpenToAll: false,
                  });

                  toast({
                    title: "Done!",
                    description: "Removed the Invitation to All",
                    variant: "destructive",
                  });
                }}
              >
                <span>Cancel Invite</span> <Eraser />
              </button>
            </div>
          ) : (
            step3Values.invitedGuests.map((guest) => (
              <div
                key={guest.userId}
                className=" w-full flex flex-row items-center justify-between border rounded-md p-2 bg-slate-100"
              >
                <div className=" flex flex-row items-center gap-3">
                  <Image
                    src={guest.imageUrl || "/random-images/profile-avatar.png"}
                    alt=""
                    width={25}
                    height={25}
                    className=" rounded-full object-cover"
                  />
                  <span className=" text-sm font-mono">{guest.name}</span>
                </div>
                <Button
                  variant={"destructive"}
                  className="p-1"
                  aria-label="remove person from guest list"
                  aria-atomic
                  onClick={() => {
                    const remainingGuests = step3Values.invitedGuests.filter(
                      (user) => user.userId != guest.userId
                    );

                    updateStep3Values({
                      ...step3Values,
                      invitedGuests: [...remainingGuests],
                    });

                    toast({
                      title: "Done!",
                      description: `${guest.name} has been Removed from the Guest List.`,
                      variant: "destructive",
                    });
                  }}
                >
                  <Eraser width={20} height={18} />
                </Button>
              </div>
            ))
          )}
          {step3Values.invitedGuests.length < 1 && !step3Values.isOpenToAll && (
            <span className="text-md font-bold text-center">
              No Guests invited.
            </span>
          )}
        </div>
      </div>

      {/* Monetization */}
      <div className="flex flex-col gap-1">
        <span className="text-md">
          How would you like to monetize your event?
        </span>

        {/* Monetization select */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="monetization"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={(value: string) => {
                      field.onChange(value);
                      updateStep3Values({
                        ...step3Values,
                        monetization: {
                          ...step3Values.monetization,
                          type: value,
                        },
                      });
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select here..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="contribution">
                        I want the guests to optionally contribute
                      </SelectItem>
                      <SelectItem value="fee">
                        I want to charge an attendance fee to the guests
                      </SelectItem>
                      <SelectItem value="off">
                        I don&apos;t want to monetize my event
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem
                  className={clsx({
                    hidden:
                      step3Values.monetization.type == "off" ||
                      step3Values.monetization.type == "",
                  })}
                >
                  <FormLabel>Enter Amount:</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder={
                        step3Values.monetization.type == "fee"
                          ? "How much is the for the attendance fee?"
                          : "How much should each guest contribute?"
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Navigation buttons */}
            <Button
              type="button"
              onClick={() => updateActiveStep("step_2")}
              className=" bg-interactive-green hover:bg-interactive-green text-white hover:bg-opacity-80 self-start  justify-self-end"
            >
              Back
            </Button>
            <Button
              type="submit"
              className=" bg-interactive-green hover:bg-interactive-green text-white hover:bg-opacity-80 self-end"
            >
              Next
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default Step3;
