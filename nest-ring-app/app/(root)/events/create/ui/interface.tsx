export interface Step1Type {
  category: string;
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
type MonetizationType = {
  type: string;
  amount: number;
};
export interface Step3Type {
  invitedGuests: EventUserType[];
  isOpenToAll: boolean;
  monetization: MonetizationType;
}
