"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ModalAddEventProps } from "./ModalAddEvent.types";
import { FormEvent } from "../FormEvent";

export function ModalAddEvent(props: ModalAddEventProps) {
  const { open, companies, setNewEvent, setOnSaveNewEvent, setOpen } = props;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>agrega un nuevo evento!</DialogTitle>
        </DialogHeader>
        <FormEvent
          setNewEvent={setNewEvent}
          setOpen={setOpen}
          companies={companies}
          setOnSaveNewEvent={setOnSaveNewEvent}
        />
      </DialogContent>
    </Dialog>
  );
}
