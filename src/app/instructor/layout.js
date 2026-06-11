"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { logout } from "../actions/auth";

export default function InstructorLayout({ children }) {
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

  const sidebarItems = [
    { name: "Overview", href: "/instructor/dashboard", icon: "dashboard" },
    { name: "Course Builder", href: "/instructor/course-builder", icon: "menu_book" },
    { name: "Students", href: "/instructor/students", icon: "group" },
    { name: "Analytics", href: "/instructor/analytics", icon: "monitoring" },
    { name: "Resources", href: "/instructor/resources", icon: "folder_open" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-on-surface font-sans flex overflow-hidden">
      {/* Desktop Side Navigation */}
      <aside className="hidden lg:flex flex-col h-screen w-64 fixed left-0 top-0 bg-surface-container-low border-r border-outline-variant p-md z-50">
        <div className="px-4 py-6 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-container rounded-lg flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
            </div>
            <span className="font-heading text-headline-sm text-primary font-extrabold tracking-tight">Instructor Portal</span>
          </div>
          <p className="text-[11px] text-on-surface-variant/70 font-semibold uppercase tracking-wider pl-1.5 mt-1">Lumina Learning</p>
        </div>

        <nav className="flex-grow space-y-xs">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                  isActive
                    ? "bg-primary-container text-on-primary-container font-bold scale-95"
                    : "text-on-surface-variant hover:bg-surface-container-highest"
                }`}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                  {item.icon}
                </span>
                <span className="text-sm font-semibold">{item.name}</span>
              </Link>
            );
          })}
          <div className="pt-6">
            <Link 
              href="/instructor/course-builder"
              className="block w-full bg-primary text-on-primary text-center py-3 rounded-xl font-bold text-xs hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20"
            >
              Create New Course
            </Link>
          </div>
        </nav>

        <div className="mt-auto flex flex-col gap-1 pt-4 border-t border-outline-variant/30">
          <button 
            onClick={async () => {
              await logout();
            }}
            className="w-full flex items-center gap-3 text-error hover:bg-error-container/15 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm text-left font-semibold cursor-pointer"
          >
            <span className="material-symbols-outlined text-error">logout</span>
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <div className="flex-grow flex flex-col min-h-screen lg:ml-64 relative overflow-hidden">
        {/* Sticky Header */}
        <header className="w-[calc(100%-2rem)] mx-auto sticky top-4 z-40 bg-white/70 dark:bg-[#12111a]/70 backdrop-blur-lg border border-white/30 dark:border-white/10 shadow-md dark:shadow-black/40 h-16 flex items-center rounded-2xl mt-4 transition-all">
          <div className="flex justify-between items-center w-full px-gutter max-w-container-max mx-auto">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-on-surface flex items-center justify-center hover:bg-slate-100 rounded-lg"
              >
                <span className="material-symbols-outlined">menu</span>
              </button>
              <span className="font-heading text-headline-sm font-bold text-primary">Lumina Learning</span>
            </div>

            <div className="flex items-center gap-4 lg:gap-8 flex-1 justify-end">
              <div className="hidden md:flex gap-6">
                <Link href="/instructor/dashboard" className={`font-semibold text-xs transition-colors duration-200 ${pathname === "/instructor/dashboard" ? "text-primary border-b-2 border-primary pb-1" : "text-on-surface-variant hover:text-primary"}`}>
                  Dashboard
                </Link>
                <Link href="/instructor/course-builder" className={`font-semibold text-xs transition-colors duration-200 ${pathname === "/instructor/course-builder" ? "text-primary border-b-2 border-primary pb-1" : "text-on-surface-variant hover:text-primary"}`}>
                  Course Builder
                </Link>
              </div>
              <div className="flex items-center gap-3 pl-4 border-l border-outline-variant">
                <button 
                  onClick={toggleDarkMode}
                  className="p-xs text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center shrink-0"
                  aria-label="Toggle dark mode"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {isDark ? "light_mode" : "dark_mode"}
                  </span>
                </button>
                <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors text-xl">notifications</button>
                <Link href="/instructor/settings" className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors text-xl">settings</Link>
                <Link href="/instructor/profile" className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant ml-2 cursor-pointer transition-transform hover:scale-105 block">
                  <img 
                    alt="Instructor Profile Avatar" 
                    className="w-full h-full object-cover" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA37JUm_TA9ZEcV3Ca87uUyU2QhtXHo07VQ_NGxB5dRIB8d7_tDU6E7DQ7rZ0LYr4xC1-7xmW0GO9PBJu5wJfK20lB-JmHvAs-t4otsNCVvyUhDv6en7VZQzUqNIzZWR1HeHUvPhkddpTVJSwcYFJK8cF7K6zbXsT63DtAYRLppCJhUmhLPmk57qQvPDkracq3juMKzhQNZRDazYIjNhvJQtm6uPqVIl1-oFAZE2A05gKqCovSVNPJ6S8RqZXycpy89Q0yAT7eaaGVG"
                  />
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-black/40 z-50 flex animate-in fade-in duration-200">
            <div className="w-64 bg-surface h-full p-md flex flex-col border-r border-outline-variant relative">
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="absolute right-4 top-4 p-1 rounded-full text-on-surface hover:bg-slate-100"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
              <div className="mb-lg flex items-center gap-2 pt-4 px-2">
                <span className="font-heading text-headline-sm text-primary font-bold">Lumina Portal</span>
              </div>
              <nav className="flex-1 space-y-1">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                      pathname === item.href
                        ? "bg-primary-container text-on-primary-container font-bold"
                        : "text-on-surface-variant hover:bg-surface-container-highest"
                    }`}
                  >
                    <span className="material-symbols-outlined">{item.icon}</span>
                    <span className="text-sm">{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex-grow" onClick={() => setMobileMenuOpen(false)}></div>
          </div>
        )}

        <div className="flex-grow w-full relative">
          {children}
        </div>
      </div>
    </div>
  );
}
