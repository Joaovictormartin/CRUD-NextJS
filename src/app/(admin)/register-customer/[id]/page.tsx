"use client";

import { z } from "zod";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Title } from "@/components/title";
import { getClientById } from "@/actions";
import { Loading } from "@/components/loading";
import { FormCustomer } from "../components/form-customer";
import { ClientWithAddress } from "@/@types/client-with-address";

const idSchema = z.object({ id: z.string().uuid() });

const RegisterCustomer = () => {
  const params = useParams();
  const result = idSchema.safeParse(params);

  if (!result.success) return null;

  const [client, setClient] = useState<ClientWithAddress | null>(null);

  const getData = useCallback(async () => {
    const clientFound = await getClientById({ clientId: result.data.id });
    setClient(clientFound);
  }, [result.data.id]);

  useEffect(() => {
    getData();
  }, [getData]);

  if (!client) return <Loading />;

  return (
    <div>
      <Title title={`Editando: ${client.name}`} />
      <FormCustomer client={client} />
    </div>
  );
};

export default RegisterCustomer;
