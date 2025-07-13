"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useActionState, useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { SendSignInAction } from "../actions";
import IconGoogle from "../../../../../public/svg/icons/icon-google";
import { AnimatedListItem } from "@/components/magicui/animated-list";
import { Notification } from "@/components/notification-page";


export default function SignInForm() {
  const [state, action, isPending] = useActionState(SendSignInAction, null);
  const router = useRouter();
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Efeito para gerenciar notificações e redirecionamento
  useEffect(() => {
    if (state?.success) {
      setNotification({ message: "Login realizado com sucesso!", type: "success" });
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000); // Redireciona após 2 segundos
    } else if (state?.error) {
      setNotification({ message: state.error, type: "error" });
      // Limpar notificação de erro após 5 segundos
      const timeout = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [state, router]);

  return (
    <>
      {/* Exibir notificação animada */}
      {notification && (
        <div className="fixed top-4 right-4 z-50">
          <AnimatedListItem>
            <Notification message={notification.message} type={notification.type} />
          </AnimatedListItem>
        </div>
      )}

      <section className="flex min-h-screen w-1/2 items-center justify-center">
        <div className="flex flex-col gap-6">
          <div className="flex font-medium flex-col gap-3">
            <h1 className="text-gray-900 text-4xl">Bem-vindo</h1>
            <p className="text-gray-500">Seja bem-vindo! Por favor, insira seus dados.</p>
          </div>
          <form action={action} className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <p className="text-gray-700 font-medium text-[15px]">Email</p>
              <Input
                type="email"
                name="email"
                required={true}
                placeholder="Digite seu email..."
              />
              <p className="text-gray-700 font-medium text-[15px]">Senha</p>
              <Input
                type="password"
                name="password"
                required={true}
                placeholder="*********"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-1 items-center">
                <Checkbox className="cursor-pointer" name="remember" />
                <p className="font-medium text-[14px] text-gray-700">Lembrar por 30 dias</p>
              </div>
              <div>
                <p className="text-normal font-medium text-[14px] cursor-pointer">Esqueceu senha</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Button
                className="cursor-pointer bg-normal text-white hover:bg-normal-hover"
                disabled={isPending}
              >
                {isPending && <LoaderCircle className="animate-spin" />}
                {!isPending && "Entrar"}
              </Button>
              <Button
                className="cursor-pointer bg-white border-gray-200 shadow-xl border text-gray-700 hover:bg-gray-50"
              >
                <div className="flex gap-2 items-center">
                  <IconGoogle className="w-24 h-24" />
                  <p>Entrar com Google</p>
                </div>
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}