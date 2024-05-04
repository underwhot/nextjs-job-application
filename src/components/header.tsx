"use client";

import Image from "next/image";
import logo from "../assets/logo.svg";
import Link from "next/link";

import { Lightbulb, LightbulbOff } from "lucide-react";
import { Button } from "./ui/button";
import { UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function Header() {
  const [userTheme, setUserTheme] = useState("dark");
  const { setTheme } = useTheme();

  const toggleTheme = () => {
    if (userTheme === "dark") {
      setTheme("light");
      setUserTheme("light");
    } else {
      setTheme("dark");
      setUserTheme("dark");
    }
  };

  return (
    <div className="flex-grow flex items-center justify-between gap-4">
      <Link href={"/add-job"}>
        <Image src={logo} alt="logo" />
      </Link>

      <div className="flex items-center gap-4">
        <Button size="icon" onClick={() => toggleTheme()}>
          <Lightbulb />
        </Button>

        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
