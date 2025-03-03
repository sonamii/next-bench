"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "./../app/auth/login-signup.css";
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
import supabase from "@/services/supabase";
import { useEffect } from "react";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState<string>("");

  function sendDataToSupabase() {
    console.log(email);
    console.log(password);
    console.log(type);
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
                <Select
                  required
                  onValueChange={(value) => setType(value)}
                  value={type}
                >
                  <SelectTrigger id="framework" style={{ width: "100%" }}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Parent">Student/Parent</SelectItem>
                    <SelectItem value="Teacher">Teacher</SelectItem>
                    <SelectItem value="School">School</SelectItem>
                    <SelectItem value="University">University</SelectItem>
                  </SelectContent>
                </Select>
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
                    href="#"
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
              <Button className="w-full" onClick={sendDataToSupabase}>
                SignUp
              </Button>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block overflow-hidden justify-center">
            <img
              src="/logo.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>. Click to{" "}
        <u>
          <a href="/auth/login">Login</a>
        </u>
      </div>
    </div>
  );
}
