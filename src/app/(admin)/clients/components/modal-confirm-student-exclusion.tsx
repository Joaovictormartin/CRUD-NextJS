"use client";

import { Trash2 } from "lucide-react";
import { Client } from "@prisma/client";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ModalConfirmStudentExclusionProps {
  open: boolean;
  client: Client[];
  setOpen: (open: boolean) => void;
  handleDelete: (clientIds: string[]) => void;
}

export function ModalConfirmStudentExclusion({
  open,
  client,
  setOpen,
  handleDelete,
}: ModalConfirmStudentExclusionProps) {
  const names = client?.map((item) => item.name)?.join(", ");

  const handleDeleteClients = async (client: Client[]) => {
    setOpen(false);
    const clientIds = client?.map((item) => item.id);
    await handleDelete(clientIds);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[420px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-sm font-bold">
            <strong className="text-[#F87171]">CUIDADO:</strong> Você está
            prestes a excluir um cliente!
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="my-0 border-y border-[#94A3B8] py-6">
          Tem certeza de que deseja excluir permanentemente o cliente(s) {names}
          ? Esta ação não pode ser desfeita e todos os dados relacionados ao
          cliente(s), incluindo histórico de empréstimos e faturas, serão
          removidos permanentemente.
        </DialogDescription>

        <DialogFooter className="flex justify-end gap-2">
          <Button onClick={() => setOpen(false)}>Cancelar</Button>

          <Button
            variant={"destructive"}
            onClick={() => handleDeleteClients(client)}
          >
            <Trash2 />
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
