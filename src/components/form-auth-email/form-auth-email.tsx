"use client";

import z from "zod";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { emailSchema } from "@/app/validators/auth-email-validator";

import { CircleIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function FormAuthEmail() {

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  })

  const {reset} = form;

  async function onSubmit(values: z.infer<typeof emailSchema>) {
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      console.log(values)

      if (response.ok) {
        reset({
          email: "",
        })
      } 

      console.log(response)
    } catch (error) {
      toast({
        title: "Sistema ",
        description: `${error}`,
        variant: "destructive",
        duration: 6000,
        action: <ToastAction altText="Obrigado">Obrigado</ToastAction>,
      });
    }

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)

  }

  return (
    <div className="flex flex-col justify-center">
      <h2 className="scroll-m-20 pb-2 text-3xl text-center font-semibold tracking-tight transition-colors">Redefinição de senha</h2>
      <p className="leading-7 [&:not(:first-child)]">Digite seu e-mail para redefinir sua senha</p>
      <Form {...form} >
        <form className="flex flex-col gap-5 mt-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">E-mail</FormLabel>
                <FormControl>
                  <Input {...field} id="email" type="email" disabled={isLoading} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-green-700 hover:bg-green-600" disabled={isLoading}>
            {isLoading ? (
              <CircleIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : ("Enviar")}
        </Button>
        </form>
      </Form>
    </div>
  );
}