"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "./../app/auth/login-signup.css";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import supabase from "./../services/supabase";
import { toast } from "sonner";
import { useVerificationStore } from "@/store/verificationStore";
import { useAdminVerificationStore } from "@/store/adminVerificationStore";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useEffect } from "react";
/**
 * LoginForm component
 *
 * This component is used to log in to the application.
 * It requires an email and a password as input.
 * The component will call the {@link supabase.auth.signInWithPassword} method
 * to sign in to the application.
 *
 * @param {React.ComponentProps<"div">} props - The props for the component.
 * @returns {React.ReactElement} The LoginForm component.
 */
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsVerified } = useVerificationStore();
  const { setIsAdminVerified } = useAdminVerificationStore();

  /**
   * This function is called when the user clicks the "LogIn" button.
   * It will call the {@link supabase.auth.signInWithPassword} method
   * to sign in to the application.
   *
   * If the sign in is successful, the user will be redirected to the
   * `/auth/callback` page. If the sign in fails, an error message will
   * be displayed to the user.
   */
  async function fetchAndStoreSecurityId(userId: string) {
    const { data: userData, error: fetchError } = await supabase
      .from("users")
      .select("security_id")
      .eq("id", userId)
      .single();

    if (fetchError) {
      console.error("Error fetching security_id:", fetchError.message);
      return;
    }

    const securityId = userData?.security_id;

    if (securityId) {
      // Store the security_id in localStorage
      localStorage.setItem("security_id", securityId);
      console.log("Security ID stored in localStorage:");
    } else {
      console.error("Security ID not found for user.");
    }
  }

  function getDataFromSupabase() {
    // Log the email and password to the console

    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);

    // Use the signInWithPassword method to sign in to the application
    supabase.auth
      .signInWithPassword({ email, password })
      .then(({ data, error }) => {
        if (error) {
          // If there is an error, log it to the console and display an error message to the user
          console.error("Error logging in:", error.message);
          toast("Error logging in", {
            description: `Please try again - ${error.message}`,
            action: {
              label: "Okay",
              onClick: () => console.log("Okay"),
            },
          });
        } else {
          // If the sign in is successful, log the user to the console and set the isVerified flag to false
          console.log("Logged in successfully:", data.user);
          setIsVerified(false);
          setIsAdminVerified(false);

          // Store the user's email in local storage
          // if (data.user.email) {
          //   localStorage.setItem("email", data.user.email);
          //   fetchAndStoreSecurityId(data.user.id);
          // }

          localStorage.setItem("email", email);
          fetchAndStoreSecurityId(data.user.id);

          // Display a success message to the user
          toast("Logged in successfully", {
            description: `Welcome back, ${data.user.email}`,
            action: {
              label: "Hello",
              onClick: () => console.log("Hello"),
            },
          });

          // After 1.5 seconds, redirect the user to the /auth/callback page
          setTimeout(() => {
            window.location.href = "/auth/callback";
          }, 1500);
        }
      });
  }

  useEffect(() => {
    if (localStorage.getItem("email")) {
      toast("User already signed in as", {
        description: `${localStorage.getItem("email")}`,
        action: {
          label: "Dashboard",
          onClick: () => (window.location.href = "/dashboard"),
        },
      });
    }
  }, []);

  function googleLogin() {
    toast("Authorization failed", {
      description: `Unable to authorize with Google`,
    });
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
                    href="/auth/change-email"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Update email?
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
                onClick={getDataFromSupabase}
                style={{ cursor: "pointer" }}
              >
                LogIn
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
                  onClick={googleLogin}
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
