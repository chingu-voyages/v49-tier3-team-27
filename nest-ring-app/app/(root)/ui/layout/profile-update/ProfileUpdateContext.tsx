import credentials from "next-auth/providers/credentials";
import { createContext, ReactNode, useMemo, useState } from "react";

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

type CredentialsType = {
  email: string;
  password: string;
};

export const ProfileUpdateContext = createContext({
  appearance: {} as AppearanceType,
  personalInfo: {} as PersonalInfoType,
  moreDetails: {} as moreDetailsType,
  credentials: {} as CredentialsType,
  activeStep: 0 as number,
  updateAppearance: (data: AppearanceType) => {},
  updatePersonalInfo: (data: PersonalInfoType) => {},
  updateMoreDetails: (data: moreDetailsType) => {},
  updateActiveStep: (step: number) => {},
  updateCredentials: (data: CredentialsType) => {},
  uploadData: () => {},
});

export const ProfileUpdateContextProvider = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
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
  const [credentials, setCredentials] = useState<CredentialsType>({
    email: "",
    password: "",
  });

  const [activeStep, setActiveStep] = useState(1);

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
    const updateCredentials = (data: CredentialsType) => {
      setCredentials(data);
    };

    const uploadData = () => {
      alert("data uploading...");
    };

    return {
      appearance,
      personalInfo,
      moreDetails,
      activeStep,
      credentials,
      updateAppearance,
      updatePersonalInfo,
      updateMoreDetails,
      updateActiveStep,
      updateCredentials,
      uploadData,
    };
  }, [activeStep, appearance, credentials, moreDetails, personalInfo]);
  return (
    <ProfileUpdateContext.Provider value={contextValues}>
      {children}
    </ProfileUpdateContext.Provider>
  );
};
