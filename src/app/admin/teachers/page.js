"use client";

import React, { useState } from "react";

export default function TeacherManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);

  // Mock teacher data based on Stitch screen
  const initialTeachers = [
    {
      id: "T-101",
      name: "Sarah Chen",
      email: "sarah.chen@lumina.edu",
      specialization: "UX/UI Design & Psychology",
      department: "Computer Science",
      activeCourses: 4,
      rating: 4.9,
      status: "Active",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMb1OCLdb7c1UM9q6KnAWcEIWzu6aPpcYxjYfUs2x828exVEjSJunshAEItlY3yU2-g0_YJysJms5MRTGn-bYcPUk6LAOWLx9Np-iyRFXhLO4iOagFmUtsNww7Fg-iwgTRgA47HwQLXWPn09M29Vq3Jx5bKxMFCpZDbE7Af-zl4HHy5mpK-LeMPw0y91ddPdP9OJoayXhM0-QH8juT2rDCx5k1FZFoyScbJOH2ShdhDoi94hQ19FigahOiizW4yYDH-YeH3E6e-nY2",
    },
    {
      id: "T-102",
      name: "Marcus Rodriguez",
      email: "m.rodriguez@lumina.edu",
      specialization: "Full Stack Development",
      department: "Computer Science",
      activeCourses: 6,
      rating: 4.7,
      status: "Active",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7SP08xoqCgM4T_6xTVOxBC__rKtXdnHi2W-wDqWNrIEM4N0OqzaQsQx752waZs0du_na3iNOUev0fes1yfwOWZqB1RZYDEiDS-6rMa1cVqEslEzBuSdEbGtWgUsWpwzrIOUXgP-uoQZ39e-k_Ltdbdj8gzBysW98Bqwr7YUcBA3fILE_MhO3F_WKiRP0A5fRzJwZaVSHhC4HS8lRJ7glA84942A0mzPVdE3f7hJR-XrYzgK41d4QBu5cQ9mJS5D5uCozuohBZdSmR",
    },
    {
      id: "T-103",
      name: "Linda Wright",
      email: "l.wright@lumina.edu",
      specialization: "Ethics & Philosophy",
      department: "Liberal Arts",
      activeCourses: 2,
      rating: 4.5,
      status: "On Leave",
      avatar: "LW",
    },
    {
      id: "T-104",
      name: "David Miller",
      email: "david.m@lumina.edu",
      specialization: "Marketing Dynamics",
      department: "Business Management",
      activeCourses: 3,
      rating: 4.8,
      status: "Active",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8pZCSRkWx0xcMEJZTL6FHDd1z2szTE7nbfuluG7XJEBgW8_wDu8PBb7yWikEdVCZvT0TcmQdNhfgzki197l1OU_sICwmYqzLYaLKeugeYQ3BWTRgcg993CSvlYbX7OZh1MPP76lKm2OrngXVWZIhWkBI9QRUhqJcOyi4VYqeA0tZFl_kJZ8qJBn3r9tJdGLZ98TPcyx3uM5mTb17ABUIwnbCupRD_PMt_8kLzMQl-jOMLdh13sPMvcpUop6NVbAJmRTyoxPYsb6Bi",
    },
    {
      id: "T-105",
      name: "Dr. Sarah Jenkins",
      email: "sarah.j@lumina.edu",
      specialization: "Advanced Physics",
      department: "Applied Sciences",
      activeCourses: 5,
      rating: 4.9,
      status: "Active",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8vFfaQKYa1xvA3JJ9wktXfqzAghCtSgXAGZ-2-v7ecWno0ovFx6q5tkRH5ZHFzXfUZR89R1xfYNg3--UEVYhvFfA3265f4d10OLcUh5uqlrW3Vx9cpo2UtBEkR4_N1S_12iIxZslbH4acKD1yNwkKezQhajJGh3c9JAb9wr5EseBPQjbiAwCKS-rNP6tmlsKmiICuCaMkuMYWipERNJf9hByF9-T7k69Bo28oRO8y_jkQKCEZzcFc95XXg-mQBiH8iTh8RTHN_Gxp",
    },
    {
      id: "T-106",
      name: "Mark Thompson",
      email: "m.thompson@lumina.edu",
      specialization: "Creative Writing & Literature",
      department: "Liberal Arts",
      activeCourses: 3,
      rating: 4.6,
      status: "On Leave",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdDuUTMxIam4N19U7eRf_kxSXRu1RonBPTzKEalyAjmkK3SIDoMj7gkfE-aJZ_svGHIdv-vO9Beo-dKZl0W5q6XbUnzsM1VsN3sgQeXOMukyCSoscQjeZ1X2QQhq9NOwdWMlHGP_9Wcf7M-WZGAe5Vgn9NcDeY92H6p4upXVV2LRt80mY_FAtAtkGqLOAGnQFzQg2B4UVvh7fgh95wAKAOCuu1drEJKsECEaeHEhDdluVKyc_7C4NWdXPwPkT5CTWt4M0ifV3b60Xt",
    },
    {
      id: "T-107",
      name: "Dr. James Wilson",
      email: "james.wilson@lumina.edu",
      specialization: "Applied Math & Calculus",
      department: "Applied Sciences",
      activeCourses: 4,
      rating: 4.8,
      status: "Active",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxCZ8Jw1mCj5y-orQMr2Z-vIr2lb4tKVGx1t3G5J9sAashyJy8P4QIeTwQe02bCMq0yXfEyeNvyttbpFaOwt0q34PLYWdZy2KTIa0aCDaU7tTqrOKgDP_ILQwyqXRvbW6N_Ydje_F7_cenWC1AQHIQ1z6VZcn8O-xSeUqf-7-GItgXj4azI-ZjjNYjN4CL3t1F6bv952kG1wJNNWxnOr9lMUtf9p5d4w4RRAa9WqFq6fNHV0xovYqa5GkcXvMIY4fthXVmlSKJ0i21",
    },
  ];

  // Filtering Logic
  const filteredTeachers = initialTeachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept =
      departmentFilter === "All Departments" || teacher.department === departmentFilter;

    const matchesStatus =
      statusFilter === "All Status" || teacher.status === statusFilter;

    return matchesSearch && matchesDept && matchesStatus;
  });

  const totalPages = Math.ceil(filteredTeachers.length / 5) || 1;
  const paginatedTeachers = filteredTeachers.slice(
    (currentPage - 1) * 5,
    currentPage * 5
  );

  return (
    <main className="p-gutter max-w-container-max mx-auto pb-32 space-y-gutter">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 text-on-surface-variant">
            <span className="font-semibold text-[11px] uppercase tracking-wider">Admin</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="font-semibold text-[11px] uppercase tracking-wider text-primary">Teachers</span>
          </div>
          <h2 className="font-heading text-display-lg-mobile md:text-headline-md text-on-surface tracking-tight font-extrabold leading-tight">
            Teacher Management
          </h2>
          <p className="text-body-md text-on-surface-variant mt-1">
            Oversee faculty performance, assignments, and professional records.
          </p>
        </div>
        <button 
          onClick={() => alert("Registration modal under construction.")}
          className="flex items-center gap-2 bg-primary text-on-primary px-lg py-2.5 rounded-xl font-semibold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">person_add</span>
          <span>Register New Teacher</span>
        </button>
      </section>

      {/* Dashboard Stats Grid (Bento Style) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-gutter">
        <div className="bg-surface-container-lowest border border-outline-variant/60 p-6 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <span className="material-symbols-outlined text-primary text-3xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>
            school
          </span>
          <div>
            <p className="text-on-surface-variant font-semibold text-[10px] uppercase tracking-wider">Total Teachers</p>
            <h3 className="font-heading text-headline-md font-extrabold text-on-surface mt-1">148</h3>
          </div>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant/60 p-6 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <span className="material-symbols-outlined text-emerald-600 text-3xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
          <div>
            <p className="text-on-surface-variant font-semibold text-[10px] uppercase tracking-wider">Active Status</p>
            <h3 className="font-heading text-headline-md font-extrabold text-on-surface mt-1">132</h3>
          </div>
        </div>
        <div className="bg-surface-container-lowest border border-l-4 border-l-tertiary border-y-outline-variant/60 border-r-outline-variant/60 border p-6 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <span className="material-symbols-outlined text-tertiary text-3xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>
            star
          </span>
          <div>
            <p className="text-on-surface-variant font-semibold text-[10px] uppercase tracking-wider">Avg. Faculty Rating</p>
            <h3 className="font-heading text-headline-md font-extrabold text-on-surface mt-1">4.82</h3>
          </div>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant/60 p-6 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <span className="material-symbols-outlined text-on-secondary-container text-3xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>
            pending_actions
          </span>
          <div>
            <p className="text-on-surface-variant font-semibold text-[10px] uppercase tracking-wider">Pending Approvals</p>
            <h3 className="font-heading text-headline-md font-extrabold text-on-surface mt-1">16</h3>
          </div>
        </div>
      </section>

      {/* Filters & Controls */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 flex flex-col md:flex-row gap-4 items-center border-b border-outline-variant/40">
          <div className="relative w-full md:w-1/3">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
              search
            </span>
            <input
              type="text"
              placeholder="Search by name, email, or skill..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant/30 rounded-xl focus:border-primary focus:ring-0 outline-none text-xs"
            />
          </div>
          <div className="flex flex-wrap gap-3 w-full md:w-auto ml-auto justify-end">
            <select
              value={departmentFilter}
              onChange={(e) => {
                setDepartmentFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-surface border border-outline-variant/60 rounded-xl text-xs font-semibold text-on-surface-variant px-3 py-2 outline-none focus:border-primary cursor-pointer"
            >
              <option value="All Departments">All Departments</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Liberal Arts">Liberal Arts</option>
              <option value="Applied Sciences">Applied Sciences</option>
              <option value="Business Management">Business Management</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-surface border border-outline-variant/60 rounded-xl text-xs font-semibold text-on-surface-variant px-3 py-2 outline-none focus:border-primary cursor-pointer"
            >
              <option value="All Status">All Status</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
            </select>
          </div>
        </div>

        {/* Directory Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/40">
                <th className="px-6 py-4 font-bold text-[10px] text-on-surface-variant uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 font-bold text-[10px] text-on-surface-variant uppercase tracking-wider">Specialization</th>
                <th className="px-6 py-4 font-bold text-[10px] text-on-surface-variant uppercase tracking-wider text-center">Active Courses</th>
                <th className="px-6 py-4 font-bold text-[10px] text-on-surface-variant uppercase tracking-wider">Rating</th>
                <th className="px-6 py-4 font-bold text-[10px] text-on-surface-variant uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 font-bold text-[10px] text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {paginatedTeachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {typeof teacher.avatar === "string" && teacher.avatar.startsWith("http") ? (
                        <img
                          alt={teacher.name}
                          className="w-10 h-10 rounded-full object-cover border border-outline-variant/30"
                          src={teacher.avatar}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold text-sm border border-outline-variant/30">
                          {teacher.avatar}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-sm text-on-surface leading-tight">{teacher.name}</p>
                        <p className="text-[11px] text-on-surface-variant mt-0.5">{teacher.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-semibold text-on-surface-variant">{teacher.specialization}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-primary-fixed text-on-primary-fixed text-[11px] font-bold px-2.5 py-1 rounded-full">
                      {teacher.activeCourses}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-tertiary">
                      <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      <span className="ml-1 font-bold text-xs">{teacher.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        teacher.status === "Active"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-surface-container-high text-on-surface-variant"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${teacher.status === "Active" ? "bg-emerald-500" : "bg-secondary"} mr-1.5`}></span>
                      {teacher.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => alert(`Viewing profile for ${teacher.name}`)}
                        className="p-1.5 rounded-lg text-on-surface-variant hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
                        title="View Profile"
                      >
                        <span className="material-symbols-outlined text-sm">visibility</span>
                      </button>
                      <button
                        onClick={() => alert(`Editing record for ${teacher.name}`)}
                        className="p-1.5 rounded-lg text-on-surface-variant hover:bg-secondary hover:text-on-secondary transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginatedTeachers.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-xs text-on-surface-variant italic">
                    No faculty members found matching filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 flex items-center justify-between bg-surface-container-low border-t border-outline-variant/40">
          <p className="text-[11px] text-on-surface-variant font-medium">
            Showing {paginatedTeachers.length} of {filteredTeachers.length} teachers
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-outline-variant/60 hover:bg-surface disabled:opacity-40 transition-colors flex items-center justify-center cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <div className="flex items-center px-4 font-bold text-xs text-on-surface">
              Page {currentPage} of {totalPages}
            </div>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-outline-variant/60 hover:bg-surface disabled:opacity-40 transition-colors flex items-center justify-center cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </section>

      {/* Contextual Action Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        <div className="bg-primary-container text-on-primary-container p-6 rounded-2xl flex items-center gap-6 shadow-sm">
          <div className="bg-white/20 p-4 rounded-full text-white shrink-0">
            <span className="material-symbols-outlined text-4xl">analytics</span>
          </div>
          <div>
            <h4 className="font-heading text-headline-sm font-bold leading-tight">Performance Reviews</h4>
            <p className="text-xs opacity-90 mt-1.5 leading-relaxed">
              Mid-term faculty evaluation reports are now ready for download and review.
            </p>
            <button 
              onClick={() => alert("Downloading mid-term faculty reports...")}
              className="mt-4 bg-white text-primary font-bold px-4 py-2 rounded-xl text-xs hover:bg-opacity-90 active:scale-95 transition-all cursor-pointer shadow-sm"
            >
              Download Reports
            </button>
          </div>
        </div>
        <div className="bg-surface-container-highest text-on-surface p-6 rounded-2xl flex items-center gap-6 shadow-sm border border-outline-variant/20">
          <div className="bg-primary p-4 rounded-full text-on-primary shrink-0">
            <span className="material-symbols-outlined text-4xl">assignment</span>
          </div>
          <div>
            <h4 className="font-heading text-headline-sm font-bold leading-tight">Assign New Batches</h4>
            <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
              Need to allocate teachers for the upcoming Autumn 2026 semester?
            </p>
            <button 
              onClick={() => window.location.href = "/admin/batches"}
              className="mt-4 bg-secondary text-on-secondary font-bold px-4 py-2 rounded-xl text-xs hover:bg-opacity-90 active:scale-95 transition-all cursor-pointer shadow-sm"
            >
              Start Allocation
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
