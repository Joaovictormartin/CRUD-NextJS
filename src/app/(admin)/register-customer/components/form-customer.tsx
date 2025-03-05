"use client";
import "react-day-picker/dist/style.css";

import { z } from "zod";
import { toast } from "sonner";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Pencil, Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import useViaCep from "@/hooks/use-via-cep";
import { Input } from "@/components/ui/input";
import { Loading } from "@/components/loading";
import { Button } from "@/components/ui/button";
import { createClient, updateClient } from "@/actions";
import { ClientWithAddress } from "@/@types/client-with-address";

interface FormCustomerProps {
  client?: ClientWithAddress | null;
}

export const formSchema = z.object({
  name: z.string().min(3, "Digite seu nome completo"),
  email: z.string().email("Digite um e-mail válido"),
  phone: z.string().min(10, "Digite um telefone válido"),
  birthDate: z.string().min(10, "Digite uma data válida"),
  address: z.object({
    complement: z.string().optional(),
    zipCode: z.string().min(8, "CEP inválido").optional(),
    state: z.string().length(2, "UF inválida").optional(),
    street: z.string().min(3, "Rua obrigatória").optional(),
    city: z.string().min(3, "Cidade obrigatória").optional(),
    number: z.string().min(1, "Número obrigatório").optional(),
    neighborhood: z.string().min(3, "Bairro obrigatório").optional(),
  }),
});

export function FormCustomer({ client }: FormCustomerProps) {
  const { push } = useRouter();
  const { fetchAddress } = useViaCep();

  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: client ? client.name : "",
      email: client ? client.email : "",
      phone: client ? client.phone : "",
      birthDate: client ? client.birthDate : "",
      address: {
        city: client?.address?.city ? client.address.city : "",
        state: client?.address?.state ? client.address.state : "",
        street: client?.address?.street ? client.address.street : "",
        number: client?.address?.number ? client.address.number : "",
        zipCode: client?.address?.zipCode ? client.address.zipCode : "",
        complement: client?.address?.complement
          ? client.address.complement
          : "",
        neighborhood: client?.address?.neighborhood
          ? client.address.neighborhood
          : "",
      },
    },
  });

  const addressField = form.watch("address");
  const zipCode = form.watch("address.zipCode");

  const handleGetAddress = useCallback(async () => {
    if (zipCode && zipCode.length < 8) return;

    const response = await fetchAddress(zipCode ?? "");

    if (response) {
      form.setValue("address.state", response?.uf);
      form.setValue("address.city", response?.localidade);
      form.setValue("address.street", response?.logradouro);
      form.setValue("address.neighborhood", response?.bairro);
    }
  }, [zipCode, fetchAddress, form.setValue]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      if (isEdit) {
        await updateClient({ ...data, id: client?.id });
      } else {
        await createClient(data);
      }

      toast.success(
        `Cliente ${isEdit ? "atualizado" : "cadastrado"} com sucesso!`,
      );
      push(`/clients`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateClients = () => push("/clients");

  const isEdit = !!client;

  const addressFull = addressField?.street
    ? `${addressField?.street}, ${addressField?.number ? "nº " + addressField?.number + ", " : ""}${addressField?.complement ? addressField?.complement + ", " : ""}${addressField?.neighborhood} - ${addressField?.city}/${addressField?.state}`
    : "";

  useEffect(() => {
    handleGetAddress();
  }, [handleGetAddress]);

  if (loading) return <Loading />;

  return (
    <div className="rounded-lg border border-[#27272A]/10 p-6">
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Nome *"
                      iconName="TextCursor"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input iconName="Mail" placeholder="E-mail *" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      iconName="Phone"
                      placeholder="Telefone *"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="birthDate"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Data de nascimento *"
                      className="[&::-webkit-calendar-picker-indicator]:h-5 [&::-webkit-calendar-picker-indicator]:w-5 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-50"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FormField
              name="address.zipCode"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input iconName="Pin" placeholder="CEP *" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="address.number"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      iconName="FileDigit"
                      placeholder="Número *"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="address.complement"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      iconName="House"
                      placeholder="Complemento *"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Input
            disabled
            iconName="MapPin"
            value={addressFull}
            placeholder="Endereço *"
          />

          <div className="mt-4 flex justify-end gap-2.5">
            <Button type="button" size={"lg"} onClick={handleNavigateClients}>
              Cancelar
            </Button>

            <Button variant={"success"} size={"lg"} type="submit">
              {isEdit ? "Editar" : "Cadastrar"}
              {isEdit ? <Pencil /> : <Plus />}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
