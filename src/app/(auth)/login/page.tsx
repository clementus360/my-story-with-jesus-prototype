"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const { login, loginAsGuest, state } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const loading = state.status === "loading";

  function validate() {
    const e: typeof errors = {};
    if (!email) e.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email address.";
    if (!password) e.password = "Password is required.";
    else if (password.length < 6) e.password = "Password must be at least 6 characters.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    await login(email, password);
    router.push("/");
  }

  function handleGuest() {
    loginAsGuest();
    router.push("/");
  }

  return (
    <div className="bg-white rounded-2xl shadow-[0px_6px_24px_0px_rgba(0,0,0,0.08)] p-10 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-[#00194c] text-[32px] font-bold leading-9">Welcome back</h2>
        <p className="text-[#666] text-base leading-5">
          Sign in to continue sharing your story with Jesus.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <Input
          id="email"
          type="email"
          label="Email address"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          autoComplete="email"
        />
        <div className="flex flex-col gap-2">
          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            autoComplete="current-password"
          />
          <div className="flex justify-end">
            <Link href="#" className="text-[#3949ab] text-sm hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>

        <Button type="submit" fullWidth disabled={loading}>
          {loading ? "Signing in…" : "Sign In"}
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-[#e0e0e0]" />
        <span className="text-[#858585] text-sm">or</span>
        <div className="flex-1 h-px bg-[#e0e0e0]" />
      </div>

      {/* Social + Guest */}
      <div className="flex flex-col gap-3">
        <Button variant="secondary" fullWidth type="button">
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden>
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </Button>

        {/* Bypass — guest access */}
        <button
          type="button"
          onClick={handleGuest}
          className="w-full text-center text-sm text-[#666] hover:text-[#3949ab] transition-colors py-2 rounded-full border border-dashed border-[#e0e0e0] hover:border-[#3949ab]"
        >
          Continue as guest →
        </button>
      </div>

      {/* Footer */}
      <p className="text-center text-sm text-[#666]">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-[#3949ab] font-medium hover:underline">
          Create one
        </Link>
      </p>
    </div>
  );
}
