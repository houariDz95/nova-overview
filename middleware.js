import { authMiddleware } from "@clerk/nextjs";

const middleware = authMiddleware({
  publicRoutes: ["/api/:path*"],
});

console.log("Middleware:", middleware);

export default middleware;

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};