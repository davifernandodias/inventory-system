import { setToken } from "@/utils/token-cookie";

const URL_API_BACKEND = process.env.NEXT_PUBLIC_URL_BACKEND;

if (!URL_API_BACKEND) {
  throw new Error('Variável url_backend não foi resgatada do env');
}

interface SignType {
  email: string;
  password: string;
}

export const signInService = async (data: SignType) => {
  try {
    const response = await fetch(`${URL_API_BACKEND}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: data.email,
        password: data.password
      })
    });

    if (!response.ok) {
      throw new Error(`Erro na autenticação: ${response.statusText}`);
    }

    const result = await response.json();

    
    if (result.token) {
      await setToken(result.token);
    }

    return {
      code: '1',
      mensagem: 'Login realizado com sucesso',
      data: result
    };
  } catch (error) {
    return {
      code: '0',
      mensagem: `Erro durante o login: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
      data: null
    };
  }
};