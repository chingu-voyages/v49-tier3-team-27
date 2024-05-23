"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { useContext } from "react";
import { ProfileUpdateContext } from "../ProfileUpdateContext";

const formSchema = z.object({
  firstname: z.string().min(2, {
    message: "minimum 2 characters.",
  }),
  middlename: z.string().min(2, {
    message: "minimum 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "minimum 2 characters.",
  }),
  description: z
    .string()
    .min(2, {
      message: "Your Description must be at least 2 characters.",
    })
    .max(80, {
      message: "Your Description must not exceed 80 characters.",
    }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});
/*
 2. Personal Details - Update Names (first, middle and last)
                     - Description
                     - Date of Birth
                     - Location (dropdown of location) - state, county, town
*/
const PersonalInfo = () => {
  const { activeStep, updateActiveStep, personalInfo, updatePersonalInfo } =
    useContext(ProfileUpdateContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: personalInfo.firstname ?? "",
      middlename: personalInfo.middlename ?? "",
      lastname: personalInfo.lastname ?? "",
      description: personalInfo.description ?? "",
      dob: personalInfo.dob ?? new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    updatePersonalInfo({
      ...personalInfo,
      firstname: values.firstname,
      middlename: values.middlename,
      lastname: values.lastname,
      dob: values.dob,
      description: values.description,
    });
    updateActiveStep(activeStep + 1);
  }
  return (
    <section className="w-full h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
          <div className=" flex flex-row items-center gap-2">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="First name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="middlename"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle name</FormLabel>
                  <FormControl>
                    <Input placeholder="Middle name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row items-center gap-2">
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className=" flex flex-col mt-2 gap-1">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={clsx(
                            "w-full sm:w-[250px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        showOutsideDays={false}
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Describe yourself</FormLabel>
                <FormControl>
                  <Input placeholder="Description..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className=" flex flex-row gap-2 pt-5">
            <Button
              type="button"
              onClick={() => {
                updateActiveStep(activeStep - 1);
              }}
              className=" border-2 border-interactive-green bg-transparent hover:bg-transparent text-interactive-green hover:scale-95"
            >
              Back
            </Button>
            <Button
              type="submit"
              className=" bg-interactive-green hover:bg-interactive-green hover:scale-110"
            >
              Next
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default PersonalInfo;
