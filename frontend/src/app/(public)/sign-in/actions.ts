"use server";
import { z } from "zod";
import { SchemaSignIn } from "@/validator/sign-in/validator";
import { signInService } from "@/services/auth/sign-in-service";
import { formatErrorMessage } from "@/utils/format-error";

export const SendSignInAction = async (currentState: any, formData: FormData) => {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    // Quando ativado recebe valor de "ON (string)", quando não vem valor "NULL"
    const remember = formData.get('remember');


    // Validate form data
    const result = SchemaSignIn.safeParse({
      email,
      password
    });

    // Valida se o tipo de erro e do zod validator
    if (!result.success) {
      const errors = z.treeifyError(result.error);
      throw new Error(JSON.stringify(errors.properties));
    }

    // Extrai o resultado validado
    const { email: emailValidator, password: passwordValidator } = result.data;

    // Send request to authentication service
    const response = await signInService({
      email: emailValidator,
      password: passwordValidator,
      remember: String(remember)
    });

    // Valida se foi sucesso
    if (response.code === '1') {
      return { success: true, mensagem: response.mensagem };
    } else {
      return { error: `Erro na consulta: ${response.mensagem}` };
    }

  } catch (error) {
    const errorFormatado = await formatErrorMessage(error);
    console.log(errorFormatado)
    return {
      error: 'Erro durante a autenticação: ' +
      (error instanceof Error ? errorFormatado : 'Erro desconhecido')
    };
  }
};