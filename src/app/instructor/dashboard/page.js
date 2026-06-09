"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function InstructorDashboardPage() {
  const [chartRange, setChartRange] = useState("monthly");
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      name: "Marcus Thorne",
      title: "Final Project: UI Kit",
      summary: "Applied color tokens and grid layout...",
      time: "2h ago",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAx5mWIxc7BLskIwrQ21-2gCQ_dbszO7M8uC9T3wCslBECUEbWaAuCfLDka3TgzKnCXgq21hgzSsvpWii_ZZm0uDOXpZtjUcvvHJOduTIoBDLiGTJJPjmLkOGXnEAfVXIKzUcMwuijdM62hbY9eYP1d2o_4dX22GgqSRc1lIVxCMTUYG1ER87V5fGGNitacefB3fzt0gEL4Of-u0qpyIeLQREoqFQGfrAK72g4vUEhHH9yv-x6z9XDjOV_dJcSuAIrIImzHNhLo2xUR",
    },
    {
      id: 2,
      name: "Elena Rodriguez",
      title: "Week 4: API Integration",
      summary: "Successfully connected to REST endpoint...",
      time: "5h ago",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHamuRigKYgRJjMoeuV0tVVRklRBea48pR0NJ3UexLQ8Fmh69izEJl7CaMMk09vUXn23WTwfmJcQAbYORdQFhlD9eltA53F2jBh9hlPGVQXZELaiLkKCPUoshCNhVRIFLgFHBcgZbOJq5502owwfjksLnp10R9BfKQgZ3A7llNdvQjrjVGhL2gM1X_yTQJX8dBuUNqD005kjlRXW6NPjoZgiR6WSIRYZv0-B5tBWQ6b79ZU9yJhIwSLzBarj3z6roMp-kumNhaRZ18",
    },
    {
      id: 3,
      name: "Julian Day",
      title: "Data Modeling Assignment",
      summary: "Normalized schema up to 3NF...",
      time: "Yesterday",
      initials: "JD",
    },
  ]);

  const [courses, setCourses] = useState([
    { name: "Modern UI Design Principles", code: "UI", students: 428, rating: 4.9, progress: 78 },
    { name: "Web Development Bootcamp", code: "WD", students: 856, rating: 4.8, progress: 92 },
    { name: "Data Science Foundations", code: "DS", students: 312, rating: 4.7, progress: 64 },
  ]);

  const [sortField, setSortField] = useState("students");
  const [sortAsc, setSortAsc] = useState(false);

  const handleSort = (field) => {
    const asc = sortField === field ? !sortAsc : false;
    setSortField(field);
    setSortAsc(asc);

    const sorted = [...courses].sort((a, b) => {
      let valA = a[field];
      let valB = b[field];
      if (typeof valA === "string") {
        return asc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return asc ? valA - valB : valB - valA;
    });
    setCourses(sorted);
  };

  const gradeSubmission = (id, name) => {
    const score = prompt(`Enter grade score (0-100) for ${name}:`, "95");
    if (score === null) return;
    
    const parsed = parseInt(score, 10);
    if (isNaN(parsed) || parsed < 0 || parsed > 100) {
      alert("Please enter a valid number between 0 and 100.");
      return;
    }

    setSubmissions(submissions.filter((sub) => sub.id !== id));
    alert(`Submission graded successfully!\nMarcus Thorne received ${parsed}/100.`);
  };

  const chartHeights = chartRange === "monthly" 
    ? [45, 65, 35, 85, 55, 95, 70]
    : [20, 85, 90, 40, 75, 50, 30];

  return (
    <div className="p-6 md:p-8 lg:p-12 space-y-xl max-w-container-max mx-auto w-full pb-32">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-[32px] md:text-display-lg text-on-surface font-extrabold leading-tight">
            Welcome back, Professor Sarah.
          </h1>
          <p className="text-body-lg text-on-surface-variant mt-2 leading-relaxed">
            Here's what happened with your courses today.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-secondary-container text-on-secondary-container px-5 py-2.5 rounded-xl font-bold text-xs soft-shadow-hover flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">calendar_today</span>
            <span>Sept 20 - Oct 20</span>
          </button>
          <button 
            onClick={() => alert("Downloading spreadsheet export for SARAH...")}
            className="bg-primary text-on-primary px-5 py-2.5 rounded-xl font-bold text-xs soft-shadow-hover flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            <span>Report</span>
          </button>
        </div>
      </div>

      {/* Bento Grid: Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat Card 1 */}
        <div className="bg-surface-container-lowest border border-outline-variant/60 p-6 rounded-2xl soft-shadow-hover shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-secondary-container rounded-xl">
              <span className="material-symbols-outlined text-on-secondary-container">group</span>
            </div>
            <span className="flex items-center text-emerald-600 font-bold text-[10px] bg-emerald-50 px-2.5 py-1 rounded-full">+12%</span>
          </div>
          <p className="font-semibold text-xs text-on-surface-variant">Total Students</p>
          <h3 className="font-heading text-headline-md text-on-surface font-bold mt-1">1,284</h3>
        </div>
        {/* Stat Card 2 */}
        <div className="bg-surface-container-lowest border border-outline-variant/60 p-6 rounded-2xl soft-shadow-hover shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-primary-container/10 rounded-xl">
              <span className="material-symbols-outlined text-primary">local_library</span>
            </div>
            <span className="text-[10px] text-on-surface-variant/60 font-bold uppercase tracking-wider">Stable</span>
          </div>
          <p className="font-semibold text-xs text-on-surface-variant">Active Courses</p>
          <h3 className="font-heading text-headline-md text-on-surface font-bold mt-1">12</h3>
        </div>
        {/* Stat Card 3 */}
        <div className="bg-surface-container-lowest border border-outline-variant/60 p-6 rounded-2xl soft-shadow-hover shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-tertiary-fixed rounded-xl">
              <span className="material-symbols-outlined text-tertiary">speed</span>
            </div>
            <span className="flex items-center text-emerald-600 font-bold text-[10px] bg-emerald-50 px-2.5 py-1 rounded-full">+4%</span>
          </div>
          <p className="font-semibold text-xs text-on-surface-variant">Avg. Completion</p>
          <h3 className="font-heading text-headline-md text-on-surface font-bold mt-1">86.4%</h3>
        </div>
        {/* Stat Card 4 */}
        <div className="bg-surface-container-lowest border border-outline-variant/60 p-6 rounded-2xl soft-shadow-hover shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-secondary-fixed rounded-xl">
              <span className="material-symbols-outlined text-on-secondary-fixed">payments</span>
            </div>
            <span className="flex items-center text-emerald-600 font-bold text-[10px] bg-emerald-50 px-2.5 py-1 rounded-full">+$2.1k</span>
          </div>
          <p className="font-semibold text-xs text-on-surface-variant">Revenue (MTD)</p>
          <h3 className="font-heading text-headline-md text-on-surface font-bold mt-1">$14,200</h3>
        </div>
      </div>

      {/* Main Grid: Charts and Submissions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Engagement Chart Section */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-8 relative overflow-hidden shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h4 className="font-heading text-headline-sm font-bold text-on-surface">Student Engagement</h4>
                <p className="text-xs text-on-surface-variant">Interaction levels over the past 30 days</p>
              </div>
              <select 
                value={chartRange}
                onChange={(e) => setChartRange(e.target.value)}
                className="bg-surface-container border-none rounded-lg font-bold text-xs focus:ring-primary py-1.5 px-3"
              >
                <option value="monthly">Monthly view</option>
                <option value="weekly">Weekly view</option>
              </select>
            </div>
            {/* Simulated Chart */}
            <div className="h-64 flex items-end justify-between gap-3 px-2">
              {chartHeights.map((h, i) => (
                <div key={i} className="w-full bg-slate-100 rounded-t-lg relative group transition-all h-full">
                  <div 
                    className="absolute inset-x-0 bottom-0 bg-primary-container rounded-t-lg transition-all duration-700 hover:bg-primary shadow" 
                    style={{ height: `${h}%` }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-xs font-bold text-on-surface-variant opacity-60">
              <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span>
            </div>
          </div>

          {/* Course Performance Table */}
          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-outline-variant/60">
              <h4 className="font-heading text-headline-sm font-bold text-on-surface">Course Performance</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-container-low border-b border-outline-variant/20">
                  <tr>
                    <th 
                      onClick={() => handleSort("name")}
                      className="px-6 py-4 font-bold text-xs text-on-surface-variant cursor-pointer hover:text-primary select-none"
                    >
                      Course Name {sortField === "name" && (sortAsc ? "▲" : "▼")}
                    </th>
                    <th 
                      onClick={() => handleSort("students")}
                      className="px-6 py-4 font-bold text-xs text-on-surface-variant cursor-pointer hover:text-primary select-none"
                    >
                      Students {sortField === "students" && (sortAsc ? "▲" : "▼")}
                    </th>
                    <th 
                      onClick={() => handleSort("rating")}
                      className="px-6 py-4 font-bold text-xs text-on-surface-variant cursor-pointer hover:text-primary select-none"
                    >
                      Rating {sortField === "rating" && (sortAsc ? "▲" : "▼")}
                    </th>
                    <th 
                      onClick={() => handleSort("progress")}
                      className="px-6 py-4 font-bold text-xs text-on-surface-variant cursor-pointer hover:text-primary select-none"
                    >
                      Completion {sortField === "progress" && (sortAsc ? "▲" : "▼")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  {courses.map((course, i) => (
                    <tr key={i} className="hover:bg-primary/5 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-surface-variant flex items-center justify-center font-bold text-primary border border-outline-variant/10 text-xs shrink-0">
                            {course.code}
                          </div>
                          <span className="text-sm text-on-surface font-semibold truncate max-w-[200px] md:max-w-xs block">
                            {course.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-on-surface-variant font-medium">{course.students}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-1 text-tertiary">
                          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                          <span className="text-sm font-bold">{course.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-surface-container-highest rounded-full overflow-hidden shrink-0">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${course.progress}%` }}></div>
                          </div>
                          <span className="text-xs font-semibold text-on-surface-variant">{course.progress}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Side Section: Submissions */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-heading text-headline-sm font-bold text-on-surface">Submissions</h4>
              <span className="bg-error-container text-on-error-container text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                {submissions.length} Pending
              </span>
            </div>
            {submissions.length === 0 ? (
              <div className="text-center p-lg bg-slate-50 rounded-xl border border-dashed border-outline-variant/60">
                <span className="material-symbols-outlined text-4xl text-outline mb-xs">check_circle</span>
                <p className="text-xs text-on-surface-variant">All submissions graded!</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[420px] overflow-y-auto custom-scrollbar pr-1">
                {submissions.map((sub) => (
                  <div 
                    key={sub.id}
                    onClick={() => gradeSubmission(sub.id, sub.name)}
                    className="flex gap-4 p-3.5 rounded-xl bg-surface hover:bg-surface-container-low transition-colors group cursor-pointer border border-outline-variant/20 hover:border-primary/20 shadow-sm"
                  >
                    {sub.img ? (
                      <img 
                        alt={sub.name} 
                        className="w-11 h-11 rounded-full object-cover shrink-0 border border-outline-variant/40" 
                        src={sub.img}
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-secondary-fixed flex items-center justify-center font-bold text-on-secondary-fixed text-xs shrink-0 border border-outline-variant/20">
                        {sub.initials}
                      </div>
                    )}
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-center">
                        <h5 className="font-semibold text-xs text-on-surface truncate pr-1">{sub.name}</h5>
                        <span className="text-[9px] text-on-surface-variant font-medium shrink-0">{sub.time}</span>
                      </div>
                      <p className="text-[11px] text-primary font-bold mt-0.5 truncate">{sub.title}</p>
                      <p className="text-[10px] text-on-surface-variant truncate mt-0.5">{sub.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button className="w-full mt-6 py-3 border border-outline text-on-surface font-bold text-xs rounded-xl hover:bg-slate-50 transition-all">
              View All Submissions
            </button>
          </div>

          {/* Promotion/Resource Card */}
          <div className="bg-primary p-8 rounded-3xl relative overflow-hidden text-on-primary shadow-xl border border-primary/20">
            <div className="relative z-10">
              <h4 className="font-heading text-headline-sm font-bold mb-2">New Course Builder v2.0</h4>
              <p className="text-xs opacity-80 mb-6 leading-relaxed">Our updated builder makes it 2x faster to structure modules and assessments.</p>
              <Link 
                href="/instructor/course-builder" 
                className="inline-block bg-white text-primary px-6 py-2.5 rounded-xl font-bold hover:scale-105 transition-transform text-xs shadow-md active:scale-95"
              >
                Try it now
              </Link>
            </div>
            {/* Background decoration */}
            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
