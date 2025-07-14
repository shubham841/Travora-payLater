import { clerkMiddleware  } from "@clerk/nextjs/server";

export default clerkMiddleware ({
  publicRoutes: ["/", "/auth/agent/login(.*)", "/auth/agent/signup(.*)"],
});
export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
