"use client";

import Link from "next/link";
import { useState, useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signup } from "../actions/auth";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [state, formAction, isPending] = useActionState(signup, null);

  useEffect(() => {
    if (state?.success && state?.redirectUrl) {
      window.location.href = state.redirectUrl;
    }
  }, [state]);


  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden bg-background text-on-surface font-sans">
      
      {/* Left Side: Interactive Branding & Visuals */}
      <section className="hidden md:flex md:w-1/2 relative bg-primary-container overflow-hidden items-center justify-center p-xl">
        <div className="relative z-10 w-full max-w-md text-on-primary">
          <div className="mb-lg">
            <Link href="/" className="inline-flex items-center justify-center p-sm bg-white/10 rounded-xl backdrop-blur-md mb-md border border-white/10 transition-transform hover:scale-105">
              <span className="material-symbols-outlined text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_stories
              </span>
            </Link>
            <h1 className="font-heading text-[48px] leading-tight font-extrabold mb-sm tracking-tight">
              Iladhyante Your Potential.
            </h1>
            <p className="text-lg leading-relaxed text-on-primary/80">
              Join 50,000+ educators and learners in a space designed for clarity, focus, and growth.
            </p>
          </div>

          {/* Bento-style Feature Highlight */}
          <div className="grid grid-cols-2 gap-md">
            <div className="p-md bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
              <span className="material-symbols-outlined mb-xs text-xl">school</span>
              <h3 className="font-heading text-sm font-semibold mb-xs">Expert Courses</h3>
              <p className="text-xs opacity-70">Curated by world-class instructors.</p>
            </div>
            <div className="p-md bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
              <span className="material-symbols-outlined mb-xs text-xl">auto_graph</span>
              <h3 className="font-heading text-sm font-semibold mb-xs">Track Progress</h3>
              <p className="text-xs opacity-70">Visual insights into your learning.</p>
            </div>
          </div>

          <div className="mt-xl flex items-center gap-sm">
            <div className="flex -space-x-2">
              <img 
                alt="User 1" 
                className="w-8 h-8 rounded-full border-2 border-primary-container object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuApKP6eRzF81TGJNRrKdUkcFnMrFcWZ9NoYzrEVI06avwdtLw8fhxMEtSr6l4M7XTK-D4HMPXk8dLa6ywNx4_8fXbRcLcqFCqQqq_99A7OcicpHbWOpS5v7wkqm-7BjYa2vZW1KbINxzSS5oAvSlXTESLx42t3vjPJG-8PheohoKj4ytBekgoynss-3Zeh9q5W9HQbZnCK32lYaeDr7dqvkaufVyxn66_n7KP4qH8RklsXg7rtfZ1ObbCGuldHqtUWMFUB-oCD9t0rZ"
              />
              <img 
                alt="User 2" 
                className="w-8 h-8 rounded-full border-2 border-primary-container object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1k2MP7DTU5l4PeNkxZDi-q9qpFUDoEpBZpOfc6CyLCISNvJO8tzsv4QMuDJyfM75uiWfcnfCkLVYuHoAx6pxge1eGZdj9OSM67mhR6vonBkG-fhApVEg38lsOtGYLLA6z_GrzC8WJOPfc8-8Rp8kpne_l2O8xqHg5htCreZg2ADTAbsX69CD6gdzLATiR7oqNvD82boY1v143q5W-CgoruFPN0dWJHHTeW9_IujbLZQmTAk86uYVR5shvEf3zxakRq57c6d-UwVCN"
              />
              <img 
                alt="User 3" 
                className="w-8 h-8 rounded-full border-2 border-primary-container object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuALVpVPPPU9jHgYsZMH7C_skI949Kg0pOq1uaJsiEigXWGkDXV21Okw5-6ecYEUpxOg0gGBJLekIRNp4eTHs1RcSEU3N9_rdllbyFHNzQwcE1BuadbF31Yaba7XCO82L2MJbkyoPJUfej5RBVJZSQAVclkj4nchVoJw6fQwWXuOuX0ReCmNH2FMs9cB6O32S9i7QqQDzzZ6-xCbXAUZ0stNCmt5VmsuL2n4krkT3tEbj3c7QZXdyxDkrvKxkTmwD221TmMRfSZgm5SM"
              />
            </div>
            <p className="text-xs font-medium opacity-80">Trusted by over 100+ institutions worldwide.</p>
          </div>
        </div>

        {/* Decorative Ambient Elements */}
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-24 right-12 w-48 h-48 bg-secondary rounded-full blur-3xl opacity-20"></div>
      </section>

      {/* Right Side: Signup Form */}
      <main className="w-full md:w-1/2 flex items-center justify-center p-gutter bg-surface overflow-y-auto">
        <div className="w-full max-w-[440px] space-y-xl py-lg">
          
          {/* Header */}
          <div className="text-center md:text-left">
            <div className="md:hidden inline-block mb-md">
              <span className="font-heading text-headline-md text-primary font-bold">Adhyan Learning</span>
            </div>
            <h2 className="font-heading text-[28px] font-bold text-on-surface mb-xs">Create your account</h2>
            <p className="text-sm text-on-surface-variant">
              Already have an account?{" "}
              <Link className="text-primary font-semibold hover:underline" href="/login">
                Sign In
              </Link>
            </p>
          </div>

          {/* Signup Form */}
          <form action={formAction} className="space-y-md">
            {state?.error && (
              <div className="p-3 text-xs font-bold text-error bg-error-container/20 rounded-xl border border-error/25">
                {state.error}
              </div>
            )}
            {/* Full Name */}
            <div className="space-y-xs">
              <label className="text-xs font-bold text-on-surface-variant block" htmlFor="full_name">
                Full Name
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors">
                  person
                </span>
                <input 
                  className="w-full pl-[44px] pr-md py-md bg-surface-container-lowest border border-outline-variant rounded-xl text-sm text-on-surface placeholder:text-outline-variant focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" 
                  id="full_name" 
                  name="fullName"
                  placeholder="John Doe" 
                  required 
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-xs">
              <label className="text-xs font-bold text-on-surface-variant block" htmlFor="email">
                Email Address
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors">
                  mail
                </span>
                <input 
                  className="w-full pl-[44px] pr-md py-md bg-surface-container-lowest border border-outline-variant rounded-xl text-sm text-on-surface placeholder:text-outline-variant focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" 
                  id="email" 
                  name="email"
                  placeholder="john@example.com" 
                  required 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-xs">
              <label className="text-xs font-bold text-on-surface-variant block" htmlFor="password">
                Password
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors">
                  lock
                </span>
                <input 
                  className="w-full pl-[44px] pr-[44px] py-md bg-surface-container-lowest border border-outline-variant rounded-xl text-sm text-on-surface placeholder:text-outline-variant focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" 
                  id="password" 
                  name="password"
                  placeholder="••••••••" 
                  required 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  className="absolute right-sm top-1/2 -translate-y-1/2 text-outline-variant hover:text-on-surface-variant transition-colors flex items-center justify-center" 
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
              <p className="text-[10px] text-on-surface-variant/60 font-semibold">Minimum 8 characters with at least one number.</p>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 py-xs">
              <div className="flex items-center h-5">
                <input 
                  className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20 transition-all cursor-pointer accent-primary bg-surface-container-lowest" 
                  id="terms" 
                  required 
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
              </div>
              <label className="text-xs text-on-surface-variant cursor-pointer select-none leading-relaxed" htmlFor="terms">
                I agree to the <Link className="text-primary font-semibold hover:underline" href="#">Terms of Service</Link> and <Link className="text-primary font-semibold hover:underline" href="#">Privacy Policy</Link>.
              </label>
            </div>

            {/* Submit Button */}
            <button 
              className="w-full py-md bg-primary text-on-primary rounded-xl font-bold hover:brightness-110 active:scale-[0.98] transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed" 
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center py-md">
            <div className="flex-grow border-t border-outline-variant/30"></div>
            <span className="flex-shrink mx-sm text-[10px] text-outline font-bold uppercase tracking-widest">Or sign up with</span>
            <div className="flex-grow border-t border-outline-variant/30"></div>
          </div>

          {/* Social Signup */}
          <div className="grid grid-cols-2 gap-md">
            <button className="flex items-center justify-center gap-2 py-sm bg-surface-container-lowest border border-outline-variant rounded-xl text-xs font-bold text-on-surface-variant hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-sm bg-surface-container-lowest border border-outline-variant rounded-xl text-xs font-bold text-on-surface-variant hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <svg className="w-5 h-5 fill-current text-[#1877F2]" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
              </svg>
              Facebook
            </button>
          </div>

          {/* Footer */}
          <footer className="pt-xl text-center md:text-left">
            <p className="text-xs font-medium text-on-surface-variant/60">
              © 2026 Adhyan Learning. All rights reserved.
            </p>
          </footer>
        </div>
      </main>

    </div>
  );
}
