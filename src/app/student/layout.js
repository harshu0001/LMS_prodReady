"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function StudentLayout({ children }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const navItems = [
    { name: "Dashboard", href: "/student/dashboard", icon: "dashboard" },
    { name: "My Courses", href: "/student/courses/1", icon: "menu_book" },
    { name: "Quizzes", href: "/student/quizzes", icon: "task_alt" },
    { name: "Profile", href: "/student/profile", icon: "person" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-on-surface font-sans flex overflow-hidden">
      {/* Desktop Side Navigation */}
      <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-surface-container-lowest border-r border-outline-variant p-md z-50">
        <div className="mb-xl flex items-center gap-2 px-2">
          <div className="w-8 h-8 bg-primary-container rounded-lg flex items-center justify-center text-on-primary">
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
          </div>
          <span className="font-heading text-headline-sm text-primary font-extrabold tracking-tight">Lumina</span>
        </div>

        {/* User Card */}
        <div className="flex items-center gap-sm p-sm mb-lg bg-surface-container-low rounded-xl">
          <img 
            alt="Alex Johnson avatar" 
            className="w-10 h-10 rounded-full object-cover border border-outline-variant" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-_5YH1ryaziaoKwLR4HqkA35TmJuvlmA2B0_Enev6kFV_LX_V4ypUBRkpC10vrhU3cvb8WiqbRE9CnoAFHsb1uMcrO78VkRGLBYDuq5sWBI2CRRYpj9VB5hVpwRhdwWy8T6ZaNBXSzJCbIUII1E9UTL04X9SWLE1s6Up1v2AKFVVrTMKKXs_R9whD8bUAFANur8kKWNIirIyU8dHExSWXKSJqtZeFbxy_nBv8tLTJgzXDIpdDCebt7SOD32UDP4axykcX9aOSl84r"
          />
          <div>
            <p className="font-semibold text-sm text-on-surface leading-tight">Alex Johnson</p>
            <p className="text-[11px] text-on-surface-variant">Undergraduate</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow space-y-xs">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href) || (item.name === "Dashboard" && pathname === "/student/dashboard");
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-sm p-sm rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-primary-container text-on-primary-container font-bold"
                    : "text-on-surface-variant hover:bg-surface-container-low"
                }`}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                  {item.icon}
                </span>
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom utility links */}
        <div className="mt-auto space-y-xs pt-md border-t border-outline-variant/30">
          <Link href="/" className="flex items-center gap-sm p-sm text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-all text-sm">
            <span className="material-symbols-outlined">logout</span>
            <span>Landing Page</span>
          </Link>
          <Link href="/instructor/dashboard" className="flex items-center gap-sm p-sm text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-all text-sm">
            <span className="material-symbols-outlined">supervisor_account</span>
            <span>Instructor Portal</span>
          </Link>
          <Link href="/admin/dashboard" className="flex items-center gap-sm p-sm text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-all text-sm">
            <span className="material-symbols-outlined">admin_panel_settings</span>
            <span>Admin Portal</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <div className="flex-grow flex flex-col min-h-screen md:ml-64 relative overflow-hidden">
        {/* Desktop / Mobile Top Nav */}
        <header className="w-[calc(100%-2rem)] mx-auto sticky top-4 z-40 bg-white/70 dark:bg-[#12111a]/70 backdrop-blur-lg border border-white/30 dark:border-white/10 shadow-md dark:shadow-black/40 flex items-center h-16 rounded-2xl mt-4 transition-all">
          <div className="flex justify-between items-center w-full px-gutter max-w-container-max mx-auto">
            <div className="flex items-center gap-4">
              <span className="font-heading text-headline-sm text-primary font-bold md:hidden">Lumina</span>
              <div className="hidden md:flex items-center bg-surface-container-low px-sm py-1.5 rounded-full w-96 border border-outline-variant/20">
                <span className="material-symbols-outlined text-on-surface-variant mr-xs text-lg">search</span>
                <input 
                  className="bg-transparent border-none outline-none focus:ring-0 text-sm w-full placeholder-on-surface-variant/50" 
                  placeholder="Search courses, lessons, notes..." 
                  type="text"
                />
              </div>
            </div>
            <div className="flex items-center gap-sm">
              <button 
                onClick={toggleDarkMode}
                className="p-xs text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors flex items-center justify-center shrink-0"
                aria-label="Toggle dark mode"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isDark ? "light_mode" : "dark_mode"}
                </span>
              </button>
              <button className="material-symbols-outlined p-xs text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors relative">
                notifications
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
              </button>
              <button className="material-symbols-outlined p-xs text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors hidden sm:block">
                help
              </button>
              <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant cursor-pointer">
                <img 
                  alt="Student avatar" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-_5YH1ryaziaoKwLR4HqkA35TmJuvlmA2B0_Enev6kFV_LX_V4ypUBRkpC10vrhU3cvb8WiqbRE9CnoAFHsb1uMcrO78VkRGLBYDuq5sWBI2CRRYpj9VB5hVpwRhdwWy8T6ZaNBXSzJCbIUII1E9UTL04X9SWLE1s6Up1v2AKFVVrTMKKXs_R9whD8bUAFANur8kKWNIirIyU8dHExSWXKSJqtZeFbxy_nBv8tLTJgzXDIpdDCebt7SOD32UDP4axykcX9aOSl84r"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic portal viewport */}
        <div className="flex-1 w-full relative">
          {children}
        </div>

        {/* Mobile Bottom Navigation Bar */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-container-lowest border-t border-outline-variant/50 flex justify-around items-center py-2 px-md z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href) || (item.name === "Dashboard" && pathname === "/student/dashboard");
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all ${
                  isActive
                    ? "bg-primary-container text-on-primary-container font-bold scale-105"
                    : "text-on-surface-variant"
                }`}
              >
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                  {item.icon}
                </span>
                <span className="text-[10px] mt-0.5">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
