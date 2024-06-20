"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreateEventContext } from "../CreateEventContext";
import { useContext } from "react";

const formSchema = z.object({
  category: z.string({
    required_error: "Please Select an Event Category",
  }),
  subject: z
    .string()
    .min(5, {
      message: "Please enter a subject. 5 characters or more",
    })
    .max(70, {
      message: "Subject must be 70 characters or less",
    }),
  description: z
    .string()
    .min(15, {
      message: "Please enter a description. 15 characters or more",
    })
    .max(500, {
      message: "Description must be 500 characters or less",
    }),
});

/* 1. Category, Subject, Description */
const Step1 = () => {
  const { step1Values, updateStep1Values, updateActiveStep } =
    useContext(CreateEventContext);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: step1Values.category,
      subject: step1Values.subject,
      description: step1Values.description,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    updateStep1Values({
      category: data.category as any,
      subject: data.subject,
      description: data.description,
    });
    updateActiveStep("step_2");
  };

  return (
    <section className="w-full flex flex-col gap-4 p-5">
      {/* Introductory message */}
      <h1 className="text-xl font-semibold font-serif text-figma-brown">
        Event Category, Subject and Description:
      </h1>
      <h2 className="text-sm">
        Tell us more about your event. Choose a category, What subject should
        your event express, and breifly describe the events details.
      </h2>
      {/* Category dropdown select menu */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col"
        >
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent id="create-event-select-category-dropdown-menu">
                    <SelectGroup>
                      <SelectLabel>Event Categories</SelectLabel>
                      <SelectItem value="dowry">Dowry</SelectItem>
                      <SelectItem value="wedding">Wedding</SelectItem>
                      <SelectItem value="birthday">Birthday</SelectItem>
                      <SelectItem value="baby-shower">Baby Shower</SelectItem>
                      <SelectItem value="fundraising">Fundraising</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormDescription>
                  What Type of Event Do you want to Create
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input
                    id="events-create-step_1-input-subject"
                    placeholder="Enter Subject..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    id="events-create-step_1-textarea-description"
                    placeholder="Enter Description..."
                    className="max-h-[180px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            aria-live="polite"
            className=" bg-interactive-green hover:bg-interactive-green text-white hover:bg-opacity-80 self-end"
          >
            Next
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default Step1;
