import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { CornerDownRight } from "lucide-react";
import MainPageImage from "@/components/MainPageImage";

export const metadata: Metadata = {
  title: "mindscribe",
};

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-5 bg-gradient-to-b from-background to-muted md:justify-normal">
      <div className="flex flex-col items-center gap-4 md:mt-40">
        <div className="flex items-center gap-3">
          <span className="text-5xl font-light tracking-wide underline decoration-wavy decoration-4 underline-offset-4 sm:text-6xl md:text-8xl">
            mindscribe.
          </span>
        </div>
        <span className="mt-6 text-lg font-medium tracking-tight sm:text-xl md:text-2xl">
          the smart note-taking app, powered by ai
        </span>
        <Button size="lg" asChild>
          <Link href="/notes">
            {" "}
            <CornerDownRight size={20} className="mr-2" />
            Get Started
          </Link>
        </Button>
      </div>

      <MainPageImage />
    </main>
  );
}
