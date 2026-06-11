"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function BatchManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);

  // Mock batch data based on Stitch screen
  const initialBatches = [
    {
      id: "BATCH-2026-A01",
      title: "Advanced UI/UX Design",
      teacher: "Prof. Sarah Mitchell",
      studentsCount: 24,
      maxStudents: 30,
      startDate: "Oct 12, 2023",
      progress: 68,
      status: "ACTIVE",
      statusClass: "bg-primary/10 text-primary",
      progressClass: "bg-primary",
    },
    {
      id: "BATCH-2026-D04",
      title: "Full-Stack Development",
      teacher: "Dr. James Wilson",
      studentsCount: 42,
      maxStudents: 50,
      startDate: "Nov 05, 2023",
      progress: 32,
      status: "STABLE",
      statusClass: "bg-secondary-container text-on-secondary-container",
      progressClass: "bg-secondary",
    },
    {
      id: "BATCH-2026-S99",
      title: "Data Science Foundations",
      teacher: "Prof. Elena Rodriguez",
      studentsCount: 18,
      maxStudents: 20,
      startDate: "Aug 15, 2023",
      progress: 94,
      status: "NEAR COMPLETION",
      statusClass: "bg-tertiary-fixed text-on-tertiary-fixed",
      progressClass: "bg-tertiary-container",
    },
    {
      id: "BATCH-2026-M12",
      title: "Marketing Strategy",
      teacher: "Prof. Mark Thompson",
      studentsCount: 35,
      maxStudents: 40,
      startDate: "Dec 01, 2023",
      progress: 15,
      status: "ACTIVE",
      statusClass: "bg-primary/10 text-primary",
      progressClass: "bg-primary",
    },
    {
      id: "BATCH-2026-C08",
      title: "Cybersecurity Essentials",
      teacher: "Prof. Chris Nakamura",
      studentsCount: 28,
      maxStudents: 35,
      startDate: "Oct 28, 2023",
      progress: 52,
      status: "ACTIVE",
      statusClass: "bg-primary/10 text-primary",
      progressClass: "bg-primary",
    },
  ];

  // Filtering Logic
  const filteredBatches = initialBatches.filter((batch) => {
    const matchesSearch =
      batch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      batch.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      batch.teacher.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" ||
      (statusFilter === "Active" && batch.status === "ACTIVE") ||
      (statusFilter === "Stable" && batch.status === "STABLE") ||
      (statusFilter === "Near Completion" && batch.status === "NEAR COMPLETION");

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredBatches.length / 5) || 1;
  const paginatedBatches = filteredBatches.slice(
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
            <span className="font-semibold text-[11px] uppercase tracking-wider text-primary">Batches</span>
          </div>
          <h2 className="font-heading text-display-lg-mobile md:text-headline-md text-primary font-extrabold tracking-tight">
            Batch Management
          </h2>
          <p className="text-body-md text-on-surface-variant mt-1">
            Oversee and manage current educational cohorts across all tracks.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base">
              search
            </span>
            <input
              type="text"
              placeholder="Search batches..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-surface-container border border-outline-variant/30 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-primary outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-surface border border-outline-variant/60 rounded-xl text-xs font-semibold text-on-surface px-3 py-2 outline-none focus:border-primary cursor-pointer"
          >
            <option value="All Status">All Status</option>
            <option value="Active">Active</option>
            <option value="Stable">Stable</option>
            <option value="Near Completion">Near Completion</option>
          </select>
        </div>
      </section>

      {/* Bento Grid View of Cohorts */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedBatches.map((batch) => (
          <div
            key={batch.id}
            className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 group shadow-sm hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-0.5 rounded-full text-[9px] font-bold tracking-wider ${batch.statusClass}`}>
                  {batch.status}
                </span>
                <button 
                  onClick={() => alert(`Settings for ${batch.id}`)}
                  className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">more_vert</span>
                </button>
              </div>
              <h3 className="font-heading text-headline-sm text-on-surface mb-1 group-hover:text-primary transition-colors font-bold">
                {batch.title}
              </h3>
              <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mb-4">ID: {batch.id}</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="flex items-center gap-1.5 text-on-surface-variant">
                    <span className="material-symbols-outlined text-base">person</span> 
                    <span>Teacher</span>
                  </span>
                  <span className="font-semibold text-on-surface">{batch.teacher}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="flex items-center gap-1.5 text-on-surface-variant">
                    <span className="material-symbols-outlined text-base">group</span> 
                    <span>Students</span>
                  </span>
                  <span className="font-semibold text-on-surface">
                    {batch.studentsCount}/{batch.maxStudents}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="flex items-center gap-1.5 text-on-surface-variant">
                    <span className="material-symbols-outlined text-base">calendar_today</span> 
                    <span>Started</span>
                  </span>
                  <span className="font-semibold text-on-surface">{batch.startDate}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-outline-variant/30">
              <div className="flex justify-between items-end mb-2 text-xs font-bold">
                <span className="text-primary">Progress</span>
                <span className="text-on-surface-variant">{batch.progress}%</span>
              </div>
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${batch.progressClass}`}
                  style={{ width: `${batch.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}

        {/* Create New Batch Dashboard Link Card */}
        {currentPage === 1 && searchQuery === "" && (
          <Link
            href="/admin/batches/create"
            className="border-2 border-dashed border-outline-variant rounded-2xl p-6 flex flex-col items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary hover:bg-primary/5 transition-all group cursor-pointer shadow-sm min-h-[280px]"
          >
            <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
              <span className="material-symbols-outlined text-3xl">add</span>
            </div>
            <h3 className="font-heading text-headline-sm font-bold">Create New Batch</h3>
            <p className="text-xs text-on-surface-variant mt-2 text-center max-w-[200px] leading-relaxed">
              Start a new cohort with fresh curriculum and students.
            </p>
          </Link>
        )}
      </section>

      {/* Pagination Footer */}
      <section className="mt-12 flex justify-between items-center bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/60 shadow-sm">
        <div className="text-xs text-on-surface-variant font-medium">
          Showing <span className="font-bold text-on-surface">{filteredBatches.length}</span> of <span className="font-bold text-on-surface">{initialBatches.length}</span> active batches
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-outline-variant/60 hover:bg-surface-container-high disabled:opacity-35 cursor-pointer flex items-center"
          >
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentPage === page
                  ? "bg-primary text-on-primary shadow"
                  : "hover:bg-surface-container-high text-on-surface-variant"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-outline-variant/60 hover:bg-surface-container-high disabled:opacity-35 cursor-pointer flex items-center"
          >
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </section>
    </main>
  );
}
