import { toast, useToast } from "@/components/ui/use-toast";
import User from "@/lib/models/User";
import credentials from "next-auth/providers/credentials";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";

type AppearanceType = {
  profileAvatarURL: any;
  profileBannerURL: any;
  profileAvatarFile: File | null;
  profileBannerFile: File | null;
};

type PersonalInfoType = {
  firstname: string | null;
  middlename: string | null;
  lastname: string | null;
  description: string | null;
  dob: Date | null;
};

type moreDetailsType = {
  usersRole: "Customer" | "Customer Support" | "Admin";
  authToken: string | null;
  deliveryAddress: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
};

type ConsentConcludeType = {
  consent: boolean;
  conclude: boolean;
};

export const ProfileUpdateContext = createContext({
  profileUpdateComplete: false as boolean,
  appearance: {} as AppearanceType,
  personalInfo: {} as PersonalInfoType,
  moreDetails: {} as moreDetailsType,
  password: "" as string,
  activeStep: 0 as number,
  consentConclude: {} as ConsentConcludeType,
  updateAppearance: (data: AppearanceType) => {},
  updatePersonalInfo: (data: PersonalInfoType) => {},
  updateMoreDetails: (data: moreDetailsType) => {},
  updateActiveStep: (step: number) => {},
  updatePassword: (data: string) => {},
  updateConsentConclude: (data: ConsentConcludeType) => {},
  uploadData: () => {},
});

export const ProfileUpdateContextProvider = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  const [profileUpdateComplete, setProfileUpdateComplete] = useState(false);
  const [appearance, setAppearance] = useState<AppearanceType>({
    profileAvatarURL: null,
    profileAvatarFile: null,
    profileBannerURL: null,
    profileBannerFile: null,
  });
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoType>({
    firstname: null,
    middlename: null,
    lastname: null,
    description: null,
    dob: null,
  });
  const [moreDetails, setMoreDetails] = useState<moreDetailsType>({
    usersRole: "Customer",
    authToken: null,
    deliveryAddress: null,
    country: null,
    state: null,
    city: null,
  });
  const [password, setPassword] = useState<string>("");
  const [activeStep, setActiveStep] = useState(1);
  const [consentConclude, setConsentConclude] = useState<ConsentConcludeType>({
    consent: false,
    conclude: false,
  });

  const { toast } = useToast();
  const { data } = useSession() as any;
  useEffect(() => {
    if (!data?.user?.isProfileComplete) {
      setProfileUpdateComplete(false);
    }
  }, [data?.user?.isProfileComplete]);

  const contextValues = useMemo(() => {
    const updateAppearance = (data: AppearanceType) => {
      setAppearance(data);
    };

    const updatePersonalInfo = (data: PersonalInfoType) => {
      setPersonalInfo(data);
    };

    const updateMoreDetails = (data: moreDetailsType) => {
      setMoreDetails(data);
    };

    const updateActiveStep = (step: number) => {
      setActiveStep(step);
    };
    const updatePassword = (data: string) => {
      setPassword(data);
    };

    const updateConsentConclude = (data: any) => {
      setConsentConclude(data);
    };

    const uploadData = async () => {
      toast({
        title: "Uploading data...",
        description: "Will be done in a few; hang on tight.",
      });

      const payload = new FormData();

      if (
        appearance.profileAvatarFile &&
        appearance.profileBannerFile &&
        personalInfo.firstname &&
        personalInfo.lastname &&
        personalInfo.description &&
        moreDetails.usersRole &&
        moreDetails.deliveryAddress &&
        moreDetails.country &&
        moreDetails.state &&
        moreDetails.city
      ) {
        payload.append("email", data.user.email);
        payload.append("avatarFile", appearance.profileAvatarFile);
        payload.append("bannerFile", appearance.profileBannerFile);
        payload.append("firstname", personalInfo.firstname);
        personalInfo.middlename &&
          payload.append("middlename", personalInfo.middlename);
        payload.append("lastname", personalInfo.lastname);
        payload.append("dob", String(personalInfo.dob));
        payload.append("description", personalInfo.description);
        payload.append("deliveryAddress", moreDetails.deliveryAddress);
        payload.append("country", moreDetails.country);
        payload.append("state", moreDetails.state);
        payload.append("city", moreDetails.city);
        payload.append("password", password);
        payload.append("accountType", moreDetails.usersRole);
        if (
          (moreDetails.usersRole === "Admin" ||
            moreDetails.usersRole === "Customer Support") &&
          moreDetails.authToken
        ) {
          payload.append("authToken", moreDetails.authToken);
        } else {
          toast({
            title: "Auth Token Required",
            description:
              "This is a requirement for an Admin and Customer Support.",
          });
          return;
        }
      } else {
        toast({
          title: "Wait, Hold on!",
          description: "Check your inputs see you didn't miss any field.",
        });
        return;
      }

      try {
        const fetchResponse = await fetch("/api/profile/upload", {
          method: "PUT",
          body: payload,
        });

        const result = await fetchResponse.json();
        if (fetchResponse.status === 201) {
          setProfileUpdateComplete(true);
          setConsentConclude({
            ...consentConclude,
            conclude: true,
          });

          toast({
            title: "Done!",
            description: result.message,
          });
        } else if (
          fetchResponse.status === 401 ||
          fetchResponse.status === 404 ||
          fetchResponse.status === 500
        ) {
          toast({
            title: "Error",
            description: result.message,
          });
        }
      } catch (error) {
        console.log("Error: ", error);
        toast({
          title: "Error!",
          description: "Check your internet connection and try again.",
          duration: 30000,
        });
      }
    };

    return {
      profileUpdateComplete,
      appearance,
      personalInfo,
      moreDetails,
      activeStep,
      password,
      consentConclude,
      updateAppearance,
      updatePersonalInfo,
      updateMoreDetails,
      updateActiveStep,
      updatePassword,
      updateConsentConclude,
      uploadData,
    };
  }, [
    profileUpdateComplete,
    appearance,
    personalInfo,
    moreDetails,
    activeStep,
    password,
    consentConclude,
    toast,
    data.user.email,
  ]);
  return (
    <ProfileUpdateContext.Provider value={contextValues}>
      {children}
    </ProfileUpdateContext.Provider>
  );
};
