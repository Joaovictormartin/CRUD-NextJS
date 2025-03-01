"use client";

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

type Payment = {
  id: string;
  name: string;
  email: string;
  phone: string;
  birth: string;
  address: string;
};

export const payments: Payment[] = [
  {
    id: "1",
    name: "João",
    email: "teste@gmail.com",
    phone: "(24) 99999-9999",
    birth: "16/02/2000",
    address: "Rua da Paz, 123",
  },
  {
    id: "2",
    name: "Maria",
    email: "maria@gmail.com",
    phone: "(24) 98888-8888",
    birth: "10/05/1995",
    address: "Avenida Brasil, 456",
  },
  {
    id: "3",
    name: "Carlos",
    email: "carlos@gmail.com",
    phone: "(24) 97777-7777",
    birth: "22/08/1987",
    address: "Rua Central, 789",
  },
  {
    id: "4",
    name: "Ana",
    email: "ana@gmail.com",
    phone: "(24) 96666-6666",
    birth: "30/11/1992",
    address: "Travessa Alegre, 321",
  },
  {
    id: "5",
    name: "Lucas",
    email: "lucas@gmail.com",
    phone: "(24) 95555-5555",
    birth: "05/03/1998",
    address: "Rua dos Lírios, 654",
  },
  {
    id: "6",
    name: "Fernanda",
    email: "fernanda@gmail.com",
    phone: "(24) 94444-4444",
    birth: "18/07/1990",
    address: "Avenida das Rosas, 987",
  },
  {
    id: "7",
    name: "Rafael",
    email: "rafael@gmail.com",
    phone: "(24) 93333-3333",
    birth: "12/09/1985",
    address: "Rua Primavera, 852",
  },
  {
    id: "8",
    name: "Juliana",
    email: "juliana@gmail.com",
    phone: "(24) 92222-2222",
    birth: "25/06/1993",
    address: "Rua das Palmeiras, 369",
  },
  {
    id: "9",
    name: "Gustavo",
    email: "gustavo@gmail.com",
    phone: "(24) 91111-1111",
    birth: "14/01/1982",
    address: "Alameda do Sol, 741",
  },
  {
    id: "10",
    name: "Camila",
    email: "camila@gmail.com",
    phone: "(24) 90000-0000",
    birth: "08/04/2001",
    address: "Vila Nova, 258",
  },
];

export const columns: ColumnDef<Payment>[] = [
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
  { accessorKey: "phone", header: "Telefone" },
  { accessorKey: "birth", header: "Nascimento" },
  { accessorKey: "address", header: "Endereço" },
  {
    id: "actions",
    header: "Opções",
    cell: ({ cell }) => {
      const { push } = useRouter();
      const clientId = cell.row.original.id;

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
