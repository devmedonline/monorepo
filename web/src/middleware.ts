import { NextMiddleware } from "next/server";

export const middleware: NextMiddleware = (req, event) => {};

export const config = {
  matcher: ["/adm/:path*"],
};
