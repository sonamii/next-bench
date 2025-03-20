"use client";
import "./page.css";
import Image from "next/image";
import supabase from "@/services/supabase";
import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Nav } from "@/custom-components/nav/nav";
export default function Add() {
  const [userID, setUserID] = useState("");
  const [emailID, setEmailID] = useState("");
  const [name, setName] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [subtype, setSubtype] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [contact_number, setContact_number] = useState("");
  const [website, setWebsite] = useState("");
  const [established_year, setEstablished_year] = useState("");
  const [student_capacity, setStudent_capacity] = useState(0);
  const [teacher_capacity, setTeacher_capacity] = useState(0);
  const [courses_offered, setCourses_offered] = useState("");
  const [facilities, setFacilities] = useState("");
  const [transportation, setTransportation] = useState(false);
  const [labs, setLabs] = useState("");
  const [events, setEvents] = useState("");
  const [other_activities, setOther_activities] = useState("");
  const [sports, setSports] = useState("");
  const [admission_process, setAdmission_process] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("");
  const [fee_structure, setFee_structure] = useState("");
  const [other_info, setOther_info] = useState("");
  const [publish, setPublish] = useState(false);
  const [isAdminOrInstituition, setIsAdminOrInstituition] = useState(false);

  useEffect(() => {
    const getSessionAndUserID = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        const { user } = session;
        setUserID(user.id);
        setEmailID(user.email as string);
      } else {
        toast.error("No active session found");
      }
    };
    getSessionAndUserID();
  }, []);

  useEffect(() => {
    const getEduType = async () => {
      if (!userID) {
        return;
      }

      const { data, error } = await supabase
        .from("edu")
        .select("type")
        .eq("id", userID)
        .single();

      if (error) {
        console.error("Error fetching edu type:", error);
      } else if (data) {
        if (data.type === "ADMIN" || data.type === "Institution") {
          setIsAdminOrInstituition(true);
        }
      }
    };

    getEduType();
  }, [userID]);
  useEffect(() => {
    console.log(userID);
  }, [userID]);

  async function handleSubmit() {
    setLoading(true);
    postDataToSupabaseEdu();
    setLoading(false);
  }
  async function postDataToSupabaseEdu() {
    if (!userID) {
      toast.error("User ID is missing");
      return;
    } else if (!isAdminOrInstituition) {
      toast.error("You are not authorized to add education center");
      return;
    }

    const {  error } = await supabase
      .from("edu")
      .update({
        name,
        subtype,
        affiliation,
        mode,
        address,
        city,
        state,
        country,
        pincode,
        contact_number,
        website,
        established_year: parseInt(established_year.slice(-4)), // Extract last 4 digits
        student_capacity,
        teacher_capacity,
        ratio: student_capacity / teacher_capacity,
        courses_offered, // Store as a string, since it's now TEXT
        facilities,
        labs,
        events,
        other_activities,
        sports,
        fee_structure: fee_structure, // Convert only if needed
        admission_process,
        other_info,
        transportation,
        isPublished: publish,
      })
      .eq("id", userID);

    if (error) {
      toast.error("Failed to update education center");
      console.error(error);
    } else {
      toast.success("Education center updated successfully");
    }
  }

  async function getDataFromSupabase() {
    if (!userID) {
      toast.error("User ID is missing");
      return;
    }

    const { data, error } = await supabase
      .from("edu")
      .select(
        `name, subtype, affiliation, mode, address, city, state, country, pincode, contact_number, website, established_year, student_capacity, teacher_capacity, courses_offered, facilities, labs, events, other_activities, sports, fee_structure, admission_process, other_info, transportation, isPublished`
      )
      .eq("id", userID)
      .single();

    if (error) {
      toast.error("Failed to fetch education center data");
      console.error(error);
    } else if (data) {
      setName(data.name || "");
      setSubtype(data.subtype || "");
      setAffiliation(data.affiliation || "");
      setMode(data.mode || "");
      setAddress(data.address || "");
      setCity(data.city || "");
      setState(data.state || "");
      setCountry(data.country || "");
      setPincode(data.pincode || "");
      setContact_number(data.contact_number || "");
      setWebsite(data.website || "");
      setEstablished_year(
        data.established_year ? data.established_year.toString() : ""
      );
      setStudent_capacity(data.student_capacity || 0);
      setTeacher_capacity(data.teacher_capacity || 0);
      setCourses_offered(data.courses_offered || "");
      setFacilities(data.facilities || "");
      setLabs(data.labs || "");
      setEvents(data.events || "");
      setOther_activities(data.other_activities || "");
      setSports(data.sports || "");
      setFee_structure(data.fee_structure || "");
      setAdmission_process(data.admission_process || "");
      setOther_info(data.other_info || "");
      setTransportation(data.transportation || false);
      setPublish(data.isPublished || false);
    }
  }
  return (
    <>
      <Nav></Nav>
      <div className="containerMain">
        <button
          onClick={() => (window.location.href = "/")}
          className="logo fade-item"
          style={{ cursor: "pointer" }}
        >
          <Image src="/logoMain.svg" alt="Logo" width={25} height={25} />
        </button>
        <div className="space-xs"></div>
        <div className="textTop fade-item">Add education centers</div>
        <div className="space-xxs"></div>
        <div className="textBottom fade-item">
          Add more education centers to the platform and help students find the
          best education centers.
        </div>{" "}
        <div className="space-s"></div>
        <div className="formData w-[400px]  fade-item">
          {/* form */}
          <div className="grid w-full  max-w-sm items-center gap-1.5 ">
            <Label htmlFor="email">Current Email</Label>
            <Input
              type="text"
              id="email"
              placeholder="Enter the name of the institution"
              className="w-full disabled"
              value={emailID}
              disabled
            />
            <div className="space-xxs"></div>
            <Label htmlFor="email">Instituition name</Label>
            <Input
              type="text"
              id="name"
              placeholder="Enter the name of the instituition"
              className="w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="space-xxs"></div>
            <Label htmlFor="affiliation">Affiliation</Label>
            <Select onValueChange={(value) => setAffiliation(value)}>
              <SelectTrigger className="w-[100px] select">
                <SelectValue placeholder="none" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Global</SelectLabel>
                  <SelectItem value="CBSE">CBSE</SelectItem>
                  <SelectItem value="ICSE">ICSE</SelectItem>
                  <SelectItem value="International">International</SelectItem>
                  <SelectLabel>Others</SelectLabel>
                  <SelectItem value="State Board">State</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="space-xxs"></div>
            <Label htmlFor="subtype">Subtype</Label>
            <Input
              type="text"
              id="subtype"
              placeholder="Enter the subtype (school, college, etc)"
              className="w-full"
              value={subtype}
              onChange={(e) => setSubtype(e.target.value)}
            />
            <div className="space-xxs"></div>
            <Label htmlFor="mode">Mode</Label>
            <Input
              type="text"
              id="mode"
              placeholder="Enter the mode (boarding, day, preschool, etc)"
              className="w-full"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            />
            <div className="space-xxs"></div>
            <Label htmlFor="email">Address</Label>
            <Textarea
              id="address"
              placeholder="Enter the address (location only) of the instituition"
              className="w-full"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <div className="space-xxs"></div>
            <Label htmlFor="city">City</Label>
            <Input
              type="text"
              id="city"
              placeholder="Enter the city"
              className="w-full"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <div className="space-xxs"></div>
            <Label htmlFor="state">State</Label>
            <Input
              type="text"
              id="state"
              placeholder="Enter the state"
              className="w-full"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <div className="space-xxs"></div>
            <Label htmlFor="country">Country</Label>
            <Input
              type="text"
              id="country"
              placeholder="Enter the country"
              className="w-full"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <div className="space-xxs"></div>
            <Label htmlFor="pincode">Pincode</Label>
            <Input
              type="number"
              id="pincode"
              placeholder="Enter the pincode"
              className="w-full"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
            <div className="space-xxs"></div>
            <Label htmlFor="contact_number">Contact number</Label>
            <Input
              type="text"
              id="contact_number"
              placeholder="Enter the contact number"
              className="w-full"
              value={contact_number}
              onChange={(e) => setContact_number(e.target.value)}
            />
            <div className="space-xxs"></div>
            <Label htmlFor="website">Website</Label>
            <Input
              type="text"
              id="website"
              placeholder="Enter the website"
              className="w-full"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
            <div className="space-xxs"></div>
            <Label htmlFor="established_year">Established year</Label>
            <Input
              type="date"
              id="established_year"
              placeholder="Enter the established year"
              className="w-full"
              value={established_year}
              onChange={(e) => setEstablished_year(e.target.value)}
            />
            <div className="space-xxs"></div>
            <Label htmlFor="student_capacity">Student capacity</Label>
            <Input
              type="number"
              id="student_capacity"
              placeholder="Enter the total student capacity"
              className="w-full"
              value={student_capacity}
              onChange={(e) => setStudent_capacity(Number(e.target.value))}
            />
            <div className="space-xxs"></div>
            <Label htmlFor="teacher_capacity">Teacher capacity</Label>
            <Input
              type="number"
              id="teacher_capacity"
              placeholder="Enter the total teacher capacity"
              className="w-full"
              value={teacher_capacity}
              onChange={(e) => setTeacher_capacity(Number(e.target.value))}
            />
            <div className="space-xxs"></div>
            <Label htmlFor="courses_offered">Courses offered</Label>
            <Textarea
              id="courses_offered"
              placeholder="Enter some of extra courses offered"
              className="w-full"
              value={courses_offered}
              onChange={(e) => setCourses_offered(e.target.value)}
            />
            <div className="space-xxs"></div>
            <Label htmlFor="facilities">Facilities</Label>
            <Textarea
              id="facilities"
              placeholder="Enter the facilities provided by the instituition"
              className="w-full"
              value={facilities}
              onChange={(e) => setFacilities(e.target.value)}
            />

            <div className="space-xxs"></div>
            <Label htmlFor="labs">Labs</Label>
            <Textarea
              id="labs"
              placeholder="Enter the labs available in the facility"
              className="w-full"
              value={labs}
              onChange={(e) => setLabs(e.target.value)}
            />
            <Label htmlFor="events">Events</Label>
            <Textarea
              id="events"
              placeholder="Enter a few events conducted"
              className="w-full"
              value={events}
              onChange={(e) => setEvents(e.target.value)}
            />
            <div className="space-xxs"></div>
            <Label htmlFor="transportation">Transportation</Label>
            <Checkbox
              id="transportation"
              name="transportation"
              checked={transportation}
              onCheckedChange={(checked) => setTransportation(checked === true)}
            />
            <div className="space-xxs"></div>
            <Label htmlFor="other_activities">Other activities</Label>
            <Textarea
              id="other_activities"
              placeholder="Enter some important activities conducted"
              className="w-full"
              value={other_activities}
              onChange={(e) => setOther_activities(e.target.value)}
            />
            <div className="space-xxs"></div>
            <Label htmlFor="sports">Sports</Label>
            <Textarea
              id="sports"
              placeholder="Enter all the sports activities conducted"
              className="w-full"
              value={sports}
              onChange={(e) => setSports(e.target.value)}
            />

            <div className="space-xxs"></div>
            <Label htmlFor="admission_process">Fee structure</Label>
            <Textarea
              id="fee_structure"
              placeholder="Enter the fee structure (or link)"
              className="w-full"
              value={fee_structure}
              onChange={(e) => setFee_structure(e.target.value)}
            />
            <div className="space-xxs"></div>
            <Label htmlFor="admission_process">Admission process</Label>
            <Textarea
              id="admission_process"
              placeholder="Enter the full admission process (or link)"
              className="w-full"
              value={admission_process}
              onChange={(e) => setAdmission_process(e.target.value)}
            />
            <div className="space-xxs"></div>
            <Label htmlFor="admission_process">Other Informations</Label>
            <Textarea
              id="other_info"
              placeholder="Enter any other information"
              className="w-full"
              value={other_info}
              onChange={(e) => setOther_info(e.target.value)}
            />
            <div className="space-xxs"></div>
            <Label htmlFor="transportation">Publish your institute</Label>
            <Checkbox
              id="publish"
              name="publish"
              checked={publish}
              onCheckedChange={(checked) => setPublish(checked === true)}
            />
            <div className="space-xxs"></div>
            <div className="buttonCont">
              {" "}
              <button
                className="button"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
              <button className="button" onClick={getDataFromSupabase}>
                Pull your data
              </button>
            </div>
          </div>
        </div>
        <div className="space-s"></div>
        <div className="releaseDate fade-item">
          <Info size={15} style={{ marginRight: "5px" }} /> This is not MVP.
          This is a temporary preview.
        </div>
      </div>
    </>
  );
}
