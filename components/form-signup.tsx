"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { useEffect } from "react";
import { useVerificationStore } from "@/store/verificationStore";
import { useAdminVerificationStore } from "@/store/adminVerificationStore";
import updateIsLoggedIn from "@/services/updateIsLoggedIn";

/**
 * The SignUpForm component is a form that allows users to sign up for a new
 * account. It takes an optional `className` prop that is passed to the outermost
 * `div` element.
 *
 * @param {React.ComponentProps<"div">} props - The props for the component.
 * @returns The SignUpForm component.
 */
export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState(""); // The user's email address.
  const [password, setPassword] = useState(""); // The user's password.
  const [type, setType] = useState<string>(""); // The user's type (Student, Parent, Teacher, Institution).
  const { setIsVerified } = useVerificationStore();
  const { setIsAdminVerified } = useAdminVerificationStore();

  /**
   * postDataToSupabase is a function that posts the user's data to Supabase.
   * It extracts the name from the email address and uses a placeholder phone
   * number. It also validates the type before inserting the data into the
   * 'users' table.
   */
  async function postDataToSupabase() {
    const name = email.split("@")[0]; // Extract name from email
    const phone = "xxx-xxx-xxxx"; // Placeholder phone number

    console.log("User Signup Data:", { email, password, type, name, phone });

    // Validate type before inserting
    const allowedTypes = ["Student", "Parent", "Teacher", "Institution"];
    if (!allowedTypes.includes(type)) {
      console.error("Invalid user type:", type);
      toast("Invalid user type", {
        description: `Please choose a valid type: ${allowedTypes.join(", ")}`,
        action: { label: "Okay", onClick: () => console.log("Okay") },
      });
      return;
    }

    // Sign up the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { type }, // Stored in `auth.users`
      },
    });

    // If there's an error, log it and toast the user
    if (error) {
      toast("Error signing up", {
        description: `Please try again or LogIn, ${error.message}`,
        action: { label: "Okay", onClick: () => console.log("Okay") },
      });
      return;
    }

    const user = data.user;
    console.log("Signed up successfully:", user);
    updateIsLoggedIn(true);
    setIsVerified(false);
    setIsAdminVerified(false);

    // Fetch the security_id from the 'users' table using the user ID
    if (!user) {
      console.error("User is null. Signup failed.");
      return;
    }

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
        localStorage.setItem("email", email);
        console.log("Email stored in localStorage:", email);
      } else {
        console.error("Security ID not found for user.");
      }
    }

    if (!user?.id) {
      console.error("User ID is missing. Signup failed.");
      return;
    }

    const securityId = uuidv4(); // More secure than a custom function

    // Insert user details into the 'users' table
    const { error: insertError } = await supabase.from("users").insert([
      {
        id: user.id, // Use the generated user ID
        security_id: securityId,
        type: type, // Type is already validated
        name: name,
        email: email,
        password: password, // Consider hashing the password before storing
        phone: phone,
        created_at: new Date().toISOString(),
      },
    ]);

    if (insertError) {
      toast("Error inserting user details", {
        description: `Please try again, ${insertError.message}`,
        action: { label: "Okay", onClick: () => console.log("Okay") },
      });
      return;
    }

    console.log("User details inserted successfully!");
    toast("Signed up successfully", {
      description: new Date().toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
      action: {
        label: "Login",
        onClick: () => (window.location.href = "/auth/login"),
      },
    });
    fetchAndStoreSecurityId(user.id);
    setTimeout(() => {
      window.location.href = "/auth/login";
    }, 2500);
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

  /**
   * The SignUpForm component returns a Card with a CardContent that is a grid
   * with two columns. The first column contains a form with the following
   * elements:
   *
   * 1. A heading with the text "Welcome user!"
   * 2. A paragraph with the text "Pre-signup to your next-bench account"
   * 3. A Label and an Input for the email address
   * 4. A Label and a Select for the user type (Student, Parent, Teacher,
   *    Institution)
   * 5. A Label and an Input for the password
   * 6. A Button labeled "SignUp"
   *
   * The second column contains an Image with a logo.
   *
   * @returns The SignUpForm component.
   */
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 cardContainer">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-6">
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
                onClick={postDataToSupabase}
                style={{ cursor: "pointer" }}
              >
                SignUp
              </Button>
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
