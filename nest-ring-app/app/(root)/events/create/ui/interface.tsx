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
  datePicked: null | Date;
  timePicked: null | Date;
}
