"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertCircle, Github } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function AIChatDisabled() {
  return (
    <>
      <Dialog>
        <DialogTrigger className="flex" asChild>
          <Button>
            <AlertCircle />
            <span className="ml-1">AI Chat Disabled</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>AI Chat Disabled</DialogTitle>
            <DialogDescription className="flex flex-wrap gap-2"></DialogDescription>
          </DialogHeader>
          <span>
            The AI chat function has been disabled to manage costs
            and prevent spam. For full access to the application, explore the
            source code on my GitHub repository.
          </span>

          <DialogFooter>
            <Button variant="secondary" asChild>
              <Link href="https://github.com/Alexeri/mindscribe" target="_blank">
                <Github size={20} className="mr-1" />
                Github
              </Link>
            </Button>
            <DialogClose asChild>
              <Button>Continue</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
