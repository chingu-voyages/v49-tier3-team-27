import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isLoginPage = nextUrl.pathname.startsWith("/login");
      const isHome = nextUrl.pathname.startsWith("/home");
      const isCommunity = nextUrl.pathname.startsWith("/community");
      const isEvents = nextUrl.pathname.startsWith("/events");
      const isOrderMeal = nextUrl.pathname.startsWith("/order-meal/checkout");
      const isRecipes = nextUrl.pathname.startsWith("/recipes");
      const isNotifications = nextUrl.pathname.startsWith("/notifications");
      const isProfile = nextUrl.pathname.startsWith("/profile");
      const query = new URLSearchParams(nextUrl.search);
      const redirectURL = query.get("callbackUrl");
      const baseURL = process.env.NEXTAUTH_URL;

      if (isHome && isLoggedIn && baseURL) {
        return Response.redirect(new URL("/order-meal", baseURL));
      } else if (
        isCommunity ||
        isEvents ||
        isOrderMeal ||
        isRecipes ||
        isNotifications ||
        isProfile
      ) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoginPage) {
        if (isLoggedIn && redirectURL !== undefined && redirectURL !== null) {
          return Response.redirect(new URL(new URL(redirectURL)));
        } else if (isLoggedIn && baseURL) {
          return Response.redirect(new URL("/order-meal", baseURL));
        }
      }

      return true;
    },
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.userId = user._id;
        token.name = user.name;
        token.email = user.email;
        token.foodOrders = user.foodOrders;
        token.avatarUrl = user.avatarUrl;
        token.bannerUrl = user.bannerUrl;
        token.firstname = user.firstname;
        token.middlename = user.middlename;
        token.lastname = user.lastname;
        token.description = user.description;
        token.dob = user.dob;
        token.accountType = user.accountType;
        token.authToken = user.authToken;
        token.location = user.location;
        token.isAuthenticated = user.isAuthenticated;
        token.isEmailVerified = user.isEmailVerified;
        token.isProfileComplete = user.isProfileComplete;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.userId = token.userId;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.foodOrders = token.foodOrders;
        session.user.avatarUrl = token.avatarUrl;
        session.user.bannerUrl = token.bannerUrl;
        session.user.firstname = token.firstname;
        session.user.middlename = token.middlename;
        session.user.lastname = token.lastname;
        session.user.description = token.description;
        session.user.dob = token.dob;
        session.user.accountType = token.accountType;
        session.user.authToken = token.authToken;
        session.user.location = token.location;
        session.user.isAuthenticated = token.isAuthenticated;
        session.user.isEmailVerified = token.isEmailVerified;
        session.user.isProfileComplete = token.isProfileComplete;
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
