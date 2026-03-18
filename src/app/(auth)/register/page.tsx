"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

type Errors = { name?: string; email?: string; password?: string; confirm?: string };

export default function RegisterPage() {
  const router = useRouter();
  const { register, loginAsGuest, state } = useAuth();

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [agreed, setAgreed] = useState(false);

  const loading = state.status === "loading";

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function validate(): Errors {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.email) e.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.password) e.password = "Password is required.";
    else if (form.password.length < 8) e.password = "Password must be at least 8 characters.";
    if (!form.confirm) e.confirm = "Please confirm your password.";
    else if (form.confirm !== form.password) e.confirm = "Passwords do not match.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    await register(form.name, form.email, form.password);
    router.push("/");
  }

  function handleGuest() {
    loginAsGuest();
    router.push("/");
  }

  // Password strength
  function strength(pw: string) {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  }
  const pwStr = strength(form.password);
  const strLabel = ["", "Weak", "Fair", "Good", "Strong"][pwStr];
  const strColor = ["", "bg-red-400", "bg-amber-400", "bg-yellow-400", "bg-green-500"][pwStr];
  const strText  = ["", "text-red-500", "text-amber-500", "text-yellow-600", "text-green-600"][pwStr];

  return (
    <div className="bg-white rounded-2xl shadow-[0px_6px_24px_0px_rgba(0,0,0,0.08)] p-10 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-[#00194c] text-[32px] font-bold leading-9">Create your account</h2>
        <p className="text-[#666] text-base leading-5">
          Start sharing your testimony and inspire believers worldwide.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <Input id="name" type="text" label="Full name" placeholder="Jane Doe"
          value={form.name} onChange={set("name")} error={errors.name} autoComplete="name" />

        <Input id="email" type="email" label="Email address" placeholder="you@example.com"
          value={form.email} onChange={set("email")} error={errors.email} autoComplete="email" />

        {/* Password + strength */}
        <div className="flex flex-col gap-2">
          <Input id="password" type="password" label="Password" placeholder="Min. 8 characters"
            value={form.password} onChange={set("password")} error={errors.password} autoComplete="new-password" />
          {form.password.length > 0 && (
            <div className="flex items-center gap-3">
              <div className="flex gap-1 flex-1">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className={`flex-1 h-1 rounded-full transition-colors ${n <= pwStr ? strColor : "bg-[#e0e0e0]"}`} />
                ))}
              </div>
              <span className={`text-xs font-medium ${strText}`}>{strLabel}</span>
            </div>
          )}
        </div>

        <Input id="confirm" type="password" label="Confirm password" placeholder="Re-enter your password"
          value={form.confirm} onChange={set("confirm")} error={errors.confirm} autoComplete="new-password" />

        {/* Terms */}
        <label className="flex items-start gap-3 cursor-pointer">
          <div className="relative mt-0.5 shrink-0">
            <input type="checkbox" className="peer sr-only" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
            <div className="w-5 h-5 rounded border border-[#858585] peer-checked:bg-[#3949ab] peer-checked:border-[#3949ab] transition-colors flex items-center justify-center">
              {agreed && (
                <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          </div>
          <span className="text-sm text-[#666] leading-5">
            I agree to the{" "}
            <Link href="#" className="text-[#3949ab] hover:underline">Terms of Service</Link>
            {" "}and{" "}
            <Link href="#" className="text-[#3949ab] hover:underline">Community Guidelines</Link>
          </span>
        </label>

        <Button type="submit" fullWidth disabled={loading || !agreed}>
          {loading ? "Creating account…" : "Create Account"}
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
        Already have an account?{" "}
        <Link href="/login" className="text-[#3949ab] font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
