import AIChatButton from "@/components/AIChatButton";
import AddNoteButton from "@/components/AddNoteButton";
import Note from "@/components/Note";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "mindscribe - notes",
};

export default async function NotesPage() {
  const { userId } = auth();

  if (!userId) throw Error("userId undefined");

  const allNotes = await prisma.note.findMany({ where: { userId } });
  const sortedData = [...allNotes].sort((a, b) =>
    a.favorite === b.favorite ? 0 : a.favorite ? -1 : 1,
  );

  const favoriteItems = allNotes.filter((item) => item.favorite);

  return (
    <>
      <div className="mt-20">
        <div className="text-3xl font-bold">Notes</div>

        <Tabs defaultValue="all" className="mt-2">
          <div className="flex justify-between">
            <TabsList className="mb-2">
              <TabsTrigger value="all">All notes</TabsTrigger>
              <TabsTrigger value="favorites">
                Favorites {`(${favoriteItems.length})`}
              </TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <AddNoteButton />
              <AIChatButton />
            </div>
          </div>
          <TabsContent
            value="all"
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {allNotes.map((note) => (
              <Note note={note} key={note.id} />
            ))}
            {allNotes.length === 0 && (
              <div className="col-span-full text-center">
                {"You don't have any notes yet. Why don't you created one?"}
              </div>
            )}
          </TabsContent>
          <TabsContent
            value="favorites"
            className="mt-0 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {favoriteItems.map((note) => (
              <Note note={note} key={note.id} />
            ))}
            {favoriteItems.length === 0 && (
              <div className="col-span-full text-center">
                {
                  "You don't have any favorites yet. Why don't you favorite one?"
                }
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
