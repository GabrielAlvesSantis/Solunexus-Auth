"use client";

import z from "zod";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { emailSchema } from "@/validators/auth-email-validator";

import { CircleIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function FormAuthEmail() {

  const supabase =  createClientComponentClient();


  const { toast } = useToast()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  })

  const { reset } = form;

  async function onSubmit(values: z.infer<typeof emailSchema>) {
    setIsLoading(true)
    try {
      const { error,data } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: `${process.env.NEXT_PUBLIC_URL}/changepassword`,
      })

      if (data) {
        toast ({
          title: "Atenção",
          variant: "default",
          description: "E-mail enviado com sucesso!",
          duration: 6000,
          action: (
            <ToastAction altText="Obrigado" className="bg-white text-sans">Obrigado!</ToastAction>
          ),
        })
        reset()
        setIsLoading(false)
      }

      if (!error) {
        toast ({
          title: "Atenção",
          variant: "default",
          description: "E-mail enviado com sucesso!",
          duration: 6000,
          action: (
            <ToastAction altText="Obrigado" className="bg-white text-sans">Obrigado!</ToastAction>
          ),
        })
        reset()
        setIsLoading(false)
      }

      if (error) {
        toast ({
          title: "Atenção",
          variant: "destructive",
          description: `${error}`,
          duration: 6000,
          action: (
            <ToastAction altText="Obrigado" className="bg-white text-sans">Obrigado!</ToastAction>
          ),
        })
      }

    } catch (error) {
      toast ({
        title: "Atenção",
        variant: "destructive",
        description: `${error}`,
        duration: 6000,
        action: (
          <ToastAction altText="Obrigado" className="bg-white text-sans">Obrigado!</ToastAction>
        ),
      })
    }
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
                <FormMessage />
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