"use client";

import { z } from "zod";
import { toast } from "sonner";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar as CalendarIcon, Plus } from "lucide-react";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { createClient } from "@/actions/createClient";

interface FormCustomerProps {}

export const formSchema = z.object({
  name: z.string().min(3, "Digite seu nome completo"),
  email: z.string().email("Digite um e-mail válido"),
  phone: z.string().min(10, "Digite um telefone válido"),
  birthDate: z.date().refine(
    (date) => {
      const [day, month, year] = date.toString().split("-");
      const isoDate = `${year}-${month}-${day}`;
      return !isNaN(Date.parse(isoDate));
    },
    { message: "Digite uma data de nascimento válida" },
  ),
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

export function FormCustomer({}: FormCustomerProps) {
  const { push } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "joao",
      email: "joao@gmail.com",
      phone: "24998413564",
      birthDate: new Date("1999-01-01"),
      address: {
        city: "Barra Mansa",
        state: "RJ",
        street: "rua 2",
        number: "1",
        zipCode: "273257501",
        complement: "134",
        neighborhood: "adsff",
      },
    },
  });

  const handleNavigateClients = () => push("/clients");

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    await createClient(data);
    toast.success("Cliente cadastrado com sucesso!");

    push(`/clients`);
  };

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
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl className="w-full">
                      <Button
                        variant={"outline"}
                        className={cn(
                          "h-11 pl-3 text-left hover:bg-transparent hover:text-muted-foreground",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Data de nascimento *</span>
                        )}
                        <CalendarIcon className="ml-auto h-6 w-6" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                    />
                  </PopoverContent>
                </Popover>
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

          <FormField
            name="address.street"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    iconName="MapPin"
                    placeholder="Endereço *"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-4 flex justify-end gap-2.5">
            <Button type="button" size={"lg"} onClick={handleNavigateClients}>
              Cancelar
            </Button>

            <Button variant={"success"} size={"lg"} type="submit">
              Cadastrar <Plus />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
