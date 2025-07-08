"use client";
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
} from "@once-ui-system/core";
import {
  Lato,
  Montserrat,
  Montserrat_Alternates,
  Outfit,
  Unica_One,
  Work_Sans,
  Poppins,
  Inter,
  Roboto,
  Open_Sans,
} from "next/font/google";
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@once-ui-system/core";
import NavBar from "./../../components/NavBar";
import Footer from "./../../components/Footer";
import { supabase } from "@/app/utils/supabase/client";

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
const segmentedTabs = [
  { value: "profile", label: "Profile" },
  { value: "socials", label: "Socials" },
  { value: "creations", label: "Your creations" },
  { value: "security", label: "Security" },
];
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
const languageOptions = [{ label: "English", value: "English" }];
const timezoneOptions = [{ label: "GMT +5:30", value: "GMT +5:30" }];
const countries = [
  { label: "Afghanistan", value: "AF" },
  { label: "Albania", value: "AL" },
  // ... (keep all countries as in original)
  { label: "Zimbabwe", value: "ZW" },
];

// --- Main Page ---
export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [uuid, setUuid] = useState<string | undefined>(undefined);

  // Loading states for each section
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingSocials, setLoadingSocials] = useState(true);
  const [loadingInstitutions, setLoadingInstitutions] = useState(true);
  const [loadingSecurity, setLoadingSecurity] = useState(false); // Security is static

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

  // Fetch all user data at once
  const fetchAllUserData = useCallback(async (uuid: string) => {
    setLoadingProfile(false); //true earlier and when save all disappear
    setLoadingSocials(false); //true earlier and when save all disappear
    setLoadingInstitutions(true); //true earlier and when save all disappear

    // Fetch profile, socials, and institutions in parallel
    const [
      { data: profileData, error: profileError },
      { data: socialsData, error: socialsError },
      { data: institutionsData, error: institutionsError },
      { data: sessionData },
    ] = await Promise.all([
      supabase
        .from("user_profiles")
        .select(
          "profile_details, username, joined_at, last_login, primary_email, is_public, pfp, count"
        )
        .eq("uuid", uuid)
        .maybeSingle(),
      supabase
        .from("user_profiles")
        .select("socials")
        .eq("uuid", uuid)
        .maybeSingle(),
      supabase
        .from("edu_centers")
        .select("edu_id, basic_info, is_published, uuid")
        .eq("uuid", uuid),
      supabase.auth.getSession(),
    ]);

    // Prepare profile
    let profile: UserProfile | null = null;
    if (profileData) {
      const pd = profileData.profile_details || {};
      profile = {
        fullName: pd.fullName ?? "",
        introduction: pd.introduction ?? "",
        dob: pd.dob ? new Date(pd.dob) : null,
        gender: pd.gender ?? "none",
        country: pd.country ?? "",
        address: pd.address ?? "",
        phoneNumber: pd.phoneNumber ?? "",
        email: profileData.primary_email ?? "",
        accountVisibility: profileData.is_public ?? false,
        userName: profileData.username ?? "",
        accountCreated: profileData.joined_at
          ? new Date(profileData.joined_at)
          : null,
        lastLogin: profileData.last_login
          ? new Date(profileData.last_login)
          : null,
        membershipStatus: pd.membershipStatus ?? "A",
        languagePreference: pd.languagePreference ?? "English",
        timezone: pd.timezone ?? "Select timezone",
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
        name: row.basic_info?.name || "",
        address: row.basic_info?.city || "",
        affiliation: row.basic_info?.affiliation || "",
        contact: row.basic_info?.phone_number || "",
        email: row.basic_info?.email || "",
        isPublished: row.is_published || false,
        uuid: row.uuid || "",
      }));
    }

    // Check if current user
    const sessionUserId = sessionData?.session?.user?.id;
    const isCurrentUser = sessionUserId === uuid;

    setUserData({
      profile,
      socials,
      institutions,
      isCurrentUser,
    });

    setLoadingProfile(false);
    setLoadingSocials(false);
    setTimeout(() => {
      setLoadingInstitutions(false);
    }, 1000);
  }, []);

  // On mount, set uuid and fetch all data
  useEffect(() => {
    const id = getUuidFromUrl();
    setUuid(id);
    if (id) fetchAllUserData(id);
  }, [fetchAllUserData]);


  // --- Realtime subscription for user profile ---
  useEffect(() => {
    if (!uuid) return;
    // Subscribe to changes in user_profiles for this uuid
    const channel = supabase
      .channel(`user-profile-${uuid}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_profiles',
          filter: `uuid=eq.${uuid}`,
        },
        (payload) => {
          fetchAllUserData(uuid);
        }
      )
      .subscribe();

    // Subscribe to changes in edu_centers for this uuid
    const eduChannel = supabase
      .channel(`edu-centers-${uuid}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'edu_centers',
          filter: `uuid=eq.${uuid}`,
        },
        (payload) => {
          fetchAllUserData(uuid);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      supabase.removeChannel(eduChannel);
    };
  }, [uuid, fetchAllUserData]);
  // Save profile handler
  const handleSaveProfile = async (profile: UserProfile) => {
    if (!uuid) return;
    // setLoadingProfile(true); // REMOVE THIS LINE
    const profileDetails = {
      fullName: profile.fullName,
      introduction: profile.introduction,
      dob: profile.dob ? profile.dob.toISOString() : null,
      gender: profile.gender,
      country: profile.country,
      address: profile.address,
      phoneNumber: profile.phoneNumber,
      email: profile.email,
      membershipStatus: profile.membershipStatus,
      languagePreference: profile.languagePreference,
      timezone: profile.timezone,
    };
    const { error } = await supabase
      .from("user_profiles")
      .update({
        profile_details: profileDetails,
        username: profile.userName,
        is_public: profile.accountVisibility,
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
    // setLoadingProfile(false); // REMOVE THIS LINE
  };

  // Save socials handler
  const handleSaveSocials = async (socials: UserSocials) => {
    if (!uuid) return;
    // setLoadingSocials(true); // REMOVE THIS LINE
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
    // setLoadingSocials(false); // REMOVE THIS LINE
  };

  // Save institution publish status
  const handlePublishInstitution = async (
    institutionId: string,
    isPublished: boolean
  ) => {
    if (!uuid) return;
    // setLoadingInstitutions(true); // REMOVE THIS LINE
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
    // setLoadingInstitutions(false); // REMOVE THIS LINE
  };

  // Create new institution
  const handleCreateInstitution = async (newInstitution: InstitutionInput) => {
    if (!uuid) return;
    // setLoadingInstitutions(true); // REMOVE THIS LINE
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
          affiliation: newInstitution.affiliation.trim(),
          phone_number: newInstitution.phoneNumber.trim(),
          email: newInstitution.email.trim(),
          city: newInstitution.city.trim(),
        },
        is_published: false,
        uuid,
        edu_url_name: urlName,
      },
    ]);
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
    // setLoadingInstitutions(false); // REMOVE THIS LINE
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
      <Column
        style={{ maxWidth: "1550px" }}
        fillWidth
        fitHeight
        horizontal="center"
      >
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
              />
            ))}
          {activeTab === "security" &&
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
              <Socials socials={userData.socials} onSave={handleSaveSocials} />
            ) : null)}
          <Flex fillWidth height={3}></Flex>
        </Column>
      </Column>
      <Flex fillWidth height={3}></Flex>
      <Footer />
    </Column>
  );
}

// --- Types ---
type UserProfile = {
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
  name: string;
  address: string;
  affiliation: string;
  contact: string;
  email: string;
  isPublished: boolean;
  id: string;
  uuid: string;
};
type InstitutionInput = {
  name: string;
  type: string;
  affiliation: string;
  phoneNumber: string;
  email: string;
  city: string;
};

// --- Profile Header ---
function ProfileHeader({
  dmsansClass,
  activeTab,
  setActiveTab,
  profile,
}: {
  dmsansClass: string;
  activeTab: string;
  setActiveTab: (v: string) => void;
  profile: UserProfile | null;
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
          <Row center gap="8" fillWidth>
            <Skeleton shape="line" delay="1" width="s" height="xl" />
          </Row>
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
        <Row center gap="8">
          {profile?.fullName}
          {profile && (
            <>
              <Line vert width={0.1} height={2.5} background="neutral-medium" />
              <Text
                style={{
                  fontSize: "21px",
                  fontWeight: "500",
                }}
                onBackground="neutral-weak"
                className={dmsansClass}
              >
                <Kbd>#{profile?.count}</Kbd>
              </Text>
            </>
          )}
        </Row>
      </Text>
      <Text onBackground="neutral-weak" style={{ fontSize: "14px" }}>
        {profile?.introduction}
      </Text>
      <Flex fillWidth center paddingY="8">
        <SegmentedControl
          fillWidth={true}
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

  useEffect(() => {
    setForm(profile);
  }, [profile]);

  const handleChange = (field: keyof UserProfile, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const [loading, setLoading] = useState(false);
  return (
    <>
      <Grid fillWidth padding="m" fitHeight columns={2} gap="104">
        <PersonalDetails
          countries={countries}
          form={form}
          onChange={handleChange}
        />

        <AccountDetails form={form} onChange={handleChange} />
      </Grid>
      <Row paddingY="12" fillWidth horizontal="end">
        <Button
          size="m"
          onClick={() => {
            setLoading(true);
            onSave(form);
            setTimeout(() => {
              setLoading(false);
            }, 1000); // Simulate network delay
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
    </>
  );
}

function PersonalDetails({
  countries,
  form,
  onChange,
}: {
  countries: { label: string; value: string }[];
  form: UserProfile;
  onChange: (field: keyof UserProfile, value: any) => void;
}) {
  return (
    <Column fillWidth horizontal="start" vertical="start" gap="20">
      <Text
        onBackground="neutral-strong"
        style={{ fontSize: "16px", marginBottom: "12px" }}
      >
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
        />
      </ProfileRow>

      <ProfileRow label="Short Introduction:">
        <Textarea
          id="input-intro"
          placeholder="Write here"
          resize="none"
          maxLength={30}
          value={form.introduction}
          onChange={(e: any) => onChange("introduction", e.target.value)}
        />
      </ProfileRow>
      <ProfileRow label="Date of Birth:">
        <DateInput
          id="date-dob"
          height="m"
          placeholder="When were you born?"
          cursor="interactive"
          value={form.dob === null ? undefined : form.dob}
          onChange={(v: Date | null) => onChange("dob", v)}
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
        />
      </ProfileRow>
      <ProfileRow label="Country:">
        <Select
          height="m"
          searchable={true}
          id="country-select"
          placeholder="Where do you reside?"
          value={form.country}
          options={countries}
          onSelect={(v: any) => onChange("country", v)}
        />
      </ProfileRow>
      <ProfileRow label="Address:">
        <Textarea
          id="textarea-address"
          placeholder="Where do you live?"
          resize="vertical"
          description={
            <Text onBackground="neutral-weak">
              <i className="ri-information-line"></i>&nbsp;Your address will not
              be shared with anyone.
            </Text>
          }
          value={form.address}
          onChange={(e: any) => onChange("address", e.target.value)}
        />
      </ProfileRow>
      <ProfileRow label="Phone Number:">
        <Input
          id="input-phone"
          height="m"
          spellCheck={false}
          placeholder="Your phone number"
          description={
            <Text onBackground="neutral-weak">
              <i className="ri-information-line"></i>&nbsp;Your phone number
              will not be shared with anyone.
            </Text>
          }
          value={form.phoneNumber}
          onChange={(e: any) => onChange("phoneNumber", e.target.value)}
        />
      </ProfileRow>
      <ProfileRow label="Email:">
        <Input
          id="input-email"
          height="m"
          spellCheck={false}
          description={
            <Text onBackground="neutral-weak">
              <i className="ri-information-line"></i>&nbsp;Your email will be
              used for account verification and notifications.
            </Text>
          }
          disabled
          placeholder="Your email id"
          value={form.email}
          onChange={(e: any) => onChange("email", e.target.value)}
        />
      </ProfileRow>
      <ProfileRow label="Account visiblity:">
        <Switch
          label={
            <Text onBackground="neutral-weak" variant="label-default-m">
              {form.accountVisibility ? "Public" : "Private"}
            </Text>
          }
          isChecked={form.accountVisibility}
          onToggle={() =>
            onChange("accountVisibility", !form.accountVisibility)
          }
        />
      </ProfileRow>
    </Column>
  );
}

function AccountDetails({
  form,
  onChange,
}: {
  form: UserProfile;
  onChange: (field: keyof UserProfile, value: any) => void;
}) {
  return (
    <Column fillWidth horizontal="start" vertical="start" gap="20">
      <Text
        onBackground="neutral-strong"
        style={{ fontSize: "16px", marginBottom: "12px" }}
      >
        Account Details
      </Text>
      <ProfileRow label="User Name:">
        <Input
          placeholder="Enter your username"
          spellCheck={false}
          description={
            <Text onBackground="neutral-weak">
              <i className="ri-information-line"></i>&nbsp;Your username will be
              visible to other users.
            </Text>
          }
          hasSuffix={
            <Kbd cursor="interactive" onClick={() => {}}>
              Change
            </Kbd>
          }
          id="input-username"
          value={form.userName}
          onChange={(e: any) => onChange("userName", e.target.value)}
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
      <ProfileRow label="Account Verification:">
        <Tag variant="gradient">Verified</Tag>
      </ProfileRow>
      <ProfileRow label="Language Preference:">
        <Select
          height="m"
          id="language-select"
          placeholder="Select your language"
          value={form.languagePreference}
          options={languageOptions}
          onSelect={(v: any) => onChange("languagePreference", v)}
        />
      </ProfileRow>
      <ProfileRow label="Time Zone:">
        <Select
          height="m"
          id="timezone-select"
          placeholder="Select your time zone"
          value={form.timezone}
          options={timezoneOptions}
          onSelect={(v: any) => onChange("timezone", v)}
        />
      </ProfileRow>
    </Column>
  );
}

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
}: {
  institutions: Institution[];
  onPublish: (institutionId: string, isPublished: boolean) => void;
  onCreate: (newInstitution: InstitutionInput) => void;
}) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // New institution form
  const [newInstitution, setNewInstitution] = useState<InstitutionInput>({
    name: "",
    type: "",
    affiliation: "",
    phoneNumber: "",
    email: "",
    city: "",
  });

  // Terms checkboxes
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
    await onCreate(newInstitution);
    setIsCreating(false);
    setIsDialogOpen(false);
    setIsTermsOpen(false);
    setNewInstitution({
      name: "",
      type: "",
      affiliation: "",
      phoneNumber: "",
      email: "",
      city: "",
    });
    setTerms(terms.map((t) => ({ ...t, checked: false })));
  };

  return (
    <>
      <Column fillWidth horizontal="center" gap="32">
        <Row fillWidth gap="4">
          <Input
            id="input-1"
            placeholder="Search"
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
          <Button
            weight="default"
            variant="primary"
            size="l"
            onClick={() => setIsDialogOpen(true)}
          >
            New
          </Button>
        </Row>
        <Grid fillWidth fitHeight columns={2} gap="4">
          {institutions
            .filter((inst) =>
              inst.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((inst) => (
              <InstitutionCard
                key={inst.id}
                institution={inst}
                onPublish={onPublish}
              />
            ))}
        </Grid>
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
            <Text
              variant="label-default-xs"
              onBackground="neutral-weak"
              style={{ fontSize: "13px" }}
            >
              <i className="ri-information-line"></i>&nbsp;These details are
              required to verify your institution and create a new page for it.
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
                  <i className="ri-information-line"></i>&nbsp;Enter the name of
                  your institution
                </>
              }
              value={newInstitution.name}
              onChange={(e: any) =>
                setNewInstitution((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </Row>
          <Row fillWidth vertical="center" gap="8">
            <Input
              spellCheck={false}
              id="city"
              label="e.g. Vadodara,India"
              description={
                <>
                  <i className="ri-information-line"></i>&nbsp;Enter the short
                  address of your institution
                </>
              }
              value={newInstitution.city}
              onChange={(e: any) =>
                setNewInstitution((prev) => ({ ...prev, city: e.target.value }))
              }
            />
          </Row>
          <Row fillWidth vertical="center" gap="8">
            <Input
              id="type"
              label="e.g. School/Tuition"
              spellCheck={false}
              description={
                <>
                  <i className="ri-information-line"></i>&nbsp;Enter the type of
                  your institution
                </>
              }
              value={newInstitution.type}
              onChange={(e: any) =>
                setNewInstitution((prev) => ({ ...prev, type: e.target.value }))
              }
            />
          </Row>
          <Row fillWidth vertical="center" gap="8">
            <Input
              id="affiliation"
              label="e.g. ICSE/CBSE/IB"
              spellCheck={false}
              description={
                <>
                  <i className="ri-information-line"></i>&nbsp;Enter the
                  affiliation offered by your institution
                </>
              }
              value={newInstitution.affiliation}
              onChange={(e: any) =>
                setNewInstitution((prev) => ({
                  ...prev,
                  affiliation: e.target.value,
                }))
              }
            />
          </Row>
          <Row fillWidth vertical="center" gap="8">
            <Input
              id="phone"
              label="e.g. +91 1234567890"
              spellCheck={false}
              description={
                <>
                  <i className="ri-information-line"></i>&nbsp;Enter the
                  institution's phone number
                </>
              }
              value={newInstitution.phoneNumber}
              onChange={(e: any) =>
                setNewInstitution((prev) => ({
                  ...prev,
                  phoneNumber: e.target.value,
                }))
              }
            />
          </Row>
          <Row fillWidth vertical="center" gap="8">
            <Input
              id="email"
              label="e.g. ABCschool@edu.in"
              spellCheck={false}
              description={
                <>
                  <i className="ri-information-line"></i>&nbsp;Enter the
                  institution's email address
                </>
              }
              value={newInstitution.email}
              onChange={(e: any) =>
                setNewInstitution((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
          </Row>
          <Row fillWidth vertical="center" horizontal="end" gap="8">
            <Button
              size="m"
              onClick={() => setIsTermsOpen(true)}
              disabled={
                !newInstitution.name ||
                !newInstitution.affiliation ||
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
            <Text
              variant="label-default-xs"
              onBackground="neutral-weak"
              style={{ fontSize: "13px" }}
            >
              <i className="ri-information-line"></i>&nbsp;These details are
              required to verify your institution and create a new page for it.
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
          />
          <Column fillWidth vertical="center" horizontal="end" gap="12">
            {terms.map((item) => (
              <Checkbox
                style={{ width: "100%" }}
                key={item.id}
                label={item.label}
                isChecked={item.checked}
                onToggle={() => handleTermToggle(item.id)}
              />
            ))}
          </Column>
          <Row fillWidth vertical="center" horizontal="end" gap="8">
            <Button
              size="m"
              onClick={handleCreate}
              disabled={!allChecked || isCreating}
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

function InstitutionCard({
  institution,
  onPublish,
}: {
  institution: Institution;
  onPublish: (institutionId: string, isPublished: boolean) => void;
}) {
  const [published, setPublished] = useState(institution.isPublished);

  const handleToggle = () => {
    setPublished((prev) => {
      onPublish(institution.id, !prev);
      return !prev;
    });
  };

  return (
    <Card
      fillWidth
      horizontal="start"
      vertical="start"
      gap="20"
      direction="column"
      padding="m"
      style={{ border: "none" }}
      background="transparent"
    >
      <Text
        onBackground="neutral-strong"
        style={{ fontSize: "16px" }}
        onClick={() => {
          window.location.href = `/edu/${institution.id}`;
        }}
      >
        {institution.name}
      </Text>
      <InstitutionRow label="City:">{institution.address}</InstitutionRow>
      <InstitutionRow label="Affiliation:">
        {institution.affiliation}
      </InstitutionRow>
      <InstitutionRow label="Contact:">
        <InlineCode radius="xs-4">{institution.contact}</InlineCode>
      </InstitutionRow>
      <InstitutionRow label="Email:">
        <InlineCode radius="xs-4">{institution.email}</InlineCode>
      </InstitutionRow>
      <InstitutionRow label="Is published?">
        <Switch isChecked={published} onToggle={handleToggle} />
      </InstitutionRow>
    </Card>
  );
}

function InstitutionRow({
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
      <Flex flex={7}>
        <Text onBackground="neutral-weak" style={{ fontSize: "14px" }}>
          {children}
        </Text>
      </Flex>
    </Row>
  );
}

// --- Security Section ---
function Security() {
  return (
    <Grid fillWidth padding="m" fitHeight columns={2} gap="104">
      <SecuritySection
        title="Account Deletion"
        rows={[
          {
            label: "Delete Account?",
            input: (
              <Input
                placeholder="Enter your username"
                spellCheck={false}
                disabled
                description={
                  <Text onBackground="neutral-weak">
                    <i className="ri-information-line"></i>&nbsp;This is a
                    safety feature
                  </Text>
                }
                hasSuffix={<Kbd>Once</Kbd>}
                id="input-delete-account"
                value=""
                onChange={() => {}}
              />
            ),
            button: (
              <Button variant="primary" size="m">
                Delete
              </Button>
            ),
          },
        ]}
      />
      <SecuritySection
        title="Institutions Deletion"
        rows={[
          {
            label: "Delete all Institutions?",
            input: (
              <Input
                placeholder="Enter your username"
                spellCheck={false}
                disabled
                description={
                  <Text onBackground="neutral-weak">
                    <i className="ri-information-line"></i>&nbsp;This is a
                    safety feature
                  </Text>
                }
                hasSuffix={<Kbd>Once</Kbd>}
                id="input-delete-institutions"
                value=""
                onChange={() => {}}
              />
            ),
            button: (
              <Button variant="primary" disabled size="m">
                Delete
              </Button>
            ),
          },
        ]}
      />
      <SecuritySection
        title="Others"
        rows={[
          {
            label: "Export all your data?",
            button: (
              <Button variant="primary" size="m" disabled>
                Export
              </Button>
            ),
          },
          {
            label: "Request total data deletion?",
            button: (
              <Button variant="primary" size="m">
                Request
              </Button>
            ),
          },
        ]}
      />
    </Grid>
  );
}

function SecuritySection({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; input?: React.ReactNode; button: React.ReactNode }[];
}) {
  return (
    <Column fillWidth horizontal="start" vertical="start" gap="20">
      <Text
        onBackground="neutral-strong"
        style={{ fontSize: "16px", marginBottom: "12px" }}
      >
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
            {row.button}
          </Flex>
        </Row>
      ))}
    </Column>
  );
}

// --- Socials Section ---
function Socials({
  socials,
  onSave,
}: {
  socials: UserSocials;
  onSave: (socials: UserSocials) => void;
}) {
  const [form, setForm] = useState<UserSocials>(socials);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(socials);
  }, [socials]);

  const handleChange = (field: keyof UserSocials, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    await onSave(form);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
                    <Text onBackground="neutral-weak">
                      <i className="ri-information-line"></i>&nbsp;This will be
                      visible to other users. (optional)
                    </Text>
                  }
                  id="input-delete-account"
                  value={form.phone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange("phone", e.target.value)
                  }
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
                    <Text onBackground="neutral-weak">
                      <i className="ri-information-line"></i>&nbsp;This will be
                      visible to other users.
                    </Text>
                  }
                  id="input-email-socials"
                  value={form.email}
                  onChange={(e: any) => handleChange("email", e.target.value)}
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
                    <Text onBackground="neutral-weak">
                      <i className="ri-information-line"></i>&nbsp;This will be
                      visible to other users.
                    </Text>
                  }
                  value={form.whatsapp}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange("whatsapp", e.target.value)
                  }
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
                    <Text onBackground="neutral-weak">
                      <i className="ri-information-line"></i>&nbsp;This will be
                      visible to other users.
                    </Text>
                  }
                  value={form.instagram}
                  onChange={(e: any) =>
                    handleChange("instagram", e.target.value)
                  }
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
                    <Text onBackground="neutral-weak">
                      <i className="ri-information-line"></i>&nbsp;This will be
                      visible to other users.
                    </Text>
                  }
                  value={form.linkedin}
                  onChange={(e: any) =>
                    handleChange("linkedin", e.target.value)
                  }
                />
              ),
            },
          ]}
        />
      </Grid>
      <Row paddingY="12" fillWidth horizontal="end">
        <Button size="m" onClick={()=>handleSave()} disabled={loading}>
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
    </>
  );
}

function SocialsSection({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; input?: React.ReactNode }[];
}) {
  return (
    <Column fillWidth horizontal="start" vertical="start" gap="20">
      <Text
        onBackground="neutral-strong"
        style={{ fontSize: "16px", marginBottom: "12px" }}
      >
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
