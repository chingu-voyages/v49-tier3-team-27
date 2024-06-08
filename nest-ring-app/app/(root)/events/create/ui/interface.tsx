export interface Step1Type {
  category:
    | "birthday"
    | "dowry"
    | "fundraising"
    | "wedding"
    | "baby-shower"
    | "business"
    | "other";
  subject: string;
  description: string;
}

export interface Step2Type {
  imageFile: null | File;
  imageDataUrl: any;
  datePickedFrom: null | Date;
  datePickedTo: null | Date;
  timePickedFrom: string;
  timePickedTo: string;
  location: string;
}

export type EventUserType = {
  userId: string;
  imageUrl: string;
  name: string;
};
export interface Step3Type {
  invitedGuests: EventUserType[];
  isOpenToAll: boolean;
}
