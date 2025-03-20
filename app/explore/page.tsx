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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
      .select("name, subtype, affiliation, city, state, contact_number")
      .eq("isPublished", true);

    if (error) {
      toast.error("Failed to fetch education data");
      console.error(error);
      return;
    }

    const tableContainer = document.querySelector(".tableCont");
    if (tableContainer) {
      tableContainer.innerHTML = "";
      const table = document.createElement("table");
      table.className = "eduTable";

      let thead = table.createTHead();
      let headerRow = thead.insertRow();
      const headers = [
        "Name",
        "Subtype",
        "Affiliation",
        "City",
        "State",
        "Contact Number",
      ];
      headers.forEach((headerText) => {
        let header = document.createElement("th");
        header.textContent = headerText;
        headerRow.appendChild(header);
      });

      let tbody = table.createTBody();
      eduData.forEach((edu) => {
        let row = tbody.insertRow();
        let nameCell = row.insertCell();
        nameCell.textContent = edu.name;
        let subtypeCell = row.insertCell();
        subtypeCell.textContent = edu.subtype;
        let affiliationCell = row.insertCell();
        affiliationCell.textContent = edu.affiliation;
        let cityCell = row.insertCell();
        cityCell.textContent = edu.city;
        let stateCell = row.insertCell();
        stateCell.textContent = edu.state;
        let contactCell = row.insertCell();
        contactCell.textContent = edu.contact_number;
      });

      tableContainer.appendChild(table);
    }

    const eduChannel = supabase
      .channel("edu-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "edu" },
        (payload: { new: any }) => {
          getEduAsTableFromSupabase();
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "edu" },
        (payload: { old: any; new: any }) => {
          getEduAsTableFromSupabase();
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "edu" },
        (payload: { old: any }) => {
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
            </button>
            <button className="buttonSubmit" onClick={giveJSONDataInToast}>
              Apply
            </button>
            {isAdminOrInstituition && (
              <button
                className="buttonAdd"
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
        <div className="tableCont fade-item2"></div>
      </div>
    </>
  );
}
