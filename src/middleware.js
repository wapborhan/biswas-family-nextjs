import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const middleware = async (req) => {
  const token = await getToken({ req });
  const isToken = Boolean(token);
  const isAdmin = token?.role === "admin";
  console.log(token);

  const pathname = req.nextUrl.pathname;

  const protectedRoutes = ["/members", "/member"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isLoginScreen = pathname.startsWith("/auth/login");

  if (isProtectedRoute && !isToken) {
    const callbackUrl = encodeURIComponent(pathname);
    return NextResponse.redirect(
      new URL(`/api/auth/signin?callbackUrl=${callbackUrl}`, req.url)
    );
  }

  if (isToken && isLoginScreen) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isProtectedRoute && isToken && !isAdmin) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
};
