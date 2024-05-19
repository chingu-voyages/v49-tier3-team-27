import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "",
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isRootRoute = !!nextUrl.pathname;
      const isCommunity = nextUrl.pathname.startsWith("/community");
      const isEvents = nextUrl.pathname.startsWith("/events");
      const isOrderMeal = nextUrl.pathname.startsWith("/order-meal");
      const isRecipes = nextUrl.pathname.startsWith("/recipes");
      const isNotifications = nextUrl.pathname.startsWith("/notifications");
      const isProfile = nextUrl.pathname.startsWith("/profile");
      const isLandingPage = nextUrl.pathname.startsWith("/home");

      if (
        isCommunity ||
        isEvents ||
        isOrderMeal ||
        isRecipes ||
        isNotifications ||
        isProfile
      ) {
        if (isLoggedIn) return true;
        return false;
      } else if (isRootRoute && !isLandingPage && !isLoggedIn) {
        return Response.redirect(new URL("/home", nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
