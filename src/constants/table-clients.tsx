"use client";

import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import useFormatPhone from "@/hooks/use-format-phone";
import { ClientWithAddress } from "@/@types/client-with-address";

export const columns: ColumnDef<ClientWithAddress>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
  },
  { accessorKey: "name", header: "Nome" },
  { accessorKey: "email", header: "E-mail" },
  {
    accessorKey: "phone",
    header: "Telefone",
    cell: ({ row }) => {
      const { formatPhone } = useFormatPhone();
      return formatPhone(row.original.phone);
    },
  },
  {
    accessorKey: "birthDate",
    header: "Nascimento",
    cell: ({ row }) => format(new Date(row.original.birthDate), "dd/MM/yyyy"),
  },
  {
    accessorKey: "address.street",
    header: "Endereço",
    cell: ({ row }) => {
      const addressField = row.original.address;
      const fullAddress = `${addressField?.street}, ${addressField?.number ? "Nº " + addressField?.number + ", " : ""}${addressField?.complement ? addressField?.complement + ", " : ""}${addressField?.neighborhood} - ${addressField?.city}/${addressField?.state}`;

      return fullAddress;
    },
  },
  {
    id: "actions",
    header: "Opções",
    cell: ({ row }) => {
      const { push } = useRouter();
      const clientId = row.original.id;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir opções</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => push(`/register-customer/${clientId}`)}
            >
              Editar cliente
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
