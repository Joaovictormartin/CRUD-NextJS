"use client";

import { useCallback, useState, useEffect } from "react";

import { Title } from "@/components/title";
import { columns } from "@/constants/table-clients";
import { getClients, deleteClients } from "@/actions";
import { ClientWithAddress } from "@/@types/client-with-address";
import { ClientTable } from "@/app/(admin)/clients/components/client-table";

export default function Clients() {
  const [search, setSearch] = useState<string>("");
  const [clients, setClients] = useState<ClientWithAddress[]>([]);

  const getData = useCallback(async () => {
    const clientsFound = await getClients({ search });
    setClients(clientsFound);
  }, [search]);

  const handleDelete = async (clientIds: string[]) => {
    await deleteClients(clientIds);
    getData();
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div>
      <Title title="Clientes" />

      <ClientTable
        data={clients}
        search={search}
        columns={columns}
        setSearch={setSearch}
        handleDelete={handleDelete}
      />
    </div>
  );
}
