import FormAuthEmail from "@/components/form-auth-email/form-auth-email"
import Image from "next/image"

export default function Home() {
  return (
   <div className="grid lg:grid-cols-2  md:grid-cols-1 min-h-screen">
      <div className="flex flex-col justify-center items-center w-full max-h-full bg-gray-100">
        <Image src="/Logo_Solunexus.png" width={"800"} height={"800"} alt="Solunexus" draggable="false" priority />
      </div>
      <div className="flex flex-col justify-center items-center w-full max-h-full gap-5 bg-gray-50">
          <FormAuthEmail />
      </div>
   </div>
  )
}
