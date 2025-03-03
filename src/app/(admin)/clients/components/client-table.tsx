"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import {
  ColumnDef,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ClientWithAddress } from "@/@types/client-with-address";
import { ModalConfirmStudentExclusion } from "./modal-confirm-student-exclusion";

interface DataTableProps<_, TValue> {
  data: ClientWithAddress[];
  search: string;
  setSearch: (search: string) => void;
  columns: ColumnDef<ClientWithAddress, TValue>[];
  handleDelete: (clientIds: string[]) => void;
}

export function ClientTable<TData, TValue>({
  data,
  search,
  columns,
  setSearch,
  handleDelete,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const handleOpenModal = () => setOpenModal(true);

  const rowSelectionIndexes = Object.keys(rowSelection).map(Number);
  const selectedClient = data.filter((_, index) =>
    rowSelectionIndexes.includes(index),
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnFilters,
      rowSelection,
    },
  });

  console.log(selectedClient);

  return (
    <div className="rounded-lg border border-[#27272A]/10 p-6">
      <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
        <Input
          value={search}
          iconName="Search"
          className="w-full sm:w-[358px]"
          placeholder="Pesquise por nome ou email"
          onChange={({ target }) => setSearch(target.value)}
        />

        {table.getFilteredSelectedRowModel().rows.length !== 0 && (
          <Button
            variant={"destructive"}
            onClick={handleOpenModal}
            className="w-full sm:w-auto"
          >
            Excluir Selecionados
            <Trash2 />
          </Button>
        )}
      </div>

      <div className="my-6">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum resultado encontrado...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionadas.
        </div>

        <div className="flex items-center gap-4">
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Página {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="secondary"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Anterior
            </Button>
            <Button
              variant="default"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Próxima
            </Button>
          </div>
        </div>
      </div>

      <ModalConfirmStudentExclusion
        open={openModal}
        setOpen={setOpenModal}
        client={selectedClient}
        handleDelete={handleDelete}
      />
    </div>
  );
}
