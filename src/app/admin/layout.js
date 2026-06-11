"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function AdminLayout({ children }) {
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
    { name: "Overview", href: "/admin/dashboard", icon: "dashboard" },
    { name: "Teacher Management", href: "#", icon: "school" },
    { name: "Student Management", href: "#", icon: "group" },
    { name: "Batches", href: "#", icon: "layers" },
    { name: "Settings", href: "#", icon: "settings" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-on-surface font-sans flex overflow-hidden">
      {/* Desktop Side Navigation */}
      <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-surface-container-lowest border-r border-outline-variant p-md z-50">
        <div className="mb-xl px-2">
          <h1 className="font-heading text-headline-sm font-bold text-primary">Lumina Learning</h1>
          <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mt-0.5">Admin Portal</p>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow space-y-xs">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
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
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
          
          <div className="pt-sm">
            <button className="w-full bg-primary text-on-primary py-3 px-4 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-md shadow-primary/10">
              <span className="material-symbols-outlined text-sm">add_circle</span>
              Create New Batch
            </button>
          </div>
        </nav>

        {/* Bottom portal switcher links */}
        <div className="mt-auto space-y-xs pt-md border-t border-outline-variant/30">
          <Link href="/" className="flex items-center gap-sm p-sm text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-all text-sm">
            <span className="material-symbols-outlined">home</span>
            <span>Landing Page</span>
          </Link>
          <Link href="/student/dashboard" className="flex items-center gap-sm p-sm text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-all text-sm">
            <span className="material-symbols-outlined">school</span>
            <span>Student Dashboard</span>
          </Link>
          <Link href="/instructor/dashboard" className="flex items-center gap-sm p-sm text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-all text-sm">
            <span className="material-symbols-outlined">supervisor_account</span>
            <span>Instructor Portal</span>
          </Link>
          <button 
            onClick={async () => {
              const { logout } = await import("../actions/auth");
              await logout();
            }}
            className="w-full flex items-center gap-sm p-sm text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-all text-sm text-left font-medium"
          >
            <span className="material-symbols-outlined">logout</span>
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <div className="flex-grow flex flex-col min-h-screen md:ml-64 relative overflow-hidden">
        {/* Sticky Capsule Header */}
        <header className="w-[calc(100%-2rem)] mx-auto sticky top-4 z-40 bg-white/70 dark:bg-[#12111a]/70 backdrop-blur-lg border border-white/30 dark:border-white/10 shadow-md dark:shadow-black/40 flex items-center h-16 rounded-2xl mt-4 transition-all">
          <div className="flex justify-between items-center w-full px-gutter max-w-container-max mx-auto">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-on-surface flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                <span className="material-symbols-outlined">menu</span>
              </button>
              <span className="font-heading text-headline-sm text-primary font-bold md:hidden">Lumina Admin</span>
              
              <div className="hidden md:flex items-center bg-surface-container-low px-sm py-1.5 rounded-full w-96 border border-outline-variant/20">
                <span className="material-symbols-outlined text-on-surface-variant mr-xs text-lg">search</span>
                <input 
                  className="bg-transparent border-none outline-none focus:ring-0 text-sm w-full placeholder-on-surface-variant/50" 
                  placeholder="Search resources, students, batches..." 
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
              
              <div className="h-8 w-[1px] bg-outline-variant/30 mx-1"></div>

              <div className="flex items-center gap-2">
                <div className="text-right hidden sm:block">
                  <p className="font-semibold text-xs text-on-surface leading-tight">Admin User</p>
                  <p className="text-[9px] text-on-surface-variant">System Administrator</p>
                </div>
                <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant cursor-pointer transition-transform hover:scale-105">
                  <img 
                    alt="Admin Avatar" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3narIT8QCo06cBwiB1AMUgxssgnoqWpP8IVtyMFARtSe3je6QpNSijTAxpg2KZE2tDJxF2JSdglAHTiUEZZXQlmzeoRNbdSin6cqAZN4msbhr8jQIrBycLeUdV42gH-L-0CjYd0w9TOhSwW6Z6GIvcJH5GCR-qguSn6mtSRa2Do7tbDtCKVGDjtV8LR6Z8iMiblI4ldkoOHi391hssM2MYiz9tKqMAB636EAm5n1w1hthHaRe47xq99QgZeu2GkPWRztMVdiCuUYw"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div 
              className="w-64 h-full bg-surface-container-lowest p-md flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-lg px-2">
                <div>
                  <h1 className="font-heading text-headline-sm font-bold text-primary">Lumina Admin</h1>
                  <p className="text-[10px] text-on-surface-variant font-bold uppercase mt-0.5">Mobile Menu</p>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="material-symbols-outlined p-xs hover:bg-surface-container-low rounded-full"
                >
                  close
                </button>
              </div>
              <nav className="space-y-xs flex-grow">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-sm p-sm rounded-lg transition-all ${
                        isActive
                          ? "bg-primary-container text-on-primary-container font-bold"
                          : "text-on-surface-variant hover:bg-surface-container-low"
                      }`}
                    >
                      <span className="material-symbols-outlined">{item.icon}</span>
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
              <div className="pt-md border-t border-outline-variant/30 space-y-xs">
                <Link href="/" className="flex items-center gap-sm p-sm text-on-surface-variant rounded-lg text-sm">
                  <span className="material-symbols-outlined">logout</span>
                  <span>Landing Page</span>
                </Link>
                <Link href="/student/dashboard" className="flex items-center gap-sm p-sm text-on-surface-variant rounded-lg text-sm">
                  <span className="material-symbols-outlined">school</span>
                  <span>Student Portal</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic portal viewport */}
        <div className="flex-1 w-full relative">
          {children}
        </div>
      </div>
    </div>
  );
}
