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
      const pfp = user_metadata?.avatar_url || null;
      const joined_at = user.created_at;
      const last_login = last_sign_in_at || new Date().toISOString();
      const primary_email = user_metadata?.email || null;

      await supabase.from("user_profiles").upsert([
        {
          uuid,
          pfp,
          joined_at,
          last_login,
          primary_email,
        },
      ]);

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
