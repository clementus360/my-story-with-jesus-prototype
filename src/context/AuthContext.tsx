"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type User = {
  name: string;
  email: string;
  /** initials fallback when no photo */
  initials: string;
  avatar?: string;
};

type AuthState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "authenticated"; user: User }
  | { status: "unauthenticated" };

type AuthContextValue = {
  state: AuthState;
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loginAsGuest: () => void;
  logout: () => void;
};

// ─── Mock helpers ─────────────────────────────────────────────────────────────

const STORAGE_KEY = "mswj_mock_user";

function makeInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const MOCK_AVATARS = [
  "http://localhost:3845/assets/e0ed72f85793600186c470be8d093a1d975d0f98.png",
  "http://localhost:3845/assets/377268403580342663fd510d39b202c00b515953.png",
  "http://localhost:3845/assets/a2694540b0bbe13388ba733365eeb1f82df47250.png",
];

function mockDelay(ms = 900) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ status: "idle" });

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const user: User = JSON.parse(stored);
        setState({ status: "authenticated", user });
      } else {
        setState({ status: "unauthenticated" });
      }
    } catch {
      setState({ status: "unauthenticated" });
    }
  }, []);

  const persist = useCallback((user: User) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    setState({ status: "authenticated", user });
  }, []);

  const login = useCallback(async (email: string, _password: string) => {
    setState({ status: "loading" });
    await mockDelay();
    const name = email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    persist({
      name,
      email,
      initials: makeInitials(name),
      avatar: MOCK_AVATARS[0],
    });
  }, [persist]);

  const register = useCallback(async (name: string, email: string, _password: string) => {
    setState({ status: "loading" });
    await mockDelay();
    persist({
      name,
      email,
      initials: makeInitials(name),
      avatar: MOCK_AVATARS[1],
    });
  }, [persist]);

  const loginAsGuest = useCallback(() => {
    persist({
      name: "Guest",
      email: "guest@example.com",
      initials: "G",
      avatar: MOCK_AVATARS[2],
    });
  }, [persist]);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState({ status: "unauthenticated" });
  }, []);

  const user =
    state.status === "authenticated" ? state.user : null;

  return (
    <AuthContext.Provider
      value={{
        state,
        user,
        isAuthenticated: state.status === "authenticated",
        login,
        register,
        loginAsGuest,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
