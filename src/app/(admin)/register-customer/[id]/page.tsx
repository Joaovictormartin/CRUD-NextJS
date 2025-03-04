"use client";

import { z } from "zod";
import { useCallback, useEffect, useState } from "react";

import { Title } from "@/components/title";
import { getClientById } from "@/actions";
import { Loading } from "@/components/loading";
import { FormCustomer } from "../components/form-customer";
import { ClientWithAddress } from "@/@types/client-with-address";

const RegisterCustomerSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

type RegisterCustomerProps = z.infer<typeof RegisterCustomerSchema>;

const RegisterCustomer = ({ params: { id } }: RegisterCustomerProps) => {
  const [client, setClient] = useState<ClientWithAddress | null>(null);

  const getData = useCallback(async () => {
    const clientFound = await getClientById({ clientId: id });
    setClient(clientFound);
  }, [id]);

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
