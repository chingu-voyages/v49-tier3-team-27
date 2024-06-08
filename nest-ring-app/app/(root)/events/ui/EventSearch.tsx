import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchIcon } from "lucide-react"


const EventSearch = () => {
  return (
    <section className=" w-full bg-white rounded-lg p-3 flex max-sm:flex-col gap-2">
        <div className=" sm:flex sm:flex-row items-center gap-2">
            <label htmlFor="location-select-menu" className=" underline text-sm font-bold">Upcomming in: </label>
            <div className="w-[200px]">
            <Select>
                <SelectTrigger id="location-select-menu">
                    <SelectValue placeholder="Filter by Location" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Locations</SelectLabel>
                        <SelectItem value="kerugoya">Kerugoya</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            </div>
        </div>
        <div className=" grow relative flex items-center ">
        <Input
          placeholder="Search an event by subject or month"
          className=" pl-10 peer text-sm focus:outline-figma-brown"
        />
        <SearchIcon className=" absolute ml-3 text-gray-400 peer-focus:text-figma-brown" />
      </div>
    </section>
  )
}

export default EventSearch