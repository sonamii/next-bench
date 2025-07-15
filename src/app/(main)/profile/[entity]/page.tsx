"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Heading,
  Text,
  Button,
  Column,
  Badge,
  Logo,
  Line,
  LetterFx,
  Row,
  Flex,
  MegaMenu,
  Tag,
  AvatarGroup,
  Input,
  IconButton,
  Media,
  InteractiveDetails,
  Accordion,
  BarChart,
  LineChart,
  Grid,
  Scroller,
  User,
  UserMenu,
  Avatar,
  SegmentedControl,
  Textarea,
  DateInput,
  Select,
  NumberInput,
  Kbd,
  InlineCode,
  Card,
  Switch,
  Spinner,
  Dialog,
  Checkbox,
  Skeleton,
  RevealFx,
  HeadingLink,
  ThemeSwitcher,
  TagInput,
  Feedback,
  StatusIndicator,
  SmartLink,
} from "@once-ui-system/core";
import { useRouter } from "next/navigation";
import { Outfit } from "next/font/google";
import { useToast } from "@once-ui-system/core";
import NavBar from "./../../components/NavBar";
import Footer from "./../../components/Footer";
import { supabase } from "@/app/utils/supabase/client";
import {
  languagesConfigJSON,
  timezoneOptionsJSON,
  countriesOptionsJSON,
} from "./../../../jsons/next-profile-config";

// Font setup
const dmsans = Outfit({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

// Helper: Get UUID from URL
function getUuidFromUrl() {
  if (typeof window === "undefined") return undefined;
  const parts = window.location.pathname.split("/").filter(Boolean);
  return parts[parts.length - 1];
}

// Options
const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Prefer not to say", value: "none" },
];
const membershipOptions = [
  { label: "Active", value: "A" },
  { label: "Freemium", value: "F" },
  { label: "Pro", value: "P" },
];
const languageOptions = languagesConfigJSON.options.map((lang) => ({
  label: lang.label,
  value: lang.value,
}));
const timezoneOptions = timezoneOptionsJSON.map((tz) => ({
  label: tz.label,
  value: tz.value,
}));
const countries = countriesOptionsJSON.map((country) => ({
  label: country.label,
  value: country.value,
}));

// --- Types ---
type UserProfile = {
  uuid: string;
  fullName: string;
  introduction: string;
  dob: Date | null;
  gender: string;
  country: string;
  address: string;
  phoneNumber: string;
  email: string;
  accountVisibility: boolean;
  userName: string;
  accountCreated: Date | null;
  lastLogin: Date | null;
  membershipStatus: string;
  languagePreference: string;
  timezone: string;
  avatarSrc: string;
  count: number;
};
type UserSocials = {
  phone: string;
  email: string;
  whatsapp: string;
  instagram: string;
  linkedin: string;
};
type Institution = {
  id: string;
  name: string;
  type: string;
  address: string;
  affiliation: string[];
  contact: string;
  email: string;
  isPublished: boolean;
  uuid: string;
  city?: string;
  country?: string;
  affiliationType?: string;
};
type InstitutionInput = {
  name: string;
  type: string;
  affiliation: string[];
  phoneNumber: string;
  email: string;
  city: string;
  country: string;
};

// --- Main Page ---
export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [uuid, setUuid] = useState<string | undefined>();
  const [sessionId, setSessionId] = useState<string | undefined>();
  const [userXP, setUserXP] = useState<number>(0);
  const [isConsultant, setIsConsultant] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Loading states
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingSocials, setLoadingSocials] = useState(true);
  const [loadingInstitutions, setLoadingInstitutions] = useState(true);
  const [loadingSecurity, setLoadingSecurity] = useState(false);

  // All user data in one state
  const [userData, setUserData] = useState<{
    profile: UserProfile | null;
    socials: UserSocials | null;
    institutions: Institution[];
    isCurrentUser: boolean;
  }>({
    profile: null,
    socials: null,
    institutions: [],
    isCurrentUser: false,
  });

  const { addToast } = useToast();

  // Tabs
  const segmentedTabs = useMemo(() => {
    const tabs = [
      { value: "profile", label: "Profile", disabled: false },
      { value: "socials", label: "Socials", disabled: false },
      { value: "creations", label: "Edu Centers", disabled: false },
      { value: "security", label: "Security", disabled: !userData.isCurrentUser },
    ];
    return tabs;
  }, [userData.isCurrentUser]);

  // Fetch all user data
  const fetchAllUserData = useCallback(async (uuid: string) => {
    setLoadingProfile(true);
    setLoadingSocials(true);
    setLoadingInstitutions(true);

    const [
      { data: profileData },
      { data: socialsData },
      { data: institutionsData },
      { data: consultantData },
      { data: sessionData },
    ] = await Promise.all([
      supabase
        .from("user_profiles")
        .select(
          "uuid, profile_details, username, joined_at, last_login, primary_email, is_public, pfp, count, subscription, is_admin, is_consultant"
        )
        .eq("uuid", uuid)
        .maybeSingle(),
      supabase
        .from("user_profiles")
        .select("socials,xp")
        .eq("uuid", uuid)
        .maybeSingle(),
      supabase
        .from("edu_centers")
        .select("edu_id, basic_info, is_published, uuid")
        .eq("uuid", uuid)
        .order("created_at", { ascending: false }),
      supabase
        .from("consultants")
        .select("is_consultant")
        .eq("uuid", uuid)
        .maybeSingle(),
      supabase.auth.getSession(),
    ]);

    // Prepare profile
    let profile: UserProfile | null = null;
    if (profileData) {
      const pd = profileData.profile_details || {};
      profile = {
        uuid: profileData.uuid ?? "",
        fullName: pd.personal_details?.full_name ?? "",
        introduction: pd.personal_details?.introduction ?? "",
        dob: pd.personal_details?.dob ? new Date(pd.personal_details.dob) : null,
        gender: pd.personal_details?.gender ?? "none",
        country: pd.contact?.country ?? "",
        address: pd.contact?.address ?? "",
        phoneNumber: pd.contact?.phone_number ?? "",
        email: pd.contact?.email ?? "",
        accountVisibility: profileData.is_public ?? false,
        userName: profileData.username ?? "",
        accountCreated: profileData.joined_at
          ? new Date(profileData.joined_at)
          : null,
        lastLogin: profileData.last_login
          ? new Date(profileData.last_login)
          : null,
        membershipStatus: pd.membershipStatus ?? "A",
        languagePreference: pd.contact?.language_preference ?? "English",
        timezone: pd.contact?.timezone ?? "Select timezone",
        avatarSrc: profileData.pfp ?? "",
        count: profileData.count ?? 0,
      };
    }

    // Prepare socials
    let socials: UserSocials | null = null;
    if (socialsData && socialsData.socials) {
      socials = {
        phone: socialsData.socials.phone ?? "",
        email: socialsData.socials.email ?? "",
        whatsapp: socialsData.socials.whatsapp ?? "",
        instagram: socialsData.socials.instagram ?? "",
        linkedin: socialsData.socials.linkedin ?? "",
      };
    }

    // Prepare institutions
    let institutions: Institution[] = [];
    if (institutionsData && Array.isArray(institutionsData)) {
      institutions = institutionsData.map((row) => ({
        id: row.edu_id,
        type: row.basic_info?.type || "",
        name: row.basic_info?.name || "",
        address:
          (row.basic_info?.location?.city || "") +
          ", " +
          (row.basic_info?.location?.country || ""),
        affiliation: row.basic_info?.affiliation?.boards || [],
        contact: row.basic_info?.contact?.phone || "",
        email: row.basic_info?.contact?.email || "",
        isPublished: row.is_published || false,
        uuid: row.uuid || "",
        city: row.basic_info?.location?.city || "",
        country: row.basic_info?.location?.country || "",
        affiliationType: row.basic_info?.affiliation?.type || "",
      }));
    }

    setUserXP(socialsData?.xp || 0);
    setIsConsultant(consultantData?.is_consultant || false);
    setIsAdmin(profileData?.is_admin || false);

    const sessionUserId = sessionData?.session?.user?.id;
    setSessionId(sessionUserId);
    const isCurrentUser = sessionUserId === uuid;

    setUserData({
      profile,
      socials,
      institutions,
      isCurrentUser,
    });

    setLoadingProfile(false);
    setLoadingSocials(false);
    setTimeout(() => setLoadingInstitutions(false), 1000);
  }, []);

  // On mount, set uuid and fetch all data
  useEffect(() => {
    const id = getUuidFromUrl();
    setUuid(id);
    if (id) fetchAllUserData(id);
  }, [fetchAllUserData]);

  // Realtime subscription for user profile and institutions
  useEffect(() => {
    if (!uuid) return;
    const channels = [
      supabase
        .channel(`user-profile-${uuid}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "user_profiles",
            filter: `uuid=eq.${uuid}`,
          },
          () => fetchAllUserData(uuid)
        )
        .subscribe(),
      supabase
        .channel(`edu-centers-${uuid}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "edu_centers",
            filter: `uuid=eq.${uuid}`,
          },
          () => fetchAllUserData(uuid)
        )
        .subscribe(),
      supabase
        .channel(`consultant-profile-${uuid}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "consultants",
            filter: `uuid=eq.${uuid}`,
          },
          () => fetchAllUserData(uuid)
        )
        .subscribe(),
    ];
    return () => {
      channels.forEach((ch) => supabase.removeChannel(ch));
    };
  }, [uuid, fetchAllUserData]);

  // Save profile handler
  const handleSaveProfile = async (profile: UserProfile) => {
    if (!uuid) return;

    // Convert UserProfile to new profile_details structure
    const profileDetails = {
      personal_details: {
        full_name: profile.fullName,
        introduction: profile.introduction,
        gender: profile.gender,
      },
      contact: {
        country: profile.country,
        address: profile.address,
        phone_number: profile.phoneNumber,
        email: profile.email,
        language_preference: profile.languagePreference,
        timezone: profile.timezone,
      },
      membershipStatus: profile.membershipStatus,
    };
    const { error } = await supabase
      .from("user_profiles")
      .update({
        profile_details: profileDetails,
        username: profile.userName,
        is_public: profile.accountVisibility,
        subscription: profile.membershipStatus,
      })
      .eq("uuid", uuid);
    if (error) {
      addToast({
        message: "Failed to update profile. Please try again.",
        variant: "danger",
      });
    } else {
      addToast({
        message: "Profile updated successfully!",
        variant: "success",
      });
      await fetchAllUserData(uuid);
    }
  };

  // Save socials handler
  const handleSaveSocials = async (socials: UserSocials) => {
    if (!uuid) return;
    const { error } = await supabase
      .from("user_profiles")
      .update({ socials })
      .eq("uuid", uuid);
    if (error) {
      addToast({
        message: "Failed to update socials. Please try again.",
        variant: "danger",
      });
    } else {
      addToast({
        message: "Socials updated successfully!",
        variant: "success",
      });
      await fetchAllUserData(uuid);
    }
  };

  // Save institution publish status
  const handlePublishInstitution = async (
    institutionId: string,
    isPublished: boolean
  ) => {
    if (!uuid) return;
    const { error } = await supabase
      .from("edu_centers")
      .update({ is_published: isPublished })
      .eq("edu_id", institutionId)
      .eq("uuid", uuid);
    if (error) {
      addToast({
        message: "Failed to update institution.",
        variant: "danger",
      });
    } else {
      await fetchAllUserData(uuid);
    }
  };

  // Create new institution
  const handleCreateInstitution = async (newInstitution: InstitutionInput) => {
    if (!uuid) return;
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const urlName =
      newInstitution.name.toLowerCase().replace(/\s+/g, "-").trim() +
      "-" +
      randomNum;
    const { error } = await supabase.from("edu_centers").insert([
      {
        basic_info: {
          name: newInstitution.name.trim(),
          type: newInstitution.type.trim(),
          affiliation: {
            boards: newInstitution.affiliation,
            type: "",
          },
          location: {
            city: newInstitution.city.trim(),
            country: newInstitution.country.trim(),
          },
          contact: {
            email: newInstitution.email.trim(),
            phone: newInstitution.phoneNumber.trim(),
          },
        },
        is_published: false,
        uuid: uuid,
        edu_url_name: urlName,
      },
    ]);
    // Add random XP between 5 and 10 to user_profiles.xp for this uuid
    const { data: xpRow, error: xpError } = await supabase
      .from("user_profiles")
      .select("xp")
      .eq("uuid", uuid)
      .maybeSingle();

    if (!xpError && xpRow && typeof xpRow.xp === "number") {
      const randomXP = Math.floor(Math.random() * 6) + 5; // 5-10
      const newXP = xpRow.xp + randomXP;
      await supabase
        .from("user_profiles")
        .update({ xp: newXP })
        .eq("uuid", uuid);
    }

    if (error) {
      addToast({
        message: "Failed to create institution. Please try again.",
        variant: "danger",
      });
    } else {
      addToast({
        message: "Institution created successfully!",
        variant: "success",
      });
      await fetchAllUserData(uuid);
    }
  };

  return (
    <Column
      fillWidth
      padding="l"
      horizontal="center"
      vertical="start"
      style={{
        minHeight: "100vh",
        height: "fit-content",
        backgroundColor: "#FDFDF9",
      }}
    >
      <Column style={{ maxWidth: "1550px" }} fillWidth fitHeight horizontal="center">
        <NavBar />
        <Flex fillWidth height={2}></Flex>
        <Column
          style={{ maxWidth: "1250px" }}
          paddingX="l"
          radius="xl"
          fillWidth
          fitHeight
          horizontal="center"
        >
          <ProfileHeader
            dmsansClass={dmsans.className}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            profile={userData.profile}
            xp={userXP}
            isConsultant={isConsultant}
            isAdmin={isAdmin}
            segmentedTabs={segmentedTabs}
          />
          <Flex fillWidth height={3}></Flex>
          {activeTab === "profile" &&
            (loadingProfile ? (
              <Flex fillWidth center paddingY="32">
                <Spinner size="xl" />
              </Flex>
            ) : userData.profile ? (
              <ProfileEdit
                countries={countries}
                profile={userData.profile}
                isCurrentUser={userData.isCurrentUser}
                onSave={handleSaveProfile}
              />
            ) : null)}
          {activeTab === "creations" &&
            (loadingInstitutions ? (
              <Flex fillWidth center paddingY="32">
                <Spinner size="xl" />
              </Flex>
            ) : (
              <CreatedInstitutions
                institutions={userData.institutions}
                onPublish={handlePublishInstitution}
                onCreate={handleCreateInstitution}
                isCurrentUser={userData.isCurrentUser}
              />
            ))}
          {activeTab === "security" &&
            userData.isCurrentUser &&
            (loadingSecurity ? (
              <Flex fillWidth center paddingY="32">
                <Spinner size="xl" />
              </Flex>
            ) : (
              <Security />
            ))}
          {activeTab === "socials" &&
            (loadingSocials ? (
              <Flex fillWidth center paddingY="32">
                <Spinner size="xl" />
              </Flex>
            ) : userData.socials ? (
              <Socials
                socials={userData.socials}
                onSave={handleSaveSocials}
                isCurrentUser={userData.isCurrentUser}
              />
            ) : null)}
          <Flex fillWidth height={3}></Flex>
        </Column>
      </Column>
      <Flex fillWidth height={3}></Flex>
      <Footer />
    </Column>
  );
}

// --- Profile Header ---
function ProfileHeader({
  dmsansClass,
  activeTab,
  setActiveTab,
  profile,
  xp,
  isConsultant,
  isAdmin,
  segmentedTabs,
}: {
  dmsansClass: string;
  activeTab: string;
  setActiveTab: (v: string) => void;
  profile: UserProfile | null;
  xp?: number;
  isConsultant?: boolean;
  isAdmin?: boolean;
  segmentedTabs: { value: string; label: string; disabled?: boolean }[];
}) {
  return (
    <Column
      fillWidth
      padding="xl"
      paddingBottom="m"
      fitHeight
      center
      style={{ backgroundColor: "transparent" }}
      radius="l"
      gap="12"
      horizontal="center"
      vertical="start"
    >
      <Avatar
        src={profile?.avatarSrc || ""}
        size="xl"
        border="neutral-strong"
        borderWidth={1}
        loading={!profile}
      />
      {!profile ? (
        <>
          <Column center gap="8" fillWidth paddingTop="2" />
          <Skeleton shape="line" delay="1" width="s" height="xl" />
          <Skeleton shape="line" delay="1" width="xs" maxWidth={6} height="l" />
          <Skeleton shape="line" delay="1" width="xs" height="xs" />
        </>
      ) : null}
      <Text
        style={{
          color: "#181A1D",
          fontSize: "41px",
          fontWeight: "500",
        }}
        className={dmsansClass}
      >
        <Row center gap="12" wrap fillWidth>
          <Row center style={{ textAlign: "center", width: "100%" }} className="profileFullName" fillWidth>
            {profile?.fullName}
          </Row>
          {profile && (
            <>
              <Text style={{ fontSize: "21px", fontWeight: "500" }} onBackground="neutral-weak" className={dmsansClass}>
                <Kbd>#{profile?.count}</Kbd>
              </Text>
              <Text style={{ fontSize: "21px", fontWeight: "500" }} className={dmsansClass}>
                <Tag variant="gradient">+{xp} XP</Tag>
              </Text>
            </>
          )}
        </Row>
      </Text>
      {profile && (
        <Row center fillWidth gap="4">
          <Text style={{ fontSize: "21px", fontWeight: "500" }} className={dmsansClass}>
            <Tag variant="neutral">{isConsultant ? "CNLT" : "USER"}</Tag>
          </Text>
          {isAdmin && (
            <Text style={{ fontSize: "21px", fontWeight: "500" }} className={dmsansClass}>
              <Tag variant="accent">ADMIN</Tag>
            </Text>
          )}
        </Row>
      )}
      <Text onBackground="neutral-weak" style={{ fontSize: "14px", textAlign: "center" }}>
        {profile?.introduction?.trim() ? profile.introduction : "User at Next Bench"}
      </Text>
      <Flex fillWidth center paddingY="8">
        <SegmentedControl
          fillWidth
          maxWidth={40}
          buttons={segmentedTabs}
          defaultSelected="profile"
          onToggle={setActiveTab}
        />
      </Flex>
    </Column>
  );
}

// --- Profile Edit ---
function ProfileEdit({
  countries,
  profile,
  isCurrentUser,
  onSave,
}: {
  countries: { label: string; value: string }[];
  profile: UserProfile;
  isCurrentUser: boolean;
  onSave: (profile: UserProfile) => void;
}) {
  const [form, setForm] = useState<UserProfile>(profile);
  useEffect(() => setForm(profile), [profile]);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof UserProfile, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <RevealFx fillWidth direction="column">
      <Grid fillWidth padding="m" fitHeight columns={2} gap="104">
        <PersonalDetails
          countries={countries}
          form={form}
          onChange={handleChange}
          isCurrentUser={isCurrentUser}
          uuid={profile?.uuid || ""}
        />
        <AccountDetails
          form={form}
          onChange={handleChange}
          isCurrentUser={isCurrentUser}
        />
      </Grid>
      {isCurrentUser && (
        <Row paddingY="12" fillWidth horizontal="end">
          <Button
            size="m"
            onClick={() => {
              setLoading(true);
              onSave(form);
              setTimeout(() => setLoading(false), 1000);
            }}
            disabled={loading}
          >
            {loading ? (
              <>
                Saving...&nbsp;
                <Spinner size="s" />
              </>
            ) : (
              "Save all"
            )}
          </Button>
        </Row>
      )}
    </RevealFx>
  );
}

// --- Personal Details ---
function PersonalDetails({
  countries,
  form,
  onChange,
  isCurrentUser,
  uuid,
}: {
  countries: { label: string; value: string }[];
  form: UserProfile;
  onChange: (field: keyof UserProfile, value: any) => void;
  isCurrentUser: boolean;
  uuid: string;
}) {
  // Consultant dialog state
  const [isConsultantDialog, setIsConsultantDialog] = useState(false);
  const [eduCodes, setEduCodes] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    motivation: "",
    dob: null as Date | null,
    country: "",
    phoneNumber: "",
    address: "",
    email: "",
  });
  const [errorText, setErrorText] = useState<string | null>(null);
  const [isNotification, setIsNotification] = useState<boolean>(false);
  const [isConsultant, setIsConsultant] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [isWithdrawingLoading, setIsWithdrawingLoading] = useState(false);

  const { addToast } = useToast();

  useEffect(() => {
    async function fetchConsultantData() {
      if (!uuid) return;
      const { data, error } = await supabase
        .from("consultants")
        .select("*")
        .eq("uuid", uuid)
        .maybeSingle();

      if (data) {
        setFormData((prev) => ({
          ...prev,
          motivation: data.consultant_form ?? "",
          dob: data.basic_info?.dob ? new Date(data.basic_info.dob) : null,
          country: data.basic_info?.country ?? "",
          phoneNumber: data.basic_info?.phoneNumber ?? "",
          address: data.basic_info?.address ?? "",
          email: data.basic_info?.email ?? "",
        }));
        setEduCodes(Array.isArray(data.edu_codes) ? data.edu_codes : []);
        setErrorText(data.error_text ?? null);
        setIsNotification(data.is_notification ?? false);
        setIsConsultant(data.is_consultant);
        setHasSubmitted(data.has_submitted ?? false);
      }
      if (error) setErrorText("Failed to load consultant data.");
    }
    fetchConsultantData();
  }, [uuid]);

  // Consultant application submit handler
  const handleConsultantApplication = async () => {
    setLoading(true);
    if (eduCodes.length === 0 || !formData.motivation.trim()) {
      addToast({
        message: "Please enter at least one institute code and your motivation.",
        variant: "danger",
      });
      setLoading(false);
      return;
    }
    function formatSimpleDate(date: Date): string {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    const payload = {
      uuid: uuid,
      is_consultant: false,
      consultant_form: formData.motivation,
      edu_codes: eduCodes,
      basic_info: {
        dob: formData.dob ? formatSimpleDate(formData.dob) : null,
        country: form.country,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        email: form.email,
      },
      is_notification: false,
      error_text: null,
      date_submitted_or_updated: new Date().toISOString(),
      has_submitted: true,
    };
    try {
      const { error } = await supabase
        .from("consultants")
        .upsert([payload], { onConflict: "uuid" });
      if (error) throw error;
      setIsConsultantDialog(false);
      addToast({
        message: "Consultant application submitted successfully!",
        variant: "success",
      });
    } catch (err) {
      addToast({
        message: "Failed to submit consultant application. Please try again.",
        variant: "danger",
      });
    }
    setLoading(false);
  };

  // Withdraw current application
  const withdrawCurrentApplication = async () => {
    setIsWithdrawingLoading(true);
    if (!uuid) return;
    setTimeout(async () => {
      try {
        await supabase
          .from("consultants")
          .update({ is_consultant: false })
          .eq("uuid", uuid);
        await supabase
          .from("consultants")
          .delete()
          .eq("uuid", uuid);
        setIsConsultant(false);
        addToast({
          message: "Your consultant application has been withdrawn.",
          variant: "success",
        });
      } catch (err) {
        addToast({
          message: "Failed to withdraw application. Please try again.",
          variant: "danger",
        });
      } finally {
        setIsWithdrawingLoading(false);
      }
    }, 1000);
  };

  // Listen for consultant status changes in realtime
  useEffect(() => {
    if (!uuid) return;
    const channel = supabase
      .channel(`consultant-status-${uuid}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "consultants",
          filter: `uuid=eq.${uuid}`,
        },
        (event) => {
          if (event.eventType === "DELETE") setIsConsultant(false);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [uuid]);

  return (
    <>
    <Column fillWidth horizontal="start" vertical="start" gap="20">
      <Text onBackground="neutral-strong" style={{ fontSize: "16px", marginBottom: "12px" }}>
        Personal details
      </Text>
      <ProfileRow label="Full name:">
        <Input
          id="input-fullname"
          spellCheck={false}
          height="m"
          placeholder="Full Name"
          value={form.fullName}
          onChange={(e: any) => onChange("fullName", e.target.value)}
          disabled={!isCurrentUser}
        />
      </ProfileRow>
      <ProfileRow label="Short Introduction:">
        <Textarea
          id="input-intro"
          placeholder="Write here"
          resize="none"
          maxLength={60}
          value={form.introduction}
          onChange={(e: any) => onChange("introduction", e.target.value)}
          disabled={!isCurrentUser}
        />
      </ProfileRow>
      <ProfileRow label="Gender:">
        <Select
          height="m"
          id="gender-select"
          placeholder="Choose your gender"
          value={form.gender}
          options={genderOptions}
          onSelect={(v: any) => onChange("gender", v)}
          disabled={!isCurrentUser}
        />
      </ProfileRow>
      <ProfileRow label="Country:">
        <Select
          height="m"
          searchable
          id="country-select"
          placeholder="Where do you reside?"
          value={form.country}
          options={countries}
          onSelect={(v: any) => onChange("country", v)}
          disabled={!isCurrentUser}
        />
      </ProfileRow>
      {isCurrentUser && (
        <ProfileRow label="Email:">
          <Input
            id="input-email"
            height="m"
            spellCheck={false}
            description={
              <Text onBackground="neutral-weak">
                <i className="ri-information-line"></i>&nbsp;Your email will be used for account verification and notifications.
              </Text>
            }
            disabled
            placeholder="Your email id"
            value={form.email}
            onChange={(e: any) => onChange("email", e.target.value)}
          />
        </ProfileRow>
      )}
      {isCurrentUser && (
        <ProfileRow label="Account visiblity:">
          <Switch
            label={
              <Text onBackground="neutral-weak" variant="label-default-m">
                {form.accountVisibility ? "Public" : "Private"}
              </Text>
            }
            isChecked={form.accountVisibility}
            onToggle={() => onChange("accountVisibility", !form.accountVisibility)}
            disabled={!isCurrentUser}
          />
        </ProfileRow>
      )}
      {isCurrentUser && (
        <>
          <ProfileRow label="Apply for consultant:">
            {!isConsultant ? (
              <Flex>
                <Button size="m" onClick={() => setIsConsultantDialog(true)}>
                  Click to apply
                </Button>
                {isNotification && <StatusIndicator color="yellow" size="m" />}
              </Flex>
            ) : (
              <Row gap="8" fitHeight>
                <Tag variant="gradient">You are a consultant!</Tag>
                <Button size="m" weight="default" onClick={withdrawCurrentApplication}>
                  {isWithdrawingLoading ? (
                    <>
                      Withdrawing...&nbsp;
                      <Spinner size="s" />
                    </>
                  ) : (
                    "Withdraw"
                  )}
                </Button>
              </Row>
            )}
          </ProfileRow>
          <Dialog
            isOpen={isConsultantDialog}
            onClose={() => setIsConsultantDialog(false)}
            title="Consultant Application"
            description="Please fill out the form to apply for consultant status."
            footer={
              <Row fillWidth horizontal="start" vertical="center">
                <Text variant="label-default-xs" onBackground="neutral-weak" style={{ fontSize: "13px" }}>
                  <i className="ri-information-line"></i>&nbsp; Please fill out the form to apply for consultant status.
                </Text>
              </Row>
            }
          >
            <Column fillWidth gap="16" marginTop="16">
              {errorText && <Feedback variant="danger" title="Error" description={errorText} />}
              {hasSubmitted && !errorText && (
                <Feedback variant="info" title="Reviewing" description={"Application is under review."} />
              )}
              <Column fillWidth vertical="center" gap="4">
                <Textarea
                  spellCheck={false}
                  id="consultant-application"
                  placeholder="Provide a brief explanation of your motivation and qualifications."
                  description={
                    <>
                      <i className="ri-information-line"></i>&nbsp; Your response will be reviewed by our team.
                    </>
                  }
                  value={formData.motivation}
                  onChange={(e: any) => setFormData((prev) => ({ ...prev, motivation: e.target.value }))}
                  lines={7}
                />
              </Column>
              <Column fillWidth vertical="center" gap="4">
                <DateInput
                  id="date-dob"
                  height="m"
                  placeholder="When were you born?"
                  cursor="interactive"
                  value={formData.dob === null ? undefined : formData.dob}
                  onChange={(v: Date | null) => setFormData((prev) => ({ ...prev, dob: v }))}
                  description={
                    <Text onBackground="neutral-weak">
                      <i className="ri-information-line"></i>&nbsp;Enter your date of birth.
                    </Text>
                  }
                />
              </Column>
              <Row fillWidth vertical="center" gap="4">
                <Select
                  height="m"
                  searchable
                  id="country-select"
                  placeholder="Where do you reside?"
                  value={form.country}
                  options={countries}
                  onSelect={(v: any) => onChange("country", v)}
                  disabled
                />
                <Input
                  id="input-phone"
                  height="m"
                  spellCheck={false}
                  placeholder="Enter your phone number"
                  value={formData.phoneNumber}
                  onChange={(e: any) => setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }))}
                />
              </Row>
              <Column fillWidth vertical="start" gap="16">
                <Textarea
                  id="textarea-address"
                  placeholder="Where do you live?"
                  resize="vertical"
                  description={
                    <Text onBackground="neutral-weak">
                      <i className="ri-information-line"></i>&nbsp;Your address will not be shared with anyone.
                    </Text>
                  }
                  value={formData.address}
                  onChange={(e: any) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                />
              </Column>
              <Column fillWidth vertical="center" gap="4">
                <TagInput
                  id=""
                  value={eduCodes}
                  onChange={(v: string[]) => setEduCodes(v)}
                  placeholder="Enter institute code(s)"
                  hasSuffix={
                    <Kbd position="absolute" top="12" right="12">
                      Enter
                    </Kbd>
                  }
                  description={
                    <Text onBackground="neutral-weak">
                      <i className="ri-question-line"></i>&nbsp;Click
                      <SmartLink href="/edu/codes">here</SmartLink> to find the codes.
                    </Text>
                  }
                />
              </Column>
              <Row fillWidth horizontal="end" gap="4">
                {hasSubmitted && (
                  <Button onClick={withdrawCurrentApplication}>Withdraw Application</Button>
                )}
                <Button
                  onClick={handleConsultantApplication}
                  disabled={
                    eduCodes.length === 0 ||
                    !formData.motivation.trim() ||
                    !formData.dob ||
                    !formData.phoneNumber ||
                    !formData.address
                  }
                >
                  {loading ? (
                    <>
                      Sending...&nbsp;
                      <Spinner size="s" />
                    </>
                  ) : (
                    "Send for review"
                  )}
                </Button>
              </Row>
            </Column>
          </Dialog>
        </>
      )}
    </Column>
    </>
  );
}

// --- Account Details ---
function AccountDetails({
  form,
  onChange,
  isCurrentUser,
}: {
  form: UserProfile;
  onChange: (field: keyof UserProfile, value: any) => void;
  isCurrentUser: boolean;
}) {
  return (
    <Column fillWidth horizontal="start" vertical="start" gap="20">
      <Text onBackground="neutral-strong" style={{ fontSize: "16px", marginBottom: "12px" }}>
        Account Details
      </Text>
      <ProfileRow label="User Name:">
        <Input
          placeholder="Enter your username"
          spellCheck={false}
          description={
            isCurrentUser ? (
              <Text onBackground="neutral-weak">
                <i className="ri-information-line"></i>&nbsp;Your username will be visible to other users.
              </Text>
            ) : undefined
          }
          hasSuffix={
            isCurrentUser ? (
              <Kbd cursor="interactive" onClick={() => {}}>
                Change
              </Kbd>
            ) : undefined
          }
          id="input-username"
          value={form.userName}
          onChange={(e: any) => onChange("userName", e.target.value)}
          disabled={!isCurrentUser}
        />
      </ProfileRow>
      <ProfileRow label="Account Created:">
        <DateInput
          id="date-account-created"
          placeholder="July 2, 2025"
          height="m"
          value={form.accountCreated === null ? undefined : form.accountCreated}
          onChange={(v: Date | null) => onChange("accountCreated", v)}
          disabled
        />
      </ProfileRow>
      <ProfileRow label="Last Login:">
        <DateInput
          id="date-last-login"
          placeholder="July 2, 2025"
          height="m"
          value={form.lastLogin === null ? undefined : form.lastLogin}
          onChange={(v: Date | null) => onChange("lastLogin", v)}
          disabled
        />
      </ProfileRow>
      {isCurrentUser && (
        <ProfileRow label="Membership Status:">
          <Select
            height="m"
            disabled
            id="membership-select"
            placeholder="Active"
            value={form.membershipStatus}
            options={membershipOptions}
            onSelect={(v: any) => onChange("membershipStatus", v)}
          />
        </ProfileRow>
      )}
      {isCurrentUser && (
        <ProfileRow label="Account Verification:">
          <Tag variant="gradient">Verified</Tag>
        </ProfileRow>
      )}
      <ProfileRow label="Language Preference:">
        <Select
          height="m"
          id="language-select"
          placeholder="Select your language"
          value={form.languagePreference}
          options={languageOptions}
          onSelect={(v: any) => onChange("languagePreference", v)}
          disabled={!isCurrentUser}
        />
      </ProfileRow>
      <ProfileRow label="Time Zone:">
        <Select
          height="m"
          id="timezone-select"
          placeholder="Select your time zone"
          searchable
          value={form.timezone}
          options={timezoneOptions}
          onSelect={(v: any) => onChange("timezone", v)}
          disabled={!isCurrentUser}
        />
      </ProfileRow>
    </Column>
  );
}

// --- Profile Row ---
function ProfileRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Row fillWidth horizontal="space-between">
      <Flex flex={5}>
        <Text onBackground="neutral-weak" style={{ fontSize: "14px" }}>
          {label}
        </Text>
      </Flex>
      <Flex flex={7}>{children}</Flex>
    </Row>
  );
}

// --- Created Institutions ---
function CreatedInstitutions({
  institutions,
  onPublish,
  onCreate,
  isCurrentUser,
}: {
  institutions: Institution[];
  onPublish: (institutionId: string, isPublished: boolean) => void;
  onCreate: (newInstitution: InstitutionInput) => void;
  isCurrentUser: boolean;
}) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const [newInstitution, setNewInstitution] = useState<InstitutionInput>({
    name: "",
    type: "",
    affiliation: [],
    phoneNumber: "",
    email: "",
    city: "",
    country: "",
  });

  const [terms, setTerms] = useState([
    { id: 1, label: "Terms of Service", checked: false },
    { id: 2, label: "Privacy Policy", checked: false },
    { id: 3, label: "Cookie Policy", checked: false },
    { id: 4, label: "Community Guidelines", checked: false },
  ]);
  const allChecked = terms.every((t) => t.checked);
  const someChecked = terms.some((t) => t.checked);
  const isIndeterminate = someChecked && !allChecked;

  const handleTermToggle = (id: number) => {
    setTerms((prev) =>
      prev.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t))
    );
  };
  const handleAllTermsToggle = () => {
    setTerms((prev) => prev.map((t) => ({ ...t, checked: !allChecked })));
  };

  const handleCreate = async () => {
    setIsCreating(true);
    onCreate(newInstitution);
    setIsCreating(false);
    setIsDialogOpen(false);
    setIsTermsOpen(false);
    setNewInstitution({
      name: "",
      type: "",
      affiliation: [],
      phoneNumber: "",
      email: "",
      city: "",
      country: "",
    });
    setTerms(terms.map((t) => ({ ...t, checked: false })));
  };

  // Filter institutions by search
  const filteredInstitutions =
    searchValue.trim() !== ""
      ? institutions.filter((inst) =>
          inst.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      : institutions;

  return (
    <>
      <Column fillWidth horizontal="center" gap="32">
        <Row fillWidth gap="4">
          <Input
            id="input-1"
            placeholder="Search by Institution Name"
            height="m"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            hasPrefix={<i className="ri-search-line" />}
            hasSuffix={
              searchValue.length > 0 ? (
                <IconButton
                  variant="ghost"
                  icon="close"
                  size="s"
                  onClick={() => setSearchValue("")}
                  aria-label="Clear search"
                />
              ) : null
            }
          />
          {isCurrentUser && (
            <Button
              weight="default"
              variant="primary"
              size="l"
              onClick={() => setIsDialogOpen(true)}
            >
              New
            </Button>
          )}
        </Row>
        {filteredInstitutions.length === 0 ? (
          <Flex fillWidth center paddingY="32">
            <Text onBackground="neutral-medium">No institution found.</Text>
          </Flex>
        ) : (
          <Grid fillWidth fitHeight columns={2} gap="4">
            {filteredInstitutions.map((inst) => (
              <InstitutionCard
                key={inst.id}
                institution={inst}
                onPublish={onPublish}
                isCurrentUser={isCurrentUser}
              />
            ))}
          </Grid>
        )}
      </Column>
      {/* Create Institution Dialog */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Create new Institution"
        description="Fill in the details to create a new institution."
        base={isTermsOpen}
        footer={
          <Row fillWidth horizontal="start" vertical="center">
            <Text variant="label-default-xs" onBackground="neutral-weak" style={{ fontSize: "13px" }}>
              <i className="ri-information-line"></i>&nbsp;These details are required to verify your institution and create a new page for it.
            </Text>
          </Row>
        }
      >
        <Column fillWidth gap="16" marginTop="12">
          <Row fillWidth vertical="center" gap="8">
            <Input
              id="name"
              spellCheck={false}
              label="e.g. ABC School"
              description={
                <>
                  <i className="ri-information-line"></i>&nbsp;Enter the name of your institution
                </>
              }
              value={newInstitution.name}
              onChange={(e: any) => setNewInstitution((prev) => ({ ...prev, name: e.target.value }))}
              disabled={!isCurrentUser}
            />
          </Row>
          <Row fillWidth vertical="center" gap="8">
            <Input
              spellCheck={false}
              id="city"
              label="e.g. Vadodara"
              description={
                <>
                  <i className="ri-information-line"></i>&nbsp;Enter the city
                </>
              }
              value={newInstitution.city}
              onChange={(e: any) => setNewInstitution((prev) => ({ ...prev, city: e.target.value }))}
              disabled={!isCurrentUser}
            />
            <Input
              spellCheck={false}
              id="country"
              label="e.g. India"
              description={
                <>
                  <i className="ri-information-line"></i>&nbsp;Enter the country
                </>
              }
              value={newInstitution.country}
              onChange={(e: any) => setNewInstitution((prev) => ({ ...prev, country: e.target.value }))}
              disabled={!isCurrentUser}
            />
          </Row>
          <Row fillWidth vertical="center" gap="8">
            <Input
              id="type"
              label="e.g. School/Tuition"
              spellCheck={false}
              description={
                <>
                  <i className="ri-information-line"></i>&nbsp;Enter the type of your institution
                </>
              }
              value={newInstitution.type}
              onChange={(e: any) => setNewInstitution((prev) => ({ ...prev, type: e.target.value }))}
              disabled={!isCurrentUser}
            />
          </Row>
          <Row fillWidth vertical="center" gap="8">
            <TagInput
              id="affiliation"
              value={newInstitution.affiliation}
              onChange={(tags: string[]) => setNewInstitution((prev) => ({ ...prev, affiliation: tags }))}
              placeholder="e.g. ICSE/CBSE/IB"
              hasSuffix={
                <Kbd position="absolute" top="12" right="12">
                  Enter
                </Kbd>
              }
              disabled={!isCurrentUser}
            />
          </Row>
          <Row fillWidth vertical="center" gap="8">
            <Input
              id="phone"
              label="e.g. 1234567890"
              spellCheck={false}
              description={
                <>
                  <i className="ri-information-line"></i>&nbsp;Enter the institution's phone number
                </>
              }
              value={newInstitution.phoneNumber}
              onChange={(e: any) => setNewInstitution((prev) => ({ ...prev, phoneNumber: e.target.value }))}
              disabled={!isCurrentUser}
            />
          </Row>
          <Row fillWidth vertical="center" gap="8">
            <Input
              id="email"
              label="e.g. ABCschool@edu.in"
              spellCheck={false}
              description={
                <>
                  <i className="ri-information-line"></i>&nbsp;Enter the institution's email address
                </>
              }
              value={newInstitution.email}
              onChange={(e: any) => setNewInstitution((prev) => ({ ...prev, email: e.target.value }))}
              disabled={!isCurrentUser}
            />
          </Row>
          <Row fillWidth vertical="center" horizontal="end" gap="8">
            <Button
              size="m"
              onClick={() => setIsTermsOpen(true)}
              disabled={
                !isCurrentUser ||
                !newInstitution.name ||
                !newInstitution.affiliation.length ||
                !newInstitution.phoneNumber ||
                !newInstitution.email ||
                !newInstitution.type ||
                !newInstitution.city
              }
            >
              Next
            </Button>
          </Row>
        </Column>
      </Dialog>
      {/* Terms Dialog */}
      <Dialog
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        title="Terms and Policies"
        description="Check the boxes and click on 'Create' to create a new institution."
        stack
        footer={
          <Row fillWidth horizontal="start" vertical="center">
            <Text variant="label-default-xs" onBackground="neutral-weak" style={{ fontSize: "13px" }}>
              <i className="ri-information-line"></i>&nbsp;These details are required to verify your institution and create a new page for it.
            </Text>
          </Row>
        }
      >
        <Column fillWidth gap="16" marginTop="12">
          <Checkbox
            label="Select All"
            description="By checking this box, you agree to accept all terms and policies."
            isChecked={allChecked || isIndeterminate}
            isIndeterminate={isIndeterminate}
            onToggle={handleAllTermsToggle}
            style={{ width: "100%", marginBottom: "12px" }}
            disabled={!isCurrentUser}
          />
          <Column fillWidth vertical="center" horizontal="end" gap="12">
            {terms.map((item) => (
              <Checkbox
                style={{ width: "100%" }}
                key={item.id}
                label={item.label}
                isChecked={item.checked}
                onToggle={() => handleTermToggle(item.id)}
                disabled={!isCurrentUser}
              />
            ))}
          </Column>
          <Row fillWidth vertical="center" horizontal="end" gap="8">
            <Button
              size="m"
              onClick={handleCreate}
              disabled={!allChecked || isCreating || !isCurrentUser}
            >
              {isCreating ? (
                <>
                  <Spinner size="s" />
                  &nbsp;Creating...
                </>
              ) : (
                "Create"
              )}
            </Button>
          </Row>
        </Column>
      </Dialog>
    </>
  );
}

// --- Institution Card ---
function InstitutionCard({
  institution,
  onPublish,
  isCurrentUser,
}: {
  institution: Institution;
  onPublish: (institutionId: string, isPublished: boolean) => void;
  isCurrentUser: boolean;
}) {
  const [published, setPublished] = useState(institution.isPublished);
  const router = useRouter();

  const handleToggle = () => {
    setPublished((prev) => {
      onPublish(institution.id, !prev);
      return !prev;
    });
  };

  if (!isCurrentUser && !published) return null;

  return (
    <Card
      fillWidth
      horizontal="start"
      vertical="start"
      gap="20"
      direction="column"
      padding="m"
      radius="m"
      style={{ border: "none" }}
      background="transparent"
      id={institution.name.toLowerCase().replace(/\s+/g, "-").trim() + "-card"}
    >
      <Row gap="12" vertical="center">
        <Text onBackground="neutral-strong" style={{ fontSize: "18px" }}>
          {institution.name}
        </Text>
        <IconButton
          variant="secondary"
          onClick={() => router.push(`/edu/${institution.id}`)}
        >
          <i className="ri-arrow-right-up-line" style={{ fontSize: "23px" }}></i>
        </IconButton>
      </Row>
      {isCurrentUser && (
        <InstitutionRow label="Is published?">
          <Switch isChecked={published} onToggle={handleToggle} />
        </InstitutionRow>
      )}
    </Card>
  );
}

// --- Institution Row ---
function InstitutionRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <>
    <Row fillWidth horizontal="space-between">
      <Flex flex={5}>
        <Text onBackground="neutral-weak" style={{ fontSize: "14px" }}>
          {label}
        </Text>
      </Flex>
      <Flex flex={7}>
        <Text onBackground="neutral-weak" style={{ fontSize: "14px" }}>
          {children}
        </Text>
      </Flex>
    </Row>
    </>
  );
}

// --- Socials Section ---
function Socials({
  socials,
  onSave,
  isCurrentUser,
}: {
  socials: UserSocials;
  onSave: (socials: UserSocials) => void;
  isCurrentUser: boolean;
}) {
  const [form, setForm] = useState<UserSocials>(socials);
  const [loading, setLoading] = useState(false);

  useEffect(() => setForm(socials), [socials]);

  const handleChange = (field: keyof UserSocials, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    await onSave(form);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <>
      <Grid fillWidth padding="m" fitHeight columns={2} gap="104">
        <SocialsSection
          title="Social Details"
          rows={[
            {
              label: "Phone Number:",
              input: (
                <Input
                  placeholder="Enter your phone number"
                  spellCheck={false}
                  description={
                    isCurrentUser ? (
                      <Text onBackground="neutral-weak">
                        <i className="ri-information-line"></i>&nbsp;This will be visible to other users. (optional)
                      </Text>
                    ) : undefined
                  }
                  id="input-delete-account"
                  value={form.phone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("phone", e.target.value)}
                  disabled={!isCurrentUser}
                />
              ),
            },
            {
              label: "Public Email:",
              input: (
                <Input
                  placeholder="Enter your email"
                  spellCheck={false}
                  hasPrefix={
                    <Text onBackground="neutral-medium">
                      <i className="ri-at-line"></i>
                    </Text>
                  }
                  description={
                    isCurrentUser ? (
                      <Text onBackground="neutral-weak">
                        <i className="ri-information-line"></i>&nbsp;This will be visible to other users.
                      </Text>
                    ) : undefined
                  }
                  id="input-email-socials"
                  value={form.email}
                  onChange={(e: any) => handleChange("email", e.target.value)}
                  disabled={!isCurrentUser}
                />
              ),
            },
          ]}
        />
        <SocialsSection
          title="Social Media"
          rows={[
            {
              label: "WhatsApp Number:",
              input: (
                <Input
                  placeholder="Enter your WhatsApp number"
                  spellCheck={false}
                  id="input-whatsapp"
                  description={
                    isCurrentUser ? (
                      <Text onBackground="neutral-weak">
                        <i className="ri-information-line"></i>&nbsp;This will be visible to other users.
                      </Text>
                    ) : undefined
                  }
                  value={form.whatsapp}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("whatsapp", e.target.value)}
                  disabled={!isCurrentUser}
                />
              ),
            },
            {
              label: "Instagram:",
              input: (
                <Input
                  placeholder="username"
                  spellCheck={false}
                  id="input-instagram"
                  hasPrefix={
                    <Text onBackground="neutral-medium">instagram.com/</Text>
                  }
                  description={
                    isCurrentUser ? (
                      <Text onBackground="neutral-weak">
                        <i className="ri-information-line"></i>&nbsp;This will be visible to other users.
                      </Text>
                    ) : undefined
                  }
                  value={form.instagram}
                  onChange={(e: any) => handleChange("instagram", e.target.value)}
                  disabled={!isCurrentUser}
                />
              ),
            },
            {
              label: "LinkedIn:",
              input: (
                <Input
                  placeholder="username"
                  spellCheck={false}
                  id="input-linkedin"
                  hasPrefix={
                    <Text onBackground="neutral-medium">linkedin.com/in/</Text>
                  }
                  description={
                    isCurrentUser ? (
                      <Text onBackground="neutral-weak">
                        <i className="ri-information-line"></i>&nbsp;This will be visible to other users.
                      </Text>
                    ) : undefined
                  }
                  value={form.linkedin}
                  onChange={(e: any) => handleChange("linkedin", e.target.value)}
                  disabled={!isCurrentUser}
                />
              ),
            },
          ]}
        />
      </Grid>
      {isCurrentUser && (
        <Row paddingY="12" fillWidth horizontal="end">
          <Button size="m" onClick={handleSave} disabled={loading}>
            {loading ? (
              <>
                Saving...&nbsp;
                <Spinner size="s" />
              </>
            ) : (
              "Save all"
            )}
          </Button>
        </Row>
      )}
    </>
  );
}

// --- Socials Section Helper ---
function SocialsSection({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; input?: React.ReactNode }[];
}) {
  return (
    <Column fillWidth horizontal="start" vertical="start" gap="20">
      <Text onBackground="neutral-strong" style={{ fontSize: "16px", marginBottom: "12px" }}>
        {title}
      </Text>
      {rows.map((row) => (
        <Row fillWidth horizontal="space-between" key={row.label}>
          <Flex flex={5}>
            <Text onBackground="neutral-weak" style={{ fontSize: "14px" }}>
              {row.label}
            </Text>
          </Flex>
          <Flex flex={7} direction="column" horizontal="end" gap="4">
            {row.input}
          </Flex>
        </Row>
      ))}
    </Column>
  );
}

// --- Security Section ---
function Security() {
  const [loading, setLoading] = useState(false);

  async function logoutSupabase() {
    setLoading(true);
    setTimeout(async () => {
      const { error } = await supabase.auth.signOut();
      if (!error) window.location.href = "/";
      setLoading(false);
    }, 1000);
  }

  return (
    <>
    <Grid fillWidth padding="m" fitHeight columns={2} gap="104">
      <Column fillWidth horizontal="start" vertical="start" gap="20">
        <Text onBackground="neutral-strong" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Account Deletion
        </Text>
        <Row fillWidth horizontal="space-between">
          <Flex flex={5}>
            <Text onBackground="neutral-weak" style={{ fontSize: "14px" }}>
              Delete Account?
            </Text>
          </Flex>
          <Flex flex={7} direction="column" horizontal="end" gap="4">
            <Input
              placeholder="Enter your username"
              spellCheck={false}
              disabled
              description={
                <Text onBackground="neutral-weak">
                  <i className="ri-information-line"></i>&nbsp;This is a safety feature
                </Text>
              }
              hasSuffix={<Kbd>Once</Kbd>}
              id="input-delete-account"
              value=""
              onChange={() => {}}
            />
            <Button variant="primary" size="m">
              Delete
            </Button>
          </Flex>
        </Row>
      </Column>
      <Column fillWidth horizontal="start" vertical="start" gap="20">
        <Text onBackground="neutral-strong" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Institutions Deletion
        </Text>
        <Row fillWidth horizontal="space-between">
          <Flex flex={5}>
            <Text onBackground="neutral-weak" style={{ fontSize: "14px" }}>
              Delete all Institutions?
            </Text>
          </Flex>
          <Flex flex={7} direction="column" horizontal="end" gap="4">
            <Input
              placeholder="Enter your username"
              spellCheck={false}
              disabled
              description={
                <Text onBackground="neutral-weak">
                  <i className="ri-information-line"></i>&nbsp;This is a safety feature
                </Text>
              }
              hasSuffix={<Kbd>Once</Kbd>}
              id="input-delete-institutions"
              value=""
              onChange={() => {}}
            />
            <Button variant="primary" disabled size="m">
              Delete
            </Button>
          </Flex>
        </Row>
      </Column>
      <Column fillWidth horizontal="start" vertical="start" gap="20">
        <Text onBackground="neutral-strong" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Others
        </Text>
        <Row fillWidth horizontal="space-between">
          <Flex flex={5}>
            <Text onBackground="neutral-weak" style={{ fontSize: "14px" }}>
              Export all your data?
            </Text>
          </Flex>
          <Flex flex={7} direction="column" horizontal="end" gap="4">
            <Button variant="primary" size="m" disabled>
              Export
            </Button>
          </Flex>
        </Row>
        <Row fillWidth horizontal="space-between">
          <Flex flex={5}>
            <Text onBackground="neutral-weak" style={{ fontSize: "14px" }}>
              Request total data deletion?
            </Text>
          </Flex>
          <Flex flex={7} direction="column" horizontal="end" gap="4">
            <Button variant="primary" size="m">
              Request
            </Button>
          </Flex>
        </Row>
        <Row fillWidth horizontal="space-between">
          <Flex flex={5}>
            <Text onBackground="neutral-weak" style={{ fontSize: "14px" }}>
              Logout from current device?
            </Text>
          </Flex>
          <Flex flex={7} direction="column" horizontal="end" gap="4">
            <Button
              variant="primary"
              size="m"
              onClick={logoutSupabase}
              disabled={loading}
            >
              {loading ? (
                <>
                  Executing...&nbsp;
                  <Spinner size="s" />
                </>
              ) : (
                "Logout"
              )}
            </Button>
          </Flex>
        </Row>
      </Column>
    </Grid>
    </>
  );
}
