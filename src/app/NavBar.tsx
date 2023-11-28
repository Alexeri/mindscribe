"use client";

import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { BrainCog } from "lucide-react";

import ThemeToggleButton from "@/components/ThemeToggleButton";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function NavBar() {
  const { theme } = useTheme();

  return (
    <>
      <div className="fixed w-full p-4 shadow">
        <div className="m-auto flex max-w-7xl flex-wrap items-center justify-between gap-3  ">
          <Link href="/" className="flex items-center gap-1">
            <BrainCog size={30} />
            <span className="hidden font-medium tracking-wide md:block">
              mindscribe.
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <SignedIn>
              <Button variant="link" className="text-md mr-2">
                <Link href="/notes">My Notes</Link>
              </Button>
            </SignedIn>
            <ThemeToggleButton />
            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  baseTheme: theme === "dark" ? dark : undefined,
                  elements: {
                    avatarBox: { width: "2.5rem", height: "2.5rem" },
                  },
                }}
              />
            </SignedIn>
            <SignedOut>
              <Button variant="ghost" asChild>
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button asChild>
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </SignedOut>
          </div>
        </div>
      </div>
    </>
  );
}
