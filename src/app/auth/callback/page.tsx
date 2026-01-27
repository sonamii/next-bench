"use client";
import "@/resources/custom.css";
import Lenis from "lenis";

import {
  Heading,
  Text,
  Button,
  Column,
  Badge,
  Logo,
  Line,
  LetterFx,
  Background,
  Flex,
  Media,
  AvatarGroup,
  Row,
  Icon,
  Tag,
  Kbd,
  IconButton,
  SmartLink,
  TypeFx,
  CountdownFx,
  ThemeSwitcher,
  MatrixFx,
  Particle,
  Spinner,
} from "@once-ui-system/core";
import Image from "next/image";
import { companyLogo } from "@/resources/next-bench.config";
import supabase from "@/app/supabase/client";
import { v4 as uuidv4 } from "uuid";

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
