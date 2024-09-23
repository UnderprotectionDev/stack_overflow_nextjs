// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

// export default clerkMiddleware((auth, request) => {
//   const { pathname } = new URL(request.url);
//   if (pathname !== "/" && !isPublicRoute(request)) {
//     auth().protect();
//   }
// });

// export const config = {
//   matcher: [
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     "/(api|trpc)(.*)",
//   ],
// };
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/api/webhook",
  "/question/:id)",
  "/tags(.*)",
  "/tags/:id",
  "/profile/:id",
  "/community",
  "/jobs",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

const isIgnoredRoute = createRouteMatcher(["/api/webhook", "/api/chatgpt"]);

export default clerkMiddleware((auth, request) => {
  const { pathname } = new URL(request.url);

  if (isIgnoredRoute(request)) {
    return;
  }

  if (!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
