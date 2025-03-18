"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Swal from "sweetalert2";
import "./../app/auth/login-signup.css";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import supabase from "./../services/supabase";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState(""); // The user's email address.
  const [password, setPassword] = useState(""); // The user's password.
  const [type, setType] = useState<string>(""); // The user's type (Student, Parent, Teacher, Institution).
  const [isLoading, setIsLoading] = useState(false); // The loading state of the button.

  async function signUpToSupabase() {
    setIsLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          type,
        },
      },
    });

    if (error) {
      toast.error(error.message);
    } else {
      Swal.fire({
        icon: "success",
        title: "Signup successful!",
        text: `Please check your email ${email} to confirm your account.`,
        customClass: {
          container: "my-swal-container",
        },
      });
      postDataToSupabase();
    }
  }

  async function postDataToSupabase() {
    const { error } = await supabase.from("users").insert([
      {
        security_id: uuidv4(),
        type: type,
        name: email.split("@")[0], // Set the name extracted from the email
        email: email,
        password: password,
        phone: "xxx-xxx-xxxx", // Replace with actual phone number if available
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("User data saved successfully!");
      window.location.href = "/auth/login";
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
            <div className="flex flex-col gap-5">
              {/* The first column contains a heading, a paragraph, and a form */}
              <div className="flex flex-col items-center text-center">
                {/* The heading */}
                <h1 className="text-2xl font-bold">Welcome user!</h1>
                {/* The paragraph */}
                <div className="text-muted-foreground text-balance">
                  {/* The link to the next-bench version */}
                  Pre-signup to your{" "}
                  <HoverCard>
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
                      {/* Version in the code */}
                      v0.1.0.alpha-2
                    </HoverCardContent>
                  </HoverCard>{" "}
                  {/* The text "account" */}
                  account
                </div>
              </div>
              {/* The form */}
              <div className="grid gap-3">
                {/* The email address */}
                <Label htmlFor="email">Email*</Label>
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
                {/* The user type */}
                <div className="flex items-center">
                  <Label htmlFor="password">Type</Label>
                </div>
                <div>
                  <Select
                    required
                    onValueChange={(value) => setType(value)}
                    value={type}
                  >
                    <SelectTrigger id="framework" style={{ width: "100%" }}>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="Student">Student</SelectItem>
                      <SelectItem value="Parent">Parent</SelectItem>
                      <SelectItem value="Teacher">Teacher</SelectItem>
                      <SelectItem value="Institution">Institution</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-3">
                {/* The password */}
                <div className="flex items-center">
                  <Label htmlFor="password">
                    {" "}
                    <HoverCard>
                      <HoverCardTrigger>
                        <u>Password</u>*
                      </HoverCardTrigger>
                      <HoverCardContent
                        style={{
                          padding: "7px 10px",
                          maxWidth: "fit-content",
                          fontSize: "13px",
                          fontWeight: "lighter",
                          color: "#a8a8a8",
                          fontFamily: "monospace",
                        }}
                      >
                        {/* Password Requirements */}
                        (A-Z,a-z,0-9,Special Characters)
                      </HoverCardContent>
                    </HoverCard>{" "}
                  </Label>
                  <a
                    href="/auth/reset-password"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Reset your password?
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
              {/* The button */}
              <Button
                className="w-full"
                onClick={async () => {
                  setIsLoading(true);
                  await signUpToSupabase();
                  setIsLoading(false);
                }}
                style={{ cursor: "pointer" }}
                disabled={isLoading || !email || !password || !type}
              >
                {isLoading ? "Signing Up..." : "SignUp"}
              </Button>
            </div>
            <div className="flex flex-row items-center text-center mt-3 text-sm text-foreground justify-center whitespace-pre">
              or login with{" "}
              <button className="underline buttonGoogle2" onClick={loginWithGoogleToSupabase}>google</button>
            </div>
          </form>
          {/* The second column contains an Image with a logo. */}
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
      {/* The links to the terms of service and privacy policy */}
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>. Click to{" "}
        <u>
          <a href="/auth/login">
            <b>Login</b>
          </a>
        </u>
      </div>
    </div>
  );
}
