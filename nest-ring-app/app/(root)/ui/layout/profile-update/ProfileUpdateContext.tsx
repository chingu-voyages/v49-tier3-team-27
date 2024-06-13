import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";

type AppearanceType = {
  profileAvatarURL: any;
  profileBannerURL: any;
  profileAvatarFile: File | null;
  profileBannerFile: File | null;
};

type PersonalInfoType = {
  firstname: string;
  middlename: string;
  lastname: string;
  description: string;
  dob: Date;
};

type moreDetailsType = {
  accountType: "Customer" | "Customer Support" | "Admin";
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
  isUploading: false as boolean,
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
  const [isUploading, setIsUploading] = useState(false);
  const [appearance, setAppearance] = useState<AppearanceType>({
    profileAvatarURL: null,
    profileAvatarFile: null,
    profileBannerURL: null,
    profileBannerFile: null,
  });
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoType>({
    firstname: "",
    middlename: "",
    lastname: "",
    description: "",
    dob: new Date(),
  });
  const [moreDetails, setMoreDetails] = useState<moreDetailsType>({
    accountType: "Customer",
    authToken: null,
    deliveryAddress: null,
    country: null,
    state: null,
    city: null,
  });
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState<string>("");
  const [activeStep, setActiveStep] = useState(1);
  const [consentConclude, setConsentConclude] = useState<ConsentConcludeType>({
    consent: false,
    conclude: false,
  });

  const { toast } = useToast();
  const { data, status } = useSession() as any;

  useEffect(() => {
    if (data?.user) {
      setUserEmail(data.user.email);

      if (data.user.bannerUrl) {
        setAppearance((prevState) => ({
          ...prevState,
          profileBannerURL: data.user.bannerUrl,
        }));
      }
      if (data.user.avatarUrl) {
        setAppearance((prevState) => ({
          ...prevState,
          profileAvatarURL: data.user.avatarUrl,
        }));
      }

      setPersonalInfo({
        ...personalInfo,
        firstname: data.user.firstname || data.user.name.split(" ")[0] || "",
        lastname: data.user.lastname || data.user.name.split(" ")[1] || "",
        middlename: data.user.middlename || data.user.name.split(" ")[2] || "",
        description: data.user.description,
      });

      setMoreDetails({
        ...moreDetails,
        authToken: data.user?.authToken || null,
        accountType: data.user?.accountType || "",
        country: data.user?.location?.country || "",
        state: data.user?.location?.state || "",
        city: data.user?.location?.city || "",
        deliveryAddress: data.user?.location?.deliveryAddress || "",
      });
    }
  }, [data, status]);

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

    const assembleData = async (): Promise<FormData | undefined> => {
      const payload = new FormData();

      if (
        personalInfo.firstname &&
        personalInfo.lastname &&
        personalInfo.description &&
        moreDetails.accountType &&
        moreDetails.deliveryAddress &&
        moreDetails.country &&
        moreDetails.state &&
        moreDetails.city
      ) {
        setIsUploading(true);
        payload.append("email", userEmail);
        appearance.profileAvatarURL &&
          payload.append("avatarUrl", appearance.profileAvatarURL);
        appearance.profileBannerURL &&
          payload.append("bannerUrl", appearance.profileBannerURL);
        appearance.profileAvatarFile &&
          payload.append("avatarFile", appearance.profileAvatarFile);
        appearance.profileBannerFile &&
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
        payload.append("accountType", moreDetails.accountType);
        if (
          (moreDetails.accountType === "Admin" ||
            moreDetails.accountType === "Customer Support") &&
          moreDetails.authToken
        ) {
          payload.append("authToken", moreDetails.authToken);
        } else if (
          (moreDetails.accountType === "Admin" ||
            moreDetails.accountType === "Customer Support") &&
          !moreDetails.authToken
        ) {
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
      return payload;
    };

    const uploadData = async () => {
      toast({
        title: "Uploading data...",
        description: "Will be done in a few; hang on tight.",
      });

      const payload = await assembleData();

      try {
        const fetchResponse = await fetch("/api/profile/update", {
          method: "PUT",
          body: payload,
        });

        const result = await fetchResponse.json();
        if (fetchResponse.status === 201) {
          setPassword("");
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
      setIsUploading(false);
    };

    return {
      isUploading,
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
    isUploading,
    userEmail,
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
