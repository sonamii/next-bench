"use client";
import Swal from "sweetalert2";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "./../app/auth/login-signup.css";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import supabase from "./../services/supabase";
import { toast } from "sonner";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const { error } = await supabase.auth.getSession();
      if (error) {
        toast.error("Failed to check session");
        return;
      }
    }

    checkSession();
  }, []);

  async function signInWithPassword() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error("Failed to sign out");
      }
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (signInError) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Failed to log in",
          customClass: {
            container: "my-swal-container",
          },
        });
        return;
      }
      const { error: updateError } = await supabase
        .from("users")
        .update({ isLoggedIn: true })
        .eq("email", email);
      if (updateError) {
        toast.error("Failed to update login status");
      } else {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have successfully logged in",
          customClass: {
            container: "my-swal-container",
          },
        });
        setTimeout(() => {
          window.location.href = "/auth/callback";
        }, 1500);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("An unexpected error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  }

  async function loginWithGoogleToSupabase() {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) {
        toast.error("Failed to log in with Google");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("An unexpected error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 cardContainer">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-6">
              {/* Header */}
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back!</h1>
                <div className="text-muted-foreground text-balance">
                  Login to your{" "}
                  <HoverCard>
                    {/* next-bench version number */}
                    <HoverCardTrigger>
                      <u>next-bench</u>
                    </HoverCardTrigger>
                    <HoverCardContent
                      style={{
                        padding: "7px 10px",
                        maxWidth: "fit-content",
                        fontSize: "inherit",
                        fontFamily: "monospace",
                        color: "inherit",
                      }}
                    >
                      v0.1.0.alpha-2
                    </HoverCardContent>
                  </HoverCard>{" "}
                  account
                </div>
              </div>

              {/* Email and password inputs */}
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="grid gap-3">
                {/* Password input */}
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Login button */}
              <Button
                className="w-full"
                onClick={async () => {
                  setIsLoading(true);
                  await signInWithPassword();
                  setIsLoading(false);
                }}
                style={{ cursor: "pointer" }}
                disabled={isLoading || !email || !password}
              >
                {isLoading ? "Logging In..." : "LogIn"}
              </Button>

              {/* Text between login and signup */}
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>

              {/* Signup and Apple login buttons */}
              <div className="grid grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="w-full"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    window.location.href = "/auth/signup";
                  }}
                >
                  <ArrowLeft />
                  <span className="sr-only">Back</span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  style={{ cursor: "pointer" }}
                  onClick={loginWithGoogleToSupabase}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Login with Google</span>
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    window.location.href = "/";
                  }}
                >
                  <Image
                    src="/logo.png"
                    alt="logo-login"
                    width={30}
                    height={30}
                    style={{ filter: "invert(1)", fontWeight: "bold" }}
                  ></Image>
                </Button>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block overflow-hidden justify-center">
            <Image
              src="/logo.png"
              alt="Image"
              width={400}
              height={400}
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              style={{
                width: "100% !important",
                height: "100% !important",
                cursor: "pointer",
              }}
              onClick={() => {
                window.location.href = "/";
              }}
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you are logging in into{" "}
        <a href="#">next-bench dashboard</a> and sharing{" "}
        <a href="#">your data</a>.
      </div>
    </div>
  );
}
