"use client";
import "@/resources/custom.css";

import {

  Flex,
  
  Particle,
  Spinner,
} from "@once-ui-system/core";

import supabase from "@/app/supabase/client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session && session.user) {
        router.replace("/me");
      }
    };
    checkSession();
  }, [router]);

  return (
    <Flex fillWidth fillHeight style={{ minHeight: "100vh" }} center>
      <Particle
        fill
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          zIndex: -1,
        }}
        speed={2}
      />
      <Spinner size="l" />
    </Flex>
  );
}
