import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function setToken(token: string) {
  const cookieStore = cookies();

  (await cookieStore).set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 1 day in seconds
    path: '/'
  });

  return NextResponse.json(
    {
      code: '1',
      mensagem: 'Token adicionado com sucesso',
    },
    {
      status: 200
    }
  );
}

export async function removeToken() {
  const cookieStore = cookies();

  (await cookieStore).delete('auth_token');

  return NextResponse.json(
    {
      code: '1',
      mensagem: 'Token removido com sucesso',
    },
    {
      status: 200
    }
  );
}

export async function resgataToken() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('auth_token')?.value;

  if (!token) {
    return NextResponse.json(
      {
        code: '0',
        mensagem: 'Nenhum token encontrado',
      },
      {
        status: 404
      }
    );
  }

  return NextResponse.json(
    {
      code: '1',
      mensagem: 'Token resgatado com sucesso',
      token: token
    },
    {
      status: 200
    }
  );
}