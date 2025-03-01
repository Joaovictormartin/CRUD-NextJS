"use client";

import { redirect } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Loading } from "@/components/loading";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { status } = useSession();

  const handleLogin = async () => {
    await signIn("google").then((resp) => console.log(resp));
  };

  if (status === "authenticated") return redirect("/clients");
  if (status === "loading") return <Loading />;

  return (
    <div className="mx-auto flex h-screen w-full items-center justify-center">
      <Card className="mx-4 flex size-[320px] flex-col justify-between">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Faça seu login com o google</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-1 items-center justify-center">
          <Button className="w-full" onClick={handleLogin}>
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
