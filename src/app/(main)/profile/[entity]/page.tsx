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
import { useState } from "react";

import { useToast } from "@once-ui-system/core";

// Font setup
const dmsans = Outfit({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

import NavBar from "./../../components/NavBar";
import Footer from "./../../components/Footer";
import { supabase } from "@/app/utils/supabase/client";
import { useEffect } from "react";

// Get slug from URL using pop/push and "/" split
const uuid =
  typeof window !== "undefined"
    ? (() => {
        const parts = window.location.pathname.split("/");
        // Remove empty strings from split (leading/trailing slashes)
        const filtered = parts.filter(Boolean);
        // The slug is the last part (after /profile/)
        return filtered.pop();
      })()
    : undefined;

// Data JSONs
const segmentedButtons = [
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

const institutions = [
  {
    name: "Greenfield International School",
    address: "Dubai, UAE",
    affiliation: "IB/IGCSE",
    contact: "4 123 4567",
    email: "info@greenfield.edu",
    isPublished: true,
  },
  {
    name: "Blue Valley Public School",
    address: "San Francisco, USA",
    affiliation: "Common Core",
    contact: "415 555 0199",
    email: "contact@bluevalley.edu",
    isPublished: true,
  },
  {
    name: "Sunrise Academy",
    address: "Sydney, Australia",
    affiliation: "HSC/NSW",
    contact: "2 9876 5432",
    email: "hello@sunriseacademy.edu.au",
    isPublished: false,
  },
];

// Main Page
export default function Home() {
  const [activeTab, setActiveTab] = useState("profile");

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
          />
          <Flex fillWidth height={3}></Flex>
          {activeTab === "profile" && <ProfileEdit countries={countries} />}
          {activeTab === "creations" && (
            <CreatedInstitutions institutions={institutions} />
          )}
          {activeTab === "security" && <Security />}
          {activeTab === "socials" && <Socials />}
          <Flex fillWidth height={3}></Flex>
        </Column>
      </Column>
      <Flex fillWidth height={3}></Flex>
      <Footer />
    </Column>
  );
}

// Profile Header
function ProfileHeader({
  dmsansClass,
  activeTab,
  setActiveTab,
}: {
  dmsansClass: string;
  activeTab: string;
  setActiveTab: (v: string) => void;
}) {
  const [fullName, setFullName] = useState<string>("");
  const [avatarSrc, setAvatarSrc] = useState<string>("");
  const [intro, setIntro] = useState<string>("");
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    async function fetchProfileData() {
      if (!uuid) return;

      const { data, error } = await supabase
        .from("user_profiles")
        .select("profile_details, pfp, count")
        .eq("uuid", uuid)
        .maybeSingle();

      if (error) {
        console.error("Error fetching profile data:", error);
        return;
      }

      if (data) {
        const profileDetails = data.profile_details || {};
        setFullName(profileDetails.fullName || "");
        setIntro(profileDetails.introduction || "");
        setAvatarSrc(data.pfp || "");
        setCount(data.count || 0);
      }
    }

    fetchProfileData();
  }, [uuid]);

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
        src={avatarSrc}
        size="xl"
        border="neutral-strong"
        borderWidth={1}
      />
      <Text
        style={{
          color: "#181A1D",
          fontSize: "41px",
          fontWeight: "500",
        }}
        className={dmsansClass}
      >
        <Row center gap="8">
          {fullName || "User"}
          <Line vert width={0.1} height={2.5} background="neutral-medium" />
          <Text
            style={{
              fontSize: "21px",
              fontWeight: "500",
            }}
            onBackground="neutral-weak"
            className={dmsansClass}
          >
            <Kbd>#{count}</Kbd>
          </Text>
        </Row>
      </Text>
      <Text onBackground="neutral-weak" style={{ fontSize: "14px" }}>
        {intro || "User at Next Bench"}
      </Text>
      <Flex fillWidth center paddingY="8">
        <SegmentedControl
          fillWidth={true}
          maxWidth={40}
          buttons={segmentedButtons}
          defaultSelected="profile"
          onToggle={setActiveTab}
        />
      </Flex>
    </Column>
  );
}

// Profile Edit
function ProfileEdit({
  countries,
}: {
  countries: { label: string; value: string }[];
}) {
  const [fullName, setFullName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [dob, setDob] = useState<Date | null>(null);
  const [gender, setGender] = useState("none");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState("");
  const [accountVisibility, setAccountVisibility] = useState(false);

  const [userName, setUserName] = useState("");
  const [accountCreated, setAccountCreated] = useState<Date | null>(null);
  const [lastLogin, setLastLogin] = useState<Date | null>(null);
  const [membershipStatus, setMembershipStatus] = useState("A");
  const [languagePreference, setLanguagePreference] = useState("English");
  const [timezone, setTimezone] = useState("Select timezone");
  const { addToast } = useToast();

  useEffect(() => {
    async function fetchProfileAndAccountDetails() {
      if (!uuid) return;

      // Fetch profile_details and account info in parallel
      const [
        { data: profileData, error: profileError },
        { data: accountData, error: accountError },
      ] = await Promise.all([
        supabase
          .from("user_profiles")
          .select("profile_details")
          .eq("uuid", uuid)
          .single(),
        supabase
          .from("user_profiles")
          .select("username, joined_at, last_login,primary_email,is_public")
          .eq("uuid", uuid)
          .maybeSingle(),
      ]);

      // Profile details
      if (!profileError && profileData?.profile_details) {
        const details = profileData.profile_details;
        setFullName(details.fullName ?? "");
        setIntroduction(details.introduction ?? "");
        setDob(details.dob ? new Date(details.dob) : null);
        setGender(details.gender ?? "none");
        setCountry(details.country ?? "");
        setAddress(details.address ?? "");
        setPhoneNumber(details.phoneNumber ?? "");
        setEmail(details.email ?? "");
        setMembershipStatus(details.membershipStatus ?? "A");
        setLanguagePreference(details.languagePreference ?? "English");
        setTimezone(details.timezone ?? "Select timezone");
      }

      // Account details
      if (!accountError && accountData) {
        setUserName(accountData.username ?? "");
        setAccountCreated(
          accountData.joined_at ? new Date(accountData.joined_at) : null
        );
        setLastLogin(
          accountData.last_login ? new Date(accountData.last_login) : null
        );
        setEmail(accountData.primary_email ?? "");
        setAccountVisibility(accountData.is_public);
      }
    }

    fetchProfileAndAccountDetails();
  }, [uuid]);

  function saveDataToSupabase() {
    if (!uuid) return;

    const profileDetails = {
      fullName,
      introduction,
      dob: dob ? dob.toISOString() : null,
      gender,
      country,
      address,
      phoneNumber,
      email,
      membershipStatus,
      languagePreference,
      timezone,
    };

    supabase
      .from("user_profiles")
      .update({
        profile_details: profileDetails,
        username: userName,
      })
      .eq("uuid", uuid)
      .then(({ error }) => {
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
        }
      });
  }

  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    async function checkSessionUser() {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data?.session?.user?.id || !uuid) {
        setIsUser(false);
        return;
      }
      setIsUser(data.session.user.id === uuid);
    }
    checkSessionUser();
  }, [uuid]);

  return (
    <>
      <Grid fillWidth padding="m" fitHeight columns={2} gap="104">
        <PersonalDetails
          countries={countries}
          introduction={introduction}
          setIntroduction={setIntroduction}
          fullName={fullName}
          setFullName={setFullName}
          dob={dob}
          setDob={setDob}
          gender={gender}
          setGender={setGender}
          country={country}
          setCountry={setCountry}
          address={address}
          setAddress={setAddress}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          email={email}
          setEmail={setEmail}
          accountVisibility={accountVisibility}
          setAccountVisibility={setAccountVisibility}
          isUser={isUser}
        />
        <AccountDetails
          userName={userName}
          setUserName={setUserName}
          accountCreated={accountCreated}
          setAccountCreated={setAccountCreated}
          lastLogin={lastLogin}
          setLastLogin={setLastLogin}
          membershipStatus={membershipStatus}
          setMembershipStatus={setMembershipStatus}
          languagePreference={languagePreference}
          setLanguagePreference={setLanguagePreference}
          timezone={timezone}
          setTimezone={setTimezone}
          isUser={isUser}
        />
      </Grid>
      <Row paddingY="12" fillWidth horizontal="end">
        <Button size="m" onClick={saveDataToSupabase}>
          Save all
        </Button>
      </Row>
    </>
  );
}

function PersonalDetails({
  countries,
  fullName,
  introduction,
  setIntroduction,
  setFullName,
  dob,
  setDob,
  gender,
  setGender,
  country,
  setCountry,
  address,
  setAddress,
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail,
  accountVisibility,
  setAccountVisibility,
  isUser,
}: {
  countries: { label: string; value: string }[];
  fullName: string;
  setFullName: (v: string) => void;
  introduction: string;
  setIntroduction: (v: string) => void;
  dob: Date | null;
  setDob: (v: Date | null) => void;
  gender: string;
  setGender: (v: string) => void;
  country: string;
  setCountry: (v: string) => void;
  address: string;
  setAddress: (v: string) => void;
  phoneNumber: string;
  setPhoneNumber: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  accountVisibility: boolean;
  setAccountVisibility: (v: boolean) => void;
  isUser?: boolean; // Optional prop to check if it's the user's profile
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
          height="m"
          placeholder="Full Name"
          value={fullName}
          onChange={(e: any) => setFullName(e.target.value)}
        />
      </ProfileRow>
      <ProfileRow label="Short Introduction:">
        <Textarea
          id="input-fullname"
          placeholder="Write here"
          resize="none"
          maxLength={30}
          value={introduction}
          onChange={(e: any) => setIntroduction(e.target.value)}
        />
      </ProfileRow>
      <ProfileRow label="Date of Birth:">
        <DateInput
          id="date-dob"
          height="m"
          placeholder="When were you born?"
          cursor="interactive"
          value={dob === null ? undefined : dob}
          onChange={(v: Date | null) => setDob(v)}
        />
      </ProfileRow>
      <ProfileRow label="Gender:">
        <Select
          height="m"
          id="gender-select"
          placeholder="Choose your gender"
          value={gender}
          options={genderOptions}
          onSelect={(v: any) => setGender(v)}
        />
      </ProfileRow>
      <ProfileRow label="Country:">
        <Select
          height="m"
          searchable={true}
          id="country-select"
          placeholder="Where do you reside?"
          value={country}
          options={countries}
          onSelect={(v: any) => setCountry(v)}
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
          value={address}
          onChange={(e: any) => setAddress(e.target.value)}
        />
      </ProfileRow>
      <ProfileRow label="Phone Number:">
        <Input
          id="input-phone"
          height="m"
          placeholder="Your phone number"
          description={
            <Text onBackground="neutral-weak">
              <i className="ri-information-line"></i>&nbsp;Your phone number
              will not be shared with anyone.
            </Text>
          }
          value={phoneNumber}
          onChange={(e: any) => setPhoneNumber(e.target.value)}
        />
      </ProfileRow>
      <ProfileRow label="Email:">
        <Input
          id="input-email"
          height="m"
          description={
            <Text onBackground="neutral-weak">
              <i className="ri-information-line"></i>&nbsp;Your email will be
              used for account verification and notifications.
            </Text>
          }
          disabled
          placeholder="Your email id"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          // hasPrefix={
          //   <Text onBackground="neutral-medium">
          //     <i className="ri-at-line"></i>
          //   </Text>
          // }
        />
      </ProfileRow>
      <ProfileRow label="Account visiblity:">
        <Switch
          label={
            <Text onBackground="neutral-weak" variant="label-default-m">
              {accountVisibility ? "Public" : "Private"}
            </Text>
          }
          isChecked={accountVisibility}
          onToggle={() => setAccountVisibility(!accountVisibility)}
        />
      </ProfileRow>
    </Column>
  );
}

function AccountDetails({
  userName,
  setUserName,
  accountCreated,
  setAccountCreated,
  lastLogin,
  setLastLogin,
  membershipStatus,
  setMembershipStatus,
  languagePreference,
  setLanguagePreference,
  timezone,
  setTimezone,
  isVerified = true,
  isUser,
}: {
  userName: string;
  setUserName: (v: string) => void;
  accountCreated: Date | null;
  setAccountCreated: (v: Date | null) => void;
  lastLogin: Date | null;
  setLastLogin: (v: Date | null) => void;
  membershipStatus: string;
  setMembershipStatus: (v: string) => void;
  languagePreference: string;
  setLanguagePreference: (v: string) => void;
  timezone: string;
  setTimezone: (v: string) => void;
  isVerified?: boolean;
  isUser?: boolean; // Optional prop to check if it's the user's profile
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
          description={
            <Text onBackground="neutral-weak">
              <i className="ri-information-line"></i>&nbsp;Your username will be
              visible to other users.
            </Text>
          }
          hasSuffix={
            <Kbd cursor="interactive" onClick={() => console.log(userName)}>
              Change
            </Kbd>
          }
          id="input-username"
          value={userName}
          onChange={(e: any) => setUserName(e.target.value)}
        />
      </ProfileRow>
      <ProfileRow label="Account Created:">
        <DateInput
          id="date-account-created"
          placeholder="July 2, 2025"
          height="m"
          value={accountCreated === null ? undefined : accountCreated}
          onChange={(v: Date | null) => setAccountCreated(v)}
          disabled
        />
      </ProfileRow>
      <ProfileRow label="Last Login:">
        <DateInput
          id="date-last-login"
          placeholder="July 2, 2025"
          height="m"
          value={lastLogin === null ? undefined : lastLogin}
          onChange={(v: Date | null) => setLastLogin(v)}
          disabled
        />
      </ProfileRow>
      <ProfileRow label="Membership Status:">
        <Select
          height="m"
          disabled
          id="membership-select"
          placeholder="Active"
          value={membershipStatus}
          options={membershipOptions}
          onSelect={(v: any) => setMembershipStatus(v)}
        />
      </ProfileRow>
      <ProfileRow label="Account Verification:">
        {isVerified ? (
          <Tag variant="gradient">Verified</Tag>
        ) : (
          <Tag variant="danger">Not verified</Tag>
        )}
      </ProfileRow>
      <ProfileRow label="Language Preference:">
        <Select
          height="m"
          id="language-select"
          placeholder="Select your language"
          value={languagePreference}
          options={languageOptions}
          onSelect={(v: any) => setLanguagePreference(v)}
        />
      </ProfileRow>
      <ProfileRow label="Time Zone:">
        <Select
          height="m"
          id="timezone-select"
          placeholder="Select your time zone"
          value={timezone}
          options={timezoneOptions}
          onSelect={(v: any) => setTimezone(v)}
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

// Institution type
type Institution = {
  name: string;
  address: string;
  affiliation: string;
  contact: string;
  email: string;
  isPublished: boolean;
};

// Created Institutions
function CreatedInstitutions({
  institutions,
}: {
  institutions: Institution[];
}) {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClear = () => {
    setSearchValue("");
  };
  return (
    <Column fillWidth horizontal="center" gap="32">
      <Row fillWidth gap="4">
        <Input
          id="input-1"
          placeholder="Search"
          height="m"
          value={searchValue}
          onChange={handleChange}
          hasPrefix={<i className="ri-search-line" />}
          hasSuffix={
            searchValue.length > 0 ? (
              <IconButton
                variant="ghost"
                icon="close"
                size="s"
                onClick={handleClear}
                aria-label="Clear search"
              />
            ) : null
          }
        />
        <Button weight="default" variant="primary" size="l">
          New
        </Button>
      </Row>

      <Grid fillWidth fitHeight columns={2} gap="4">
        {institutions.map((inst) => (
          <InstitutionCard key={inst.name} {...inst} />
        ))}
        <CreateNewInstitution />
      </Grid>
    </Column>
  );
}

function InstitutionCard({
  name,
  address,
  affiliation,
  contact,
  email,
  isPublished,
}: {
  name: string;
  address: string;
  affiliation: string;
  contact: string;
  email: string;
  isPublished: boolean;
}) {
  const [published, setPublished] = useState(isPublished);

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
      <Text onBackground="neutral-strong" style={{ fontSize: "16px" }}>
        {name}
      </Text>
      <InstitutionRow label="City:">{address}</InstitutionRow>
      <InstitutionRow label="Affiliation:">{affiliation}</InstitutionRow>
      <InstitutionRow label="Contact:">
        <InlineCode radius="xs-4">{contact}</InlineCode>
      </InstitutionRow>
      <InstitutionRow label="Email:">
        <InlineCode radius="xs-4">{email}</InlineCode>
      </InstitutionRow>
      <InstitutionRow label="Is published?">
        <Switch
          isChecked={published}
          onToggle={() => setPublished(!published)}
        />
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

function CreateNewInstitution() {
  return null;
}

// Security Section
function Security() {
  const [deleteAccountInput, setDeleteAccountInput] = useState("");
  const [deleteInstitutionsInput, setDeleteInstitutionsInput] = useState("");

  const [deleteAccountDisabled, setDeleteAccountDisabled] = useState(true);
  const [deleteInstitutionsDisabled, setDeleteInstitutionsDisabled] =
    useState(true);

  const [username, setUsername] = useState("");
  useEffect(() => {
    async function fetchUsername() {
      if (!uuid) return;
      const { data, error } = await supabase
        .from("user_profiles")
        .select("username")
        .eq("uuid", uuid)
        .single();

      if (error || !data?.username) return;

      setUsername(data.username);
    }
    fetchUsername();
  }, [uuid]);

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
                description={
                  <Text onBackground="neutral-weak">
                    <i className="ri-information-line"></i>&nbsp;This is a
                    safety feature
                  </Text>
                }
                hasSuffix={<Kbd>Once</Kbd>}
                id="input-delete-account"
                value={deleteAccountInput}
                onChange={(e: any) => setDeleteAccountInput(e.target.value)}
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
                description={
                  <Text onBackground="neutral-weak">
                    <i className="ri-information-line"></i>&nbsp;This is a
                    safety feature
                  </Text>
                }
                hasSuffix={<Kbd>Once</Kbd>}
                id="input-delete-institutions"
                value={deleteInstitutionsInput}
                onChange={(e: any) =>
                  setDeleteInstitutionsInput(e.target.value)
                }
              />
            ),
            button: (
              <Button
                variant="primary"
                size="m"
                disabled={deleteInstitutionsDisabled}
              >
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
              <Button variant="primary" size="m">
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

// Socials Section
function Socials() {
  const [phoneNumberSocials, setPhoneNumberSocials] = useState<string>("");
  const [emailSocials, setEmailSocials] = useState<string>("");
  const [whatsapp, setWhatsapp] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [linkedin, setLinkedin] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    async function fetchSocials() {
      if (!uuid) return;
      const { data, error } = await supabase
        .from("user_profiles")
        .select("socials")
        .eq("uuid", uuid)
        .single();

      if (error || !data?.socials) return;

      const socials = data.socials;
      setPhoneNumberSocials(socials.phone || "");
      setEmailSocials(socials.email || "");
      setPhoneNumberSocials(socials.phone ?? "");
      setEmailSocials(socials.email ?? "");
      setWhatsapp(socials.whatsapp ?? "");
      setInstagram(socials.instagram ?? "");
      setLinkedin(socials.linkedin ?? "");
    }
    fetchSocials();
  }, [uuid]);

  async function saveDataToSupabase() {
    setLoading(true);

    if (!uuid) return;
    const socials = {
      phone: phoneNumberSocials,
      email: emailSocials,
      whatsapp: whatsapp,
      instagram: instagram,
      linkedin: linkedin,
    };

    supabase
      .from("user_profiles")
      .update({ socials })
      .eq("uuid", uuid)
      .then(({ error }) => {
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
        }
        setLoading(false);
      });
  }
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
                  description={
                    <Text onBackground="neutral-weak">
                      <i className="ri-information-line"></i>&nbsp;This will be
                      visible to other users. (optional)
                    </Text>
                  }
                  id="input-delete-account"
                  value={phoneNumberSocials}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPhoneNumberSocials(e.target.value)
                  }
                />
              ),
            },
            {
              label: "Public Email:",
              input: (
                <Input
                  placeholder="Enter your email"
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
                  value={emailSocials}
                  onChange={(e: any) => setEmailSocials(e.target.value)}
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
                  id="input-whatsapp"
                  description={
                    <Text onBackground="neutral-weak">
                      <i className="ri-information-line"></i>&nbsp;This will be
                      visible to other users.
                    </Text>
                  }
                  value={whatsapp}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setWhatsapp(e.target.value)
                  }
                />
              ),
            },
            {
              label: "Instagram:",
              input: (
                <Input
                  placeholder="username"
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
                  value={instagram}
                  onChange={(e: any) => setInstagram(e.target.value)}
                />
              ),
            },
            {
              label: "LinkedIn:",
              input: (
                <Input
                  placeholder="username"
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
                  value={linkedin}
                  onChange={(e: any) => setLinkedin(e.target.value)}
                />
              ),
            },
          ]}
        />
      </Grid>
      <Row paddingY="12" fillWidth horizontal="end">
        <Button
          size="m"
          onClick={async () => {
            saveDataToSupabase();
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
