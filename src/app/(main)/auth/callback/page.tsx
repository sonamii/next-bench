"use client";
import { Flex, Spinner } from "@once-ui-system/core";
import { supabase } from "@/app/utils/supabase/client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function handleAuthCallback() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;

      const { user } = session;
      const { id: uuid, user_metadata, last_sign_in_at } = user;
      const newPfp = user_metadata?.avatar_url || null;
      const joined_at = user.created_at;
      const last_login = last_sign_in_at || new Date().toISOString();
      const primary_email = user_metadata?.email || null;

      // Fetch existing profile
      const { data: existingProfile } = await supabase
        .from("user_profiles")
        .select("pfp")
        .eq("uuid", uuid)
        .single();

      let pfp = newPfp;
      if (existingProfile && existingProfile.pfp) {
        // If old pfp exists, keep it
        pfp = existingProfile.pfp;
      }

      const profile_data = {
        uuid,
        pfp,
        joined_at,
        last_login,
        primary_email,
        // Add new column with structured data
        profile_details: {
          contact: {
            email: primary_email,
            address: user_metadata?.address || "",
            country: user_metadata?.country || "",
            timezone: user_metadata?.timezone || "",
            phone_number: user_metadata?.phone_number || "",
            language_preference: user_metadata?.language_preference || "",
          },
          membershipStatus: user_metadata?.membershipStatus || "",
          personal_details: {
            dob: user_metadata?.dob || "",
            gender: user_metadata?.gender || "",
            full_name: user_metadata?.full_name || user_metadata?.name || "",
            introduction: user_metadata?.introduction || "",
          },
        },
      };

      await supabase.from("user_profiles").upsert([profile_data]);

      router.push(`/profile/${uuid}`);
    }

    handleAuthCallback();
  }, [router]);
  return (
    <Flex
      center
      fillWidth
      fillHeight
      style={{ minWidth: "100vw", minHeight: "100svh" }}
    >
      <Spinner size="xl" />
    </Flex>
  );
}
