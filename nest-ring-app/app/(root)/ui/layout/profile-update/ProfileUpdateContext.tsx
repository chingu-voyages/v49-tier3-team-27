import { useToast } from "@/components/ui/use-toast";
import credentials from "next-auth/providers/credentials";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";

type AppearanceType = {
  profileAvatarURL: any;
  profileAvatarFile: File | null;
  profileBannerURL: any;
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
  usersRole: "Customer" | "Admin" | "Customer Support";
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

    const uploadData = () => {
      console.log(
        "Data to be uploaded: ",
        appearance,
        personalInfo,
        moreDetails
      );

      toast({
        title: "Uploading data...",
        description: "will be done in a few; hang on tight.",
      });
      setTimeout(() => {
        setProfileUpdateComplete(true);
        setConsentConclude({
          ...consentConclude,
          conclude: true,
        });
        toast({
          title: "Done!",
          description: "Your Profile has been updated Successfully!",
        });
      }, 3000);
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
  ]);
  return (
    <ProfileUpdateContext.Provider value={contextValues}>
      {children}
    </ProfileUpdateContext.Provider>
  );
};
