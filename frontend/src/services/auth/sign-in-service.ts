import { setToken } from "@/utils/token-cookie";

const URL_API_BACKEND = process.env.NEXT_PUBLIC_URL_BACKEND;

if (!URL_API_BACKEND) {
  throw new Error('Variável url_backend não foi resgatada do env');
}




export const signInService = async (data: signType) => {
  try {
    const response = await fetch(`${URL_API_BACKEND}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: data.email,
        password: data.password,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      if (response.status === 422 && result.errors) {
        // Retorna erros de validação no formato esperado
        return {
          code: '0',
          mensagem: result.message || 'Erro de validação nos campos',
          errors: result.errors,
          data: null,
        };
      }
      if (response.status === 401) {
        return {
          code: '0',
          mensagem: result.message || 'Usuário ou senha incorretos',
          data: null,
        };
      }
      throw new Error(result.message || `Erro na autenticação: ${response.statusText}`);
    }

    if (result.token) {
      await setToken(result.token);
    }

    return {
      code: '1',
      mensagem: result.message || 'Login realizado com sucesso',
      data: result,
    };
  } catch (error) {
    return {
      code: '0',
      mensagem: `Erro durante o login: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
      data: null,
    };
  }
};