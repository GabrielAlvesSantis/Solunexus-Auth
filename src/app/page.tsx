import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Home() {
  return (
   <div className="grid lg:grid-cols-2  md:grid-cols-1 min-h-screen">
      <div className="flex flex-col justify-center items-center w-full max-h-full bg-gray-100">
        <Image src="/Logo_Solunexus.png" width={"800"} height={"800"} alt="Solunexus" draggable="false" />
      </div>
      <div className="flex flex-col justify-center items-center w-full max-h-full gap-5 bg-gray-50">
          <div>
            <h2 className="scroll-m-20 pb-2 text-3xl text-center font-semibold tracking-tight transition-colors">Redefinição de senha</h2>
            <p className="leading-7 [&:not(:first-child)]">Digite seu e-mail para redefinir sua senha</p>
            <form className="flex flex-col gap-5 mt-5">
              <Input type="email" className="border-gray-400" />
              <Button className="p-2 rounded-md bg-green-700 hover:bg-green-600 text-white font-medium font-sans" type="submit">Enviar</Button>
            </form>
          </div>
      </div>
   </div>
  )
}
