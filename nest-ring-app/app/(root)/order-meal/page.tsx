import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DeliveryMenu from "./ui/DeliveryMenu";
import EventsMenu from "./ui/EventsMenu";
import SearchCartBar from "./ui/SearchCartBar";

const page = () => {
  return (
    <main className=" bg-white w-full h-full p-2 md:pr-4 pb-0 flex flex-col gap-6 md:rounded-t-lg">
      <SearchCartBar />
      <Tabs
        defaultValue="delivery-menu"
        className="w-full h-full overflow-hidden overflow-y-auto relative"
      >
        <TabsList className=" sticky top-0 w-full rounded-none bg-white flex items-center justify-start">
          <TabsTrigger value="events-menu">Events Menu</TabsTrigger>
          <TabsTrigger value="delivery-menu">Delivery Menu</TabsTrigger>
        </TabsList>
        <TabsContent value="events-menu" className="w-full h-full">
          <EventsMenu />
        </TabsContent>
        <TabsContent
          value="delivery-menu"
          className="w-full overflow-hidden overflow-y-auto"
        >
          <DeliveryMenu />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default page;
