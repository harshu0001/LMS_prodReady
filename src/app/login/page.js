"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedEmail = email.toLowerCase().trim();
    const trimmedPassword = password.trim();
    
    console.log("Attempting login with:", { email: trimmedEmail, password: trimmedPassword });
    
    if (trimmedEmail === "boss@lms.in" && trimmedPassword === "boss@password") {
      router.push("/admin/dashboard");
    } else if (trimmedEmail === "teacher@lms.in" && trimmedPassword === "teacher@password") {
      router.push("/instructor/dashboard");
    } else {
      router.push("/student/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-sans flex items-center justify-center p-4 md:p-lg">
      {/* Auth Container */}
      <main className="w-full max-w-[1100px] bg-surface-container-lowest rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-xl border border-outline-variant/30 h-auto md:h-[720px]">
        
        {/* Left Side: Visual Branding */}
        <section className="hidden md:flex md:w-[45%] relative bg-primary-fixed overflow-hidden items-center justify-center p-xl">
          <div className="relative z-10 text-center flex flex-col items-center">
            <Link href="/" className="mb-lg inline-flex items-center justify-center w-20 h-20 bg-surface/40 backdrop-blur-md rounded-xl border border-white/40 shadow-md transition-transform hover:scale-105">
              <span className="material-symbols-outlined text-[44px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                lightbulb
              </span>
            </Link>
            <h1 className="font-heading text-[32px] font-extrabold text-on-primary-fixed leading-tight mb-md">
              Ignite Your Potential.
            </h1>
            <p className="text-sm text-on-secondary-fixed-variant mb-xl max-w-[280px] leading-relaxed">
              Join thousands of learners discovering world-class courses.
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-sm w-full max-w-[320px]">
              <div className="glass-card p-md rounded-xl flex flex-col items-center justify-center transition-all hover:scale-105">
                <span className="material-symbols-outlined text-primary mb-xs">auto_stories</span>
                <span className="text-xs font-bold text-on-primary-fixed">120+ Courses</span>
              </div>
              <div className="glass-card p-md rounded-xl flex flex-col items-center justify-center transition-all hover:scale-105">
                <span className="material-symbols-outlined text-primary mb-xs">groups</span>
                <span className="text-xs font-bold text-on-primary-fixed">Expert Mentors</span>
              </div>
            </div>
          </div>
          
          {/* Subtle Background Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              alt="Atmospheric brand image" 
              className="w-full h-full object-cover opacity-15 mix-blend-overlay" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOayD6mLBA6-wptgpOWOjHU8UBEns2iTtfJWjGSPoxBkex-kVkdE1cb31VRav1RjxiwxlNBm8m6irtHyuMkv_7nEb78Q4duXM87E-dp6zuRixVtpc8RJBC1UVLynXtmh3QOvP8FMOIK9LLxdvxwRZQpPpxotcaZQ8UnyOb8m5OfKIjNWwItouAv0RRWA0ddhR2ejUb9tBNYgAgV2hWmihTiEBiix5DeQM5b53RiA-HnZ6hGBIEDymcVKT4KtNBgJ3nfnfN7u3paKx-"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-fixed/80 to-transparent"></div>
          </div>
        </section>

        {/* Right Side: Login Form */}
        <section className="w-full md:w-[55%] flex flex-col relative bg-surface-container-lowest">
          <div className="flex-grow flex flex-col justify-center items-center p-gutter lg:p-xl">
            <div className="w-full max-w-[380px]">
              
              {/* Mobile Logo Area */}
              <div className="mb-lg text-center md:text-left flex items-center justify-center md:justify-start gap-2">
                <span className="material-symbols-outlined text-primary text-[32px] md:hidden" style={{ fontVariationSettings: "'FILL' 1" }}>
                  lightbulb
                </span>
                <span className="font-heading text-headline-sm text-primary font-bold md:hidden">Lumina Learning</span>
              </div>

              <div className="mb-lg text-center md:text-left">
                <h2 className="font-heading text-[28px] font-bold text-on-surface mb-2">Welcome Back</h2>
                <p className="text-xs text-secondary">Please enter your details to sign in.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-md">
                {/* Email Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant block" htmlFor="email">
                    Email Address
                  </label>
                  <div className="relative">
                    <input 
                      className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl text-sm text-on-surface placeholder:text-outline-variant focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" 
                      id="email" 
                      name="email" 
                      placeholder="name@company.com" 
                      required 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant text-[20px]">
                      mail
                    </span>
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-on-surface-variant block" htmlFor="password">
                      Password
                    </label>
                    <Link className="text-[11px] font-semibold text-primary hover:underline" href="#">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input 
                      className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl text-sm text-on-surface placeholder:text-outline-variant focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" 
                      id="password" 
                      name="password" 
                      placeholder="••••••••" 
                      required 
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button 
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant hover:text-primary transition-colors flex items-center justify-center" 
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center">
                  <input 
                    className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary/20 bg-surface-container-lowest cursor-pointer accent-primary" 
                    id="remember" 
                    name="remember" 
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label className="ml-2 text-xs font-medium text-secondary cursor-pointer" htmlFor="remember">
                    Remember me for 30 days
                  </label>
                </div>

                {/* Submit Button */}
                <button 
                  className="w-full py-3.5 bg-primary text-on-primary font-bold rounded-xl hover:brightness-110 active:scale-[0.99] transition-all shadow-md" 
                  type="submit"
                >
                  Log In
                </button>
              </form>

              {/* Divider */}
              <div className="my-lg flex items-center gap-2">
                <div className="flex-grow h-[1px] bg-outline-variant/30"></div>
                <span className="text-[10px] text-outline font-bold uppercase tracking-widest">Or continue with</span>
                <div className="flex-grow h-[1px] bg-outline-variant/30"></div>
              </div>

              {/* Social Logins */}
              <div className="grid grid-cols-2 gap-sm">
                <button className="flex items-center justify-center gap-2 py-2.5 border border-outline-variant rounded-xl bg-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 1.18-4.53z" fill="#EA4335"></path>
                  </svg>
                  <span className="text-xs font-bold text-on-surface-variant">Google</span>
                </button>
                <button className="flex items-center justify-center gap-2 py-2.5 border border-outline-variant rounded-xl bg-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <svg className="w-5 h-5 text-[#0077B5]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                  </svg>
                  <span className="text-xs font-bold text-on-surface-variant">LinkedIn</span>
                </button>
              </div>

              <p className="mt-lg text-center text-xs font-medium text-secondary">
                Don't have an account?{" "}
                <Link className="text-primary font-bold hover:underline" href="/signup">
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>

          {/* Integrated Footer */}
          <footer className="w-full py-6 px-gutter border-t border-outline-variant/20 bg-surface-container-low/30">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-[500px] mx-auto md:max-w-none">
              <div>
                <p className="text-[10px] font-bold text-secondary/60">© 2026 Lumina Learning.</p>
              </div>
              <nav className="flex flex-wrap justify-center gap-4">
                <Link className="text-[10px] font-bold text-secondary/70 hover:text-primary transition-colors" href="#">
                  Privacy
                </Link>
                <Link className="text-[10px] font-bold text-secondary/70 hover:text-primary transition-colors" href="#">
                  Terms
                </Link>
                <Link className="text-[10px] font-bold text-secondary/70 hover:text-primary transition-colors" href="#">
                  Help
                </Link>
              </nav>
            </div>
          </footer>
        </section>

      </main>
    </div>
  );
}
