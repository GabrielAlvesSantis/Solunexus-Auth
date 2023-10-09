"use client";

import z from "zod";
import React from "react";
import { useRouter } from 'next/navigation'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { passwordSchema } from "@/validators/auth-password-validator";

import { CircleIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function FormAuthPassword() {

  const supabase = createClientComponentClient();

  const { toast } = useToast()

  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: ""
    },
  })

  const { reset } = form;

  async function onSubmit(values: z.infer<typeof passwordSchema>) {
    setIsLoading(true)
    try {
    const { error } = await supabase.auth.updateUser({password: values.passwordConfirmation})

    const messageError = error?.message
    
    console.log(messageError)

    if(!error) {
      toast ({
        title: "Atenção",
        variant: "default",
        description: "Senha alterada com sucesso!",
        duration: 6000,
        action: (
          <ToastAction altText="Obrigado" className="bg-white text-sans">Obrigado!</ToastAction>
        ),
      })
      reset()
      setIsLoading(false)

      await supabase.auth.signOut()
      router.refresh()
    }

    if(messageError === 'Auth session missing!'){
      toast ({
        title: "Atenção",
        variant: "destructive",
        description: "Sessão expirada! Por favor, solicite uma nova redefinição de senha.",
        duration: 6000,
        action: (
          <ToastAction altText="Obrigado" className="text-sans">Obrigado!</ToastAction>
        ),
      })
      reset()
      setIsLoading(false)
    } else if (messageError === 'New password should be different from the old password.') {
      toast({
        title: "Atenção",
        variant: "destructive",
        description: "Nova senha deve ser diferente da senha antiga.",
        duration: 6000,
        action: (
          <ToastAction altText="Obrigado" className="text-sans">Obrigado!</ToastAction>
        ),
      })

      reset()
      setIsLoading(false)
    } else if (error) {
      toast ({
        title: "Atenção",
        variant: "destructive",
        description: `${error.message}`,
        duration: 6000,
        action: (
          <ToastAction altText="Obrigado" className="text-sans">Obrigado!</ToastAction>
        ),
      })
      reset()
      setIsLoading(false)
    } 

    } catch (error) {
      toast ({
        title: "Atenção",
        variant: "destructive",
        description: `${error}`,
        className: "bg-red-500 text-white text-sans",
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
      <p className="leading-7 [&:not(:first-child)]">Digite sua nova senha nos campos abaixo.</p>
      <Form {...form} >
        <form className="flex flex-col gap-5 mt-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Senha</FormLabel>
                <FormControl>
                  <Input {...field} id="password" type="password" disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="passwordConfirmation">Confirme sua senha</FormLabel>
                <FormControl>
                  <Input {...field} id="passwordConfirmation" type="password" disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-green-700 hover:bg-green-600" disabled={isLoading}>
            {isLoading ? (
              <CircleIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : ("Alterar")}
          </Button>
        </form>
      </Form>
    </div>
  );
}