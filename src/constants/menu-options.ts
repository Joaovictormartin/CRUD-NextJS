"use client";

import { ElementType } from "react";
import { UsersRound, Plus } from "lucide-react";

type menuOptionsProps = {
  url: string;
  title: string;
  icon: ElementType;
};

export const menuOptions: menuOptionsProps[] = [
  { icon: UsersRound, url: "/clients", title: "Clientes" },
  { icon: Plus, url: "/register-customer", title: "Cadastrar Cliente" },
];
