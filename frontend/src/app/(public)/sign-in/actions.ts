"use server";
import { success, z } from "zod";
import { signInService } from "@/app/services/auth/sign-in-service";
import { SchemaSignIn } from "@/validator/sign-in/validator";
import { redirect } from 'next/navigation';

export const SendSignInAction = async (currentState: any, formData: FormData) => {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    // Valida os dados do formulário
    const result = SchemaSignIn.safeParse({
      email,
      password,
    });

    // Se a validação falhar, formata os erros usando z.treeifyError()
    if (!result.success) {
      const errors = z.treeifyError(result.error);
      throw new Error(JSON.stringify(errors.properties));
    }

    // Extrai os dados validados
    const { email: emailValidator, password: passwordValidator } = result.data;

    // Envia a requisição para o serviço de autenticação
    const response = await signInService({
      email: emailValidator,
      password: passwordValidator,
    });

    // Retorna sucesso
    if (response.status === 'success') {
      console.log(response.status, "no sucess")
      return { success: true };
    } else {
      console.log("resposta do else: " + response)
      return { error: 'Erro na requisição: ' + JSON.stringify(response) };
    }

  } catch (error) {
    return { error: 'Erro durante a autenticação: ' + (error instanceof Error ? error.message : 'Erro desconhecido') };
  }
};