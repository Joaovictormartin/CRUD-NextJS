import { Title } from "@/components/title";
import { ClientTable } from "@/components/client-table";
import { columns, payments } from "@/constants/table-clients";

export default function Clients() {
  return (
    <div>
      <Title title="Clientes" />
      <ClientTable columns={columns} data={payments} />
    </div>
  );
}
