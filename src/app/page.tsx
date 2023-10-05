export default function Home() {
  return (
   <div className="grid lg:grid-cols-2  md:grid-cols-1 min-h-screen">
      <div className="flex flex-col justify-center items-center w-full max-h-full bg-slate-950">
        <h1 className="text-4xl  font-bold font-sans">Solunexus</h1>
      </div>
      <div className="flex flex-col justify-center items-center w-full max-h-full gap-5">
          <div>
            <h1 className="lg:text-4xl md:text-3xl text-center font-bold font-sans">Redefinição de senha</h1>
            <p className="text-lg text-center font-sans">Digite seu e-mail para redefinir sua senha</p>
            <form className="flex flex-col gap-5 mt-5">
              <input className="p-2 rounded-md border border-gray-400 text-black font-sans" type="text" placeholder="E-mail" />
              <button className="p-2 rounded-md bg-green-500 text-white font-medium font-sans" type="submit">Enviar</button>
            </form>
          </div>
      </div>
   </div>
  )
}
