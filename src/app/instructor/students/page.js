"use client";

import React, { useState, useEffect } from "react";
import { getInstructorOverviewAction } from "../../actions/instructor";

const MOCK_ROSTER = [
  {
    id: "mock-1",
    name: "Marcus Chen",
    email: "marcus.c@example.com",
    enrollmentDate: "Oct 12, 2023",
    courseTitle: "Advanced UX Strategy",
    progress: 85,
    grade: "A",
    status: "Active",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKL0BCYT84p36MFBBqjVhIrTLVd5Bt5THE2GQVSqg_hqVHn614-jvtAFt9YuP2gX9Yd3V97aMYulq21T86qrp27bOrPBJRXfGpThU0w0JPHxpVQS-eeVOEob4GuZ9UaT0Fh0Kfn1n65OcmtJlsC0dcszFfTwyrd3ytX_jC6pRmIXRKfH5ZpjN1GfIGauTEThJKIlOgrZKpojcwbiKZSocacs-RIauNLG4A-gqxLYvFabiiCcUocQFdt0C4sJM5cGajfVICUTlN2qU_"
  },
  {
    id: "mock-2",
    name: "Sophia Rodriguez",
    email: "sophia.r@example.com",
    enrollmentDate: "Nov 04, 2023",
    courseTitle: "Modern JS Frameworks",
    progress: 42,
    grade: "B+",
    status: "Active",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWaS2T3OzSVDPAEEsZfBk9Pg3XZ5KUI_mLq7CU068XN9UB6lAVX8TEk_Dn0Fi9uePnlCuPbYgZJ_6571f1AAS0Uu_qr4dIjboxF_BoW4zZwVYy5nDhTnTdgcVBH5d8WCHUwQ2rGzfG8Xs_h6FlGK7K2o99NNqp4HUZisU_OJrPa0j2rw-yvBNv7D6I3EWCWT5F6m8VaG1n_p8Di7DiMFL8krwLmNbeoggaBM4NLOgT_xkNs1wUEAUEyegTQduM_YzDOkOk54SSpKCl"
  },
  {
    id: "mock-3",
    name: "James Dalton",
    email: "j.dalton@example.com",
    enrollmentDate: "Sept 20, 2023",
    courseTitle: "Data Science Mastery",
    progress: 12,
    grade: "D-",
    status: "Inactive",
    initials: "JD"
  },
  {
    id: "mock-4",
    name: "Amara Okafor",
    email: "a.okafor@example.com",
    enrollmentDate: "Dec 01, 2023",
    courseTitle: "Advanced UX Strategy",
    progress: 98,
    grade: "A+",
    status: "Active",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHTxeG2YdoohbDSmWscggSv9KxsSx1stUbbRsDnO_Djc9Rs-VRLXnfPM5oCXr6zo-5sTfGdjPrVMTy1zx0I2pHPM4wIe7moQ3z8jSaRxBTNMfP0sZk5VgRlls2X-4QDmmU7l0AUZjG351Nx1pm8bWNUUA7YR7_Cwq3XQakrbUgPtFtEEychRkMsOOdBlll5bAZOXhw8v6I5OkqUbXJTzy6deABX5KExcMRGLKNYbJn2ktOwgp0LqjLFIJztuU1TIJC4LqRWzMe8Exy"
  }
];

export default function StudentManagementPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 2842,
    activeCourses: 12,
    averageCompletion: "88.5%",
    rating: "4.8 / 5"
  });
  const [students, setStudents] = useState(MOCK_ROSTER);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // all, active, inactive

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getInstructorOverviewAction();
        if (data) {
          setStats({
            totalStudents: data.stats.totalStudents || 2842,
            activeCourses: data.stats.activeCourses || 12,
            averageCompletion: data.stats.averageCompletion || "88.5%",
            rating: data.stats.rating || "4.8 / 5"
          });
          // Merge database students with fallback mock students
          if (data.studentRoster && data.studentRoster.length > 0) {
            setStudents([...data.studentRoster, ...MOCK_ROSTER]);
          } else {
            setStudents(MOCK_ROSTER);
          }
        }
      } catch (err) {
        console.error("Failed to load students:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student.courseTitle && student.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && student.status === "Active") ||
      (activeTab === "inactive" && student.status === "Inactive");

    return matchesSearch && matchesTab;
  });

  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-12 max-w-container-max mx-auto w-full pb-32">
      <div className="flex flex-col gap-8">
        {/* Header & Breadcrumbs */}
        <section>
          <div className="flex items-center gap-2 mb-2 text-on-surface-variant">
            <span className="font-semibold text-[11px] uppercase tracking-wider">Dashboard</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="font-semibold text-[11px] uppercase tracking-wider text-primary">Student Management</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="font-heading text-[32px] md:text-display-lg text-on-surface leading-tight font-extrabold">
                Student Roster
              </h2>
              <p className="text-body-md text-on-surface-variant">
                Manage enrollments, monitor performance, and track student growth.
              </p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => alert("CSV Export Triggered")}
                className="bg-surface-container-lowest border border-outline-variant text-on-surface-variant px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-surface-container transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-base">file_download</span>
                <span>Export CSV</span>
              </button>
              <button 
                onClick={() => alert("Add Student Feature")}
                className="bg-primary text-on-primary px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity"
              >
                <span className="material-symbols-outlined text-base">person_add</span>
                <span>Add Student</span>
              </button>
            </div>
          </div>
        </section>

        {/* Stats Bento Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-surface-container-lowest border border-outline-variant/60 p-6 rounded-2xl flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start">
              <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                <span className="material-symbols-outlined">groups</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+12%</span>
            </div>
            <div className="mt-4">
              <p className="font-semibold text-xs text-on-surface-variant">Total Students</p>
              <h3 className="font-heading text-headline-md font-bold mt-1 text-on-surface">{stats.totalStudents}</h3>
            </div>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant/60 p-6 rounded-2xl flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start">
              <div className="p-2.5 bg-secondary-container/30 rounded-xl text-secondary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+0.4</span>
            </div>
            <div className="mt-4">
              <p className="font-semibold text-xs text-on-surface-variant">Avg. Performance</p>
              <h3 className="font-heading text-headline-md font-bold mt-1 text-on-surface">{stats.rating}</h3>
            </div>
          </div>
          <div className="bg-surface-container-lowest border-l-4 border-l-error border border-outline-variant/60 p-6 rounded-2xl flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start">
              <div className="p-2.5 bg-error/10 rounded-xl text-error">
                <span className="material-symbols-outlined">warning</span>
              </div>
              <span className="text-[10px] font-bold text-error bg-error-container/20 px-2 py-1 rounded-full">High Alert</span>
            </div>
            <div className="mt-4">
              <p className="font-semibold text-xs text-on-surface-variant">At-Risk Students</p>
              <h3 className="font-heading text-headline-md font-bold mt-1 text-on-surface">14</h3>
            </div>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant/60 p-6 rounded-2xl flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start">
              <div className="p-2.5 bg-surface-container-highest rounded-xl text-on-surface">
                <span className="material-symbols-outlined">pending_actions</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="font-semibold text-xs text-on-surface-variant">Avg. Course Progress</p>
              <h3 className="font-heading text-headline-md font-bold mt-1 text-on-surface">{stats.averageCompletion}</h3>
            </div>
          </div>
        </section>

        {/* Roster Section */}
        <section className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl overflow-hidden flex flex-col shadow-sm">
          {/* Filters Bar */}
          <div className="p-4 border-b border-outline-variant/60 bg-white dark:bg-[#141320] flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="relative flex-grow sm:flex-grow-0">
                <input 
                  type="text"
                  placeholder="Search roster..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-1.5 rounded-full border border-outline-variant bg-surface-container-lowest text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all w-full sm:w-64"
                />
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base">search</span>
              </div>
              <div className="h-6 w-px bg-outline-variant hidden sm:block"></div>
              <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
                <button 
                  onClick={() => setActiveTab("all")}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${activeTab === "all" ? "bg-primary text-white" : "border border-outline-variant text-on-surface-variant hover:border-primary"}`}
                >
                  All Students
                </button>
                <button 
                  onClick={() => setActiveTab("active")}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${activeTab === "active" ? "bg-primary text-white" : "border border-outline-variant text-on-surface-variant hover:border-primary"}`}
                >
                  Active
                </button>
                <button 
                  onClick={() => setActiveTab("inactive")}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${activeTab === "inactive" ? "bg-primary text-white" : "border border-outline-variant text-on-surface-variant hover:border-primary"}`}
                >
                  Inactive
                </button>
              </div>
            </div>
            <p className="text-xs text-on-surface-variant shrink-0 font-medium">
              Showing {filteredStudents.length} of {students.length} students
            </p>
          </div>

          {/* Table Wrapper */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low/50 border-b border-outline-variant/60">
                  <th className="px-6 py-4 font-bold text-xs text-on-surface-variant">Student</th>
                  <th className="px-6 py-4 font-bold text-xs text-on-surface-variant">Enrollment Date</th>
                  <th className="px-6 py-4 font-bold text-xs text-on-surface-variant">Associated Course</th>
                  <th className="px-6 py-4 font-bold text-xs text-on-surface-variant">Progress</th>
                  <th className="px-6 py-4 font-bold text-xs text-on-surface-variant">Grade</th>
                  <th className="px-6 py-4 font-bold text-xs text-on-surface-variant">Status</th>
                  <th className="px-6 py-4 font-bold text-xs text-on-surface-variant text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-on-surface-variant text-sm font-semibold">
                      Loading student roster...
                    </td>
                  </tr>
                ) : filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-on-surface-variant text-sm font-semibold">
                      No students found matching filters.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-primary/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {student.avatar ? (
                            <img alt={student.name} className="w-10 h-10 rounded-full object-cover border border-outline-variant/40" src={student.avatar} />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs border border-outline-variant/20">
                              {student.initials || student.name.substring(0, 2).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-bold text-on-surface">{student.name}</p>
                            <p className="text-xs text-on-surface-variant">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-on-surface-variant font-medium">{student.enrollmentDate}</td>
                      <td className="px-6 py-4 text-xs text-on-surface font-semibold max-w-[180px] truncate">{student.courseTitle || "Introductory Course"}</td>
                      <td className="px-6 py-4">
                        <div className="w-48">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] font-bold text-on-surface-variant">{student.progress}% Complete</span>
                          </div>
                          <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${student.progress >= 80 ? "bg-emerald-500" : student.progress >= 50 ? "bg-primary" : "bg-error"}`} 
                              style={{ width: `${student.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider ${student.progress >= 85 ? "text-primary bg-primary/10" : "text-on-surface-variant bg-surface-container-highest"}`}>
                          {student.grade}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`flex items-center gap-1.5 text-xs font-bold ${student.status === "Active" ? "text-emerald-600" : "text-on-surface-variant"}`}>
                          <span className={`w-2 h-2 rounded-full ${student.status === "Active" ? "bg-emerald-500" : "bg-outline"}`}></span>
                          {student.status}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => alert(`Actions for ${student.name}`)}
                          className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors text-xl cursor-pointer"
                        >
                          more_vert
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-6 border-t border-outline-variant/60 bg-white dark:bg-[#141320] flex items-center justify-between">
            <button className="px-4 py-2 border border-outline-variant rounded-lg font-bold text-xs text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-50" disabled>Previous</button>
            <div className="flex gap-1">
              <button className="w-8 h-8 rounded bg-primary text-on-primary font-bold text-xs">1</button>
              <button className="w-8 h-8 rounded border border-outline-variant text-on-surface-variant hover:bg-surface-container font-bold text-xs">2</button>
              <button className="w-8 h-8 rounded border border-outline-variant text-on-surface-variant hover:bg-surface-container font-bold text-xs">3</button>
            </div>
            <button className="px-4 py-2 border border-outline-variant rounded-lg font-bold text-xs text-on-surface-variant hover:bg-surface-container transition-colors">Next</button>
          </div>
        </section>
      </div>
    </main>
  );
}
