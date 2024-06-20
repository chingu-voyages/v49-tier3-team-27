"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { insertFoodToDb, insertEventMenuToDb } from "../lib/utils";
import { useFormState } from "react-dom";

export const InsertToMenuDBBtn = () => {
  const [message, dispatch] = useFormState(insertFoodToDb, undefined);
  return (
    <form action={dispatch}>
      {message ?? ""}
      <Button type="submit">Insert To DB</Button>
    </form>
  );
};

export const InsertToEventDBBtn = () => {
  const [message, dispatch] = useFormState(insertEventMenuToDb, undefined);
  return (
    <form action={dispatch}>
      {message ?? ""}
      <Button type="submit">Insert To DB</Button>
    </form>
  );
};


