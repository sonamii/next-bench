"use client";

import React from "react";
import {
  Accordion,
  AvatarGroup,
  Button,
  Chip,
  Column,
  Flex,
  IconButton,
  InlineCode,
  Kbd,
  Line,
  Row,
  SegmentedControl,
  SmartLink,
  Table,
  Text,
  Input,
  Grid,
  Checkbox,
  Spinner,
  NumberInput,
  Dialog,
  TagInput,
  useToast,
  DateInput,
  DateRangeInput,
  DateRangePicker,
  MediaUpload,
  Carousel,
  Media,
  RevealFx,
} from "@once-ui-system/core";
import Navbar from "../../components/NavBar";

import { useRouter } from "next/navigation";
// Font setup
import { Outfit } from "next/font/google";
const dmsans = Outfit({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});
import Footer from "../../components/Footer";
import { useState, useEffect } from "react";
import { supabase } from "@/app/utils/supabase/client";
import { Textarea } from "@once-ui-system/core";
import { useCallback } from "react";

export default function Page() {
  const [activeTab, setActiveTab] = useState("about");
  const router = useRouter();

  const [tables, setTables] = useState([""]);
  type BasicInfo = {
    year_estabilished?: string;
    type?: string;
    gender?: string;
    boarding_type?: string;
    classes_offered?: {
      min?: string;
      max?: string;
    };
    affiliation?: {
      boards?: string;
      type?: string;
    };
  };

  const [basicInfo, setBasicInfo] = useState<BasicInfo>({});
  const [extraLinks, setExtraLinks] = useState([""]);
  const [faqs, setFAQS] = useState([""]);
  const [text, setText] = useState<{
    about?: string;
    admission?: string;
    extra_curricular?: string;
    hero?: string;
  }>(() => ({ about: "" }));
  const [facilities, setFacilities] = useState<FacilitiesJson>({});
  const [motto, setMotto] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [images, setImages] = useState<{ slide: string; alt: string }[]>([
    { slide: "", alt: "Cover Image" },
  ]);
  const [logo, setLogo] = useState<string>("");
  const [reviews, setReviews] = useState<string[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [rating, setRating] = useState<number>(0); // Default rating

  const [slug, setSlug] = useState("");
  useEffect(() => {
    // Get the slug from the URL (the [institution] param)
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      // path: /edu/[slug] or /edu/[slug]/...
      const match = path.match(/\/edu\/([^\/]+)/);
      if (match && match[1]) {
        setSlug(match[1]);
      }
    }
  }, []);

  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    const checkUser = async () => {
      if (!slug) return;
      const session = await supabase.auth.getSession();
      const userId = session.data?.session?.user?.id;
      const { data, error } = await supabase
        .from("edu_centers")
        .select(
          "uuid,is_published,logo,qna,reviews,tables,extra_links,facilities,texts,basic_info,motto,images,rating"
        )
        .eq("edu_id", slug)
        .maybeSingle();
      if (error) {
        console.error("Error fetching edu_centers data:", error.message);
        // Optionally show a toast or alert here
        return;
      }
      if (data && data.uuid === userId) {
        setIsUser(true);
      }

      if (data) {
        console.log("Fetched data:", isUser);
        setIsPublished(data.is_published);
        setLogo(data.logo);
        setTables(data.tables || []);
        setExtraLinks(data.extra_links || []);
        setFacilities(data.facilities || []);
        setText(data.texts || "");
        setBasicInfo(data.basic_info || []);
        setMotto(data.motto || "");
        setImages(data.images || []);
        setFAQS(data.qna || []);
        setReviews(data.reviews || []);
        setRating(data.rating || 0); // Set rating from data
      }
    };
    checkUser();
    setIsDataLoaded(true);
  }, [slug]);
  useEffect(() => {
    if (!slug) return;
    // Subscribe to changes for this institution
    const channel = supabase
      .channel("edu_centers_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "edu_centers",
          filter: `edu_id=eq.${slug}`,
        },
        (payload) => {
          // Update state with new data
          const newData = payload.new as any;
          if (newData) {
            setIsPublished(newData.is_published);
            setLogo(newData.logo);
            setTables(newData.tables ?? []);
            setExtraLinks(newData.extra_links ?? []);
            setFacilities(newData.facilities ?? {});
            setText(newData.texts ?? {});
            setBasicInfo(newData.basic_info ?? {});
            setMotto(newData.motto ?? "");
            setImages(newData.images ?? []);
            setFAQS(newData.qna ?? []);
            setReviews(newData.reviews ?? []);
            setRating(newData.rating ?? 0);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [slug]);

  useEffect(() => {
    console.log(
      isPublished,
      logo,
      tables,
      extraLinks,
      facilities,
      text,
      basicInfo,
      motto,
      images,
      faqs,
      reviews
    );
  }, []);

  return (
    <>
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
          <Navbar />
          <Flex fillWidth height={7}></Flex>
          {!isDataLoaded ? (
            <div
              style={{
                alignContent: "center",
                minWidth: "100vw",
                minHeight: "100vh",
              }}
            >
              <Spinner size="xl"></Spinner>
            </div>
          ) : (
            <Column>
              <RevealFx>
                <Flex fitHeight style={{ minHeight: "fit-content !important" }}>
                  <HeroSection
                    isUser={isUser}
                    logo={logo}
                    basicInfo={basicInfo}
                    text={text.hero ?? ""}
                    slug={slug}
                    rating={rating}
                  ></HeroSection>
                </Flex>
              </RevealFx>

              <Flex fillWidth height={3}></Flex>

              <Flex fillWidth maxWidth={60} center>
                <RevealFx>
                  <SegmentedControl
                    buttons={[
                      { value: "about", label: "About" },
                      { value: "admission", label: "Admission & Fees" },
                      {
                        value: "facilities",
                        label: "Facilities & Infrastructure",
                      },
                      { value: "extra", label: "Extra Curricular" },
                      { value: "academics", label: "Academics" },
                      { value: "reviews", label: "Reviews" },
                      { value: "qna", label: "Q&A" },
                    ]}
                    onToggle={(value) => setActiveTab(value)}
                  />
                </RevealFx>
              </Flex>
              <Flex fillWidth height={3}></Flex>
              <Column
                fillWidth
                maxWidth={60}
                horizontal="start"
                vertical="start"
                paddingY="16"
                gap="8"
              >
                {
                  {
                    about: (
                      <RevealFx direction="column">
                        <AboutSchool
                          isUser={isUser}
                          motto={motto}
                          text={text.about ?? ""}
                          basicInfo={basicInfo}
                          slug={slug}
                          cover_image={images[0]?.slide}
                        />
                      </RevealFx>
                    ),
                    admission: (
                      <Admission
                        isUser={isUser}
                        text={text.admission ?? ""}
                        extra_links={
                          Array.isArray(extraLinks)
                            ? { admission: [], academics: [] }
                            : {
                                admission:
                                  (extraLinks as ExtraLinksObject).admission ??
                                  [],
                                academics:
                                  (extraLinks as ExtraLinksObject).academics ??
                                  [],
                              }
                        }
                        tables={
                          Array.isArray(tables)
                            ? {
                                admission: {
                                  admissionRows: [],
                                  classesRows: [],
                                  feesRows: [],
                                },
                              }
                            : (tables as {
                                admission: {
                                  admissionRows: string[][];
                                  classesRows: string[][];
                                  feesRows: string[][];
                                };
                              })
                        }
                        slug={slug}
                      />
                    ),
                    facilities: (
                      <Facilities
                        isUser={isUser}
                        facilities={facilities}
                        slug={slug}
                      />
                    ),
                    extra: (
                      <Extracurricular
                        isUser={isUser}
                        text={text.extra_curricular ?? ""}
                        slug={slug}
                      />
                    ),
                    academics: (
                      <Academics
                        isUser={isUser}
                        extra_links={
                          Array.isArray(extraLinks)
                            ? { admission: [], academics: [] }
                            : {
                                admission:
                                  (extraLinks as ExtraLinksObject).admission ??
                                  [],
                                academics:
                                  (extraLinks as ExtraLinksObject).academics ??
                                  [],
                              }
                        }
                        tables={
                          typeof tables === "object" &&
                          "timeRow" in tables &&
                          "vacationRow" in tables &&
                          "classRow" in tables
                            ? {
                                academics: {
                                  timeRow: (tables as any).timeRow,
                                  vacationRow: (tables as any).vacationRow,
                                  classRow: (tables as any).classRow,
                                },
                              }
                            : {
                                academics: {
                                  timeRow: [],
                                  vacationRow: [],
                                  classRow: [],
                                },
                              }
                        }
                        slug={slug}
                      />
                    ),
                    reviews: <Reviews reviews={reviews} isUser={isUser} />,
                    qna: <FAQs isUser={isUser} faqs={faqs} slug={slug} />,
                  }[activeTab]
                }
              </Column>
            </Column>
          )}

          <Footer />
        </Column>
      </Column>
    </>
  );
}

// Move the BasicInfo type definition here so it's available for use below
type BasicInfo = {
  uuid?: string;
  year_established?: string;
  type?: string;
  gender?: string;
  boarding_type?: string;
  classes_offered?: {
    min?: string;
    max?: string;
  };
  affiliation?: {
    boards?: string[] | string;
    type?: string;
  };
  student_population?: number;
  name?: string;
  location?: {
    country?: string;
    city?: string;
  };
  contact?: {
    phone?: string;
    email?: string;
  };
};

/*===========================================================================================================*/
interface HeroSectionProps {
  isUser: boolean;
  logo: string;
  basicInfo: BasicInfo;
  text: string;
  slug?: string;
  rating?: number; // Optional rating prop
}
function HeroSection({
  isUser,
  logo,
  basicInfo,
  text,
  slug,
  rating = 4.7, // Default rating if not provided
}: HeroSectionProps) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialog2Open, setIsDialog2Open] = useState(false);

  // Compose initial state from basicInfo
  const [newInstitution, setNewInstitution] = useState({
    name: basicInfo.name || "",
    country: basicInfo.location?.country || "",
    city: basicInfo.location?.city || "",
    affiliation: Array.isArray(basicInfo.affiliation?.boards)
      ? basicInfo.affiliation?.boards
      : typeof basicInfo.affiliation?.boards === "string"
      ? [basicInfo.affiliation?.boards]
      : [],
    phoneNumber: basicInfo.contact?.phone || "",
    email: basicInfo.contact?.email || "",
    type: basicInfo.type || "",
  });
  const [heroText, setHeroText] = useState(text);

  // Sync dialog fields with latest props when dialog is opened
  useEffect(() => {
    if (isDialogOpen) {
      setNewInstitution({
        name: basicInfo.name || "",
        country: basicInfo.location?.country || "",
        city: basicInfo.location?.city || "",
        affiliation: Array.isArray(basicInfo.affiliation?.boards)
          ? basicInfo.affiliation?.boards
          : typeof basicInfo.affiliation?.boards === "string"
          ? [basicInfo.affiliation?.boards]
          : [],
        phoneNumber: basicInfo.contact?.phone || "",
        email: basicInfo.contact?.email || "",
        type: basicInfo.type || "",
      });
      setHeroText(text);
    }
  }, [isDialogOpen, basicInfo, text]);

  // --- FIX: Sync state with props on every change (for real-time updates) ---
  useEffect(() => {
    setNewInstitution({
      name: basicInfo.name || "",
      country: basicInfo.location?.country || "",
      city: basicInfo.location?.city || "",
      affiliation: Array.isArray(basicInfo.affiliation?.boards)
        ? basicInfo.affiliation?.boards
        : typeof basicInfo.affiliation?.boards === "string"
        ? [basicInfo.affiliation?.boards]
        : [],
      phoneNumber: basicInfo.contact?.phone || "",
      email: basicInfo.contact?.email || "",
      type: basicInfo.type || "",
    });
  }, []);
  useEffect(() => {
    setHeroText(text);
  }, [text]);
  // --------------------------------------------------------------------------

  // Update institution data in Supabase
  const updateInstitutionDataToSupabase = useCallback(async () => {
    setLoading(true);
    if (!slug) return;
    // Prepare updated basic info
    const updatedBasicInfo: BasicInfo = {
      ...basicInfo,
      name: newInstitution.name,
      location: {
        country: newInstitution.country,
        city: newInstitution.city,
      },
      affiliation: {
        boards: newInstitution.affiliation,
        type: basicInfo.affiliation?.type || "",
      },
      contact: {
        phone: newInstitution.phoneNumber,
        email: newInstitution.email,
      },
      type: newInstitution.type,
    };

    // Fetch current texts to preserve other fields
    const { data, error: fetchError } = await supabase
      .from("edu_centers")
      .select("texts")
      .eq("edu_id", slug)
      .single();

    if (fetchError) {
      alert("Failed to fetch current hero text: " + fetchError.message);
      setLoading(false);
      return;
    }

    const updatedTexts = { ...(data?.texts || {}), hero: heroText };

    // Update both basic_info and texts
    const { error } = await supabase
      .from("edu_centers")
      .update({ basic_info: updatedBasicInfo, texts: updatedTexts })
      .eq("edu_id", slug);

    if (error) {
      alert("Failed to update institution data: " + error.message);
    } else {
      addToast({
        message: "Institution details updated successfully!",
        variant: "success",
      });
      setHeroText(updatedTexts.hero || "");
      setIsDialogOpen(false);
    }
    setLoading(false);
  }, [slug, basicInfo, newInstitution, heroText]);

  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const [logoImage, setLogoImage] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);

  async function uploadImagesToSupabase() {
    setLoading(true);
    if (!slug) {
      alert("Institution identifier (slug) is missing.");
      setLoading(false);
      return;
    }

    try {
      let logoUrl = "";
      let coverUrl = "";

      // Upload logo image if selected
      if (logoImage) {
        const logoPath = `${basicInfo.name}/${slug}/${logoImage.name}`;
        const { error: logoUploadError } = await supabase.storage
          .from("logo")
          .upload(logoPath, logoImage);
        if (logoUploadError) {
          alert("Failed to upload logo: " + logoUploadError.message);
          setLoading(false);
          return;
        }
        const { data: logoPublic } = supabase.storage
          .from("logo")
          .getPublicUrl(logoPath);
        logoUrl = logoPublic?.publicUrl || "";
      }

      // Upload cover image if selected
      if (coverImage) {
        const coverPath = `${basicInfo.name}/${slug}/${coverImage.name}`;
        const { error: coverUploadError } = await supabase.storage
          .from("cover-image")
          .upload(coverPath, coverImage);
        if (coverUploadError) {
          alert("Failed to upload cover image: " + coverUploadError.message);
          setLoading(false);
          return;
        }
        const { data: coverPublic } = supabase.storage
          .from("cover-image")
          .getPublicUrl(coverPath);
        coverUrl = coverPublic?.publicUrl || "";
      }

      // Update the database with the new URLs
      const updatePayload: Record<string, any> = {};
      if (logoUrl) updatePayload.logo = logoUrl;
      if (coverUrl)
        updatePayload.images = [{ slide: coverUrl, alt: "Cover Image" }];

      if (Object.keys(updatePayload).length > 0) {
        const { error: updateError } = await supabase
          .from("edu_centers")
          .update(updatePayload)
          .eq("edu_id", slug);
        if (updateError) {
          console.log("Failed to update image URLs: " + updateError);
          setLoading(false);
          return;
        }
      }

      addToast({
        message: "Images uploaded successfully!",
        variant: "success",
      });
      setIsDialog2Open(false);
    } catch (err: any) {
      alert("Unexpected error: " + (err?.message || err));
    }
    setLoading(false);
    window.location.reload();
  }

  return (
    <>
      <Flex maxWidth={60} fitHeight>
        <Row
          id="herro"
          horizontal="space-between"
          vertical="start"
          fillWidth
          style={{ maxWidth: "100%", minHeight: "fit-content" }}
          fitHeight
          gap="40"
          wrap
        >
          <Column fillWidth fitHeight vertical="center" horizontal="start">
            <Button
              variant="secondary"
              weight="default"
              size="l"
              arrowIcon
              onClick={() => router.back()}
            >
              Back
            </Button>
            <Flex fillWidth height={0.5} />
            <Column>
              <a>
                <u style={{ textDecorationColor: "#ccc" }}>
                  <Text
                    style={{
                      color: "#181A1D",
                      fontSize: "70px",
                      lineHeight: "1em",
                      fontWeight: "500",
                      letterSpacing: ".3px",
                    }}
                    className={dmsans.className}
                  >
                    {newInstitution.name || basicInfo.name},
                    <span style={{ color: "#626F45" }}>
                      {" "}
                      {newInstitution.type || basicInfo.type}
                    </span>
                    &nbsp;in <span style={{ color: "#626F45" }}></span>
                    {newInstitution.country ||
                      basicInfo.location?.country}.{" "}
                  </Text>
                </u>
              </a>
            </Column>
          </Column>
          <Column
            fitWidth
            fillHeight
            horizontal="start"
            vertical="space-between"
            maxWidth={27.5}
            maxHeight={13.2}
            gap="20"
          >
            <Row center fitWidth fitHeight gap="20">
              <AvatarGroup
                size="l"
                avatars={[
                  {
                    src: logo,
                  },
                ]}
              />
              <Line vert width={0.2} height={4} background="neutral-medium" />
              <Column horizontal="end" vertical="start" fitHeight>
                <Text
                  style={{
                    color: "#181A1D",
                    fontSize: "41px",
                  }}
                  className={dmsans.className}
                >
                  +{basicInfo.student_population}
                </Text>
                <Text
                  onBackground="neutral-weak"
                  style={{
                    fontSize: "10px",
                  }}
                >
                  Students and Teachers
                </Text>
              </Column>
              <Column horizontal="end" vertical="start" fillHeight>
                <Text
                  style={{
                    color: "#181A1D",
                    fontSize: "41px",
                  }}
                  className={dmsans.className}
                >
                  {rating}/5
                </Text>
                <Text
                  onBackground="neutral-weak"
                  style={{
                    fontSize: "10px",
                  }}
                >
                  Average Rating
                </Text>
              </Column>
            </Row>
            <Column gap="20" fillWidth fitHeight>
              <Text
                onBackground="neutral-weak"
                style={{
                  fontSize: "14px",
                }}
              >
                {heroText.trim() || text.trim() || "No description available."}
              </Text>

              <Row gap="20">
                {isUser && (
                  <Button
                    id="arrow-button-1"
                    arrowIcon
                    size="m"
                    weight="default"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    Edit header
                  </Button>
                )}
                {!isUser && (
                  <>
                    <Button
                      id="arrow-button-1"
                      arrowIcon={!isUser}
                      size="m"
                      weight="default"
                      onClick={() => {
                        if (basicInfo.contact?.phone) {
                          window.open(
                            `tel:${basicInfo.contact.phone}`,
                            "_self"
                          );
                        } else {
                          alert("Phone number not available.");
                        }
                      }}
                    >
                      Call Us
                    </Button>
                    <Button
                      id="arrow-button-1"
                      size="m"
                      weight="default"
                      variant="secondary"
                      style={{ backgroundColor: "#F2F2EF" }}
                      onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) =>
                        (e.currentTarget.style.backgroundColor = "#E0E0DC")
                      }
                      onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) =>
                        (e.currentTarget.style.backgroundColor = "#F2F2EF")
                      }
                      onClick={() => {
                        window.open(
                          `mailto:${basicInfo.contact?.email}`,
                          "_blank"
                        );
                      }}
                    >
                      Email Us
                    </Button>
                  </>
                )}
                <Button
                  id="arrow-button-1"
                  size="m"
                  weight="default"
                  variant="secondary"
                  style={{ backgroundColor: "#F2F2EF" }}
                  onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) =>
                    (e.currentTarget.style.backgroundColor = "#E0E0DC")
                  }
                  onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) =>
                    (e.currentTarget.style.backgroundColor = "#F2F2EF")
                  }
                  
                >
                  <i className="ri-user-smile-line"></i>&nbsp;Connect with
                  Students
                </Button>
                {isUser && (
                  <Button
                    id="arrow-button-1"
                    size="m"
                    weight="default"
                    variant="secondary"
                    style={{ backgroundColor: "#F2F2EF" }}
                    onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) =>
                      (e.currentTarget.style.backgroundColor = "#E0E0DC")
                    }
                    onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) =>
                      (e.currentTarget.style.backgroundColor = "#F2F2EF")
                    }
                    onClick={() => setIsDialog2Open(true)}
                  >
                    <i className="ri-camera-line"></i>&nbsp;Upload logo and
                    image
                  </Button>
                )}
              </Row>
            </Column>
          </Column>
        </Row>
      </Flex>

      <Dialog
        isOpen={isDialog2Open}
        onClose={() => setIsDialog2Open(false)}
        title="Upload the logo and image"
        description="This will help in better representation of your institution."
        footer={
          <Row fillWidth horizontal="start" vertical="center">
            <Text
              variant="label-default-xs"
              onBackground="neutral-weak"
              style={{ fontSize: "13px" }}
            >
              <i className="ri-information-line"></i>&nbsp;The images submitted
              will be reviewed before being published.
            </Text>
          </Row>
        }
      >
        {" "}
        <Column fillWidth gap="16" horizontal="space-between" vertical="start">
          <MediaUpload
            initialPreviewImage={""}
            aspectRatio="16/9"
            onFileUpload={async (file: File) => {
              setCoverImage(file);
            }}
          />
          <Text
            variant="label-default-xs"
            onBackground="neutral-weak"
            style={{ fontSize: "13px" }}
          >
            Aspect ratio of 16:9 is recommended for the cover image.
          </Text>
        </Column>
        <Column
          fillWidth
          gap="16"
          horizontal="space-between"
          vertical="start"
          marginTop="16"
        >
          <MediaUpload
            aspectRatio="1/1"
            maxWidth={15}
            maxHeight={15}
            onFileUpload={async (file: File) => {
              setLogoImage(file);
            }}
          />
          <Text
            variant="label-default-xs"
            onBackground="neutral-weak"
            style={{ fontSize: "13px" }}
          >
            Aspect ratio of 1:1 is recommended for the logo.
          </Text>
        </Column>
        <Row fillWidth horizontal="end">
          <Button size="m" onClick={uploadImagesToSupabase}>
            {loading ? (
              <>
                Uploading...&nbsp;
                <Spinner size="s" />
              </>
            ) : (
              "Upload"
            )}
          </Button>
        </Row>
      </Dialog>
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Update your Institution"
        description="Fill in the details to update your institution."
        footer={
          <Row fillWidth horizontal="start" vertical="center">
            <Text
              variant="label-default-xs"
              onBackground="neutral-weak"
              style={{ fontSize: "13px" }}
            >
              <i className="ri-information-line"></i>&nbsp;These details are
              required to update your institution.{" "}
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
              onChange={(e) =>
                setNewInstitution((prev) => ({ ...prev, name: e.target.value }))
              }
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
              onChange={(e) =>
                setNewInstitution((prev) => ({ ...prev, city: e.target.value }))
              }
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
              onChange={(e) =>
                setNewInstitution((prev) => ({
                  ...prev,
                  country: e.target.value,
                }))
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
              onChange={(e) =>
                setNewInstitution((prev) => ({ ...prev, type: e.target.value }))
              }
            />
          </Row>
          <Row fillWidth vertical="center" gap="8">
            <TagInput
              id="affiliation"
              value={
                Array.isArray(newInstitution.affiliation)
                  ? newInstitution.affiliation
                  : []
              }
              onChange={(tags: string[]) =>
                setNewInstitution((prev) => ({
                  ...prev,
                  affiliation: tags,
                }))
              }
              placeholder="e.g. ICSE/CBSE/IB"
              hasSuffix={
                <Kbd position="absolute" top="12" right="12">
                  Enter
                </Kbd>
              }
              description={
                <>
                  <i className="ri-information-line"></i>&nbsp;Enter the
                  affiliations of your institution
                </>
              }
            />
          </Row>
          <Row fillWidth vertical="center" gap="8">
            <Input
              id="phone"
              label="e.g. 1234567890"
              spellCheck={false}
              description={
                <>
                  <i className="ri-information-line"></i>&nbsp;Enter the
                  institution's phone number
                </>
              }
              value={newInstitution.phoneNumber}
              onChange={(e) =>
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
              onChange={(e) =>
                setNewInstitution((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
          </Row>
          <Row fillWidth vertical="center" gap="8">
            <Textarea
              id=""
              placeholder="Enter a short description"
              resize="vertical"
              description={
                <>
                  <i className="ri-information-line"></i>&nbsp;Enter a short
                  description about the institution
                </>
              }
              value={heroText}
              onChange={(e) => setHeroText(e.target.value)}
            />
          </Row>
          <Row fillWidth vertical="center" horizontal="end" gap="8">
            <Button
              size="m"
              disabled={
                !newInstitution.name ||
                !newInstitution.affiliation.length ||
                !newInstitution.phoneNumber ||
                !newInstitution.email ||
                !newInstitution.type ||
                !newInstitution.city
              }
              onClick={updateInstitutionDataToSupabase}
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
        </Column>
      </Dialog>
    </>
  );
}
/*=========================================================================================================== */
interface AboutSchoolProps {
  isUser: boolean;
  text: string;
  motto: string;
  basicInfo: BasicInfo;
  slug?: string;
  cover_image: string;
}

function AboutSchool({
  isUser,
  text,
  motto,
  basicInfo,
  slug,
  cover_image,
}: AboutSchoolProps) {
  // State for editable fields
  const [aboutText, setAboutText] = useState(text);
  const [mottoText, setMottoText] = useState(motto);
  const [yearEstablished, setYearEstablished] = useState(
    basicInfo.year_established ?? ""
  );
  const [institutionType, setInstitutionType] = useState(basicInfo.type ?? "");
  const [gender, setGender] = useState(basicInfo.gender ?? "");
  const [boardingType, setBoardingType] = useState(
    basicInfo.boarding_type ?? ""
  );
  const [minClass, setMinClass] = useState(
    basicInfo.classes_offered?.min ?? ""
  );
  const [maxClass, setMaxClass] = useState(
    basicInfo.classes_offered?.max ?? ""
  );
  const [studentPopulation, setStudentPopulation] = useState(
    basicInfo.student_population ?? 0
  );
  const [affiliationBoards, setAffiliationBoards] = useState(
    basicInfo.affiliation?.boards ?? ""
  );
  const [affiliationType, setAffiliationType] = useState(
    basicInfo.affiliation?.type ?? ""
  );
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);

  // Sync state with props when they change (fixes initial value bug)
  useEffect(() => {
    setAboutText(text);
  }, [text]);
  useEffect(() => {
    setMottoText(motto);
  }, [motto]);
  useEffect(() => {
    setYearEstablished(basicInfo.year_established ?? "");
    setInstitutionType(basicInfo.type ?? "");
    setGender(basicInfo.gender ?? "");
    setBoardingType(basicInfo.boarding_type ?? "");
    setMinClass(basicInfo.classes_offered?.min ?? "");
    setMaxClass(basicInfo.classes_offered?.max ?? "");
    setStudentPopulation(basicInfo.student_population ?? 0);
    setAffiliationBoards(basicInfo.affiliation?.boards ?? "");
    setAffiliationType(basicInfo.affiliation?.type ?? "");
  }, [basicInfo]);

  // Save handler
  async function saveAboutSchoolToSupabase() {
    setLoading(true);
    if (!isUser || !slug) return;

    const updatedBasicInfo: BasicInfo = {
      ...basicInfo,
      year_established: yearEstablished,
      type: institutionType,
      gender,
      boarding_type: boardingType,
      classes_offered: {
        min: minClass,
        max: maxClass,
      },
      affiliation: {
        boards: affiliationBoards,
        type: affiliationType,
      },
      student_population: studentPopulation,
    };

    // Fetch current texts and basic_info to preserve other fields
    const { data, error: fetchError } = await supabase
      .from("edu_centers")
      .select("texts, basic_info")
      .eq("edu_id", slug)
      .single();

    if (fetchError) {
      alert("Failed to fetch current data: " + fetchError.message);
      setLoading(false);
      return;
    }

    const updatePayload = {
      texts: { ...(data?.texts || {}), about: aboutText },
      motto: mottoText,
      basic_info: { ...(data?.basic_info || {}), ...updatedBasicInfo },
    };

    const { error } = await supabase
      .from("edu_centers")
      .update(updatePayload)
      .eq("edu_id", slug);

    if (error) {
      alert("Failed to save data: " + error.message);
    } else {
      addToast({
        message: "Data saved successfully!",
        variant: "success",
      });
    }
    setLoading(false);
  }

  return (
    <>
      <Column
        fillWidth
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        <Text
          variant="body-default-xl"
          style={{
            color: "#181A1D",
            fontSize: "25px",
            fontWeight: "500",
          }}
          className={dmsans.className}
        >
          About School
        </Text>
        <Text style={{ fontSize: "17px" }} onBackground="neutral-weak"></Text>
        {isUser ? (
          <Textarea
            id=""
            placeholder="Enter a detailed description about the school"
            resize="vertical"
            style={{ minHeight: "300px" }}
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
          />
        ) : aboutText.trim() ? (
          <Text style={{ fontSize: "17px" }} onBackground="neutral-weak">
            {aboutText.split("\n").map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                {idx < aboutText.split("\n").length - 1 && <br />}
              </React.Fragment>
            ))}
          </Text>
        ) : (
          <Text
            style={{ fontSize: "17px", color: "#888" }}
            onBackground="neutral-weak"
          >
            No information provided.
          </Text>
        )}
      </Column>
      <Column
        fillWidth
        maxWidth={60}
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        <Text
          variant="body-default-xl"
          style={{
            color: "#181A1D",
            fontSize: "25px",
            fontWeight: "500",
          }}
          className={dmsans.className}
        >
          Basic Information about School
        </Text>
        <Column fillWidth gap="12">
          {/* Year Established */}
          {isUser ? (
            <Flex fillWidth horizontal="start">
              <Row flex={1}>
                <Text
                  onBackground="neutral-weak"
                  style={{ fontSize: "17px !important" }}
                >
                  <Kbd
                    background="neutral-medium"
                    border="neutral-medium"
                    onBackground="neutral-weak"
                    style={{ minWidth: "fit-content", whiteSpace: "nowrap" }}
                  >
                    1. Year Established :
                  </Kbd>
                </Text>
              </Row>
              <Row flex={3} fillWidth>
                <Input
                  id=""
                  placeholder="e.g. 1990"
                  value={yearEstablished}
                  onChange={(e) => setYearEstablished(e.target.value)}
                />
              </Row>
            </Flex>
          ) : (
            <Row fillWidth horizontal="start" gap="12" vertical="center">
              <Text
                onBackground="neutral-weak"
                style={{ fontSize: "17px !important" }}
              >
                <Kbd
                  background="neutral-medium"
                  border="neutral-medium"
                  onBackground="neutral-weak"
                  style={{ minWidth: "fit-content", whiteSpace: "nowrap" }}
                >
                  1. Year Established :
                </Kbd>
              </Text>
              <Text
                onBackground="neutral-weak"
                style={{ fontSize: "16px" }}
                className={dmsans.className}
              >
                {yearEstablished}
              </Text>
            </Row>
          )}

          {/* Institution Type */}
          {isUser ? (
            <Flex fillWidth horizontal="start">
              <Row flex={1}>
                <Text
                  onBackground="neutral-weak"
                  style={{ fontSize: "17px !important" }}
                >
                  <Kbd
                    background="neutral-medium"
                    border="neutral-medium"
                    onBackground="neutral-weak"
                    style={{ minWidth: "fit-content", whiteSpace: "nowrap" }}
                  >
                    2. Institution Type :
                  </Kbd>
                </Text>
              </Row>
              <Row flex={3} fillWidth>
                <Input
                  id=""
                  placeholder="e.g. School/Tuition/College"
                  value={institutionType}
                  onChange={(e) => setInstitutionType(e.target.value)}
                />
              </Row>
            </Flex>
          ) : (
            <Row fillWidth horizontal="start" gap="12" vertical="center">
              <Text
                onBackground="neutral-weak"
                style={{ fontSize: "17px !important" }}
              >
                <Kbd
                  background="neutral-medium"
                  border="neutral-medium"
                  onBackground="neutral-weak"
                  style={{ minWidth: "fit-content", whiteSpace: "nowrap" }}
                >
                  2. Institution Type :
                </Kbd>
              </Text>
              <Text
                onBackground="neutral-weak"
                style={{ fontSize: "16px" }}
                className={dmsans.className}
              >
                {institutionType}
              </Text>
            </Row>
          )}

          {/* Gender */}
          {isUser ? (
            <Flex fillWidth horizontal="start">
              <Row flex={1}>
                <Text
                  onBackground="neutral-weak"
                  style={{ fontSize: "17px !important" }}
                >
                  <Kbd
                    background="neutral-medium"
                    border="neutral-medium"
                    onBackground="neutral-weak"
                    style={{ minWidth: "fit-content", whiteSpace: "nowrap" }}
                  >
                    3. Institution gender :
                  </Kbd>
                </Text>
              </Row>
              <Row flex={3} fillWidth>
                <Input
                  id=""
                  placeholder="e.g. Co-Ed/Boys school"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </Row>
            </Flex>
          ) : (
            <Row fillWidth horizontal="start" gap="12" vertical="center">
              <Text
                onBackground="neutral-weak"
                style={{ fontSize: "17px !important" }}
              >
                <Kbd
                  background="neutral-medium"
                  border="neutral-medium"
                  onBackground="neutral-weak"
                  style={{ minWidth: "fit-content", whiteSpace: "nowrap" }}
                >
                  3. Institution gender :
                </Kbd>
              </Text>
              <Text
                onBackground="neutral-weak"
                style={{ fontSize: "16px" }}
                className={dmsans.className}
              >
                {gender}
              </Text>
            </Row>
          )}

          {/* Boarding Type */}
          {isUser ? (
            <Flex fillWidth horizontal="start">
              <Row flex={1}>
                <Text
                  onBackground="neutral-weak"
                  style={{ fontSize: "17px !important" }}
                >
                  <Kbd
                    background="neutral-medium"
                    border="neutral-medium"
                    onBackground="neutral-weak"
                    style={{ minWidth: "fit-content", whiteSpace: "nowrap" }}
                  >
                    4. Boarding Type :
                  </Kbd>
                </Text>
              </Row>
              <Row flex={3} fillWidth>
                <Input
                  id=""
                  placeholder="e.g. Day School/Boarding"
                  value={boardingType}
                  onChange={(e) => setBoardingType(e.target.value)}
                />
              </Row>
            </Flex>
          ) : (
            <Row fillWidth horizontal="start" gap="12" vertical="center">
              <Text
                onBackground="neutral-weak"
                style={{ fontSize: "17px !important" }}
              >
                <Kbd
                  background="neutral-medium"
                  border="neutral-medium"
                  onBackground="neutral-weak"
                  style={{ minWidth: "fit-content", whiteSpace: "nowrap" }}
                >
                  4. Boarding Type :
                </Kbd>
              </Text>
              <Text
                onBackground="neutral-weak"
                style={{ fontSize: "16px" }}
                className={dmsans.className}
              >
                {boardingType}
              </Text>
            </Row>
          )}

          {/* Classes Offered */}
          {isUser ? (
            <Flex fillWidth horizontal="start">
              <Row flex={1}>
                <Text
                  onBackground="neutral-weak"
                  style={{ fontSize: "17px !important" }}
                >
                  <Kbd
                    background="neutral-medium"
                    border="neutral-medium"
                    onBackground="neutral-weak"
                    style={{ minWidth: "fit-content", whiteSpace: "nowrap" }}
                  >
                    5. Classes offered:
                  </Kbd>
                </Text>
              </Row>
              <Row flex={3} fillWidth gap="8">
                <Input
                  id=""
                  placeholder="e.g. 1st/2nd"
                  value={minClass}
                  onChange={(e) => setMinClass(e.target.value)}
                />
                <Input
                  id=""
                  placeholder="e.g. 10th/12th/Graduation"
                  value={maxClass}
                  onChange={(e) => setMaxClass(e.target.value)}
                />
              </Row>
            </Flex>
          ) : (
            <Row fillWidth horizontal="start" gap="12" vertical="center">
              <Text
                onBackground="neutral-weak"
                style={{ fontSize: "17px !important" }}
              >
                <Kbd
                  background="neutral-medium"
                  border="neutral-medium"
                  onBackground="neutral-weak"
                  style={{ minWidth: "fit-content", whiteSpace: "nowrap" }}
                >
                  5. Classes offered:
                </Kbd>
              </Text>
              <Text
                onBackground="neutral-weak"
                style={{ fontSize: "16px" }}
                className={dmsans.className}
              >
                {minClass} to {maxClass}
              </Text>
            </Row>
          )}

          {/* Affiliation Boards */}
          {isUser ? (
            <Flex fillWidth horizontal="start">
              <Row flex={1}>
                <Text
                  onBackground="neutral-weak"
                  style={{ fontSize: "17px !important" }}
                >
                  <Kbd
                    background="neutral-medium"
                    style={{ minWidth: "fit-content", whiteSpace: "nowrap" }}
                    border="neutral-medium"
                    onBackground="neutral-weak"
                  >
                    6. Affiliation :
                  </Kbd>
                </Text>
              </Row>
              <Row flex={3} fillWidth>
                <Input
                  id=""
                  placeholder="Enter affiliation"
                  value={
                    Array.isArray(affiliationBoards)
                      ? affiliationBoards.join("/").toUpperCase()
                      : affiliationBoards || ""
                  }
                  disabled
                  onChange={(e) => setAffiliationBoards(e.target.value)}
                  hasSuffix={
                    <Text onBackground="neutral-weak" variant="label-default-s">
                      HEADER
                    </Text>
                  }
                />
              </Row>
            </Flex>
          ) : (
            <Row fillWidth horizontal="start" gap="12" vertical="center">
              <Text
                onBackground="neutral-weak"
                style={{ fontSize: "17px !important" }}
              >
                <Kbd
                  background="neutral-medium"
                  style={{ minWidth: "fit-content", whiteSpace: "nowrap" }}
                  border="neutral-medium"
                  onBackground="neutral-weak"
                >
                  6. Affiliation :
                </Kbd>
              </Text>
              <Text
                onBackground="neutral-weak"
                style={{ fontSize: "16px" }}
                className={dmsans.className}
              >
                {affiliationBoards}
              </Text>
            </Row>
          )}

          {/* Affiliation Type */}
          {isUser ? (
            <Flex fillWidth horizontal="start">
              <Row flex={1}>
                <Text
                  onBackground="neutral-weak"
                  style={{ fontSize: "17px !important" }}
                >
                  <Kbd
                    background="neutral-medium"
                    border="neutral-medium"
                    onBackground="neutral-weak"
                    style={{ minWidth: "fit-content", whiteSpace: "nowrap" }}
                  >
                    7. Affiliation type:
                  </Kbd>
                </Text>
              </Row>
              <Row flex={3} fillWidth>
                <Input
                  id=""
                  placeholder="e.g. Private, Government"
                  value={affiliationType}
                  onChange={(e) => setAffiliationType(e.target.value)}
                />
              </Row>
            </Flex>
          ) : (
            <Row fillWidth horizontal="start" gap="12" vertical="center">
              <Text
                onBackground="neutral-weak"
                style={{ fontSize: "17px !important" }}
              >
                <Kbd
                  background="neutral-medium"
                  border="neutral-medium"
                  onBackground="neutral-weak"
                  style={{ minWidth: "fit-content", whiteSpace: "nowrap" }}
                >
                  7. Affiliation Type :
                </Kbd>
              </Text>
              <Text
                onBackground="neutral-weak"
                style={{ fontSize: "16px" }}
                className={dmsans.className}
              >
                {affiliationType}
              </Text>
            </Row>
          )}

          {/* Student Population */}
          {isUser ? (
            <Flex fillWidth horizontal="start">
              <Row flex={1}>
                <Text
                  onBackground="neutral-weak"
                  style={{ fontSize: "17px !important" }}
                >
                  <Kbd
                    background="neutral-medium"
                    border="neutral-medium"
                    onBackground="neutral-weak"
                    style={{ minWidth: "fit-content", whiteSpace: "nowrap" }}
                  >
                    8. Total population :
                  </Kbd>
                </Text>
              </Row>
              <Row flex={3} fillWidth>
                <NumberInput
                  id=""
                  placeholder="e.g. 1000"
                  value={studentPopulation}
                  onChange={(value) => setStudentPopulation(Number(value))}
                />
              </Row>
            </Flex>
          ) : (
            <Row fillWidth horizontal="start" gap="12" vertical="center">
              <Text
                onBackground="neutral-weak"
                style={{ fontSize: "17px !important" }}
              >
                <Kbd
                  background="neutral-medium"
                  border="neutral-medium"
                  onBackground="neutral-weak"
                  style={{ minWidth: "fit-content", whiteSpace: "nowrap" }}
                >
                  8. Total population :
                </Kbd>
              </Text>
              <Text
                onBackground="neutral-weak"
                style={{ fontSize: "16px" }}
                className={dmsans.className}
              >
                {studentPopulation}
              </Text>
            </Row>
          )}
        </Column>
      </Column>
      <Column
        fillWidth
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        <>
          <Text
            variant="body-default-xl"
            style={{
              color: "#181A1D",
              fontSize: "25px",
              fontWeight: "500",
            }}
            className={dmsans.className}
          >
            School Motto
          </Text>
          {isUser ? (
            <Textarea
              id=""
              placeholder="Enter the motto of your institution"
              resize="vertical"
              value={mottoText}
              onChange={(e) => setMottoText(e.target.value)}
            />
          ) : (
            <Text style={{ fontSize: "16px" }} onBackground="neutral-medium">
              <InlineCode>{motto}</InlineCode>
            </Text>
          )}
        </>
      </Column>

      <Column
        fillWidth
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        <Accordion
        open
          title={
            <Text
              variant="body-default-xl"
              style={{
                color: "#181A1D",
                fontSize: "25px",
                fontWeight: "500",
              }}
              className={dmsans.className}
            >
              Images
            </Text>
          }
        >
          {" "}
          <Media
            aspectRatio="16/9"
            src={cover_image}
            alt="Cover Image"
            unoptimized
          />
        </Accordion>
      </Column>

      {isUser && (
        <Row fillWidth horizontal="end">
          <Button size="l" onClick={saveAboutSchoolToSupabase}>
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
interface AdmissionSchoolProps {
  isUser: boolean;
  text: string;
  extra_links: ExtraLinksObject;
  tables: {
    admission: {
      feesRows: string[][];
      classesRows: string[][];
      admissionRows: string[][];
    };
  };
  slug?: string;
}

function Admission({
  isUser,
  text,
  tables,
  extra_links,
  slug,
}: AdmissionSchoolProps) {
  // Table headers
  const [headerClasses] = useState([
    { content: "Class", key: "class" },
    { content: "Minimum Age", key: "minAge", sortable: true },
    { content: "Maximum Age", key: "maxAge", sortable: true },
  ]);
  const [headerAdmission] = useState([
    { content: "Class", key: "class" },
    { content: "Particulars", key: "particulars" },
    { content: "Date", key: "date", sortable: true },
  ]);
  const [headerFees] = useState([
    { content: "Class", key: "class" },
    { content: "Admission Fee", key: "admissionFee", sortable: true },
    { content: "Tuition Fee (Monthly)", key: "tuitionFee", sortable: true },
    { content: "Total Annual Fee", key: "totalAnnualFee", sortable: true },
  ]);

  // Table rows state
  function sanitizeRows(rows: any, length: number) {
    if (!Array.isArray(rows) || rows.length === 0)
      return [Array(length).fill("")];
    return rows.map((row: any) =>
      Array.isArray(row) ? row : Array(length).fill("")
    );
  }
  const [headerClassesRows, setHeaderClassesRows] = useState<string[][]>(
    sanitizeRows(tables?.admission?.classesRows, 3)
  );
  const [headerAdmissionRows, setHeaderAdmissionRows] = useState<string[][]>(
    sanitizeRows(tables?.admission?.admissionRows, 3)
  );
  const [headerFeesRows, setHeaderFeesRows] = useState<string[][]>(
    sanitizeRows(tables?.admission?.feesRows, 4)
  );

  // Table row handlers
  const handleClassesRowChange = (idx: number, col: number, value: string) => {
    setHeaderClassesRows((prev) =>
      prev.map((row, i) =>
        i === idx ? row.map((cell, j) => (j === col ? value : cell)) : row
      )
    );
  };
  const handleAdmissionRowChange = (
    idx: number,
    col: number,
    value: string
  ) => {
    setHeaderAdmissionRows((prev) =>
      prev.map((row, i) =>
        i === idx ? row.map((cell, j) => (j === col ? value : cell)) : row
      )
    );
  };
  const handleFeesRowChange = (idx: number, col: number, value: string) => {
    setHeaderFeesRows((prev) =>
      prev.map((row, i) =>
        i === idx ? row.map((cell, j) => (j === col ? value : cell)) : row
      )
    );
  };

  // Add/Remove row handlers
  const addClassesRow = () =>
    setHeaderClassesRows((prev) => [...prev, ["", "", ""]]);
  const removeClassesRow = () =>
    setHeaderClassesRows((prev) =>
      prev.length > 1 ? prev.slice(0, -1) : prev
    );

  const addAdmissionRow = () =>
    setHeaderAdmissionRows((prev) => [...prev, ["", "", ""]]);
  const removeAdmissionRow = () =>
    setHeaderAdmissionRows((prev) =>
      prev.length > 1 ? prev.slice(0, -1) : prev
    );

  const addFeesRow = () =>
    setHeaderFeesRows((prev) => [...prev, ["", "", "", ""]]);
  const removeFeesRow = () =>
    setHeaderFeesRows((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));

  // Extra links
  const [extraLinks, setExtraLinks] = useState(extra_links);
  // Admission text
  const [admissionText, setAdmissionText] = useState(text);

  // Save handler
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const handleSave = async () => {
    setLoading(true);

    try {
      // Fetch current texts, tables, and extra_links to preserve other fields
      const { data, error: fetchError } = await supabase
        .from("edu_centers")
        .select("texts, tables, extra_links")
        .eq("edu_id", slug)
        .single();

      if (fetchError) {
        alert("Failed to fetch current admission data: " + fetchError.message);
        setLoading(false);
        return;
      }

      const updatedTexts = { ...(data?.texts || {}), admission: admissionText };
      const prevTables = data?.tables || {};
      const prevExtraLinks = data?.extra_links || {};

      await supabase
        .from("edu_centers")
        .update({
          // tables: {
          //   ...prevTables,
          //   admission: {
          //     admissionRows: headerAdmissionRows,
          //     classesRows: headerClassesRows,
          //     feesRows: headerFeesRows,
          //   },
          // },
          extra_links: {
            ...prevExtraLinks,
            ...extraLinks,
          },
          texts: updatedTexts,
        })
        .eq("edu_id", slug);
      addToast({
        message: "Admission details saved successfully!",
        variant: "success",
      });
    } catch (err) {
      alert("Failed to save admission details.");
    }
    setLoading(false);
  };

  return (
    <>
      <Column
        fillWidth
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        <Text
          variant="body-default-xl"
          style={{
            color: "#181A1D",
            fontSize: "25px",
            fontWeight: "500",
          }}
          className={dmsans.className}
        >
          Admission procedure
        </Text>
        {isUser ? (
          <Textarea
            style={{ minHeight: "200px" }}
            id="d"
            placeholder="Enter the admission procedure for your institution"
            value={admissionText}
            onChange={(e) => setAdmissionText(e.target.value)}
          ></Textarea>
        ) : admissionText.trim() ? (
          <Text
            style={{
              fontSize: "17px",
            }}
            onBackground="neutral-weak"
          >
            {admissionText.split("\n").map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                {idx < admissionText.split("\n").length - 1 && <br />}
              </React.Fragment>
            ))}
          </Text>
        ) : (
          <Text
            style={{
              fontSize: "17px",
              color: "#888",
            }}
            onBackground="neutral-weak"
          >
            No information provided.
          </Text>
        )}
      </Column>
      <Column
        fillWidth
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        <Text
          variant="body-default-xl"
          style={{
            color: "#181A1D",
            fontSize: "25px",
            fontWeight: "500",
          }}
          className={dmsans.className}
        >
          Age Requirements
        </Text>
        {isUser ? (
          <Column gap="12" fillWidth>
            {headerClassesRows.map((row, idx) => (
              <Row gap="12" key={idx}>
                <Text variant="body-default-m" onBackground="neutral-medium">
                  {idx + 1}.
                </Text>
                <Input
                  disabled
                  id=""
                  placeholder="Class"
                  value={row[0]}
                  onChange={(e) =>
                    handleClassesRowChange(idx, 0, e.target.value)
                  }
                />
                <Input
                  disabled
                  id=""
                  placeholder="Minimum Age"
                  value={row[1]}
                  onChange={(e) =>
                    handleClassesRowChange(idx, 1, e.target.value)
                  }
                />
                <Input
                  disabled
                  id=""
                  placeholder="Maximum Age"
                  value={row[2]}
                  onChange={(e) =>
                    handleClassesRowChange(idx, 2, e.target.value)
                  }
                />
              </Row>
            ))}
            <Row gap="8" fillWidth horizontal="end" marginTop="12">
              <Button
                size="m"
                onClick={removeClassesRow}
                disabled={headerClassesRows.length <= 1}
              >
                Remove last
              </Button>
              <Button size="m" onClick={addClassesRow} disabled>
                Add
              </Button>
            </Row>
          </Column>
        ) : (
          <Table
            background="transparent"
            data={{
              headers: headerClasses,
              rows: headerClassesRows,
            }}
          />
        )}
      </Column>
      <Column
        fillWidth
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        <Text
          variant="body-default-xl"
          style={{
            color: "#181A1D",
            fontSize: "25px",
            fontWeight: "500",
          }}
          className={dmsans.className}
        >
          Important Dates for Admission
        </Text>
        {isUser ? (
          <Column gap="12" fillWidth>
            {headerAdmissionRows.map((row, idx) => (
              <Row gap="12" key={idx}>
                <Text variant="body-default-m" onBackground="neutral-medium">
                  {idx + 1}.
                </Text>
                <Input
                  id=""
                  disabled
                  placeholder="Class"
                  value={row[0]}
                  onChange={(e) =>
                    handleAdmissionRowChange(idx, 0, e.target.value)
                  }
                />
                <Input
                  id=""
                  placeholder="Particulars"
                  value={row[1]}
                  disabled
                  onChange={(e) =>
                    handleAdmissionRowChange(idx, 1, e.target.value)
                  }
                />
                <Input
                  id=""
                  placeholder="Date"
                  value={row[2]}
                  disabled
                  onChange={(e) =>
                    handleAdmissionRowChange(idx, 2, e.target.value)
                  }
                />
              </Row>
            ))}
            <Row gap="8" fillWidth horizontal="end" marginTop="12">
              <Button
                size="m"
                onClick={removeAdmissionRow}
                disabled={headerAdmissionRows.length <= 1}
              >
                Remove last
              </Button>
              <Button size="m" onClick={addAdmissionRow} disabled>
                Add
              </Button>
            </Row>
          </Column>
        ) : (
          <Table
            background="transparent"
            data={{
              headers: headerAdmission,
              rows: headerAdmissionRows,
            }}
          />
        )}
      </Column>
      <Column
        fillWidth
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        <Text
          variant="body-default-xl"
          style={{
            color: "#181A1D",
            fontSize: "25px",
            fontWeight: "500",
          }}
          className={dmsans.className}
        >
          Fee details and procedure
        </Text>
        {isUser ? (
          <Column gap="12" fillWidth>
            {headerFeesRows.map((row, idx) => (
              <Row gap="12" key={idx}>
                <Text variant="body-default-m" onBackground="neutral-medium">
                  {idx + 1}.
                </Text>
                <Input
                  id=""
                  placeholder="Class"
                  value={row[0]}
                  disabled
                  onChange={(e) => handleFeesRowChange(idx, 0, e.target.value)}
                />
                <Input
                  id=""
                  disabled
                  placeholder="Admission Fee"
                  value={row[1]}
                  onChange={(e) => handleFeesRowChange(idx, 1, e.target.value)}
                />
                <Input
                  id=""
                  disabled
                  placeholder="Tuition Fee (Monthly)"
                  value={row[2]}
                  onChange={(e) => handleFeesRowChange(idx, 2, e.target.value)}
                />
                <Input
                  id=""
                  disabled
                  placeholder="Total Annual Fee"
                  value={row[3]}
                  onChange={(e) => handleFeesRowChange(idx, 3, e.target.value)}
                />
              </Row>
            ))}
            <Row gap="8" fillWidth horizontal="end" marginTop="12">
              <Button
                size="m"
                onClick={removeFeesRow}
                disabled={headerFeesRows.length <= 1}
              >
                Remove last
              </Button>
              <Button size="m" onClick={addFeesRow} disabled>
                Add
              </Button>
            </Row>
          </Column>
        ) : (
          <Table
            background="transparent"
            data={{
              headers: headerFees,
              rows: headerFeesRows,
            }}
          />
        )}
        <Column
          fillWidth
          horizontal="start"
          vertical="start"
          paddingY="16"
          gap="12"
        >
          <Text
            variant="body-default-xl"
            style={{
              color: "#181A1D",
              fontSize: "25px",
              fontWeight: "500",
            }}
            className={dmsans.className}
          >
            Extra links
          </Text>
          {isUser ? (
            <>
              <Column gap="12" fillWidth>
                {extraLinks.admission.map(
                  (link: ExtraLinkItem, idx: number) => (
                    <Row
                      key={link.id}
                      fillWidth
                      gap="12"
                      horizontal="start"
                      vertical="start"
                    >
                      <Text
                        variant="body-default-m"
                        onBackground="neutral-medium"
                      >
                        {link.id}.
                      </Text>
                      <Flex flex={2}>
                        <Input
                          id=""
                          placeholder="Enter link text"
                          value={link.label}
                          onChange={(e) => {
                            setExtraLinks((prev: ExtraLinksObject) => ({
                              ...prev,
                              admission: prev.admission.map(
                                (l: ExtraLinkItem, i: number) =>
                                  i === idx
                                    ? { ...l, label: e.target.value }
                                    : l
                              ),
                            }));
                          }}
                        />
                      </Flex>
                      <Flex flex={5}>
                        <Input
                          id=""
                          placeholder="Enter link"
                          value={link.url}
                          hasPrefix={
                            <Text
                              onBackground="neutral-weak"
                              variant="label-default-s"
                            >
                              <i className="ri-links-line"></i>
                            </Text>
                          }
                          onChange={(e) => {
                            setExtraLinks((prev: ExtraLinksObject) => ({
                              ...prev,
                              admission: prev.admission.map(
                                (l: ExtraLinkItem, i: number) =>
                                  i === idx ? { ...l, url: e.target.value } : l
                              ),
                            }));
                          }}
                        />
                      </Flex>
                    </Row>
                  )
                )}
              </Column>
              <Row fillWidth horizontal="end" gap="4">
                <Button
                  size="l"
                  onClick={() => {
                    setExtraLinks((prev: ExtraLinksObject) => ({
                      ...prev,
                      admission:
                        prev.admission.length > 1
                          ? prev.admission.slice(0, -1)
                          : prev.admission,
                    }));
                  }}
                  disabled={extraLinks.admission.length <= 1}
                >
                  Remove last
                </Button>
                <Button
                  size="l"
                  onClick={() => {
                    setExtraLinks((prev: ExtraLinksObject) => ({
                      ...prev,
                      admission: [
                        ...prev.admission,
                        {
                          id:
                            prev.admission.length > 0
                              ? prev.admission[prev.admission.length - 1].id + 1
                              : 1,
                          label: "",
                          url: "",
                        },
                      ],
                    }));
                  }}
                >
                  Add
                </Button>
              </Row>
              <Row fillWidth horizontal="end">
                <Button size="l" onClick={handleSave} disabled={loading}>
                  {loading ? (
                    <>
                      Saving...&nbsp;
                      <Spinner size="s" />
                    </>
                  ) : (
                    "Save All"
                  )}
                </Button>
              </Row>
            </>
          ) : (
            <Column fillWidth gap="8" style={{ marginTop: "16px" }}>
              {extraLinks.admission &&
              extraLinks.admission.length > 0 &&
              extraLinks.admission.some((link) => link.label || link.url) ? (
                extraLinks.admission.map((link: ExtraLinkItem, idx: number) => (
                  <SmartLink key={idx} href={link.url}>
                    <Text
                      style={{
                        fontSize: "16px",
                      }}
                      onBackground="accent-weak"
                    >
                      <InlineCode>{link.label}</InlineCode>
                    </Text>
                  </SmartLink>
                ))
              ) : (
                <InlineCode>No links provided</InlineCode>
              )}
            </Column>
          )}
        </Column>
      </Column>
    </>
  );
}

interface FacilityItem {
  label: string;
  isSet: boolean;
}
type FacilitiesJson = Record<string, FacilityItem[]>;

interface FacilitiesProps {
  isUser: boolean;
  facilities: FacilitiesJson;
  slug: string;
}
function Facilities({
  isUser,
  facilities: initialFacilities,
  slug,
}: FacilitiesProps) {
  const [facilities, setFacilities] = useState<FacilitiesJson>(
    initialFacilities || {}
  );
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);

  // Update local state if initialFacilities changes (for correct checked state on load)
  useEffect(() => {
    setFacilities(initialFacilities || {});
  }, [initialFacilities]);

  // Save handler to Supabase
  const saveFacilitiesToSupabase = useCallback(async () => {
    setLoading(true);
    if (!slug) {
      console.log("slug value:", slug);

      alert("Institution identifier (slug) is missing.");
      setLoading(false);
      return;
    }
    try {
      const { error } = await supabase
        .from("edu_centers")
        .update({ facilities })
        .eq("edu_id", slug);
      if (error) {
        alert("Failed to save facilities: " + error.message);
      } else {
        addToast({
          message: "Facilities saved successfully!",
          variant: "success",
        });
      }
    } catch (err) {
      alert("An unexpected error occurred while saving facilities.");
    } finally {
      setLoading(false);
    }
  }, [facilities, slug, addToast]);

  // Capitalize key for section title
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).replace(/([A-Z])/g, " $1");

  return (
    <>
      {Object.entries(facilities).map(([sectionKey, items]) => (
        <Column
          key={sectionKey}
          fillWidth
          maxWidth={60}
          horizontal="start"
          vertical="start"
          paddingY="16"
          gap="12"
        >
          <Row fillWidth horizontal="space-between">
            <Text
              variant="body-default-xl"
              style={{
                color: "#181A1D",
                fontSize: "25px",
                fontWeight: "500",
              }}
              className={dmsans.className}
            >
              {capitalize(sectionKey.replace(/([A-Z])/g, " $1"))} Facilities
            </Text>
            <Text onBackground="neutral-weak" variant="label-default-xs">
              {items.filter((f) => f.isSet).length}/{items.length}
            </Text>
          </Row>
          <Row fillWidth gap="8" maxWidth={60} wrap={true}>
            {isUser ? (
              <Column gap="12">
                {items.map((facility, idx) => (
                  <Checkbox
                    key={idx}
                    label={
                      <Text
                        onBackground="neutral-medium"
                        variant="body-default-l"
                      >
                        {facility.label}
                      </Text>
                    }
                    isChecked={facility.isSet}
                    onToggle={() => {
                      setFacilities((prev) => ({
                        ...prev,
                        [sectionKey]: prev[sectionKey].map((f, i) =>
                          i === idx ? { ...f, isSet: !f.isSet } : f
                        ),
                      }));
                    }}
                  />
                ))}
              </Column>
            ) : (
              <>
                {items.filter((facility) => facility.isSet).length === 0 ? (
                  <Chip
                    label="Not provided"
                    style={{
                      backgroundColor: "#f0f0f0",
                      color: "darkslategrey",
                    }}
                  />
                ) : (
                  items
                    .filter((facility) => facility.isSet)
                    .map((facility, idx) => (
                      <Chip
                        key={idx}
                        label={facility.label}
                        background="neutral-weak"
                      />
                    ))
                )}
              </>
            )}
          </Row>
        </Column>
      ))}
      {isUser && (
        <Row fillWidth horizontal="end">
          <Button
            size="l"
            onClick={saveFacilitiesToSupabase}
            disabled={loading}
          >
            {loading ? (
              <>
                Saving...&nbsp;
                <Spinner size="s" />
              </>
            ) : (
              "Save All"
            )}
          </Button>
        </Row>
      )}
    </>
  );
}

interface ExtracurricularProps {
  isUser: boolean;
  text: string;
  slug: string;
}

function Extracurricular({ isUser, text, slug }: ExtracurricularProps) {
  const [extraCurricular, setExtraCurricular] = useState(text);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (slug) {
      console.log("slug value:", slug);
    }
  }, [slug]);

  async function saveDataToSupabase() {
    setLoading(true);

    if (!slug) {
      alert("Institution identifier (slug) is missing.");
      setLoading(false);
      return;
    }

    const { data, error: fetchError } = await supabase
      .from("edu_centers")
      .select("texts")
      .eq("edu_id", slug)
      .single();

    if (fetchError) {
      alert(
        "Failed to fetch current extra curricular text: " + fetchError.message
      );
      setLoading(false);
      return;
    }

    const updatedTexts = {
      ...(data?.texts || {}),
      extra_curricular: extraCurricular,
    };

    const { error } = await supabase
      .from("edu_centers")
      .update({ texts: updatedTexts })
      .eq("edu_id", slug);

    if (error) {
      alert("Failed to save extra curricular text: " + error.message);
    } else {
      addToast({
        message: "Description saved successfully!",
        variant: "success",
      });
    }
    setLoading(false);
  }
  return (
    <>
      <Column
        fillWidth
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        <Text
          variant="body-default-xl"
          style={{
            color: "#181A1D",
            fontSize: "25px",
            fontWeight: "500",
          }}
          className={dmsans.className}
        >
          Extra Curricular Activities
        </Text>
        {isUser ? (
          <Textarea
            id=""
            placeholder="Enter the other extra curricular activities offered by the institution in detail"
            resize="vertical"
            style={{ minHeight: "300px" }}
            value={extraCurricular}
            onChange={(e) => setExtraCurricular(e.target.value)}
          />
        ) : extraCurricular.trim() ? (
          <Text
            style={{
              fontSize: "17px",
            }}
            onBackground="neutral-weak"
          >
            {extraCurricular.split("\n").map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                {idx < extraCurricular.split("\n").length - 1 && <br />}
              </React.Fragment>
            ))}
          </Text>
        ) : (
          <Text
            style={{
              fontSize: "17px",
              color: "#888",
            }}
            onBackground="neutral-weak"
          >
            No information provided.
          </Text>
        )}
      </Column>
      {isUser && (
        <Row fillWidth horizontal="end">
          <Button size="l" onClick={saveDataToSupabase} disabled={loading}>
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

interface ExtraLinkItem {
  id: number;
  label: string;
  url: string;
}
interface ExtraLinksObject {
  academics: ExtraLinkItem[];
  [key: string]: ExtraLinkItem[];
}
interface AcademicsProps {
  isUser: boolean;
  extra_links: ExtraLinksObject;
  tables: {
    academics: {
      timeRow: string[][];
      vacationRow: string[][];
      classRow: string[][];
    };

    // Add other table properties here if needed
  };
  slug: string;
}
function Academics({ isUser, tables, slug, extra_links }: AcademicsProps) {
  // Ensure at least one default row if nothing is present
  function ensureRows<T>(rows: T[], defaultRow: T): T[] {
    return Array.isArray(rows) && rows.length > 0 ? rows : [defaultRow];
  }

  const [extraLinks, setExtraLinks] = useState<ExtraLinksObject>(extra_links);
  const [classRow, setClassRow] = useState<string[][]>(
    ensureRows(tables.academics.classRow, ["", ""])
  );
  const [vacationRow, setVacationRow] = useState<string[][]>(
    ensureRows(tables.academics.vacationRow, ["", "", "", ""])
  );
  const [timeRow, setTimeRow] = useState<string[][]>(
    ensureRows(tables.academics.timeRow, ["", "", ""])
  );

  // Handlers for editing table rows in edit mode
  const handleTimeRowChange = (idx: number, col: number, value: string) => {
    setTimeRow((prev) =>
      prev.map((row, i) =>
        i === idx ? row.map((cell, j) => (j === col ? value : cell)) : row
      )
    );
  };
  const handleVacationRowChange = (idx: number, col: number, value: string) => {
    setVacationRow((prev) =>
      prev.map((row, i) =>
        i === idx ? row.map((cell, j) => (j === col ? value : cell)) : row
      )
    );
  };
  const handleClassRowChange = (idx: number, col: number, value: string) => {
    setClassRow((prev) =>
      prev.map((row, i) =>
        i === idx ? row.map((cell, j) => (j === col ? value : cell)) : row
      )
    );
  };

  // Add/Remove row handlers
  const addTimeRow = () => setTimeRow((prev) => [...prev, ["", "", ""]]);
  const removeTimeRow = () =>
    setTimeRow((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));

  const addVacationRow = () =>
    setVacationRow((prev) => [...prev, ["", "", "", ""]]);
  const removeVacationRow = () =>
    setVacationRow((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));

  const addClassRow = () => setClassRow((prev) => [...prev, ["", ""]]);
  const removeClassRow = () =>
    setClassRow((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  // Save handler (implement Supabase update if needed)
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const handleSave = async () => {
    setLoading(true);

    try {
      // Fetch current texts and tables to preserve other fields
      const { data, error: fetchError } = await supabase
        .from("edu_centers")
        .select("texts, tables, extra_links")
        .eq("edu_id", slug)
        .single();

      if (fetchError) {
        alert("Failed to fetch current academic data: " + fetchError.message);
        setLoading(false);
        return;
      }

      // Merge with old tables and extra_links to keep old data
      const prevTables = data?.tables || {};
      const prevExtraLinks = data?.extra_links || {};

      await supabase
        .from("edu_centers")
        .update({
          // tables: {
          //   ...prevTables,
          //   academics: { timeRow, vacationRow, classRow },
          // },
          extra_links: {
            ...prevExtraLinks,
            ...extraLinks,
          },
        })
        .eq("edu_id", slug);

      addToast({
        message: "Academic details saved successfully!",
        variant: "success",
      });
    } catch (err) {
      alert("Failed to save academic details.");
    }
    setLoading(false);
  };

  return (
    <>
      <Column
        fillWidth
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        <Text
          variant="body-default-xl"
          style={{
            color: "#181A1D",
            fontSize: "25px",
            fontWeight: "500",
          }}
          className={dmsans.className}
        >
          School Timings
        </Text>
        {isUser ? (
          <Column gap="12" fillWidth>
            {timeRow.map((row, idx) => (
              <Row gap="12" key={idx}>
                <Text variant="body-default-m" onBackground="neutral-medium">
                  {idx + 1}.
                </Text>
                <Input
                  id=""
                  disabled
                  placeholder="Class e.g. 12th"
                  value={row[0]}
                  onChange={(e) => handleTimeRowChange(idx, 0, e.target.value)}
                />
                <Flex gap="4">
                  <Input
                    disabled
                    id=""
                    placeholder="Start"
                    value={row[1]}
                    description=" 24-hour format"
                    onChange={(e) =>
                      handleTimeRowChange(idx, 1, e.target.value)
                    }
                    hasSuffix={<Text onBackground="neutral-weak">24HR</Text>}
                  />
                  <Input
                    id=""
                    disabled
                    placeholder="End"
                    description=" 24-hour format"
                    value={row[2]}
                    onChange={(e) =>
                      handleTimeRowChange(idx, 2, e.target.value)
                    }
                    hasSuffix={<Text onBackground="neutral-weak">24HR</Text>}
                  />
                </Flex>
              </Row>
            ))}
            <Row gap="8" fillWidth horizontal="end" marginTop="12">
              <Button
                size="m"
                onClick={removeTimeRow}
                disabled={timeRow.length <= 1}
              >
                Remove last
              </Button>
              <Button size="m" onClick={addTimeRow} disabled>
                Add
              </Button>
            </Row>
          </Column>
        ) : (
          <Table
            background="transparent"
            data={{
              headers: [
                { content: "Class", key: "class" },
                { content: "Start Time", key: "startTime", sortable: true },
                { content: "End Time", key: "endTime", sortable: true },
              ],
              rows: timeRow,
            }}
          />
        )}
      </Column>
      <Column
        fillWidth
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        <Text
          variant="body-default-xl"
          style={{
            color: "#181A1D",
            fontSize: "25px",
            fontWeight: "500",
          }}
          className={dmsans.className}
        >
          Vacation Schedule
        </Text>
        {isUser ? (
          <Column gap="12" fillWidth>
            {vacationRow.map((row, idx) => (
              <Row gap="12" key={idx}>
                <Text variant="body-default-m" onBackground="neutral-medium">
                  {idx + 1}.
                </Text>
                <Input
                  id=""
                  disabled
                  placeholder="Vacation"
                  value={row[0]}
                  onChange={(e) =>
                    handleVacationRowChange(idx, 0, e.target.value)
                  }
                />
                <DateRangeInput
                  id=""
                  startLabel="Start Date"
                  height="s"
                  disabled
                  style={{ minWidth: "300px" }}
                  cursor="interactive"
                  endLabel="End Date"
                  value={{
                    startDate: row[1] ? new Date(row[1]) : undefined,
                    endDate: row[2] ? new Date(row[2]) : undefined,
                  }}
                  onChange={(value) => {
                    handleVacationRowChange(
                      idx,
                      1,
                      value.startDate instanceof Date &&
                        !isNaN(value.startDate.getTime())
                        ? value.startDate.toISOString()
                        : ""
                    );
                    handleVacationRowChange(
                      idx,
                      2,
                      value.endDate instanceof Date &&
                        !isNaN(value.endDate.getTime())
                        ? value.endDate.toISOString()
                        : ""
                    );
                    // Calculate total days between start and end date
                    if (
                      value.startDate instanceof Date &&
                      value.endDate instanceof Date &&
                      !isNaN(value.startDate.getTime()) &&
                      !isNaN(value.endDate.getTime())
                    ) {
                      const msPerDay = 1000 * 60 * 60 * 24;
                      const diff =
                        Math.round(
                          (value.endDate.getTime() -
                            value.startDate.getTime()) /
                            msPerDay
                        ) + 1;
                      handleVacationRowChange(
                        idx,
                        3,
                        diff > 0 ? diff.toString() : ""
                      );
                    }
                  }}
                />
                <Input id="" placeholder="Total days" value={row[3]} disabled />
              </Row>
            ))}
            <Row gap="8" fillWidth horizontal="end" marginTop="12">
              <Button
                size="m"
                onClick={removeVacationRow}
                disabled={vacationRow.length <= 1}
              >
                Remove last
              </Button>
              <Button size="m" onClick={addVacationRow} disabled>
                Add
              </Button>
            </Row>
          </Column>
        ) : (
          <Table
            background="transparent"
            data={{
              headers: [
                { content: "Vacation", key: "class" },
                { content: "Start Date", key: "startDate", sortable: true },
                { content: "End Date", key: "endDate", sortable: true },
                { content: "Total Days", key: "totalDays", sortable: true },
              ],
              rows: vacationRow.map((row) => [
                row[0],
                row[1] ? new Date(row[1]).toLocaleDateString() : "",
                row[2] ? new Date(row[2]).toLocaleDateString() : "",
                row[3],
              ]),
            }}
          />
        )}
      </Column>
      <Column
        fillWidth
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        <Text
          variant="body-default-xl"
          style={{
            color: "#181A1D",
            fontSize: "25px",
            fontWeight: "500",
          }}
          className={dmsans.className}
        >
          School Levels and Classes
        </Text>
        {isUser ? (
          <Column gap="12" fillWidth>
            {classRow.map((row, idx) => (
              <Row gap="12" key={idx}>
                <Text variant="body-default-m" onBackground="neutral-medium">
                  {idx + 1}.
                </Text>
                <Input
                  id=""
                  disabled
                  placeholder="Level"
                  value={row[0]}
                  onChange={(e) => handleClassRowChange(idx, 0, e.target.value)}
                />
                <Input
                  id=""
                  disabled
                  placeholder="Classes"
                  value={row[1]}
                  onChange={(e) => handleClassRowChange(idx, 1, e.target.value)}
                />
              </Row>
            ))}
            <Row gap="8" fillWidth horizontal="end" marginTop="12">
              <Button
                size="m"
                onClick={removeClassRow}
                disabled={classRow.length <= 1}
              >
                Remove last
              </Button>
              <Button size="m" onClick={addClassRow} disabled>
                Add
              </Button>
            </Row>
          </Column>
        ) : (
          <Table
            background="transparent"
            data={{
              headers: [
                { content: "Level", key: "class" },
                { content: "Classes", key: "startTime", sortable: true },
              ],
              rows: classRow,
            }}
          />
        )}
      </Column>
      <Column
        fillWidth
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        <Text
          variant="body-default-xl"
          style={{
            color: "#181A1D",
            fontSize: "25px",
            fontWeight: "500",
          }}
          className={dmsans.className}
        >
          Academic Affiliation
        </Text>
        {isUser ? (
          <>
            <Column gap="12" fillWidth>
              {extraLinks.academics.map((link: ExtraLinkItem, idx: number) => (
                <Flex
                  key={link.id}
                  fillWidth
                  gap="12"
                  horizontal="start"
                  vertical="start"
                >
                  <Text variant="body-default-m" onBackground="neutral-medium">
                    {link.id}.
                  </Text>
                  <Flex flex={2}>
                    <Input
                      id=""
                      placeholder="Enter the affiliation "
                      value={link.label}
                      onChange={(e) => {
                        setExtraLinks((prev) => ({
                          ...prev,
                          academics: prev.academics.map(
                            (l: ExtraLinkItem, i: number) =>
                              i === idx ? { ...l, label: e.target.value } : l
                          ),
                        }));
                      }}
                    />
                  </Flex>
                  <Flex flex={5}>
                    <Input
                      id=""
                      placeholder="Enter the official website link"
                      value={link.url}
                      hasPrefix={
                        <Text
                          onBackground="neutral-weak"
                          variant="label-default-s"
                        >
                          <i className="ri-links-line"></i>
                        </Text>
                      }
                      onChange={(e) => {
                        setExtraLinks((prev) => ({
                          ...prev,
                          academics: prev.academics.map(
                            (l: ExtraLinkItem, i: number) =>
                              i === idx ? { ...l, url: e.target.value } : l
                          ),
                        }));
                      }}
                    />
                  </Flex>
                </Flex>
              ))}
            </Column>

            <Row fillWidth horizontal="end" gap="4">
              <Button
                size="l"
                onClick={() => {
                  setExtraLinks((prev) => ({
                    ...prev,
                    academics:
                      prev.academics.length > 1
                        ? prev.academics.slice(0, -1)
                        : prev.academics,
                  }));
                }}
                disabled={extraLinks.academics.length <= 1}
              >
                Remove last
              </Button>
              <Button
                size="l"
                onClick={() => {
                  setExtraLinks((prev) => ({
                    ...prev,
                    academics: [
                      ...prev.academics,
                      {
                        id:
                          prev.academics.length > 0
                            ? prev.academics[prev.academics.length - 1].id + 1
                            : 1,
                        label: "",
                        url: "",
                      },
                    ],
                  }));
                }}
              >
                Add
              </Button>
            </Row>
          </>
        ) : (
          <Column fillWidth gap="8" style={{ marginTop: "16px" }}>
            {extraLinks.academics &&
            extraLinks.academics.length > 0 &&
            extraLinks.academics.some((link) => link.label || link.url) ? (
              extraLinks.academics.map((link, idx) => (
                <SmartLink key={idx} href={link.url}>
                  <Text
                    style={{
                      fontSize: "16px",
                    }}
                    onBackground="accent-weak"
                  >
                    <InlineCode>{link.label}</InlineCode>
                  </Text>
                </SmartLink>
              ))
            ) : (
              <InlineCode>No information provided</InlineCode>
            )}
          </Column>
        )}
      </Column>
      {isUser && (
        <Row fillWidth horizontal="end">
          <Button size="l" onClick={handleSave} disabled={loading}>
            {loading ? (
              <>
                Saving...&nbsp;
                <Spinner size="s" />
              </>
            ) : (
              "Save All"
            )}
          </Button>
        </Row>
      )}
    </>
  );
}

interface ReviewsProps {
  isUser: boolean;
  reviews: string[];
}

function Reviews({ isUser, reviews }: ReviewsProps) {
  return (
    <>
      <Flex center fillWidth>
        {" "}
        <Text
          style={{
            fontSize: "16px",
          }}
          onBackground="neutral-weak"
        >
          <i className="ri-information-line"></i>&nbsp;Nothing to show here
        </Text>
      </Flex>
    </>
  );
}

interface FAQsProps {
  isUser: boolean;
  faqs: string[];
  slug?: string; // Optional slug for Supabase updates
}
// Define FAQ type for proper typing
type FAQ = { id: number; title: string; text: string; slug?: string };

function FAQs({ isUser, faqs, slug }: FAQsProps) {
  // Convert incoming faqs (string[] or FAQ[]) to FAQ[] if needed
  const initialFaqs: FAQ[] =
    Array.isArray(faqs) && faqs.length > 0 && typeof faqs[0] === "object"
      ? (faqs as unknown as FAQ[])
      : Array.isArray(faqs)
      ? faqs.map((q, i) => ({ id: i + 1, title: q, text: "" }))
      : [];

  const [faqList, setFAQS] = useState<FAQ[]>(initialFaqs);

  // Handlers for add and delete
  const handleAdd = () => {
    setFAQS((prev) => [
      ...prev,
      {
        id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 1,
        title: "",
        text: "",
      },
    ]);
  };
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setFAQS((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const handleChange = (
    idx: number,
    field: "title" | "text",
    value: string
  ) => {
    setFAQS((prev) =>
      prev.map((faq, i) => (i === idx ? { ...faq, [field]: value } : faq))
    );
  };

  async function saveFAQSToSupabase() {
    setLoading(true);
    if (!slug) return;
    const { error } = await supabase
      .from("edu_centers")
      .update({ qna: faqList })
      .eq("edu_id", slug);
    if (error) {
      alert("Failed to save FAQs: " + error.message);
    } else {
      addToast({
        message: "Data saved successfully!",
        variant: "success",
      });
    }
    setLoading(false);
  }
  return (
    <>
      {isUser ? (
        <Column gap="12" fillWidth>
          <Text
            variant="body-default-xl"
            style={{
              color: "#181A1D",
              fontSize: "25px",
              fontWeight: "500",
              marginBottom: "16px",
            }}
            className={dmsans.className}
          >
            Q&A
          </Text>
          {faqList.map((faq, idx) => (
            <Row
              key={faq.id}
              fillWidth
              vertical="start"
              horizontal="start"
              gap="12"
            >
              <Text variant="body-default-m" onBackground="neutral-strong">
                <b>{faq.id}.</b>
              </Text>
              <Row flex={2}>
                <Input
                  id=""
                  placeholder="Enter the question"
                  value={faq.title}
                  onChange={(e) => handleChange(idx, "title", e.target.value)}
                />
              </Row>
              <Row flex={5}>
                <Textarea
                  id=""
                  placeholder="Enter the answer"
                  style={{ minHeight: "200px" }}
                  value={faq.text}
                  onChange={(e) => handleChange(idx, "text", e.target.value)}
                />
              </Row>
            </Row>
          ))}
          <Row fillWidth horizontal="end" gap="4" marginTop="16">
            <Button
              variant="primary"
              size="l"
              onClick={handleDelete}
              disabled={faqList.length <= 1}
            >
              Delete Last
            </Button>
            <Button size="l" onClick={handleAdd}>
              Add
            </Button>
            <Button size="l" onClick={saveFAQSToSupabase}>
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
        </Column>
      ) : (
        <>
          <Text
            variant="body-default-xl"
            style={{
              color: "#181A1D",
              fontSize: "25px",
              fontWeight: "500",
              marginBottom: "16px",
            }}
            className={dmsans.className}
          >
            Q&A
          </Text>
          {faqList.map((faq) => (
            <Accordion key={faq.id} title={faq.title} size="l">
              <Text
                style={{
                  fontSize: "16px",
                }}
                onBackground="neutral-weak"
              >
                {faq.text}
              </Text>
            </Accordion>
          ))}
        </>
      )}
    </>
  );
}
