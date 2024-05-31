"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { insertFoodToDb } from "../lib/utils";
import { useFormState } from "react-dom";

const InsertToMenuDBBtn = () => {
  const [message, dispatch] = useFormState(insertFoodToDb, undefined);
  return (
    <form action={dispatch}>
      {message ?? ""}
      <Button type="submit">Insert To DB</Button>
    </form>
  );
};

export default InsertToMenuDBBtn;
