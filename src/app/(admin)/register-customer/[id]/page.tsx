interface RegisterCustomerProps {
  params: { id: string };
}

export default function RegisterCustomer({ params }: RegisterCustomerProps) {
  return <div>{params.id}</div>;
}
