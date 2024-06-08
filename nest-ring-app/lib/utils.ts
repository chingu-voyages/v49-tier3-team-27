import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function tryParseJSON(jsonString: string) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return jsonString;
  }
}

/* form data */
export function parseEventFormData(formData: FormData) {
  const formDataObject: { [key: string]: any } = {};
  formData.forEach((val, key) => {
    formDataObject[key] = typeof val === "string" ? tryParseJSON(val) : val;
  });
  return formDataObject;
}