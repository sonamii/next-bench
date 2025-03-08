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
import supabase from "./../services/supabase";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState<string>("");
  async function postDataToSupabase() {
    const name = email.split("@")[0]; // Extract name from email
    const phone = "xxx-xxx-xxxx"; // Placeholder phone number

    console.log("User Signup Data:", { email, password, type, name, phone });

    // ✅ Validate type before inserting
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

    if (error) {
      toast("Error signing up", {
        description: `Please try again, ${error.message}`,
        action: { label: "Okay", onClick: () => console.log("Okay") },
      });
      return;
    }

    const user = data.user;
    console.log("Signed up successfully:", user);

    if (!user?.id) {
      console.error("User ID is missing. Signup failed.");
      return;
    }

    // Generate security_id
    const securityId = crypto.randomUUID(); // More secure than a custom function

    // Insert user details into the 'users' table
    const { error: insertError } = await supabase.from("users").insert([
      {
        id: user.id, // ✅ Use the generated user ID
        security_id: securityId,
        type: type, // ✅ Type is already validated
        name: name,
        email: email,
        password: password, // ❌ Consider hashing the password before storing
        phone: phone,
        created_at: new Date().toISOString(),
      },
    ]);

    if (insertError) {
      console.error("Error inserting user details:", insertError.message);
      return;
    }

    console.log("User details inserted successfully!");

    // Success toast and redirect
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
        label: "Confirm email",
        onClick: () => (window.location.href = "/auth/login"),
      },
    });
    setTimeout(() => {
      window.location.href = "/auth/login";
    }, 2500);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 cardContainer">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome user!</h1>
                <div className="text-muted-foreground text-balance">
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
                      v0.1.0-alpha.1
                    </HoverCardContent>
                  </HoverCard>{" "}
                  account
                </div>
              </div>
              <div className="grid gap-3">
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
              <Button
                className="w-full"
                onClick={postDataToSupabase}
                style={{ cursor: "pointer" }}
              >
                SignUp
              </Button>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block overflow-hidden justify-center">
            <Image
              src="/logo.png"
              alt="Image"
              width={400}
              height={400}
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              style={{ width: "100% !important", height: "100% !important" }}
            />
          </div>
        </CardContent>
      </Card>
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
