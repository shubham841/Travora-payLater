import { clerkMiddleware  } from "@clerk/nextjs/server";

export default clerkMiddleware ({
  publicRoutes: ["/", "/agent/login", "/agent/signup"],
});
export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
