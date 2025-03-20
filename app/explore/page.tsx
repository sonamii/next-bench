"use client";
import "./page.css";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import supabase from "@/services/supabase";
import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { toast } from "sonner";
import { Nav } from "@/custom-components/nav/nav";
import { Plus } from "lucide-react";

import Avvvatars from "avvvatars-react";

export default function Callback() {
  const [userID, setUserID] = useState("");
  const [emailID, setEmailID] = useState("");
  const [isAdminOrInstituition, setIsAdminOrInstituition] = useState(false);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [ratings, setRatings] = useState("");

  function giveJSONDataInToast() {
    toast.success(JSON.stringify({ search, location, affiliation, ratings }));
  }

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
    const fetchUserType = async () => {
      if (userID) {
        const { data, error } = await supabase
          .from("users")
          .select("type")
          .eq("id", userID)
          .single();

        if (error) {
          toast.error("Failed to fetch user type");
          console.error(error);
        } else {
          if (data.type === "ADMIN" || data.type === "Institution") {
            setIsAdminOrInstituition(true);
          }
        }
      }
    };

    fetchUserType();
  }, [userID]);

  useEffect(() => {
    console.log(userID, emailID);
  }, [userID, emailID]);

  async function getEduAsTableFromSupabase() {
    const { data: eduData, error } = await supabase
      .from("edu")
      .select("name, subtype, affiliation, city, state, email, ratings,mode")
      .eq("isPublished", true);

    if (error) {
      toast.error("Failed to fetch education data");
      console.error(error);
      return;
    }

    const tableContainer = document.querySelector(".tableCont");
    if (tableContainer) {
      tableContainer.innerHTML = ""; // Clear existing content

      eduData.forEach((edu) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "item fade-item2";
        itemDiv.style.width = "100%"; // Ensure each item has the same width

        const pfpDiv = document.createElement("div");
        pfpDiv.className = "pfp";
        // avatar.textContent = edu.name.slice(0, 2).toUpperCase();
        // pfpDiv.appendChild(avatar);
        const avvvatarsComponent = createRoot(pfpDiv);
        avvvatarsComponent.render(
          React.createElement(Avvvatars, {
            value: edu.name,
            size: 35,
            style: "shape",
          })
        );

        const nameDiv = document.createElement("div");
        nameDiv.className = "name";
        nameDiv.textContent = edu.name;

        const labelsDiv = document.createElement("div");
        labelsDiv.className = "labels";

        const subtypeDiv = document.createElement("div");
        subtypeDiv.className = "subtype";
        subtypeDiv.textContent = edu.subtype;

        const affiliationDiv = document.createElement("div");
        affiliationDiv.className = "affiliation";
        affiliationDiv.textContent = edu.affiliation;

        const modeDiv = document.createElement("div");
        modeDiv.className = "mode";
        modeDiv.textContent = edu.mode;

        const locationDiv = document.createElement("div");
        locationDiv.className = "location";
        locationDiv.textContent = `${edu.city}, ${edu.state}`;

        const emailDiv = document.createElement("div");
        emailDiv.className = "email";
        emailDiv.textContent = edu.email;

        const ratingDiv = document.createElement("div");
        ratingDiv.className = "rating";
        ratingDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#F0E68C" stroke="#F0E68C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>${
          edu.ratings ?? 0
        }`;

        const buttonView = document.createElement("button");
        buttonView.className = "buttonView";
        buttonView.innerHTML = `More&nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`;

        labelsDiv.appendChild(subtypeDiv);
        labelsDiv.appendChild(affiliationDiv);
        labelsDiv.appendChild(modeDiv);

        itemDiv.appendChild(pfpDiv);
        itemDiv.appendChild(nameDiv);
        itemDiv.appendChild(labelsDiv);
        itemDiv.appendChild(locationDiv);
        itemDiv.appendChild(emailDiv);
        itemDiv.appendChild(ratingDiv);
        itemDiv.appendChild(buttonView);

        tableContainer.appendChild(itemDiv);
      });
    }

    const eduChannel = supabase
      .channel("edu-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "edu" },
        () => {
          getEduAsTableFromSupabase();
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "edu" },
        () => {
          getEduAsTableFromSupabase();
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "edu" },
        () => {
          getEduAsTableFromSupabase();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(eduChannel);
    };
  }

  useEffect(() => {
    getEduAsTableFromSupabase();
  }, [userID]);
  return (
    <>
      <Nav />
      <div className={`containerMain fade-in`}>
        <div className="prefContMain">
          {" "}
          <div className="preferencesCont fade-item">
            <div>
              <Input
                type="text"
                placeholder="search for schools/institutes"
                className="inputSearch"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div>
              {" "}
              <Input
                type="input"
                placeholder="location (opt)"
                className="inputLocation"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              {" "}
              <Select onValueChange={(value) => setAffiliation(value)}>
                <SelectTrigger className="w-[100px] select">
                  <SelectValue placeholder="board" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Global</SelectLabel>

                    <SelectItem value="CBSE">CBSE</SelectItem>
                    <SelectItem value="ICSE">ICSE</SelectItem>
                    <SelectItem value="International">International</SelectItem>
                    <SelectLabel>Others</SelectLabel>
                    <SelectItem value="State">State</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select onValueChange={(value) => setRatings(value)}>
                <SelectTrigger className="w-[100px] select">
                  <SelectValue placeholder="ratings" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="2+">2+</SelectItem>
                    <SelectItem value="3+">3+</SelectItem>
                    <SelectItem value="4+">4+</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="buttonCont fade-item">
            {" "}
            <button className="buttonSubmit">
              This is a temporary preview table
            </button>{" "}
            <button className="buttonSubmit">rl:true</button>
            <button className="buttonSubmit" onClick={giveJSONDataInToast}>
              Apply
            </button>
            {isAdminOrInstituition && (
              <button
                className="buttonAdd dropdown-next"
                onClick={() => {
                  window.location.href = "/edu/add";
                }}
              >
                <Plus />
              </button>
            )}
          </div>
          <div className="space-xxs"></div>
        </div>
        <div className="tableNotCont">Increase screen width to view the list of schools</div>
        <div className="tableCont fade-item2">
          {/* <div className="item">
            <div className="pfp">
              <Avvvatars value="wet23" size={35} style="shape" />
            </div>
            <div className="name">St. Patrick's Academy</div>
            <div className="labels">
              <div className="subtype">SCHOOL</div>
              <div className="affiliation">CBSE</div>
              <div className="mode">Boarding</div>
            </div>
            <div className="location">city,state</div>
            <div className="email">email@email.com</div>
            <div className="rating">
              <Star size={20} fill="#F0E68C" color="#F0E68C" />5
            </div>
            <button className="buttonView">
              More&nbsp;
              <ArrowRight size={18} />
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
}
