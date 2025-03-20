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
        </div>
      </div>
    </>
  );
}
