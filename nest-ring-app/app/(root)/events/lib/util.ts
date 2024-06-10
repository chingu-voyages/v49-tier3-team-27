import Events from "@/lib/models/Events";
import dbConnect from "@/lib/mongo";

export const fetchEventSessions = async (userId: string | null = null) => {
  try {
    await dbConnect();

    let result = [];
    if (userId) {
      result = await Events.find({
        $or: [{ "creator.userId": userId }, { "invitedGuests.userId": userId }],
      });
    } else {
      result = await Events.find();
    }

    return result;
  } catch (error) {
    throw error;
  }
};
