"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
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

  return (
    <div className="min-h-screen bg-background text-on-surface font-sans selection:bg-primary-container selection:text-on-primary-container flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white/60 dark:bg-[#12111a]/70 backdrop-blur-lg shadow-md dark:shadow-black/40 sticky top-4 z-50 h-20 flex justify-between items-center px-lg w-[calc(100%-2rem)] max-w-container-max mx-auto rounded-full border border-white/40 dark:border-white/10 transition-all mt-4">
        <div className="flex items-center gap-2">
          <span className="font-heading text-headline-md text-primary font-bold">Crashup Learning</span>
        </div>
        <nav className="hidden md:flex items-center gap-lg">
          <Link href="#features" className="font-medium text-secondary hover:text-primary transition-colors duration-200">
            Features
          </Link>
          <Link href="#personas" className="font-medium text-secondary hover:text-primary transition-colors duration-200">
            Portals
          </Link>
          <Link href="#pricing" className="font-medium text-secondary hover:text-primary transition-colors duration-200">
            Pricing
          </Link>
          <Link href="#faq" className="font-medium text-secondary hover:text-primary transition-colors duration-200">
            FAQ
          </Link>
        </nav>
        <div className="flex items-center gap-md">
          <button 
            onClick={toggleDarkMode}
            className="p-2 text-secondary hover:text-primary rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center shrink-0"
            aria-label="Toggle dark mode"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isDark ? "light_mode" : "dark_mode"}
            </span>
          </button>
          <Link href="/login" className="font-semibold text-secondary hover:text-primary transition-opacity active:opacity-80">
            Log In
          </Link>
          <Link href="/signup" className="bg-primary text-on-primary px-md py-xs rounded-lg font-semibold hover:bg-primary-container transition-all shadow-md active:scale-95">
            Get Started
          </Link>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-xl pb-32 overflow-hidden">
          <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
            <div className="space-y-md relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-label-sm font-semibold">
                <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                The Future of Digital Education
              </div>
              <h1 className="font-heading text-[36px] md:text-[48px] text-on-surface leading-tight font-extrabold">
                Master Physics for <span className="text-primary">JEE & NEET</span>
              </h1>
              <p className="text-lg text-secondary max-w-lg leading-relaxed">
                Crashup is the ultimate physics learning platform for Class 10th-12th, JEE, and NEET students in India.
              </p>
              <div className="flex flex-col sm:flex-row gap-md pt-xs">
                <Link href="/signup" className="bg-primary text-on-primary px-xl py-md rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-container transition-all shadow-lg active:scale-95">
                  Get Started
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
                <Link href="/student/courses/1" className="bg-surface-container-low text-secondary px-xl py-md rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-surface-container-high transition-all active:scale-95 border border-outline-variant/30">
                  Watch Demo
                </Link>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary-fixed opacity-20 rounded-[2rem] blur-3xl group-hover:opacity-30 transition-opacity"></div>
              <div className="relative rounded-[2rem] overflow-hidden border border-slate-200 shadow-2xl">
                <img 
                  alt="Modern learning workspace" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlNeIi-xwu8qoL7E-cnceJcfeHx2ybBC3-3-YQFrLAzEHddgWjXTAPQ_IBLbeBLu_6dCMo4gWFBLEIP5p0nu3rN1WsBXFXnnQGsLNYf9ZHxSf7fAdOGUPTvlpvQA2y7NK32n6PE5YroJctwJS7wjW4FiJzaEx1JS1Qnv4Xix3Cc3eFaYoDfOm0YTDgpiIg58PFunUoHBP1gCEisfuDOLN1mz3TywJHCKZClPP6zA2od0kMDvZ0P_J-upnLzihcsEcJKRboo3fN9mRB"
                />
              </div>
              {/* Floating Stat Cards for Aesthetic */}
              <div className="absolute -bottom-6 -left-6 bg-white/75 backdrop-blur-md border border-white/30 p-sm rounded-xl shadow-xl flex items-center gap-3 animate-bounce">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface">85% Completion</p>
                  <p className="text-[10px] text-secondary">Average Course Rate</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-surface-container-lowest border-y border-outline-variant/20 py-lg">
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-lg text-center">
              <div>
                <p className="font-heading text-headline-md text-primary font-bold">10k+</p>
                <p className="text-xs text-secondary uppercase tracking-widest font-semibold mt-1">Courses</p>
              </div>
              <div>
                <p className="font-heading text-headline-md text-primary font-bold">50k+</p>
                <p className="text-xs text-secondary uppercase tracking-widest font-semibold mt-1">Students</p>
              </div>
              <div>
                <p className="font-heading text-headline-md text-primary font-bold">4.9/5</p>
                <p className="text-xs text-secondary uppercase tracking-widest font-semibold mt-1">User Rating</p>
              </div>
              <div>
                <p className="font-heading text-headline-md text-primary font-bold">24/7</p>
                <p className="text-xs text-secondary uppercase tracking-widest font-semibold mt-1">Expert Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section id="features" className="py-xl bg-surface-bright">
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="text-center mb-xl">
              <h2 className="font-heading text-[32px] text-on-surface mb-xs font-bold">Designed for Modern Learning</h2>
              <p className="text-secondary max-w-2xl mx-auto">Powerful features tailored to bridge the gap between education and technology.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
              {/* Feature 1 */}
              <div className="bg-white/50 backdrop-blur-md p-lg rounded-3xl border border-white/40 soft-ui-shadow-hover">
                <div className="w-12 h-12 bg-primary-fixed text-primary rounded-2xl flex items-center justify-center mb-md">
                  <span className="material-symbols-outlined text-[28px]">interactive_space</span>
                </div>
                <h3 className="font-heading text-headline-sm text-on-surface mb-xs font-semibold">Interactive Lessons</h3>
                <p className="text-sm text-secondary leading-relaxed">Break free from static slides. Our immersive lesson player supports 3D models, code sandboxes, and branching logic.</p>
              </div>
              {/* Feature 2 */}
              <div className="bg-white/50 backdrop-blur-md p-lg rounded-3xl border border-white/40 soft-ui-shadow-hover">
                <div className="w-12 h-12 bg-secondary-container text-on-secondary-container rounded-2xl flex items-center justify-center mb-md">
                  <span className="material-symbols-outlined text-[28px]">query_stats</span>
                </div>
                <h3 className="font-heading text-headline-sm text-on-surface mb-xs font-semibold">Real-time Analytics</h3>
                <p className="text-sm text-secondary leading-relaxed">Monitor progress at a glance. Identify struggling students instantly and optimize course delivery with live heatmaps.</p>
              </div>
              {/* Feature 3 */}
              <div className="bg-white/50 backdrop-blur-md p-lg rounded-3xl border border-white/40 soft-ui-shadow-hover">
                <div className="w-12 h-12 bg-tertiary-fixed text-tertiary rounded-2xl flex items-center justify-center mb-md">
                  <span className="material-symbols-outlined text-[28px]">diversity_3</span>
                </div>
                <h3 className="font-heading text-headline-sm text-on-surface mb-xs font-semibold">Collaborative Tools</h3>
                <p className="text-sm text-secondary leading-relaxed">Foster community with built-in discussion boards, peer review systems, and real-time group projects.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Persona Teasers */}
        <section id="personas" className="py-xl">
          <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 lg:grid-cols-2 gap-lg">
            {/* For Students */}
            <div className="relative group h-full">
              <div className="absolute inset-0 bg-primary/5 rounded-[2.5rem] transform group-hover:scale-[1.02] transition-transform duration-500"></div>
              <div className="relative p-lg md:p-xl flex flex-col h-full">
                <h3 className="font-heading text-headline-md text-on-surface mb-sm font-bold">For Students</h3>
                <p className="text-secondary mb-lg">Unlock personalized learning paths that adapt to your pace. Track your badges, certificates, and skills in a single, beautiful dashboard.</p>
                <ul className="space-y-sm mb-lg flex-grow">
                  <li className="flex items-center gap-xs text-sm text-on-surface-variant font-medium">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    Adaptive Learning Paths
                  </li>
                  <li className="flex items-center gap-xs text-sm text-on-surface-variant font-medium">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    Digital Badge Portfolio
                  </li>
                  <li className="flex items-center gap-xs text-sm text-on-surface-variant font-medium">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    Mobile-First Lesson Player
                  </li>
                </ul>
                <Link href="/student/dashboard" className="inline-flex items-center gap-2 text-primary font-bold hover:underline decoration-2 underline-offset-4">
                  Go to Student Dashboard
                  <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                </Link>
              </div>
            </div>
            {/* For Teachers */}
            <div className="relative group h-full">
              <div className="absolute inset-0 bg-secondary-container/20 rounded-[2.5rem] transform group-hover:scale-[1.02] transition-transform duration-500"></div>
              <div className="relative p-lg md:p-xl flex flex-col h-full">
                <h3 className="font-heading text-headline-md text-on-surface mb-sm font-bold">For Teachers</h3>
                <p className="text-secondary mb-lg">Build complex courses in minutes with our drag-and-drop editor. Automate grading and feedback to spend more time mentoring.</p>
                <ul className="space-y-sm mb-lg flex-grow">
                  <li className="flex items-center gap-xs text-sm text-on-surface-variant font-medium">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    AI-Assisted Course Creator
                  </li>
                  <li className="flex items-center gap-xs text-sm text-on-surface-variant font-medium">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    Advanced Grading Rubrics
                  </li>
                  <li className="flex items-center gap-xs text-sm text-on-surface-variant font-medium">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    Student Engagement Heatmaps
                  </li>
                </ul>
                <Link href="/instructor/dashboard" className="inline-flex items-center gap-2 text-primary font-bold hover:underline decoration-2 underline-offset-4">
                  Go to Instructor Portal
                  <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-xl bg-surface-bright border-t border-outline-variant/20">
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="text-center mb-xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary-fixed text-primary rounded-full text-label-sm font-semibold mb-4">
                <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span>
                Simple & Transparent Pricing
              </span>
              <h2 className="font-heading text-[32px] md:text-[40px] text-on-surface mb-sm font-bold tracking-tight">Flexible Plans for Every Learner</h2>
              <p className="text-secondary max-w-xl mx-auto mb-lg text-sm">Choose the plan that fits your educational journey. Upgrades are immediate and flexible.</p>
              
              {/* Billing Toggle */}
              <div className="inline-flex items-center gap-sm bg-surface-container p-1 rounded-full border border-outline-variant/60 shadow-inner">
                <button 
                  onClick={() => setIsAnnual(false)} 
                  className={`px-lg py-2 rounded-full text-xs font-bold transition-all ${!isAnnual ? "bg-surface-container-lowest text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"}`}
                >
                  Monthly
                </button>
                <button 
                  onClick={() => setIsAnnual(true)} 
                  className={`px-lg py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${isAnnual ? "bg-surface-container-lowest text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"}`}
                >
                  <span>Annually</span>
                  <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] rounded font-extrabold uppercase">Save 20%</span>
                </button>
              </div>
            </div>

            {/* Pricing Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg max-w-5xl mx-auto">
              {/* Plan 1: Starter */}
              <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-[2rem] p-lg flex flex-col justify-between shadow-sm hover:shadow-md transition-all hover:scale-[1.01] duration-300 relative overflow-hidden group">
                <div>
                  <div className="flex justify-between items-start mb-md">
                    <div>
                      <h3 className="font-heading text-headline-sm font-bold text-on-surface group-hover:text-primary transition-colors">Starter</h3>
                      <p className="text-[11px] text-on-surface-variant mt-1 leading-tight">For individuals starting out.</p>
                    </div>
                    <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">school</span>
                  </div>
                  <div className="my-lg">
                    <span className="font-heading text-[40px] font-extrabold text-on-surface">₹0</span>
                    <span className="text-xs text-on-surface-variant font-semibold"> / month</span>
                  </div>
                  <ul className="space-y-sm text-xs font-medium text-on-surface-variant border-t border-outline-variant/30 pt-lg">
                    <li className="flex items-center gap-xs">
                      <span className="material-symbols-outlined text-primary text-sm">check</span>
                      Access to 3 free starter courses
                    </li>
                    <li className="flex items-center gap-xs">
                      <span className="material-symbols-outlined text-primary text-sm">check</span>
                      Standard video player
                    </li>
                    <li className="flex items-center gap-xs">
                      <span className="material-symbols-outlined text-primary text-sm">check</span>
                      Digital completion badge
                    </li>
                    <li className="flex items-center gap-xs text-outline/50 line-through">
                      <span className="material-symbols-outlined text-outline/50 text-sm">close</span>
                      Advanced analytics &amp; tools
                    </li>
                  </ul>
                </div>
                <Link href="/signup" className="block text-center w-full mt-xl py-3 border border-primary text-primary font-bold rounded-xl text-xs hover:bg-primary hover:text-on-primary transition-all active:scale-95 shadow-sm">
                  Get Started Free
                </Link>
              </div>

              {/* Plan 2: Pro (Best Value) */}
              <div className="bg-white border-2 border-primary rounded-[2.2rem] p-lg flex flex-col justify-between shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-on-primary text-[10px] font-extrabold px-4 py-1 rounded-bl-xl uppercase tracking-wider">
                  Popular
                </div>
                <div>
                  <div className="flex justify-between items-start mb-md">
                    <div>
                      <h3 className="font-heading text-headline-sm font-bold text-primary">Pro Academy</h3>
                      <p className="text-[11px] text-on-surface-variant mt-1 leading-tight">Complete access with certificates.</p>
                    </div>
                    <span className="material-symbols-outlined text-primary">local_fire_department</span>
                  </div>
                  <div className="my-lg">
                    <span className="font-heading text-[40px] font-extrabold text-on-surface">
                      ₹{isAnnual ? "1499" : "1999"}
                    </span>
                    <span className="text-xs text-on-surface-variant font-semibold"> / month</span>
                    {isAnnual && <p className="text-[10px] text-emerald-600 font-bold mt-1">Billed annually (₹17,988/yr)</p>}
                  </div>
                  <ul className="space-y-sm text-xs font-semibold text-on-surface border-t border-outline-variant/30 pt-lg">
                    <li className="flex items-center gap-xs">
                      <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      Unlimited access to 500+ courses
                    </li>
                    <li className="flex items-center gap-xs">
                      <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      Verified Completion Certificates
                    </li>
                    <li className="flex items-center gap-xs">
                      <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      Personalized AI learning path tutor
                    </li>
                    <li className="flex items-center gap-xs">
                      <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      Interactive code &amp; design sandboxes
                    </li>
                  </ul>
                </div>
                <Link href="/signup" className="block text-center w-full mt-xl py-3 bg-primary text-on-primary font-bold rounded-xl text-xs hover:bg-primary-container transition-all active:scale-95 shadow-md">
                  Subscribe Now
                </Link>
              </div>

              {/* Plan 3: Enterprise */}
              <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-[2rem] p-lg flex flex-col justify-between shadow-sm hover:shadow-md transition-all hover:scale-[1.01] duration-300 relative overflow-hidden group">
                <div>
                  <div className="flex justify-between items-start mb-md">
                    <div>
                      <h3 className="font-heading text-headline-sm font-bold text-on-surface group-hover:text-primary transition-colors">Enterprise</h3>
                      <p className="text-[11px] text-on-surface-variant mt-1 leading-tight">For universities and organizations.</p>
                    </div>
                    <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">corporate_fare</span>
                  </div>
                  <div className="my-lg">
                    <span className="font-heading text-[40px] font-extrabold text-on-surface">Custom</span>
                    <span className="text-xs text-on-surface-variant font-semibold"> / institution</span>
                  </div>
                  <ul className="space-y-sm text-xs font-medium text-on-surface-variant border-t border-outline-variant/30 pt-lg">
                    <li className="flex items-center gap-xs">
                      <span className="material-symbols-outlined text-primary text-sm">check</span>
                      SAML SSO &amp; custom domain branding
                    </li>
                    <li className="flex items-center gap-xs">
                      <span className="material-symbols-outlined text-primary text-sm">check</span>
                      Dedicated customer success managers
                    </li>
                    <li className="flex items-center gap-xs">
                      <span className="material-symbols-outlined text-primary text-sm">check</span>
                      Cohort builder &amp; team analytics
                    </li>
                    <li className="flex items-center gap-xs">
                      <span className="material-symbols-outlined text-primary text-sm">check</span>
                      LMS integrations (Canvas, Moodle)
                    </li>
                  </ul>
                </div>
                <Link href="/student/dashboard" className="block text-center w-full mt-xl py-3 border border-outline text-on-surface font-bold rounded-xl text-xs hover:bg-slate-100 transition-all active:scale-95 shadow-sm">
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-xl bg-surface-container-low/50">
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-md border border-white/40 rounded-[2rem] p-lg md:p-xl soft-ui-shadow text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-lg opacity-10">
                <span className="material-symbols-outlined text-[80px]">format_quote</span>
              </div>
              <div className="flex flex-col items-center gap-md">
                <img 
                  alt="Student avatar" 
                  className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaFCjubad0XZjWIVR9Jgg9mL-Zh6L7FfSAWfi2l1WPEK_SGMVYA5gUoBszw9Kk5OfGmheNx59568Dsqo6cLqoCPPJsL47pmF-Zo6kll2GdzWaNbS1kNO0dMkUIAaOFTwtYZH4hVbDHI1LwR0cb--6eoI5sJ4sBOWcl9T0vfekVOQnJkNktTmIbgYW6tj0EM3ZIN9ajqVmWnDNG6rJPzDT2fS26OL5hv2ivB-PeoNb4lPfLmkLyp5GthSkcGRhxkx0cBN72rdnkOvfQ"
                />
                <p className="font-heading text-headline-sm text-on-surface italic leading-relaxed">
                  "Crashup Learning completely transformed how I manage my professional development. The interactive lessons feel more like engaging experiences than chores, and the progress tracking keeps me motivated every day."
                </p>
                <div>
                  <p className="font-semibold text-on-surface">Sarah J. Miller</p>
                  <p className="text-xs text-secondary mt-0.5">Senior Product Designer &amp; Lifelong Learner</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-xl">
          <div className="max-w-4xl mx-auto px-gutter">
            <div className="text-center mb-xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-label-sm font-semibold mb-4">
                <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>help</span>
                Common Questions
              </span>
              <h2 className="font-heading text-[32px] md:text-[40px] text-on-surface mb-sm font-bold tracking-tight">Frequently Asked Questions</h2>
              <p className="text-secondary max-w-xl mx-auto text-sm">Have more questions? Contact our dedicated support team anytime at support@crashuplearning.com</p>
            </div>

            <div className="space-y-sm max-w-3xl mx-auto">
              {[
                {
                  q: "Is there a free trial for the Pro Academy plan?",
                  a: "Yes! We offer a 14-day free trial with full access to all premium courses, code playgrounds, and video transcripts. No credit card is required to sign up."
                },
                {
                  q: "Can I easily switch between student and instructor portals?",
                  a: "Absolutely! Crashup supports unified profiles. If you have teaching permissions, you can toggle between student mode and instructor mode via your sidebar navigation in one click."
                },
                {
                  q: "Do you offer discounts for educational institutions?",
                  a: "Yes. We offer special site-wide licensing options, LTI/LMS integrations (Canvas, Blackboard, Moodle), and volume pricing for schools, universities, and corporate academies. Contact sales for details."
                },
                {
                  q: "How do digital badges and certificates work?",
                  a: "Each course contains modules with milestone assessments. Once completed, verified digital certificates and credentials are added to your profile. You can share them directly to LinkedIn or export them as PDFs."
                },
                {
                  q: "Are the courses self-paced or live cohort-based?",
                  a: "We offer both! Most courses are self-paced, allowing you to learn at your convenience. However, instructors can also schedule live learning sessions, calendar milestones, and team discussion board threads."
                }
              ].map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div 
                    key={index}
                    className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl overflow-hidden transition-all duration-350 shadow-sm"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full py-md px-lg text-left flex justify-between items-center font-heading text-sm md:text-base font-bold text-on-surface hover:text-primary transition-colors focus:outline-none"
                    >
                      <span>{faq.q}</span>
                      <span className={`material-symbols-outlined transition-transform duration-300 text-outline-variant ${isOpen ? "rotate-180 text-primary" : ""}`}>
                        expand_more
                      </span>
                    </button>
                    <div 
                      className={`transition-all duration-350 ease-in-out ${isOpen ? "max-h-40 border-t border-outline-variant/30 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}
                    >
                      <p className="p-lg text-xs md:text-sm text-on-surface-variant leading-relaxed bg-slate-50/40">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-xl mb-xl">
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="bg-primary rounded-[3rem] p-lg md:p-xl text-center text-on-primary relative overflow-hidden shadow-2xl">
              {/* Subtle background decoration */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <circle cx="0" cy="0" fill="white" r="40"></circle>
                  <circle cx="100" cy="100" fill="white" r="30"></circle>
                </svg>
              </div>
              <div className="relative z-10 space-y-md">
                <h2 className="font-heading text-[32px] md:text-[48px] font-extrabold mb-sm">Ready to light up your path?</h2>
                <p className="text-lg text-primary-fixed max-w-xl mx-auto">Join 50,000+ students and teachers today. Start your 14-day free trial with full access to all premium features.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-md pt-md">
                  <Link href="/signup" className="bg-white text-primary px-xl py-md rounded-xl font-bold hover:bg-primary-fixed transition-all shadow-lg active:scale-95 text-center">
                    Sign Up Now
                  </Link>
                  <Link href="/signup" className="bg-primary-container text-on-primary border border-on-primary/20 px-xl py-md rounded-xl font-bold hover:bg-primary/80 transition-all active:scale-95 text-center">
                    Contact Sales
                  </Link>
                </div>
                <p className="text-xs text-primary-fixed/80">No credit card required. Cancel anytime.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest w-full pt-20 pb-12 border-t border-outline-variant/30 relative">
        <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-xl mb-16">
          {/* Logo Column */}
          <div className="lg:col-span-2 space-y-md">
            <div className="flex items-center gap-2">
              <span className="font-heading text-headline-md text-primary font-bold">Crashup Learning</span>
            </div>
            <p className="text-xs text-on-surface-variant max-w-sm leading-relaxed">
              Crashup is the all-in-one learning management system designed to make digital education more immersive, interactive, and rewarding for students and teachers worldwide.
            </p>
            {/* Newsletter sign-up */}
            <div className="space-y-sm pt-2">
              <p className="text-xs font-bold text-on-surface">Subscribe to our newsletter</p>
              <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed successfully!"); }} className="flex max-w-sm gap-2">
                <input 
                  type="email" 
                  placeholder="you@example.com" 
                  required
                  className="flex-grow bg-surface-container-low border border-outline-variant/60 rounded-xl px-sm py-2 text-xs outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder-on-surface-variant/50"
                />
                <button type="submit" className="px-md bg-primary text-on-primary rounded-xl font-bold text-xs hover:bg-primary-container transition-all active:scale-95 shadow-sm">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Links Column 1: Product */}
          <div className="space-y-sm">
            <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">Product</h4>
            <ul className="space-y-2">
              <li><Link href="#features" className="text-xs text-secondary hover:text-primary transition-colors">Platform Features</Link></li>
              <li><Link href="#personas" className="text-xs text-secondary hover:text-primary transition-colors">Portals Overview</Link></li>
              <li><Link href="#pricing" className="text-xs text-secondary hover:text-primary transition-colors">Pricing Plans</Link></li>
              <li><Link href="/student/dashboard" className="text-xs text-secondary hover:text-primary transition-colors">Student Demo</Link></li>
              <li><Link href="/instructor/dashboard" className="text-xs text-secondary hover:text-primary transition-colors">Instructor Demo</Link></li>
            </ul>
          </div>

          {/* Links Column 2: Resources */}
          <div className="space-y-sm">
            <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="#faq" className="text-xs text-secondary hover:text-primary transition-colors">FAQs &amp; Support</Link></li>
              <li><Link href="#" className="text-xs text-secondary hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link href="#" className="text-xs text-secondary hover:text-primary transition-colors">UI Design Cheat Sheet</Link></li>
              <li><Link href="#" className="text-xs text-secondary hover:text-primary transition-colors">Platform Status</Link></li>
              <li><Link href="#" className="text-xs text-secondary hover:text-primary transition-colors">API References</Link></li>
            </ul>
          </div>

          {/* Links Column 3: Company */}
          <div className="space-y-sm">
            <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-xs text-secondary hover:text-primary transition-colors">About Crashup</Link></li>
              <li><Link href="#" className="text-xs text-secondary hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-xs text-secondary hover:text-primary transition-colors">Press &amp; Media</Link></li>
              <li><Link href="#" className="text-xs text-secondary hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-xs text-secondary hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="max-w-container-max mx-auto px-gutter pt-8 border-t border-outline-variant/30 flex flex-col sm:flex-row justify-between items-center gap-md">
          <p className="text-xs text-on-surface-variant font-medium">© 2026 Crashup Learning Suite. All rights reserved.</p>
          
          {/* Social Icons including Twitter/X logo */}
          <div className="flex items-center gap-md">
            {/* X / Twitter */}
            <Link href="https://x.com" target="_blank" className="text-secondary hover:text-primary transition-colors" aria-label="X (formerly Twitter)">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>
            {/* LinkedIn */}
            <Link href="https://linkedin.com" target="_blank" className="text-secondary hover:text-primary transition-colors" aria-label="LinkedIn">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </Link>
            {/* GitHub */}
            <Link href="https://github.com" target="_blank" className="text-secondary hover:text-primary transition-colors" aria-label="GitHub">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
