"use client";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddEditNoteDialog from "./AddEditNoteDialog";
import { Button } from "./ui/button";

export default function AddNoteButton() {
  const [showAddEditNoteDialog, setShowAddEditNoteDialog] = useState(false);

  return (
    <>
      <Button onClick={() => setShowAddEditNoteDialog(true)}>
        <Plus size={20} className="mr-2"></Plus>
        Add Note
      </Button>
      <AddEditNoteDialog
        open={showAddEditNoteDialog}
        setOpen={setShowAddEditNoteDialog}
      />
    </>
  );
}
