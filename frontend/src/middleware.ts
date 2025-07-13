import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

// Rotas públicas ("/" vai ser a landing page então vai ser publcia indepedente se tiver token)
const publicRoutes = ["/", "/sign-in", "/sign-up"];
const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/sign-in";
const REDIRECT_WHEN_AUTHENTICATED_ROUTE = "/dashboard";
const JWT_SECRET = process.env.JWT_SECRET!;

export async function middleware(request: Request) {
  const { pathname } = new URL(request.url);

  // Permitir acesso às rotas públicas
  if (publicRoutes.includes(pathname)) {
    // Para /sign-in e /sign-up, verificar se o usuário está autenticado
    if (pathname === "/sign-in" || pathname === "/sign-up") {
      const cookieStore = await cookies();
      const token = cookieStore.get("auth_token")?.value;

      if (token) {
        // Validar o token
        try {
            // Converte a palavra secreta do jwt
            const secret = new TextEncoder().encode(JWT_SECRET);
            // Valida se o token e válido
            await jwtVerify(token, secret, { algorithms: ["HS256"] });
            // Token válido, redirecionar para /dashboard
            return NextResponse.redirect(new URL(REDIRECT_WHEN_AUTHENTICATED_ROUTE, request.url));
        } catch (error) {
          console.error("Erro ao validar token:", error);
          // Token inválido, permitir acesso a /sign-in ou /sign-up
          return NextResponse.next();
        }
      }
    }
    // Para a rota / (landing page) ou se não houver token em /sign-in ou /sign-up, permitir acesso
    return NextResponse.next();
  }

  // Ignorar arquivos estáticos
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.match(/\.(.*)$/)
  ) {
    return NextResponse.next();
  }

  // Para rotas protegidas, verificar se o token existe e é válido
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL(REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE, request.url));
  }

  // Validar o token para rotas protegidas
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    await jwtVerify(token, secret, { algorithms: ["HS256"] });
    // Token válido, prosseguir
    return NextResponse.next();
  } catch (error) {
    console.error("Erro ao validar token:", error);
    return NextResponse.redirect(new URL(REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE, request.url));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};