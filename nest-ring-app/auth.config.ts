import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isLoginPage = nextUrl.pathname.startsWith("/login");
      const isCommunity = nextUrl.pathname.startsWith("/community");
      const isEvents = nextUrl.pathname.startsWith("/events");
      const isOrderMeal = nextUrl.pathname.startsWith("/order-meal");
      const isRecipes = nextUrl.pathname.startsWith("/recipes");
      const isNotifications = nextUrl.pathname.startsWith("/notifications");
      const isProfile = nextUrl.pathname.startsWith("/profile");
      const query = new URLSearchParams(nextUrl.search);
      const redirectURL = query.get("callbackUrl");

      if (
        isCommunity ||
        isEvents ||
        isOrderMeal ||
        isRecipes ||
        isNotifications ||
        isProfile
      ) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (
        isLoginPage &&
        redirectURL !== undefined &&
        redirectURL !== null
      ) {
        if (isLoggedIn) {
          return Response.redirect(
            new URL(redirectURL, process.env.NEXTAUTH_URL)
            // new URL('https://www.google.com')
          );
        }
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
