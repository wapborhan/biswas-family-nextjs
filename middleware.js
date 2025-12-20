import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const middleware = async (req) => {
  const token = await getToken({ req });
  const isToken = Boolean(token);
  const isAdmin = token?.role === "admin";
  const isAdminRoute = req.nextUrl.pathname.startsWith("/dashboard");

  if (!isAdmin && isAdminRoute) {
    const callBackUrl = encodeURIComponent(req.nextUrl.pathname);
    return NextResponse.redirect(
      new URL(`/api/auth/signin?callbackUrl=${callBackUrl}`, req.url)
    );
  }

  return NextResponse.next();
};
