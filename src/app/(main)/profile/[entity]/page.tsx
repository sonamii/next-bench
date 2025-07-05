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
} from "@once-ui-system/core";

import {
  Lato,
  Montserrat,
  Montserrat_Alternates,
  Outfit,
  Unica_One,
  Work_Sans,
} from "next/font/google";
const dmsans = Outfit({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});
import { Roboto } from "next/font/google";
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "600", "700"],
});
import { Open_Sans } from "next/font/google";
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["400", "500", "600", "700"],
});

import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});
export default function Home() {
  const countries = [
    { label: "Afghanistan", value: "AF" },
    { label: "Albania", value: "AL" },
    { label: "Algeria", value: "DZ" },
    { label: "Andorra", value: "AD" },
    { label: "Angola", value: "AO" },
    { label: "Antigua and Barbuda", value: "AG" },
    { label: "Argentina", value: "AR" },
    { label: "Armenia", value: "AM" },
    { label: "Australia", value: "AU" },
    { label: "Austria", value: "AT" },
    { label: "Azerbaijan", value: "AZ" },
    { label: "Bahamas", value: "BS" },
    { label: "Bahrain", value: "BH" },
    { label: "Bangladesh", value: "BD" },
    { label: "Barbados", value: "BB" },
    { label: "Belarus", value: "BY" },
    { label: "Belgium", value: "BE" },
    { label: "Belize", value: "BZ" },
    { label: "Benin", value: "BJ" },
    { label: "Bhutan", value: "BT" },
    { label: "Bolivia", value: "BO" },
    { label: "Bosnia and Herzegovina", value: "BA" },
    { label: "Botswana", value: "BW" },
    { label: "Brazil", value: "BR" },
    { label: "Brunei", value: "BN" },
    { label: "Bulgaria", value: "BG" },
    { label: "Burkina Faso", value: "BF" },
    { label: "Burundi", value: "BI" },
    { label: "Cabo Verde", value: "CV" },
    { label: "Cambodia", value: "KH" },
    { label: "Cameroon", value: "CM" },
    { label: "Canada", value: "CA" },
    { label: "Central African Republic", value: "CF" },
    { label: "Chad", value: "TD" },
    { label: "Chile", value: "CL" },
    { label: "China", value: "CN" },
    { label: "Colombia", value: "CO" },
    { label: "Comoros", value: "KM" },
    { label: "Congo (Congo-Brazzaville)", value: "CG" },
    { label: "Costa Rica", value: "CR" },
    { label: "Croatia", value: "HR" },
    { label: "Cuba", value: "CU" },
    { label: "Cyprus", value: "CY" },
    { label: "Czechia (Czech Republic)", value: "CZ" },
    { label: "Democratic Republic of the Congo", value: "CD" },
    { label: "Denmark", value: "DK" },
    { label: "Djibouti", value: "DJ" },
    { label: "Dominica", value: "DM" },
    { label: "Dominican Republic", value: "DO" },
    { label: "Ecuador", value: "EC" },
    { label: "Egypt", value: "EG" },
    { label: "El Salvador", value: "SV" },
    { label: "Equatorial Guinea", value: "GQ" },
    { label: "Eritrea", value: "ER" },
    { label: "Estonia", value: "EE" },
    { label: "Eswatini (fmr. Swaziland)", value: "SZ" },
    { label: "Ethiopia", value: "ET" },
    { label: "Fiji", value: "FJ" },
    { label: "Finland", value: "FI" },
    { label: "France", value: "FR" },
    { label: "Gabon", value: "GA" },
    { label: "Gambia", value: "GM" },
    { label: "Georgia", value: "GE" },
    { label: "Germany", value: "DE" },
    { label: "Ghana", value: "GH" },
    { label: "Greece", value: "GR" },
    { label: "Grenada", value: "GD" },
    { label: "Guatemala", value: "GT" },
    { label: "Guinea", value: "GN" },
    { label: "Guinea-Bissau", value: "GW" },
    { label: "Guyana", value: "GY" },
    { label: "Haiti", value: "HT" },
    { label: "Honduras", value: "HN" },
    { label: "Hungary", value: "HU" },
    { label: "Iceland", value: "IS" },
    { label: "India", value: "IN" },
    { label: "Indonesia", value: "ID" },
    { label: "Iran", value: "IR" },
    { label: "Iraq", value: "IQ" },
    { label: "Ireland", value: "IE" },
    { label: "Israel", value: "IL" },
    { label: "Italy", value: "IT" },
    { label: "Jamaica", value: "JM" },
    { label: "Japan", value: "JP" },
    { label: "Jordan", value: "JO" },
    { label: "Kazakhstan", value: "KZ" },
    { label: "Kenya", value: "KE" },
    { label: "Kiribati", value: "KI" },
    { label: "Kuwait", value: "KW" },
    { label: "Kyrgyzstan", value: "KG" },
    { label: "Laos", value: "LA" },
    { label: "Latvia", value: "LV" },
    { label: "Lebanon", value: "LB" },
    { label: "Lesotho", value: "LS" },
    { label: "Liberia", value: "LR" },
    { label: "Libya", value: "LY" },
    { label: "Liechtenstein", value: "LI" },
    { label: "Lithuania", value: "LT" },
    { label: "Luxembourg", value: "LU" },
    { label: "Madagascar", value: "MG" },
    { label: "Malawi", value: "MW" },
    { label: "Malaysia", value: "MY" },
    { label: "Maldives", value: "MV" },
    { label: "Mali", value: "ML" },
    { label: "Malta", value: "MT" },
    { label: "Marshall Islands", value: "MH" },
    { label: "Mauritania", value: "MR" },
    { label: "Mauritius", value: "MU" },
    { label: "Mexico", value: "MX" },
    { label: "Micronesia", value: "FM" },
    { label: "Moldova", value: "MD" },
    { label: "Monaco", value: "MC" },
    { label: "Mongolia", value: "MN" },
    { label: "Montenegro", value: "ME" },
    { label: "Morocco", value: "MA" },
    { label: "Mozambique", value: "MZ" },
    { label: "Myanmar (Burma)", value: "MM" },
    { label: "Namibia", value: "NA" },
    { label: "Nauru", value: "NR" },
    { label: "Nepal", value: "NP" },
    { label: "Netherlands", value: "NL" },
    { label: "New Zealand", value: "NZ" },
    { label: "Nicaragua", value: "NI" },
    { label: "Niger", value: "NE" },
    { label: "Nigeria", value: "NG" },
    { label: "North Korea", value: "KP" },
    { label: "North Macedonia", value: "MK" },
    { label: "Norway", value: "NO" },
    { label: "Oman", value: "OM" },
    { label: "Pakistan", value: "PK" },
    { label: "Palau", value: "PW" },
    { label: "Palestine State", value: "PS" },
    { label: "Panama", value: "PA" },
    { label: "Papua New Guinea", value: "PG" },
    { label: "Paraguay", value: "PY" },
    { label: "Peru", value: "PE" },
    { label: "Philippines", value: "PH" },
    { label: "Poland", value: "PL" },
    { label: "Portugal", value: "PT" },
    { label: "Qatar", value: "QA" },
    { label: "Romania", value: "RO" },
    { label: "Russia", value: "RU" },
    { label: "Rwanda", value: "RW" },
    { label: "Saint Kitts and Nevis", value: "KN" },
    { label: "Saint Lucia", value: "LC" },
    { label: "Saint Vincent and the Grenadines", value: "VC" },
    { label: "Samoa", value: "WS" },
    { label: "San Marino", value: "SM" },
    { label: "Sao Tome and Principe", value: "ST" },
    { label: "Saudi Arabia", value: "SA" },
    { label: "Senegal", value: "SN" },
    { label: "Serbia", value: "RS" },
    { label: "Seychelles", value: "SC" },
    { label: "Sierra Leone", value: "SL" },
    { label: "Singapore", value: "SG" },
    { label: "Slovakia", value: "SK" },
    { label: "Slovenia", value: "SI" },
    { label: "Solomon Islands", value: "SB" },
    { label: "Somalia", value: "SO" },
    { label: "South Africa", value: "ZA" },
    { label: "South Korea", value: "KR" },
    { label: "South Sudan", value: "SS" },
    { label: "Spain", value: "ES" },
    { label: "Sri Lanka", value: "LK" },
    { label: "Sudan", value: "SD" },
    { label: "Suriname", value: "SR" },
    { label: "Sweden", value: "SE" },
    { label: "Switzerland", value: "CH" },
    { label: "Syria", value: "SY" },
    { label: "Tajikistan", value: "TJ" },
    { label: "Tanzania", value: "TZ" },
    { label: "Thailand", value: "TH" },
    { label: "Timor-Leste", value: "TL" },
    { label: "Togo", value: "TG" },
    { label: "Tonga", value: "TO" },
    { label: "Trinidad and Tobago", value: "TT" },
    { label: "Tunisia", value: "TN" },
    { label: "Turkey", value: "TR" },
    { label: "Turkmenistan", value: "TM" },
    { label: "Tuvalu", value: "TV" },
    { label: "Uganda", value: "UG" },
    { label: "Ukraine", value: "UA" },
    { label: "United Arab Emirates", value: "AE" },
    { label: "United Kingdom", value: "GB" },
    { label: "United States of America", value: "US" },
    { label: "Uruguay", value: "UY" },
    { label: "Uzbekistan", value: "UZ" },
    { label: "Vanuatu", value: "VU" },
    { label: "Vatican City", value: "VA" },
    { label: "Venezuela", value: "VE" },
    { label: "Vietnam", value: "VN" },
    { label: "Yemen", value: "YE" },
    { label: "Zambia", value: "ZM" },
    { label: "Zimbabwe", value: "ZW" },
  ];
  return (
    <>
      {" "}
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
          <Row horizontal="space-between" fillWidth fitHeight vertical="center">
            <Flex vertical="center" gap="8">
              <Media
                src="https://imghost.online/ib/skwnw73hCCCOt3q_1751541353.png"
                unoptimized
                width={4}
                height={3}
                alt="A"
              ></Media>
              <Text variant="label-default-xl">Next Bench</Text>
            </Flex>
            <Flex>
              <MegaMenu
                menuGroups={[
                  {
                    id: "home",
                    label: "Home",
                    href: "/",
                  },
                  {
                    id: "consultants",
                    label: "Consultants",
                    suffixIcon: "chevronDown",

                    sections: [],
                  },
                  {
                    id: "find-school",
                    label: "Find",
                    suffixIcon: "chevronDown",
                    sections: [],
                  },
                  {
                    id: "dashboard",
                    label: "MekoAI",
                    href: "/mekoai",
                    suffixIcon: "chevronDown",
                    sections: [],
                  },
                ]}
              />
            </Flex>
          </Row>
          <Flex fillWidth height={2}></Flex>
          <Column  style={{ maxWidth: "1250px" }}paddingX="l" radius="xl" fillWidth fitHeight horizontal="center" >
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
empty              size="xl"
              border="neutral-strong"
              borderWidth={1}
            ></Avatar>
            <Text
              style={{
                color: "#181A1D",
                fontSize: "41px",
                fontWeight: "500",
              }}
              className={dmsans.className}
            >
              User
            </Text>
            <Text
              onBackground="neutral-weak"
              style={{
                fontSize: "14px",
              }}
            >
              Student at Next Bench
            </Text>
            <Flex fillWidth center paddingY="8">
              {" "}
              <SegmentedControl
                fillWidth={false}
                buttons={[
                  { value: "profile", label: "Profile" },
                  { value: "institutions", label: "Institutions" },
                  { value: "security", label: "Security" },
                ]}
                defaultSelected="profile"
                onToggle={(value) => console.log(value)}
              />
            </Flex>
          </Column>
<Flex fillWidth height={3}></Flex>
          <Grid
            fillWidth
            padding="m"
            fitHeight
            columns={2}
            gap="104"
            // paddingX="xl"
          >
            <Column fillWidth horizontal="start" vertical="start" gap="20">
              {" "}
              <Text
                onBackground="neutral-strong"
                style={{
                  fontSize: "16px",
                  marginBottom: "12px",
                }}
              >
                Personal details
              </Text>
              <Row fillWidth horizontal="space-between">
                <Flex flex={5}>
                  {" "}
                  <Text
                    onBackground="neutral-weak"
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    Full name:
                  </Text>
                </Flex>

                <Flex flex={7}>
                  {" "}
                  <Input id="input" height="m" placeholder="Full Name"></Input>
                </Flex>
              </Row>
              <Row fillWidth horizontal="space-between">
                <Flex flex={5}>
                  {" "}
                  <Text
                    onBackground="neutral-weak"
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    Date Of Birth:
                  </Text>
                </Flex>

                <Flex flex={7}>
                  {" "}
                  <DateInput
                    id="date"
                    height="m"
                    placeholder="When were you born?"
                    cursor="interactive"
                  ></DateInput>
                </Flex>
              </Row>
              <Row fillWidth horizontal="space-between">
                <Flex flex={5}>
                  {" "}
                  <Text
                    onBackground="neutral-weak"
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    Gender:
                  </Text>
                </Flex>

                <Flex flex={7}>
                  {" "}
                  <Select
                    height="m"
                    id="basic-select"
                    placeholder="Choose your gender"
                    value={"Prefer not to say"}
                    options={[
                      { label: "Male", value: "male" },
                      { label: "Female", value: "female" },
                      { label: "Prefer not to say", value: "none" },
                    ]}
                    onSelect={() => {}}
                  />{" "}
                </Flex>
              </Row>
              <Row fillWidth horizontal="space-between">
                <Flex flex={5}>
                  {" "}
                  <Text
                    onBackground="neutral-weak"
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    Country:
                  </Text>
                </Flex>

                <Flex flex={7}>
                  {" "}
                  <Select
                    height="m"
                    searchable={true}
                    id="basic-select"
                    placeholder="Where do you reside?"
                    value={"Earth"}
                    options={countries}
                    onSelect={() => {}}
                  />{" "}
                </Flex>
              </Row>
              <Row fillWidth horizontal="space-between">
                <Flex flex={5}>
                  {" "}
                  <Text
                    onBackground="neutral-weak"
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    Date of Birth:
                  </Text>
                </Flex>

                <Flex flex={7}>
                  {" "}
                  <DateInput
                    id="date"
                    height="m"
                    placeholder="When were you born?"
                    cursor="interactive"
                  ></DateInput>
                </Flex>
              </Row>
              <Row fillWidth horizontal="space-between">
                <Flex flex={5}>
                  {" "}
                  <Text
                    onBackground="neutral-weak"
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    Address:
                  </Text>
                </Flex>

                <Flex flex={7}>
                  {" "}
                  <Textarea
                    id="textarea"
                    placeholder="Where do you live?"
                  ></Textarea>
                </Flex>
              </Row>
              <Row fillWidth horizontal="space-between">
                <Flex flex={5}>
                  {" "}
                  <Text
                    onBackground="neutral-weak"
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    Phone Number:
                  </Text>
                </Flex>

                <Flex flex={7}>
                  {" "}
                  <NumberInput
                    id="input"
                    height="m"
                    placeholder="Your phone number"
                  ></NumberInput>
                </Flex>
              </Row>
              <Row fillWidth horizontal="space-between">
                <Flex flex={5}>
                  {" "}
                  <Text
                    onBackground="neutral-weak"
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    Email:
                  </Text>
                </Flex>

                <Flex flex={7}>
                  {" "}
                  <Input
                    id="input"
                    height="m"
                    placeholder="Your email id"
                    hasPrefix={
                      <Text onBackground="neutral-medium">
                        <i className="ri-at-line"></i>
                      </Text>
                    }
                  ></Input>
                </Flex>
              </Row>
            </Column>
            <Column fillWidth horizontal="start" vertical="start" gap="20">
              <Text
                onBackground="neutral-strong"
                style={{
                  fontSize: "16px",
                  marginBottom: "12px",
                }}
              >
                Account Details
              </Text>
              <Row fillWidth horizontal="space-between">
                <Flex flex={5}>
                  <Text
                    onBackground="neutral-weak"
                    style={{ fontSize: "14px" }}
                  >
                    User Name:
                  </Text>
                </Flex>
                <Flex flex={7}>
                  <Input
                    placeholder="Enter your username"
                    description={<Text onBackground="neutral-weak"><i className="ri-information-line"></i>&nbsp;This will be visible to others</Text>}
                    hasSuffix={<Kbd>Once</Kbd>}
                    id="input"
                    disabled
                  ></Input>
                </Flex>
              </Row>
              <Row fillWidth horizontal="space-between">
                <Flex flex={5}>
                  <Text
                    onBackground="neutral-weak"
                    style={{ fontSize: "14px" }}
                  >
                    Account Created:
                  </Text>
                </Flex>
                <Flex flex={7}>
                  <DateInput
                    id="date"
                    placeholder="July 2, 2025"
                    height="m"
                    disabled
                  ></DateInput>
                </Flex>
              </Row>
              <Row fillWidth horizontal="space-between">
                <Flex flex={5}>
                  <Text
                    onBackground="neutral-weak"
                    style={{ fontSize: "14px" }}
                  >
                    Last Login:
                  </Text>
                </Flex>
                <Flex flex={7}>
                  <DateInput
                    id="date"
                    placeholder="July 2, 2025"
                    height="m"

                    disabled
                  ></DateInput>
                </Flex>
              </Row>
              <Row fillWidth horizontal="space-between">
                <Flex flex={5}>
                  <Text
                    onBackground="neutral-weak"
                    style={{ fontSize: "14px" }}
                  >
                    Membership Status:
                  </Text>
                </Flex>
                <Flex flex={7}>
                  <Select
                    height="m"
                                      disabled

                    id="basic-select"
                    placeholder="Active"
                    value={"Active"}
                    options={[
                      { label: "Active", value: "A" },
                      { label: "Freemium", value: "F" },
                      { label: "Pro", value: "P" },
                    ]}
                    onSelect={() => {}}
                  />{" "}
                </Flex>
              </Row>
              <Row fillWidth horizontal="space-between">
                <Flex flex={5}>
                  <Text
                    onBackground="neutral-weak"
                    style={{ fontSize: "14px" }}
                  >
                    Account Verification:
                  </Text>
                </Flex>
                <Flex flex={7}>
                  <Tag variant="danger">Not verified</Tag>
                </Flex>
              </Row>
              <Row fillWidth horizontal="space-between">
                <Flex flex={5}>
                  <Text
                    onBackground="neutral-weak"
                    style={{ fontSize: "14px" }}
                  >
                    Language Preference:
                  </Text>
                </Flex>
                <Flex flex={7}>
                  <Select
                  disabled
                    height="m"
                    id="basic-select"
                    placeholder="English"
                    value={"English"}
                    options={[
                      { label: "Active", value: "A" },
                      { label: "Freemium", value: "F" },
                      { label: "Pro", value: "P" },
                    ]}
                    onSelect={() => {}}
                  />{" "}
                </Flex>
              </Row>
              <Row fillWidth horizontal="space-between">
                <Flex flex={5}>
                  <Text
                    onBackground="neutral-weak"
                    style={{ fontSize: "14px" }}
                  >
                    Time Zone:
                  </Text>
                </Flex>
                <Flex flex={7}>
 <Select
                   disabled

                    height="m"
                    id="basic-select"
                    placeholder="GMT +5:30"
                    value={"GMT +5:30"}
                    options={[
                      { label: "Active", value: "A" },
                      { label: "Freemium", value: "F" },
                      { label: "Pro", value: "P" },
                    ]}
                    onSelect={() => {}}
                  />                </Flex>
              </Row>
            </Column>
          </Grid>
          </Column>
        </Column>
      </Column>
    </>
  );
}
