type EventUserType = {
  userId: string;
  name: string;
  imageUrl: string | null;
};

type MonetizationType = {
  type: "contribution" | "fee" | "off";
  amount: number | null;
};
export interface EventsObjType {
  eventId: string;
  subject: string;
  description: string;
  category:
    | "birthday"
    | "dowry"
    | "wedding"
    | "fundrasing"
    | "baby-shower"
    | "business"
    | "other";
  creator: EventUserType;
  createdAt: null | Date;
  updatedAt: null | Date;
  location: number[];
  imageUrl: null | string;
  eventDate: null | Date;
  likeCount: number;
  monetization: MonetizationType;
  invitedGuests: EventUserType[];
  isOpenToAll: boolean;
  eventDishes: string[];
}
