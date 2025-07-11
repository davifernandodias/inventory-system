import { Button } from "@/components/ui/button";
import LogoLorem from "../../../../public/svg/mark/logo-lorem";
import { Input } from "@/components/ui/input";
import IconGoogle from "../../../../public/svg/icons/icon-google";
import { Checkbox } from "@/components/ui/checkbox";

export default function SignIn() {
  return (
    <main className="flex min-h-screen">
      <section className="flex min-h-screen w-1/2 items-center justify-center bg-normal border-none border-r rounded-tr-4xl rounded-br-4xl"
      style={{ boxShadow: '10px 0 10px -5px rgba(0, 0, 0, 0.2)' }}>

        <div className="flex justify-center items-center flex-col gap-7">
        <LogoLorem className="w-96 h-20"/>
        <p className="w-110 text-center font-medium text-white text-wrap">Gerencie seu cardápio online com praticidade, otimizando seu estabelecimento de forma simples e segura.</p>
        </div>
      </section>
      <section className="flex min-h-screen w-1/2 items-center justify-center">
        <div className="flex flex-col gap-6">
          <div className="flex font-medium flex-col gap-3">
            <h1 className="text-gray-900 text-4xl">Bem vindo</h1>
            <p className="text-gray-500">Seja bem-vindo! Por favor, insira seus dados.</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-gray-700 font-medium text-[15px]">Email</p>
            <Input />
            <p className="text-gray-700 font-medium text-[15px]">Senha</p>
            <Input />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-1 items-center">
              <Checkbox className="cursor-pointer"/>
              <p className="font-medium text-[14px] text-gray-700">Lembrar por 30 dias</p>
            </div>
            <div>
              <p className="text-normal font-medium text-[14px] cursor-pointer">Esqueceu senha</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Button className="cursor-pointer bg-normal text-white hover:bg-normal-hover">Entrar</Button>
            <Button className="cursor-pointer bg-white border-gray-200 shadow-xl border text-gray-700 hover:bg-gray-50">
              <div className="flex gap-2 items-center">
                <IconGoogle className="w-24 h-24"/>
                <p>
                  Entrar com google
                </p>
              </div>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}