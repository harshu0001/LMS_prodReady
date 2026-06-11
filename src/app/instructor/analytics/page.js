"use client";

import React, { useState, useEffect } from "react";
import { getInstructorOverviewAction } from "../../actions/instructor";

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("7"); // 7, 30, 90
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({
    totalEnrollments: 14282,
    avgLearningTime: "42m 12s",
    completionRate: "76.4%",
    rating: "4.8 / 5"
  });

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getInstructorOverviewAction();
        if (data) {
          // Aggregate real course numbers if available
          let studentCount = 0;
          const courseList = data.courses.map((course, idx) => {
            studentCount += course.studentCount;
            // mock completion and badges based on indexes
            const completion = idx === 0 ? 88 : idx === 1 ? 62 : 74;
            const badge = idx === 0 ? "Trending" : idx === 1 ? "Stable" : "Top Rated";
            const badgeClass = idx === 0 ? "bg-emerald-100 text-emerald-700" : idx === 1 ? "bg-slate-100 text-on-surface-variant" : "bg-primary-fixed text-primary";
            return {
              id: course.id,
              title: course.title,
              imageUrl: course.imageUrl,
              studentCount: course.studentCount,
              completion,
              badge,
              badgeClass
            };
          });

          setCourses(courseList);
          setStats({
            totalEnrollments: studentCount > 0 ? studentCount : 14282,
            avgLearningTime: "42m 12s",
            completionRate: data.stats.averageCompletion || "76.4%",
            rating: data.stats.rating || "4.8 / 5"
          });
        }
      } catch (err) {
        console.error("Failed to load analytics data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Simple Heatmap hours definitions
  const heatmapCells = Array.from({ length: 24 }).map((_, idx) => {
    const activity = idx % 5 === 0 ? "Peak" : idx % 3 === 0 ? "High" : idx % 2 === 0 ? "Moderate" : "Low";
    const bgClass =
      activity === "Peak"
        ? "bg-primary"
        : activity === "High"
        ? "bg-primary/75"
        : activity === "Moderate"
        ? "bg-primary/45"
        : "bg-primary/10";
    return { id: idx, activity, bgClass };
  });

  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-12 max-w-container-max mx-auto w-full pb-32">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="font-heading text-[32px] md:text-display-lg font-extrabold text-on-surface mb-2 leading-tight">
            Analytics &amp; Performance
          </h1>
          <p className="text-on-surface-variant max-w-2xl text-body-md">
            Real-time insights into your teaching impact. Track student engagement, course completion rates, and platform activity trends.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-surface-container border border-outline-variant p-1 rounded-xl shadow-sm">
          <button 
            onClick={() => setTimeRange("7")}
            className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${timeRange === "7" ? "bg-primary text-white" : "text-on-surface-variant hover:bg-surface"}`}
          >
            7 Days
          </button>
          <button 
            onClick={() => setTimeRange("30")}
            className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${timeRange === "30" ? "bg-primary text-white" : "text-on-surface-variant hover:bg-surface"}`}
          >
            30 Days
          </button>
          <button 
            onClick={() => setTimeRange("90")}
            className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${timeRange === "90" ? "bg-primary text-white" : "text-on-surface-variant hover:bg-surface"}`}
          >
            90 Days
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* KPI Cards */}
        <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="p-2 bg-primary/10 rounded-lg text-primary material-symbols-outlined">trending_up</span>
              <span className="text-emerald-600 font-bold text-[10px] flex items-center gap-0.5">
                +12.5% <span className="material-symbols-outlined text-[10px]">north_east</span>
              </span>
            </div>
            <p className="font-semibold text-xs text-on-surface-variant uppercase tracking-wider mb-1">Total Enrollments</p>
            <h3 className="font-heading text-headline-md text-on-surface font-extrabold">{stats.totalEnrollments}</h3>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="p-2 bg-secondary-container/20 rounded-lg text-secondary material-symbols-outlined">schedule</span>
              <span className="text-emerald-600 font-bold text-[10px] flex items-center gap-0.5">
                +4.2% <span className="material-symbols-outlined text-[10px]">north_east</span>
              </span>
            </div>
            <p className="font-semibold text-xs text-on-surface-variant uppercase tracking-wider mb-1">Avg. Learning Time</p>
            <h3 className="font-heading text-headline-md text-on-surface font-extrabold">{stats.avgLearningTime}</h3>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="p-2 bg-tertiary-fixed rounded-lg text-tertiary material-symbols-outlined">check_circle</span>
              <span className="text-on-surface-variant font-bold text-[10px] flex items-center gap-0.5">
                -0.8% <span className="material-symbols-outlined text-[10px]">south_east</span>
              </span>
            </div>
            <p className="font-semibold text-xs text-on-surface-variant uppercase tracking-wider mb-1">Completion Rate</p>
            <h3 className="font-heading text-headline-md text-on-surface font-extrabold">{stats.completionRate}</h3>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="p-2 bg-error-container text-error rounded-lg material-symbols-outlined">star</span>
              <span className="text-emerald-600 font-bold text-[10px] flex items-center gap-0.5">
                +0.1 <span className="material-symbols-outlined text-[10px]">north_east</span>
              </span>
            </div>
            <p className="font-semibold text-xs text-on-surface-variant uppercase tracking-wider mb-1">Avg. Course Rating</p>
            <h3 className="font-heading text-headline-md text-on-surface font-extrabold">{stats.rating}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Line Chart */}
        <div className="lg:col-span-8 bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-heading text-headline-sm font-bold text-on-surface">Performance Trends</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-xs font-semibold text-on-surface-variant">Engagement</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-xs font-semibold text-on-surface-variant">Completion</span>
              </div>
            </div>
          </div>
          <div className="h-64 relative">
            <svg className="w-full h-full" viewBox="0 0 800 240">
              <line className="stroke-slate-100" strokeWidth="1" x1="0" x2="800" y1="240" y2="240"></line>
              <line className="stroke-slate-100" strokeDasharray="4" strokeWidth="1" x1="0" x2="800" y1="180" y2="180"></line>
              <line className="stroke-slate-100" strokeDasharray="4" strokeWidth="1" x1="0" x2="800" y1="120" y2="120"></line>
              <line className="stroke-slate-100" strokeDasharray="4" strokeWidth="1" x1="0" x2="800" y1="60" y2="60"></line>
              {/* Engagement Path */}
              <path d="M0,180 Q50,150 100,160 T200,100 T300,120 T400,60 T500,80 T600,40 T700,50 T800,20" fill="none" stroke="#3525cd" strokeLinecap="round" strokeWidth="3"></path>
              {/* Completion Path */}
              <path d="M0,220 Q50,210 100,190 T200,160 T300,170 T400,140 T500,150 T600,130 T700,140 T800,120" fill="none" stroke="#10b981" strokeDasharray="2 4" strokeLinecap="round" strokeWidth="3"></path>
            </svg>
            <div className="flex justify-between mt-4 text-xs font-bold text-outline px-2">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
        </div>

        {/* Weekly Pattern Bar Chart */}
        <div className="lg:col-span-4 bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-8 shadow-sm">
          <h3 className="font-heading text-headline-sm font-bold text-on-surface mb-6">Weekly Patterns</h3>
          <div className="flex items-end justify-between h-56 gap-2">
            {[45, 65, 85, 95, 70, 30, 25].map((h, idx) => (
              <div key={idx} className="w-full flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-primary/20 rounded-t-lg transition-all hover:bg-primary" 
                  style={{ height: `${h}%` }}
                ></div>
                <span className="text-xs font-bold text-outline">{["M", "T", "W", "T", "F", "S", "S"][idx]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Heatmap */}
        <div className="md:col-span-5 bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-8 shadow-sm">
          <h3 className="font-heading text-headline-sm font-bold text-on-surface mb-6">Peak Activity Hours</h3>
          <div className="grid grid-cols-6 gap-2">
            {heatmapCells.map((cell) => (
              <div 
                key={cell.id} 
                className={`aspect-square rounded-md cursor-pointer transition-all duration-200 hover:scale-110 ${cell.bgClass}`}
                title={`${cell.activity} activity`}
              ></div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] font-bold text-outline">
            <span>08:00 AM</span>
            <span>12:00 PM</span>
            <span>06:00 PM</span>
            <span>11:00 PM</span>
          </div>
        </div>

        {/* Top Performing Courses */}
        <div className="md:col-span-7 bg-surface-container-lowest border border-outline-variant/60 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-outline-variant/60 flex items-center justify-between">
            <h3 className="font-heading text-headline-sm font-bold text-on-surface">Top Performing Courses</h3>
            <button 
              onClick={() => alert("CSV Export course performance")}
              className="text-primary font-bold text-xs hover:underline cursor-pointer"
            >
              Export CSV
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low/50 border-b border-outline-variant/30">
                <tr>
                  <th className="px-6 py-4 font-bold text-xs text-on-surface-variant">Course Name</th>
                  <th className="px-6 py-4 font-bold text-xs text-on-surface-variant">Students</th>
                  <th className="px-6 py-4 font-bold text-xs text-on-surface-variant">Completion</th>
                  <th className="px-6 py-4 font-bold text-xs text-on-surface-variant">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {courses.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-on-surface-variant text-sm font-semibold">
                      No courses found.
                    </td>
                  </tr>
                ) : (
                  courses.map((course) => (
                    <tr key={course.id} className="hover:bg-primary/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center overflow-hidden shrink-0 border border-outline-variant/20">
                            {course.imageUrl ? (
                              <img alt={course.title} className="w-full h-full object-cover" src={course.imageUrl} />
                            ) : (
                              <span className="material-symbols-outlined text-primary text-xl">school</span>
                            )}
                          </div>
                          <span className="text-sm font-bold text-on-surface truncate max-w-[220px]">{course.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold text-on-surface-variant">{course.studentCount}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-surface-container rounded-full overflow-hidden shrink-0">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${course.completion}%` }}></div>
                          </div>
                          <span className="text-xs font-bold text-on-surface-variant">{course.completion}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-[9px] uppercase font-bold rounded-full ${course.badgeClass}`}>
                          {course.badge}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
