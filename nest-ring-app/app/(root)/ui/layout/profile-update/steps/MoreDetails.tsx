"use client";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useContext, useEffect, useState } from "react";
import { ProfileUpdateContext } from "../ProfileUpdateContext";
import { City, Country, State } from "country-state-city";
import Select from "react-select";

/*
3. More - User Role (customer, admin, customer support)
        - Input for auth_token
        - Delivery Address (a descriptive string)
        - Location (dropdown of location) - state, county, town
*/

type TimeZoneType = {
  abbreviation: string;
  gmtOffset: number;
  gmtOffsetName: string;
  tzName: string;
  zoneName: string;
};

type CountryType = {
  currency: string;
  flag: string;
  isoCode: string;
  latitude: string;
  longitude: string;
  name: string;
  phonecode: string;
  timezones: TimeZoneType[];
};

const MoreDetails = () => {
  const { activeStep, updateActiveStep, moreDetails, updateMoreDetails } =
    useContext(ProfileUpdateContext);
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [countrieOptions, setCountriesOptions] = useState([]);
  const [states, setStates] = useState<any>([]);
  const [statesOptions, setStatesOptions] = useState<any>([]);
  const [cities, setCities] = useState<any>([]);
  const [citiesOptions, setCitiesOptions] = useState<any>([]);
  const [requestAuth, setRequestAuth] = useState(false);

  useEffect(() => {
    const foundCountires = Country.getAllCountries() as any;
    if (foundCountires) {
      setCountries([...foundCountires]);
      const options = foundCountires.map((item: any) => ({
        value: item.name,
        label: item.name,
      }));
      setCountriesOptions(options);
    }
  }, []);

  useEffect(() => {
    if (
      moreDetails.usersRole === "Admin" ||
      moreDetails.usersRole === "Customer Support"
    ) {
      setRequestAuth(true);
    } else {
      setRequestAuth(false);
    }
  }, []);

  const handleSubmit = () => {
    updateActiveStep(activeStep + 1);
  };

  return (
    <section className="w-full h-full overflow-hidden">
      <form onSubmit={handleSubmit} className="space-y-1 h-full">
        <div className="w-full flex gap-2 mt-3">
          <div className="w-1/2 flex flex-col gap-2">
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Account Type
            </label>
            <Select
              defaultMenuIsOpen
              onChange={(e: any) => {
                const value = e?.value;
                if (value === "Admin" || value === "Customer Support") {
                  setRequestAuth(true);
                } else {
                  setRequestAuth(false);
                }
                updateMoreDetails({
                  ...moreDetails,
                  usersRole: value,
                });
              }}
              options={[
                {
                  value: "Customer",
                  label: "Customer",
                },
                {
                  value: "Admin",
                  label: "Admin",
                },
                {
                  value: "Customer Support",
                  label: "Customer Support",
                },
              ]}
            />
          </div>
          <div className={`${requestAuth ? "block" : "hidden"}`}>
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Auth Token
            </label>
            <Input
              placeholder="Token"
              value={moreDetails.authToken || ""}
              onChange={(e) => {
                const value = e.currentTarget.value;
                updateMoreDetails({
                  ...moreDetails,
                  authToken: value,
                });
              }}
            />
          </div>
        </div>

        {/* Location select dropdown menu */}
        <div className="w-full flex flex-col gap-2 pt-2">
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Select Your Location
          </label>
          <div className=" w-full flex items-center justify-between">
            <div className="w-[48%] flex flex-col ">
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Country
              </label>
              {/* Country Select*/}
              <Select
                id="country-select-input"
                options={countrieOptions}
                placeholder="Country"
                defaultInputValue={moreDetails.country || ""}
                className="grow text-sm"
                onChange={(e: any) => {
                  const value = e.value;
                  if (value) {
                    const countryObj: CountryType | undefined = countries.find(
                      (item) => item.name === value
                    );
                    if (countryObj) {
                      const discoveredStates = State.getStatesOfCountry(
                        countryObj.isoCode
                      );
                      setStates([...discoveredStates]);
                      const options: any = discoveredStates.map(
                        (item: any) => ({
                          value: item.name,
                          label: item.name,
                        })
                      );
                      options && setStatesOptions([...options]);
                      updateMoreDetails({
                        ...moreDetails,
                        country: value,
                      });
                    }
                  }
                }}
              />
            </div>
            <div className="w-[48%] flex flex-col ">
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                State
              </label>
              {/* State Select */}
              <Select
                id="state-select-input"
                options={statesOptions}
                placeholder="State"
                defaultInputValue={moreDetails.state || ""}
                className="grow text-sm"
                onChange={(e: any) => {
                  const value = e.value;
                  const countrySelect = document.getElementById(
                    "country-select-input"
                  ) as HTMLSelectElement;
                  if (value && countrySelect) {
                    const statesObj: any = states.find(
                      (item: any) => item.name === value
                    );
                    const countryObj: CountryType | undefined = countries.find(
                      (item) => item.name == countrySelect.textContent
                    );

                    if (statesObj && countryObj) {
                      console.log("state: ", statesObj);
                      const discoveredCities = City.getCitiesOfState(
                        countryObj.isoCode,
                        statesObj.isoCode
                      );
                      console.log(discoveredCities);
                      setCities([...discoveredCities]);
                      const options: any = discoveredCities.map(
                        (item: any) => ({
                          value: item.name,
                          label: item.name,
                        })
                      );
                      options && setCitiesOptions([...options]);
                      updateMoreDetails({
                        ...moreDetails,
                        state: value,
                      });
                    }
                  }
                }}
              />
            </div>
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="w-[48%] flex flex-col">
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                City
              </label>
              {/* City Select */}
              <Select
                id="city-select-input"
                options={citiesOptions}
                placeholder="City"
                className="grow text-sm"
                onChange={(e: any) => {
                  const value = e.value;
                  if (value) {
                    updateMoreDetails({
                      ...moreDetails,
                      city: value,
                    });
                  }
                }}
              />
            </div>
            <div className=" flex flex-col">
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Delivery Address
              </label>
              <Input
                placeholder="street address..."
                value={moreDetails.deliveryAddress || ""}
                onChange={(e) => {
                  const value = e.currentTarget.value;
                  updateMoreDetails({
                    ...moreDetails,
                    deliveryAddress: value,
                  });
                }}
              />
            </div>
          </div>
        </div>

        {/* Tab navigation buttons */}
        <div className=" flex flex-row gap-2 pt-5">
          <Button
            type="button"
            onClick={() => {
              updateActiveStep(activeStep - 1);
            }}
            className=" border-2 border-interactive-green bg-transparent hover:bg-transparent text-interactive-green hover:scale-95"
          >
            Back
          </Button>
          <Button
            type="submit"
            className=" bg-interactive-green hover:bg-interactive-green hover:scale-110"
          >
            Next
          </Button>
        </div>
      </form>
    </section>
  );
};

export default MoreDetails;
