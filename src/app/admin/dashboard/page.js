"use client";

import { useState } from "react";

export default function AdminDashboardPage() {
  const [filterQuery, setFilterQuery] = useState("");
  const [activeTab, setActiveTab] = useState("month");

  const teachers = [
    {
      name: "Dr. Sarah Jenkins",
      email: "sarah.j@adhyan.edu",
      specialization: "Advanced Physics",
      status: "Active",
      statusClass: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8vFfaQKYa1xvA3JJ9wktXfqzAghCtSgXAGZ-2-v7ecWno0ovFx6q5tkRH5ZHFzXfUZR89R1xfYNg3--UEVYhvFfA3265f4d10OLcUh5uqlrW3Vx9cpo2UtBEkR4_N1S_12iIxZslbH4acKD1yNwkKezQhajJGh3c9JAb9wr5EseBPQjbiAwCKS-rNP6tmlsKmiICuCaMkuMYWipERNJf9hByF9-T7k69Bo28oRO8y_jkQKCEZzcFc95XXg-mQBiH8iTh8RTHN_Gxp",
    },
    {
      name: "Mark Thompson",
      email: "m.thompson@adhyan.edu",
      specialization: "Creative Writing",
      status: "On Leave",
      statusClass: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdDuUTMxIam4N19U7eRf_kxSXRu1RonBPTzKEalyAjmkK3SIDoMj7gkfE-aJZ_svGHIdv-vO9Beo-dKZl0W5q6XbUnzsM1VsN3sgQeXOMukyCSoscQjeZ1X2QQhq9NOwdWMlHGP_9Wcf7M-WZGAe5Vgn9NcDeY92H6p4upXVV2LRt80mY_FAtAtkGqLOAGnQFzQg2B4UVvh7fgh95wAKAOCuu1drEJKsECEaeHEhDdluVKyc_7C4NWdXPwPkT5CTWt4M0ifV3b60Xt",
    },
    {
      name: "Elena Rodriguez",
      email: "elena.r@adhyan.edu",
      specialization: "UX Design",
      status: "Active",
      statusClass: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2kaGn9ymLLFqk5yk9O9t_Q7nqWmoMRJCB2caUW09LYyWf3GKDHMX4yXdxm1cw6EggIs5GisDb6bcXrjutKYB_tqxqUuw7zfU5s89PocKM5WbXDDDMFzMgjby8PynEG9bZUPmT3bIFMZnx69Ppk_qdSYciwG7KTpii1YCGFqwyjO5wsquMqgrf60XblwYR1m1HAy02J7ZlwP6suY5LdDby_Ix8k6LIgYF1Jiei9Wh9d-9JUN1_TQ_sV2YAg7nanwWqRaRGVNvsbjvZ",
    },
  ];

  const students = [
    {
      name: "Alex Johnson",
      initials: "AJ",
      time: "Enrolled 2d ago",
      batch: "Batch A-2026",
      bgClass: "bg-secondary-container text-on-secondary-container",
    },
    {
      name: "Sofia Miller",
      initials: "SM",
      time: "Enrolled 5d ago",
      batch: "Batch B-2026",
      bgClass: "bg-tertiary-container text-on-tertiary-container",
    },
    {
      name: "Ryan White",
      initials: "RW",
      time: "Enrolled 1w ago",
      batch: "Batch A-2026",
      bgClass: "bg-primary-container text-on-primary-container",
    },
  ];

  const growthData = {
    week: [
      { label: "Mon", height: "h-1/3", fill: "h-1/5" },
      { label: "Tue", height: "h-1/2", fill: "h-1/3" },
      { label: "Wed", height: "h-2/3", fill: "h-2/5" },
      { label: "Thu", height: "h-3/4", fill: "h-1/2" },
      { label: "Fri", height: "h-5/6", fill: "h-3/5" },
      { label: "Sat", height: "h-1/2", fill: "h-1/4" },
      { label: "Sun", height: "h-3/5", fill: "h-2/5" },
    ],
    month: [
      { label: "01 Jun", height: "h-3/4", fill: "h-1/2" },
      { label: "05 Jun", height: "h-2/3", fill: "h-2/5" },
      { label: "10 Jun", height: "h-5/6", fill: "h-3/5" },
      { label: "15 Jun", height: "h-1/2", fill: "h-1/4" },
      { label: "20 Jun", height: "h-4/5", fill: "h-1/2" },
      { label: "25 Jun", height: "h-full", fill: "h-3/4" },
      { label: "30 Jun", height: "h-2/3", fill: "h-1/3" },
    ],
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    s.batch.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <main className="p-gutter lg:p-lg space-y-md lg:space-y-lg">
      
      {/* Stats Section (Asymmetric Bento-like grid) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-gutter">
        <div className="glass-card p-md rounded-2xl soft-ui-shadow hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="p-3 bg-primary-container/10 text-primary rounded-xl material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              school
            </span>
            <span className="text-emerald-500 text-xs font-bold flex items-center gap-0.5">
              +12% <span className="material-symbols-outlined text-xs">trending_up</span>
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-bold text-on-surface-variant">Total Teachers</p>
            <h2 className="font-heading text-headline-md font-bold text-on-surface">1,284</h2>
          </div>
        </div>

        <div className="glass-card p-md rounded-2xl soft-ui-shadow hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="p-3 bg-secondary-container/10 text-secondary rounded-xl material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              group
            </span>
            <span className="text-emerald-500 text-xs font-bold flex items-center gap-0.5">
              +8% <span className="material-symbols-outlined text-xs">trending_up</span>
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-bold text-on-surface-variant">Total Students</p>
            <h2 className="font-heading text-headline-md font-bold text-on-surface">14,920</h2>
          </div>
        </div>

        <div className="glass-card p-md rounded-2xl soft-ui-shadow hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="p-3 bg-tertiary-container/10 text-tertiary rounded-xl material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              layers
            </span>
            <span className="text-on-surface-variant text-xs font-bold">Stable</span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-bold text-on-surface-variant">Active Batches</p>
            <h2 className="font-heading text-headline-md font-bold text-on-surface">342</h2>
          </div>
        </div>

        <div className="bg-primary p-md rounded-2xl soft-ui-shadow hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-between text-on-primary">
          <div className="flex justify-between items-start">
            <span className="p-3 bg-white/20 text-white rounded-xl material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              payments
            </span>
            <span className="text-white/80 text-xs font-bold flex items-center gap-0.5">
              +24% <span className="material-symbols-outlined text-xs">trending_up</span>
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-on-primary/80">Platform Revenue</p>
            <h2 className="font-heading text-headline-md font-bold text-white">$124,500</h2>
          </div>
        </div>
      </section>

      {/* Grid: Teacher List & Student Batch Enrollment */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-gutter">
        {/* Left: Teacher Management Panel */}
        <div className="xl:col-span-2 glass-card rounded-2xl soft-ui-shadow overflow-hidden">
          <div className="p-md border-b border-outline-variant/30 flex flex-col sm:flex-row justify-between sm:items-center bg-white/40 gap-md">
            <div>
              <h3 className="font-heading text-headline-sm font-bold text-on-surface">Teacher Management</h3>
              <p className="text-xs text-on-surface-variant">Oversee educator profiles and specializations</p>
            </div>
            <button className="bg-primary text-on-primary px-sm py-2 rounded-xl text-xs font-semibold hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 self-start sm:self-auto shadow-sm">
              <span className="material-symbols-outlined text-sm">person_add</span>
              Register New Teacher
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low/60 text-on-surface-variant text-[10px] font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Educator</th>
                  <th className="px-6 py-4">Specialization</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {teachers.map((teacher, index) => (
                  <tr key={index} className="hover:bg-primary/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          alt={teacher.name} 
                          className="w-10 h-10 rounded-full object-cover border border-outline-variant/30" 
                          src={teacher.avatar}
                        />
                        <div>
                          <p className="font-heading text-sm font-bold text-on-surface leading-tight">{teacher.name}</p>
                          <p className="text-[11px] text-on-surface-variant">{teacher.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-on-surface-variant">
                      {teacher.specialization}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${teacher.statusClass}`}>
                        {teacher.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-1.5 text-on-surface-variant hover:text-primary rounded-lg hover:bg-surface-container-low transition-colors flex items-center justify-center">
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Student & Batch Management */}
        <div className="xl:col-span-1 glass-card rounded-2xl soft-ui-shadow flex flex-col justify-between overflow-hidden">
          <div className="p-md border-b border-outline-variant/30 bg-white/40">
            <h3 className="font-heading text-headline-sm font-bold text-on-surface">Student &amp; Batches</h3>
            <p className="text-xs text-on-surface-variant">Quick enrollment and batch actions</p>
          </div>
          
          <div className="p-md space-y-md flex-1 overflow-y-auto max-h-[350px]">
            {/* Quick Filter */}
            <div className="relative">
              <input 
                className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant/30 rounded-xl text-xs text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary transition-all" 
                placeholder="Filter by batch or name..." 
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
              />
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 text-lg">
                filter_list
              </span>
            </div>

            {/* List */}
            <div className="space-y-sm">
              {filteredStudents.map((student, idx) => (
                <div key={idx} className="p-sm rounded-xl border border-outline-variant/30 hover:border-primary transition-all group flex flex-col gap-sm">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${student.bgClass} flex items-center justify-center font-bold text-xs`}>
                        {student.initials}
                      </div>
                      <div>
                        <p className="font-heading text-xs font-bold text-on-surface">{student.name}</p>
                        <p className="text-[9px] text-on-surface-variant">{student.time}</p>
                      </div>
                    </div>
                    <button className="material-symbols-outlined text-sm text-on-surface-variant/50 hover:text-primary flex items-center justify-center p-0.5 rounded hover:bg-surface-container-low">
                      more_vert
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-on-surface-variant">layers</span>
                      <span className="text-[10px] font-bold text-on-surface-variant">{student.batch}</span>
                    </div>
                    <select className="text-[10px] font-bold bg-surface border border-outline-variant/50 px-2 py-0.5 rounded text-primary focus:outline-none focus:ring-0 cursor-pointer">
                      <option>Change Batch</option>
                      <option>Batch A-2026</option>
                      <option>Batch B-2026</option>
                      <option>Weekend Special</option>
                    </select>
                  </div>
                </div>
              ))}
              {filteredStudents.length === 0 && (
                <p className="text-xs text-on-surface-variant text-center py-sm">No matching students found.</p>
              )}
            </div>
          </div>

          <div className="p-sm bg-surface-container-high/40 text-center border-t border-outline-variant/20">
            <button className="text-primary text-xs font-bold hover:underline">View All Students</button>
          </div>
        </div>
      </section>

      {/* Platform Activity Chart Section */}
      <section className="glass-card p-md lg:p-lg rounded-2xl soft-ui-shadow">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-md mb-8">
          <div>
            <h3 className="font-heading text-headline-sm font-bold text-on-surface">Enrollment Growth</h3>
            <p className="text-xs text-on-surface-variant">Daily student registrations across all batches</p>
          </div>
          <div className="flex gap-2 bg-surface-container-low p-1 rounded-xl border border-outline-variant/20 self-start sm:self-auto shadow-inner">
            <button 
              onClick={() => setActiveTab("week")} 
              className={`px-sm py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === "week" ? "bg-white text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"}`}
            >
              Week
            </button>
            <button 
              onClick={() => setActiveTab("month")} 
              className={`px-sm py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === "month" ? "bg-white text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"}`}
            >
              Month
            </button>
          </div>
        </div>

        {/* Dynamic representative charts */}
        <div className="h-64 w-full relative flex items-end gap-3 md:gap-5 overflow-hidden px-4 border-b border-outline-variant/30 pb-2">
          {growthData[activeTab].map((bar, index) => (
            <div key={index} className={`flex-1 bg-primary/10 rounded-t-lg ${bar.height} relative group cursor-pointer`}>
              <div className={`absolute inset-x-0 bottom-0 bg-primary/40 rounded-t-lg ${bar.fill} group-hover:bg-primary transition-all duration-300`}></div>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-950 text-white text-[9px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow">
                +42 students
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between mt-4 px-4 text-[10px] font-bold text-on-surface-variant">
          {activeTab === "week" ? (
            <>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </>
          ) : (
            <>
              <span>01 Jun</span>
              <span>05 Jun</span>
              <span>10 Jun</span>
              <span>15 Jun</span>
              <span>20 Jun</span>
              <span>25 Jun</span>
              <span>30 Jun</span>
            </>
          )}
        </div>
      </section>

    </main>
  );
}
