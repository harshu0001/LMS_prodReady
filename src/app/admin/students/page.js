"use client";

import React, { useState } from "react";

export default function StudentManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [batchFilter, setBatchFilter] = useState("All Batches");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Mock student directory data
  const initialStudents = [
    {
      id: "S-201",
      name: "Elena Martinez",
      email: "elena.m@example.com",
      batch: "UX/UI Summer 24",
      track: "Design Track",
      enrollmentDate: "May 12, 2024",
      progress: 85,
      status: "Active",
      initials: "EM",
    },
    {
      id: "S-202",
      name: "Julian Smith",
      email: "julian.s@example.com",
      batch: "Advanced Web Dev",
      track: "React Module",
      enrollmentDate: "April 28, 2024",
      progress: 42,
      status: "Active",
      initials: "JS",
    },
    {
      id: "S-203",
      name: "Sarah Chen",
      email: "sarah.c@example.com",
      batch: "Data Science Bootcamp",
      track: "Python Stream",
      enrollmentDate: "June 02, 2024",
      progress: 12,
      status: "On Leave",
      initials: "SC",
    },
    {
      id: "S-204",
      name: "Liam Wilson",
      email: "liam.w@example.com",
      batch: "UX/UI Summer 24",
      track: "Design Track",
      enrollmentDate: "May 10, 2024",
      progress: 100,
      status: "Completed",
      initials: "LW",
    },
    {
      id: "S-205",
      name: "Amara Okoye",
      email: "amara.o@example.com",
      batch: "Data Science Bootcamp",
      track: "Python Stream",
      enrollmentDate: "June 01, 2024",
      progress: 55,
      status: "Active",
      initials: "AO",
    },
    {
      id: "S-206",
      name: "Ethan Hunt",
      email: "ethan.h@example.com",
      batch: "Advanced Web Dev",
      track: "React Module",
      enrollmentDate: "May 01, 2024",
      progress: 90,
      status: "Active",
      initials: "EH",
    },
  ];

  // Filtering Logic
  const filteredStudents = initialStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBatch =
      batchFilter === "All Batches" || student.batch === batchFilter;

    const matchesStatus =
      statusFilter === "All Status" || student.status === statusFilter;

    return matchesSearch && matchesBatch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredStudents.length / 5) || 1;
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * 5,
    currentPage * 5
  );

  // Checkbox Selection Handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allPageIds = paginatedStudents.map((s) => s.id);
      setSelectedIds((prev) => [...new Set([...prev, ...allPageIds])]);
    } else {
      const allPageIds = paginatedStudents.map((s) => s.id);
      setSelectedIds((prev) => prev.filter((id) => !allPageIds.includes(id)));
    }
  };

  const handleSelectRow = (id, checked) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const isAllSelectedOnPage =
    paginatedStudents.length > 0 &&
    paginatedStudents.every((s) => selectedIds.includes(s.id));

  const isSomeSelectedOnPage =
    paginatedStudents.length > 0 &&
    paginatedStudents.some((s) => selectedIds.includes(s.id)) &&
    !isAllSelectedOnPage;

  const handleBulkChangeBatch = () => {
    const newBatch = prompt(`Shift ${selectedIds.length} selected students to which batch?`);
    if (newBatch) {
      alert(`Successfully moved students to "${newBatch}"!`);
      setSelectedIds([]);
    }
  };

  const handleBulkMessage = () => {
    const msg = prompt(`Compose message for ${selectedIds.length} selected students:`);
    if (msg) {
      alert(`Message broadcast successfully!`);
      setSelectedIds([]);
    }
  };

  const handleBulkDelete = () => {
    if (confirm(`Are you sure you want to remove the ${selectedIds.length} selected enrollments?`)) {
      alert(`Enrollments deleted.`);
      setSelectedIds([]);
    }
  };

  return (
    <main className="p-gutter max-w-container-max mx-auto pb-32 space-y-gutter relative">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 text-on-surface-variant">
            <span className="font-semibold text-[11px] uppercase tracking-wider">Admin</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="font-semibold text-[11px] uppercase tracking-wider text-primary">Students</span>
          </div>
          <h2 className="font-heading text-display-lg-mobile md:text-headline-md text-on-surface tracking-tight font-extrabold leading-tight">
            Student Directory
          </h2>
          <p className="text-body-md text-on-surface-variant mt-1">
            Manage enrollments, track progress, and organize student cohorts.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => alert("Advanced filtering options modal.")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-outline-variant text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all font-semibold text-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">filter_list</span>
            <span>Advanced Filters</span>
          </button>
          <button
            onClick={() => alert("Enrollment wizard loading...")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-on-primary shadow-lg shadow-primary/20 active:scale-95 transition-all font-semibold text-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">person_add</span>
            <span>Enroll Student</span>
          </button>
        </div>
      </section>

      {/* Stats Cards Bento */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
        <div className="bg-surface-container-lowest border border-outline-variant/60 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-primary-container/10 rounded-xl text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">group</span>
            </div>
            <span className="text-emerald-600 text-[10px] font-bold flex items-center gap-0.5">
              +12% <span className="material-symbols-outlined text-xs">trending_up</span>
            </span>
          </div>
          <p className="text-on-surface-variant font-semibold text-[10px] uppercase tracking-wider">Total Students</p>
          <h3 className="font-heading text-headline-md font-extrabold text-on-surface mt-1">2,482</h3>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/60 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-secondary-container/10 rounded-xl text-secondary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">play_circle</span>
            </div>
            <span className="text-on-surface-variant text-[10px] font-bold">Active Now</span>
          </div>
          <p className="text-on-surface-variant font-semibold text-[10px] uppercase tracking-wider">Engaged Learners</p>
          <h3 className="font-heading text-headline-md font-extrabold text-on-surface mt-1">1,120</h3>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/60 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-tertiary-container/10 rounded-xl text-tertiary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">pending_actions</span>
            </div>
            <span className="text-tertiary text-[10px] font-bold">42 Overdue</span>
          </div>
          <p className="text-on-surface-variant font-semibold text-[10px] uppercase tracking-wider">Pending Assignments</p>
          <h3 className="font-heading text-headline-md font-extrabold text-on-surface mt-1">384</h3>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/60 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-surface-variant/20 rounded-xl text-on-surface-variant flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">check_circle</span>
            </div>
            <span className="text-[10px] text-on-surface-variant font-bold">Completion</span>
          </div>
          <p className="text-on-surface-variant font-semibold text-[10px] uppercase tracking-wider">Avg. Course Progress</p>
          <h3 className="font-heading text-headline-md font-extrabold text-on-surface mt-1">78.5%</h3>
        </div>
      </section>

      {/* Roster & Grid Canvas */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-sm overflow-hidden">
        {/* Table Head Filters */}
        <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-outline-variant/40">
          <div className="relative w-full md:w-80">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
              search
            </span>
            <input
              type="text"
              placeholder="Search students, emails, IDs..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant/30 rounded-xl focus:border-primary focus:ring-0 outline-none text-xs"
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto justify-end">
            <select
              value={batchFilter}
              onChange={(e) => {
                setBatchFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-surface border border-outline-variant/60 rounded-xl text-xs font-semibold text-on-surface-variant px-3 py-2 outline-none focus:border-primary cursor-pointer"
            >
              <option value="All Batches">All Batches</option>
              <option value="UX/UI Summer 24">UX/UI Summer 24</option>
              <option value="Advanced Web Dev">Advanced Web Dev</option>
              <option value="Data Science Bootcamp">Data Science Bootcamp</option>
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
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Directory Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/40 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                <th className="px-6 py-4 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={isAllSelectedOnPage}
                    ref={(el) => {
                      if (el) el.indeterminate = isSomeSelectedOnPage;
                    }}
                    onChange={handleSelectAll}
                    className="rounded border-outline text-primary focus:ring-primary h-4 w-4 cursor-pointer"
                  />
                </th>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Batch Details</th>
                <th className="px-6 py-4">Enrollment Date</th>
                <th className="px-6 py-4">Course Progress</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {paginatedStudents.map((student) => {
                const isSelected = selectedIds.includes(student.id);
                return (
                  <tr
                    key={student.id}
                    className={`transition-colors hover:bg-primary/5 ${
                      isSelected ? "bg-primary-container/10" : ""
                    }`}
                  >
                    <td className="px-6 py-4 w-12 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => handleSelectRow(student.id, e.target.checked)}
                        className="rounded border-outline text-primary focus:ring-primary h-4 w-4 cursor-pointer"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary font-bold text-xs border border-outline-variant/20 shrink-0">
                          {student.initials}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-on-surface leading-tight">{student.name}</p>
                          <p className="text-[11px] text-on-surface-variant mt-0.5">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs font-semibold text-on-surface">{student.batch}</p>
                      <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">{student.track}</p>
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-on-surface-variant">
                      {student.enrollmentDate}
                    </td>
                    <td className="px-6 py-4 w-48">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-surface-container-high h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              student.progress === 100 ? "bg-emerald-500" : "bg-primary"
                            }`}
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-[11px] font-bold text-on-surface shrink-0">
                          {student.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-0.5 rounded-full text-[10px] font-bold ${
                          student.status === "Active"
                            ? "bg-emerald-100 text-emerald-800"
                            : student.status === "Completed"
                            ? "bg-primary-container/20 text-primary"
                            : "bg-surface-container-high text-on-surface-variant"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => alert(`Details/Actions for ${student.name}`)}
                        className="p-1.5 hover:bg-surface-container rounded-lg text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">more_vert</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
              {paginatedStudents.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-xs text-on-surface-variant italic">
                    No students matching filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 flex items-center justify-between border-t border-outline-variant/40 bg-surface-container-lowest">
          <p className="text-[11px] text-on-surface-variant font-medium">
            Showing {paginatedStudents.length} of {filteredStudents.length} students
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-outline-variant/60 hover:bg-surface-container-high disabled:opacity-30 cursor-pointer flex items-center"
            >
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
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
              className="p-2 rounded-lg border border-outline-variant/60 hover:bg-surface-container-high disabled:opacity-30 cursor-pointer flex items-center"
            >
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </section>

      {/* Bulk Action Panel (Floating at bottom if checked) */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-4 z-50 border border-outline-variant/20 animate-in fade-in slide-in-from-bottom-6 duration-300">
          <span className="text-xs font-bold border-r border-outline-variant/30 pr-4 shrink-0">
            {selectedIds.length} Selected
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleBulkChangeBatch}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">swap_horiz</span>
              <span>Change Batch</span>
            </button>
            <button
              onClick={handleBulkMessage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">mail</span>
              <span>Message</span>
            </button>
            <button
              onClick={handleBulkDelete}
              className="flex items-center justify-center p-1.5 rounded-xl text-error bg-error-container/20 hover:bg-error-container/40 transition-colors cursor-pointer"
              title="Delete Enrollments"
            >
              <span className="material-symbols-outlined text-sm">delete</span>
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
