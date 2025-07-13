"use server";
import { z } from "zod";
import { SchemaSignIn } from "@/validator/sign-in/validator";
import { signInService } from "@/services/auth/sign-in-service";

export const SendSignInAction = async (currentState: any, formData: FormData) => {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    // Validate form data
    const result = SchemaSignIn.safeParse({
      email,
      password,
    });

    // If validation fails, format errors using z.treeifyError()
    if (!result.success) {
      const errors = z.treeifyError(result.error);
      throw new Error(JSON.stringify(errors.properties));
    }

    // Extract validated data
    const { email: emailValidator, password: passwordValidator } = result.data;

    // Send request to authentication service
    const response = await signInService({
      email: emailValidator,
      password: passwordValidator,
    });

    console.log("Sign-in response:", response);

    // Check for successful response
    if (response.code === '1') {
      console.log("Successful login");
      return { success: true, mensagem: response.mensagem };
    } else {
      console.log("Failed login:", response.mensagem);
      return { error: `Erro na requisição: ${response.mensagem}` };
    }

  } catch (error) {
    console.error("Authentication error:", error);
    return {
      error: 'Erro durante a autenticação: ' +
      (error instanceof Error ? error.message : 'Erro desconhecido')
    };
  }
};