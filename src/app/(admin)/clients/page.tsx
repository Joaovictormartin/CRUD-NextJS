import { Title } from "@/components/title";
import { columns, payments } from "@/constants/table-clients";
import { ClientTable } from "@/app/(admin)/clients/components/client-table";

export default function Clients() {
  return (
    <div>
      <Title title="Clientes" />
      <ClientTable columns={columns} data={payments} />
    </div>
  );
}
