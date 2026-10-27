import { createAuthClient } from "better-auth/react";

const baseURL =
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8080";

export const authClient = createAuthClient({
  baseURL,
  fetchOptions: {
    credentials: "include", // Ensure session cookies and OAuth state/PKCE cookies are sent and received
  },
});

export const { signIn, signOut, useSession, getSession } = authClient;
