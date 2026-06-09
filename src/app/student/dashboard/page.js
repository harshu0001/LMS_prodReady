"use client";

import Link from "next/link";
import { useState } from "react";

export default function StudentDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [streakDays, setStreakDays] = useState([
    { label: "M", completed: true },
    { label: "T", completed: true },
    { label: "W", completed: false },
    { label: "T", completed: false },
    { label: "F", completed: false },
  ]);

  const courses = [
    {
      id: "1",
      title: "Advanced UI Design Masterclass",
      category: "Programming & Computer Science",
      progress: 68,
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxnRtg1_cGnYcszh5FnTFDqcKR654QFgd8lx8zUcKAaMk8SRyOgLy6eBsf9goQhBLlVXK5Xo26MTDD2m5AChvhtWexdi6zNhglUukC8A4aF1E-P8R2lBiDrVxfZZU-kxyfZ2IWu0q_TbpBavi_V2TAKyds37tma63S98dSgrmV0xEH0prU2LWrzDwKMZARQPFx9_784wU5ChyA61kPahTJ-pkxUoiCM2YjNhkrlI0pIFDgMoJZw62T9R3GodWrY602UpDvkKNAdYsR",
    },
    {
      id: "2",
      title: "Python for Beginners",
      category: "Programming & Computer Science",
      progress: 42,
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxnRtg1_cGnYcszh5FnTFDqcKR654QFgd8lx8zUcKAaMk8SRyOgLy6eBsf9goQhBLlVXK5Xo26MTDD2m5AChvhtWexdi6zNhglUukC8A4aF1E-P8R2lBiDrVxfZZU-kxyfZ2IWu0q_TbpBavi_V2TAKyds37tma63S98dSgrmV0xEH0prU2LWrzDwKMZARQPFx9_784wU5ChyA61kPahTJ-pkxUoiCM2YjNhkrlI0pIFDgMoJZw62T9R3GodWrY602UpDvkKNAdYsR",
    },
    {
      id: "3",
      title: "Cybersecurity Essentials",
      category: "IT & Network Security",
      progress: 18,
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAp-nOyLOo41Z6WQFjaLRkcByuWDY58Vvwcm29_zkPO77eIQQUnAZBRGO8OH-6BPnMVc4UUkkuySyYuojROdhulhuqIlY6SePpyJLpWrjLqYThVO6UfE57d4uTNLlc3cG6H1MyVpfZJv92SnQUZv2epnBy9j0zeW9P9Wq_FYcb7dwoVj9FrqUVeuZbxAo3iy0HePZUlsQWeFcNJTXEh4XoY_PaGvnRq-kZTtvGHSlJjcDx-wizpzvV8THZ6WIM-0dTyALu1LKS-JoG",
    },
  ];

  const recommendations = [
    {
      title: "Behavioral Psych",
      rating: "4.8",
      reviews: "2k",
      desc: "Learn why people make decisions and the cognitive biases that drive behavior.",
      icon: "psychology",
      bgClass: "bg-tertiary-container text-on-tertiary",
    },
    {
      title: "Data Visualization",
      rating: "4.9",
      reviews: "1.5k",
      desc: "Master the art of telling stories through interactive data dashboards.",
      icon: "data_exploration",
      bgClass: "bg-secondary-container text-on-secondary-container",
    },
    {
      title: "Motion Design",
      rating: "4.7",
      reviews: "800",
      desc: "Bring your static designs to life with After Effects and Lottie animations.",
      icon: "motion_photos_on",
      bgClass: "bg-primary-container text-on-primary-container",
    },
  ];

  const [deadlines, setDeadlines] = useState([
    {
      id: 1,
      month: "OCT",
      day: "24",
      title: "UI Design Assignment",
      subtitle: "Final High-Fidelity Prototype",
      status: "Due in 2 days",
      statusClass: "text-error bg-error-container/20",
    },
    {
      id: 2,
      month: "OCT",
      day: "27",
      title: "Python Quiz #4",
      subtitle: "Functions and Data Structures",
      status: "In 5 days",
      statusClass: "text-on-surface-variant bg-surface-container-high",
    },
    {
      id: 3,
      month: "NOV",
      day: "02",
      title: "Project Pitch",
      subtitle: "Group Presentation Materials",
      status: "In 11 days",
      statusClass: "text-on-surface-variant bg-surface-container-high",
    },
  ]);

  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleStreakDay = (index) => {
    const nextStreak = [...streakDays];
    nextStreak[index].completed = !nextStreak[index].completed;
    setStreakDays(nextStreak);
  };

  const remainingGoals = streakDays.filter((d) => !d.completed).length;

  return (
    <main className="p-gutter max-w-container-max mx-auto pb-32">
      {/* Mobile-only Search Bar */}
      <div className="mb-md md:hidden bg-surface-container-lowest px-sm py-2 rounded-xl flex items-center border border-outline-variant/30 shadow-sm">
        <span className="material-symbols-outlined text-on-surface-variant mr-xs text-lg">search</span>
        <input 
          className="bg-transparent border-none outline-none text-sm w-full" 
          placeholder="Search courses, tasks..." 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Welcome Header */}
      <section className="mb-xl">
        <h2 className="font-heading text-[28px] md:text-display-lg text-on-background tracking-tight font-extrabold">
          Welcome back, Alex!
        </h2>
        <p className="text-body-lg text-on-surface-variant mt-xs">
          You've completed {100 - Math.round((remainingGoals / streakDays.length) * 100)}% of your weekly goals. Keep it up!
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
        {/* Main Column */}
        <div className="lg:col-span-8 space-y-xl">
          {/* Continue Learning Hero */}
          <section>
            <div className="relative overflow-hidden rounded-3xl bg-primary min-h-[260px] flex items-center p-lg md:p-xl shadow-lg">
              {/* Decorative elements */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg fill="none" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
                  <pattern height="16" id="dots" patternUnits="userSpaceOnUse" width="16" x="0" y="0">
                    <circle cx="2" cy="2" fill="white" r="1.5"></circle>
                  </pattern>
                  <rect fill="url(#dots)" height="100%" width="100%"></rect>
                </svg>
              </div>

              <div className="relative z-10 w-full md:w-2/3">
                <span className="inline-block px-sm py-1 bg-on-primary/10 border border-on-primary/20 rounded-full text-on-primary font-bold text-xs mb-md backdrop-blur-md">
                  CURRENTLY WATCHING
                </span>
                <h3 className="font-heading text-headline-md md:text-[28px] text-on-primary font-bold leading-snug">
                  Advanced UI Design Masterclass
                </h3>
                <p className="text-on-primary/80 text-sm mb-lg">
                  Module 4: Mastering Prototyping &amp; Micro-interactions
                </p>
                <div className="flex items-center gap-md">
                  <Link 
                    href="/student/courses/1" 
                    className="bg-surface-container-lowest text-primary px-lg py-2.5 rounded-xl font-bold hover:shadow-xl transition-all active:scale-95 text-center text-sm"
                  >
                    Continue Learning
                  </Link>
                  <div className="flex items-center gap-xs text-on-primary text-xs font-semibold">
                    <span className="material-symbols-outlined text-sm">timer</span>
                    <span>12m left</span>
                  </div>
                </div>
              </div>

              {/* Progress visual indicator */}
              <div className="hidden md:block absolute right-6 bottom-6 top-6 w-1/3 p-lg">
                <div className="h-full w-full rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center text-center p-md">
                  <div className="relative w-24 h-24 mb-md">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle className="text-white/10" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="8"></circle>
                      <circle 
                        className="text-white" 
                        cx="48" 
                        cy="48" 
                        fill="transparent" 
                        r="40" 
                        stroke="currentColor" 
                        strokeDasharray="251.2" 
                        strokeDashoffset={251.2 - (251.2 * 68) / 100} 
                        strokeWidth="8"
                      ></circle>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center font-heading text-headline-sm text-white font-bold">68%</div>
                  </div>
                  <p className="text-white font-semibold text-xs">Course Progress</p>
                </div>
              </div>
            </div>
          </section>

          {/* Enrolled Course Grid */}
          <section>
            <div className="flex justify-between items-end mb-md">
              <h4 className="font-heading text-headline-sm text-on-background font-bold">Enrolled Courses</h4>
              <button 
                onClick={() => setSearchQuery("")} 
                className="text-primary font-bold text-sm hover:underline"
              >
                Clear Search
              </button>
            </div>
            {filteredCourses.length === 0 ? (
              <div className="text-center p-xl bg-surface rounded-2xl border border-dashed border-outline-variant/50">
                <span className="material-symbols-outlined text-4xl text-outline mb-sm">search_off</span>
                <p className="text-on-surface-variant text-sm">No courses match your search criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                {filteredCourses.map((c) => (
                  <Link 
                    href={`/student/courses/${c.id}`} 
                    key={c.id} 
                    className="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden hover:shadow-md transition-all group cursor-pointer"
                  >
                    <div className="h-40 overflow-hidden relative">
                      <img 
                        alt={c.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        src={c.imageUrl}
                      />
                      <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-white font-bold uppercase">
                        {c.progress === 100 ? "Completed" : "In Progress"}
                      </div>
                    </div>
                    <div className="p-md">
                      <div className="flex justify-between items-start mb-xs">
                        <h5 className="font-heading text-on-background font-semibold group-hover:text-primary transition-colors text-sm line-clamp-1">{c.title}</h5>
                        <span className="material-symbols-outlined text-on-surface-variant text-base">more_vert</span>
                      </div>
                      <p className="text-xs text-on-surface-variant mb-lg">{c.category}</p>
                      <div className="space-y-xs">
                        <div className="flex justify-between text-xs font-semibold text-on-surface-variant">
                          <span>Progress</span>
                          <span>{c.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${c.progress}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* Recommended Section */}
          <section>
            <div className="flex justify-between items-end mb-md">
              <h4 className="font-heading text-headline-sm text-on-background font-bold">Recommended for You</h4>
            </div>
            <div className="flex gap-md overflow-x-auto pb-sm custom-scrollbar">
              {recommendations.map((rec, i) => (
                <div 
                  key={i} 
                  className="flex-shrink-0 w-72 bg-surface-container rounded-2xl p-md border border-outline-variant/30 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center gap-sm mb-md">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${rec.bgClass}`}>
                      <span className="material-symbols-outlined text-xl">{rec.icon}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-on-surface leading-tight">{rec.title}</p>
                      <p className="text-[11px] text-on-surface-variant font-medium">{rec.rating} ★ ({rec.reviews} reviews)</p>
                    </div>
                  </div>
                  <p className="text-xs text-on-surface-variant mb-md line-clamp-2 leading-relaxed">{rec.desc}</p>
                  <Link 
                    href="/student/courses/1" 
                    className="block text-center w-full py-2 border border-primary text-primary rounded-lg font-bold text-xs hover:bg-primary hover:text-on-primary transition-colors"
                  >
                    Preview Course
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-4 space-y-lg">
          {/* Deadlines & Tasks */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-3xl p-md shadow-sm">
            <div className="flex items-center justify-between mb-lg">
              <h4 className="font-heading text-headline-sm text-on-background font-bold">Deadlines</h4>
              <button 
                onClick={() => {
                  const title = prompt("Enter assignment title:");
                  if (title) {
                    setDeadlines([...deadlines, {
                      id: Date.now(),
                      month: "NOV",
                      day: "15",
                      title: title,
                      subtitle: "New Self-paced Task",
                      status: "Due in 3 weeks",
                      statusClass: "text-on-surface-variant bg-surface-container-high"
                    }]);
                  }
                }}
                className="material-symbols-outlined text-primary hover:scale-110 transition-transform active:scale-90"
              >
                add_circle
              </button>
            </div>
            <div className="space-y-md">
              {deadlines.map((dl) => (
                <div key={dl.id} className="flex gap-md group">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-xl bg-surface-container-high text-on-surface-variant flex flex-col items-center justify-center border border-outline-variant/10">
                      <span className="text-[9px] font-bold text-secondary">{dl.month}</span>
                      <span className="text-sm font-bold text-on-surface -mt-0.5">{dl.day}</span>
                    </div>
                    <div className="w-px h-full bg-outline-variant/40 mt-xs group-last:hidden"></div>
                  </div>
                  <div className="pb-md flex-1">
                    <h6 className="font-semibold text-sm text-on-surface leading-snug">{dl.title}</h6>
                    <p className="text-xs text-on-surface-variant leading-tight mt-0.5">{dl.subtitle}</p>
                    <span className={`inline-block mt-1.5 px-2 py-0.5 rounded text-[9px] font-bold uppercase ${dl.statusClass}`}>
                      {dl.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Link 
              href="/student/quizzes" 
              className="block text-center w-full mt-lg py-2.5 bg-surface-container-high rounded-xl font-bold text-xs text-on-surface-variant hover:bg-outline-variant/20 transition-all"
            >
              View All Tasks
            </Link>
          </section>

          {/* Achievement Sidebar */}
          <section className="bg-primary-container/10 border border-primary/20 rounded-3xl p-md">
            <div className="flex items-center gap-sm mb-md">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-on-primary shadow-md">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-on-surface leading-tight">Weekly Streak</h4>
                <p className="text-xs text-primary font-bold">12 Days Active</p>
              </div>
            </div>
            <div className="flex justify-between items-center bg-surface-container-lowest p-sm rounded-2xl border border-outline-variant/30">
              <div className="flex -space-x-1.5">
                {streakDays.map((d, index) => (
                  <button 
                    key={index}
                    onClick={() => toggleStreakDay(index)}
                    className={`w-8 h-8 rounded-full border-2 border-surface flex items-center justify-center transition-all ${
                      d.completed 
                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" 
                        : "bg-primary/10 text-primary hover:bg-primary/20"
                    }`}
                  >
                    {d.completed ? (
                      <span className="material-symbols-outlined text-xs font-bold" style={{ fontSize: "14px", fontVariationSettings: "'FILL' 1" }}>check</span>
                    ) : (
                      <span className="text-[10px] font-bold">{d.label}</span>
                    )}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-on-surface-variant font-medium">
                {remainingGoals === 0 ? "All goals done!" : `${remainingGoals} goals left`}
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => {
          const note = prompt("Take a quick note:");
          if (note) {
            alert(`Note saved successfully:\n"${note}"`);
          }
        }}
        className="fixed bottom-24 right-6 md:bottom-10 md:right-10 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group border border-primary/20"
      >
        <span className="material-symbols-outlined">edit_square</span>
        <span className="absolute right-full mr-4 px-3 py-1 bg-inverse-surface text-inverse-on-surface text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
          Take Notes
        </span>
      </button>
    </main>
  );
}
