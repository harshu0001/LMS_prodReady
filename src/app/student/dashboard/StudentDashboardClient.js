"use client";

import Link from "next/link";
import { useState } from "react";
import { toggleStreakDayAction, addDeadlineAction } from "../../actions/student";

export default function StudentDashboardClient({
  initialUser,
  initialCourses,
  initialRecommendations,
  initialDeadlines,
  initialStreakDays,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [localStreak, setLocalStreak] = useState(initialStreakDays);
  const [localDeadlines, setLocalDeadlines] = useState(initialDeadlines);

  // Filter courses based on search
  const filteredCourses = initialCourses.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Optimistic Toggle for Streak Day
  const handleToggleStreakDay = async (id, index) => {
    const originalStreak = [...localStreak];
    
    // Optimistic UI state update
    const updatedStreak = localStreak.map((day) =>
      day.id === id ? { ...day, completed: !day.completed } : day
    );
    setLocalStreak(updatedStreak);

    const result = await toggleStreakDayAction(id);
    if (result.error) {
      alert(result.error);
      setLocalStreak(originalStreak); // Revert on failure
    }
  };

  // Add Custom Deadline Action
  const handleAddDeadline = async () => {
    const title = prompt("Enter assignment title:");
    if (title && title.trim()) {
      const result = await addDeadlineAction(title);
      if (result.success && result.deadline) {
        setLocalDeadlines((prev) => [...prev, result.deadline]);
      } else {
        alert(result.error || "Failed to add deadline.");
      }
    }
  };

  // Helper: Format DB DateTime to Month/Day for the UI
  const formatDeadlineDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
    const day = String(date.getDate()).padStart(2, "0");
    return { month, day };
  };

  // Helper: Calculate relative due date strings
  const getRelativeDueString = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { text: "Overdue", class: "text-error bg-error-container/20" };
    } else if (diffDays === 0) {
      return { text: "Due Today", class: "text-error bg-error-container/20" };
    } else if (diffDays === 1) {
      return { text: "Due Tomorrow", class: "text-error bg-error-container/20" };
    } else if (diffDays <= 3) {
      return { text: `Due in ${diffDays} days`, class: "text-error bg-error-container/20" };
    } else {
      return { text: `In ${diffDays} days`, class: "text-on-surface-variant bg-surface-container-high" };
    }
  };

  const completedStreakDays = localStreak.filter((d) => d.completed).length;
  const streakPercentage = localStreak.length > 0 
    ? Math.round((completedStreakDays / localStreak.length) * 100) 
    : 0;

  const remainingGoals = localStreak.filter((d) => !d.completed).length;

  // Find dynamic progress for primary active course
  const activeCourse = initialCourses.find(c => c.progress > 0 && c.progress < 100) || initialCourses[0];

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
          Welcome back, {initialUser.name}!
        </h2>
        <p className="text-body-lg text-on-surface-variant mt-xs">
          You've completed {streakPercentage}% of your weekly goals. Keep it up!
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
        {/* Main Column */}
        <div className="lg:col-span-8 space-y-xl">
          {/* Continue Learning Hero */}
          {activeCourse && (
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
                    {activeCourse.title}
                  </h3>
                  <p className="text-on-primary/80 text-sm mb-lg">
                    {activeCourse.category}
                  </p>
                  <div className="flex items-center gap-md">
                    <Link
                      href={`/student/courses/${activeCourse.id}`}
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
                          strokeDashoffset={251.2 - (251.2 * activeCourse.progress) / 100}
                          strokeWidth="8"
                        ></circle>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center font-heading text-headline-sm text-white font-bold">
                        {activeCourse.progress}%
                      </div>
                    </div>
                    <p className="text-white font-semibold text-xs">Course Progress</p>
                  </div>
                </div>
              </div>
            </section>
          )}

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
                        <h5 className="font-heading text-on-background font-semibold group-hover:text-primary transition-colors text-sm line-clamp-1">
                          {c.title}
                        </h5>
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
              {initialRecommendations.map((rec, i) => (
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
                      <p className="text-[11px] text-on-surface-variant font-medium">
                        {rec.rating} ★ ({rec.reviews} reviews)
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-on-surface-variant mb-md line-clamp-2 leading-relaxed">
                    {rec.desc}
                  </p>
                  <Link
                    href={activeCourse ? `/student/courses/${activeCourse.id}` : "#"}
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
                onClick={handleAddDeadline}
                className="material-symbols-outlined text-primary hover:scale-110 transition-transform active:scale-90"
              >
                add_circle
              </button>
            </div>
            <div className="space-y-md">
              {localDeadlines.map((dl) => {
                const { month, day } = formatDeadlineDate(dl.dueDate);
                const relTime = getRelativeDueString(dl.dueDate);
                return (
                  <div key={dl.id} className="flex gap-md group">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-xl bg-surface-container-high text-on-surface-variant flex flex-col items-center justify-center border border-outline-variant/10">
                        <span className="text-[9px] font-bold text-secondary">{month}</span>
                        <span className="text-sm font-bold text-on-surface -mt-0.5">{day}</span>
                      </div>
                      <div className="w-px h-full bg-outline-variant/40 mt-xs group-last:hidden"></div>
                    </div>
                    <div className="pb-md flex-1">
                      <h6 className="font-semibold text-sm text-on-surface leading-snug">{dl.title}</h6>
                      <p className="text-xs text-on-surface-variant leading-tight mt-0.5">{dl.subtitle}</p>
                      <span
                        className={`inline-block mt-1.5 px-2 py-0.5 rounded text-[9px] font-bold uppercase ${relTime.class}`}
                      >
                        {relTime.text}
                      </span>
                    </div>
                  </div>
                );
              })}
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
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  military_tech
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-on-surface leading-tight">Weekly Streak</h4>
                <p className="text-xs text-primary font-bold">12 Days Active</p>
              </div>
            </div>
            <div className="flex justify-between items-center bg-surface-container-lowest p-sm rounded-2xl border border-outline-variant/30">
              <div className="flex -space-x-1.5">
                {localStreak.map((d, index) => (
                  <button
                    key={d.id}
                    onClick={() => handleToggleStreakDay(d.id, index)}
                    className={`w-8 h-8 rounded-full border-2 border-surface flex items-center justify-center transition-all ${
                      d.completed
                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                        : "bg-primary/10 text-primary hover:bg-primary/20"
                    }`}
                  >
                    {d.completed ? (
                      <span
                        className="material-symbols-outlined text-xs font-bold"
                        style={{ fontSize: "14px", fontVariationSettings: "'FILL' 1'" }}
                      >
                        check
                      </span>
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

      {/* Floating Action Button Note (Simulated client popup only as requested) */}
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
