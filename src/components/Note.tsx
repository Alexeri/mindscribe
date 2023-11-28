"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Note as NoteModel } from "@prisma/client";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import AddEditNoteDialog from "./AddEditNoteDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface NoteProps {
  note: NoteModel;
}

export default function Note({ note }: NoteProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [favorite, setFavorite] = useState(note.favorite);
  const router = useRouter();

  const handleCardClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    if (
      !event.target ||
      !(event.target as HTMLElement).closest(".heartContainer")
    ) {
      setShowEditDialog(true);
    }
  };

  const wasUpdated = note.updatedAt > note.createdAt;

  const createdUpdatedAtTimestamp = (
    wasUpdated ? note.updatedAt : note.createdAt
  ).toDateString();

  async function setFavoriteNote() {
    try {
      if (note) {
        const response = await fetch("/api/notes", {
          method: "PATCH",
          body: JSON.stringify({ id: note.id, favorite: !favorite }),
        });

        if (!response.ok) throw Error("Status code: " + response.status);

        setFavorite((prev) => !prev);
        if (favorite === true) {
          toast.info(`${note.title} removed from Favorites`);
          router.refresh();
        } else {
          toast.info(`${note.title} added to Favorites`);
          router.refresh();
        }
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <Card
        className="group cursor-pointer transition-shadow hover:shadow-lg dark:hover:shadow-slate-900"
        onClick={handleCardClick}
      >
        <CardHeader className="relative">
          <CardTitle>{note.title}</CardTitle>
          <CardDescription className="flex items-center">
            {createdUpdatedAtTimestamp}
            {wasUpdated && " (Updated)"}
          </CardDescription>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="group/heart heartContainer absolute right-4 top-3 rounded-full p-2 opacity-100 transition-all hover:bg-amber-500/10 md:group-hover:opacity-100"
                  onClick={setFavoriteNote}
                >
                  {favorite ? (
                    <Star className="fill-amber-500 text-amber-500 transition-all group-hover/heart:scale-90" />
                  ) : (
                    <Star className="text-muted-foreground transition-all group-hover/heart:scale-110 group-hover/heart:text-amber-500" />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                {favorite ? (
                  <p>Remove from favorites</p>
                ) : (
                  <p>Add to favorites</p>
                )}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line">{note.content}</p>
        </CardContent>
      </Card>
      <AddEditNoteDialog
        open={showEditDialog}
        setOpen={setShowEditDialog}
        noteToEdit={note}
      />
    </>
  );
}
