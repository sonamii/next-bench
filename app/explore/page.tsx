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
          if (data.type === "ADMIN" || data.type === "Instituition") {
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
      if (!tableContainer.hasOwnProperty("_reactRoot")) {
        (tableContainer as Element & { _reactRoot?: any })["_reactRoot"] =
          createRoot(tableContainer);
      }
      const tableElement = (
        <Table className="eduTable">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Subtype</TableHead>
              <TableHead>Affiliation</TableHead>
              <TableHead>City</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Contact Number</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {eduData.map((edu) => (
              <TableRow key={edu.name}>
                <TableCell>{edu.name}</TableCell>
                <TableCell>{edu.subtype}</TableCell>
                <TableCell>{edu.affiliation}</TableCell>
                <TableCell>{edu.city}</TableCell>
                <TableCell>{edu.state}</TableCell>
                <TableCell>{edu.contact_number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
      (tableContainer as Element & { _reactRoot: any })["_reactRoot"].render(
        tableElement
      );
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
          <div className="preferencesCont">
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
          <div className="buttonCont">
            {" "}
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
        <div className="tableCont"></div>
      </div>
    </>
  );
}
