"use client";

import React, { useState, useEffect } from "react";
import { getInstructorOverviewAction, updateInstructorProfileAction } from "../../actions/instructor";

export default function InstructorProfilePage() {
  const [loading, setLoading] = useState(true);
  const [instructor, setInstructor] = useState({
    name: "Dr. Julian Vane",
    email: "teacher@lms.in",
    role: "Senior Faculty",
    bio: "Designing the future of digital architecture and cognitive learning systems. 15+ years of experience in bridging the gap between human intuition and machine intelligence."
  });

  const [stats, setStats] = useState({
    totalStudents: 12840,
    activeCourses: 3
  });

  const [courses, setCourses] = useState([
    {
      id: "c-1",
      title: "Advanced UX Cognitive Patterns",
      difficulty: "Intermediate",
      price: "$199",
      students: 3420,
      rating: "4.9 (820)",
      completion: 85,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBE851QCXSACn_UTTMpTBvxUU21z7U0gF2RrEFu3eXtYRG5X78sulAMQY0KnFwWomVkTGjAxWnICVII0wlxHplrBJ9mNKg63knKZYGuCADET1BRhx5D1atYg4yd0s8IIuN--HToiOQXH9DaUJAn9ir8CJLUQB-ySUiuw9vSLlC3oWgDrhDOU5RvSbA8f4O4ujzAUGFODO3EQM0e0tQXp-IgQHSC8ApGLdmhNPSjfeh9qG5C1q5yiDGdIPUUIDrnYUoziDHBR-3Qi7jV"
    },
    {
      id: "c-2",
      title: "Architectural Scaling Systems",
      difficulty: "Advanced",
      price: "$249",
      students: 1215,
      rating: "4.8 (340)",
      completion: 72,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_B6nbnQxH484Su8qVmdBZ63LDg8C4ppifUPU_0Nu_VlWhOCQxP4Eh915j0PbsPrnWXeIyC3d7vyE7CBRagZf3kyCDNhSx0R3UhtXJUlfxc34vtzCHbx5p1IDXWTGBZH2u9hane4BZ-oKQK07nit_pVYa2XyrT46Bfls8MG7kKYxRBWG7lmq6wlVcLi3IvnxxEGGuc-ij2bR2bndvw3jYbY3KseEw4M7pcTePA0F-dK3Sqg2UR95zHoYkhVbTZRvBeiqjrgtGjVTWQ"
    },
    {
      id: "c-3",
      title: "Intro to Neural Networks",
      difficulty: "Beginner",
      price: "$129",
      students: 5890,
      rating: "5.0 (2,100)",
      completion: 94,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIDonOIHrmRh5_hWXfmBduZspnrODedzLlJ_p5qyJaswUuE8dhvK7eUz6qStRVCdnQPnfWy7wI7nB672p2XTA4VRqs4pWOJ5kQpAlhlKrThdCuuyAL1HVtPEX-4GjKoD-xu0x2yp9EGlf3UoXPMNpvMtuOpQUj7svMkG3zdJlf79azI7rvNlTxEJ9MqVEGYImVQrAst4l6Lw5DNl68Dyq5qcrWiyXv4AMXZmpmgoU5AVfRF0aCwm2zUX3z1faWcdB_MrTHKvNx74_U"
    }
  ]);

  const [editOpen, setEditOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getInstructorOverviewAction();
        if (data) {
          setInstructor((prev) => ({
            ...prev,
            name: data.instructor.name,
            email: data.instructor.email,
          }));
          setFormData({
            name: data.instructor.name,
            email: data.instructor.email,
          });
          setStats({
            totalStudents: data.stats.totalStudents || 12840,
            activeCourses: data.stats.activeCourses || 3
          });

          // Bind dynamic course lists if populated in db
          if (data.courses && data.courses.length > 0) {
            const dbCourses = data.courses.map((course, idx) => ({
              id: course.id,
              title: course.title,
              difficulty: idx === 0 ? "Intermediate" : idx === 1 ? "Advanced" : "Beginner",
              price: idx === 0 ? "$199" : idx === 1 ? "$249" : "$129",
              students: course.studentCount,
              rating: idx === 0 ? "4.9 (820)" : idx === 1 ? "4.8 (340)" : "5.0 (2,100)",
              completion: idx === 0 ? 85 : idx === 1 ? 72 : 94,
              image: course.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuCIDonOIHrmRh5_hWXfmBduZspnrODedzLlJ_p5qyJaswUuE8dhvK7eUz6qStRVCdnQPnfWy7wI7nB672p2XTA4VRqs4pWOJ5kQpAlhlKrThdCuuyAL1HVtPEX-4GjKoD-xu0x2yp9EGlf3UoXPMNpvMtuOpQUj7svMkG3zdJlf79azI7rvNlTxEJ9MqVEGYImVQrAst4l6Lw5DNl68Dyq5qcrWiyXv4AMXZmpmgoU5AVfRF0aCwm2zUX3z1faWcdB_MrTHKvNx74_U"
            }));
            setCourses(dbCourses);
          }
        }
      } catch (err) {
        console.error("Failed to load profile data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    try {
      const res = await updateInstructorProfileAction({
        name: formData.name,
        email: formData.email,
      });

      if (res.success) {
        setInstructor((prev) => ({
          ...prev,
          name: formData.name,
          email: formData.email,
        }));
        setEditOpen(false);
        alert("Instructor Profile updated successfully!");
        window.location.reload();
      } else {
        alert(res.error || "Failed to update profile.");
      }
    } catch (err) {
      console.error("Profile save error:", err);
    }
  };

  return (
    <main className="flex-grow min-h-screen p-6 md:p-8 lg:p-12 max-w-container-max mx-auto pb-32">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
        {/* Instructor Identity Card */}
        <div className="lg:col-span-8 bg-surface-container-lowest border border-outline-variant/60 rounded-[2rem] p-8 flex flex-col md:flex-row gap-8 items-center overflow-hidden relative group shadow-sm">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
          <div className="w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-white shadow-xl overflow-hidden shrink-0 z-10 bg-surface-container">
            <img 
              alt={instructor.name} 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFaQRih5-ZoT0Zv_YYOKfWE4do7U8wm3flI0VUM_DwfNWKqr4b5pX6gt79_h7qtE-i8a0ZE7RFBrQSBUVqNwDfdOFWoV-HgTiMOozbhI74sGkzJoHtpe8VVw0aEu8spxm_nqPSaZOSwRScYyBSI5_xMLF8hQ9jI7UOLcJrPUbSiRlu6FA4MRoqhDsSkOeZ5jSvwupsslGdcEpqiiAHb-LqsrfHpIuDG3uSnmdmPbgdZ9dfGNFiiCuvAf0TVwhNpC-ufhA9sY2eHfAz"
            />
          </div>
          <div className="flex flex-col gap-4 text-center md:text-left z-10 w-full">
            <div>
              <span className="inline-flex items-center px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full font-bold text-[10px] mb-2 uppercase tracking-wider">
                {instructor.role}
              </span>
              <h1 className="font-heading text-[32px] md:text-display-lg text-on-surface leading-tight font-extrabold">
                {instructor.name}
              </h1>
              <p className="text-body-md text-on-surface-variant mt-2 max-w-xl leading-relaxed">
                {instructor.bio}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <button 
                onClick={() => setEditOpen(true)}
                className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 hover:shadow-lg hover:shadow-primary/20 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">edit</span>
                <span>Edit Profile</span>
              </button>
              <button 
                onClick={() => alert(`Share profile: ${instructor.email}`)}
                className="bg-surface-container text-on-surface-variant border border-outline-variant/60 px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-surface-container-highest transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">share</span>
                <span>Public Link</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Panel */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-[2rem] p-8 flex-1 flex flex-col justify-center items-center text-center shadow-sm">
            <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-2xl mb-4">
              <span className="material-symbols-outlined text-[28px]">groups</span>
            </div>
            <span className="font-heading text-4xl text-on-surface font-extrabold">{stats.totalStudents}</span>
            <span className="font-bold text-[10px] text-on-surface-variant uppercase tracking-wider mt-1">Total Students</span>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-[2rem] p-8 flex-1 flex flex-col justify-center items-center text-center shadow-sm">
            <div className="w-12 h-12 bg-tertiary-fixed text-tertiary flex items-center justify-center rounded-2xl mb-4">
              <span className="material-symbols-outlined text-[28px]">rocket_launch</span>
            </div>
            <span className="font-heading text-4xl text-on-surface font-extrabold">{stats.activeCourses}</span>
            <span className="font-bold text-[10px] text-on-surface-variant uppercase tracking-wider mt-1">Active Courses</span>
          </div>
        </div>
      </section>

      {/* Expertise & Philosophy Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 shadow-sm">
            <h3 className="font-heading text-headline-sm font-bold mb-4 flex items-center gap-2 text-on-surface">
              <span className="material-symbols-outlined text-primary text-xl">verified</span>
              <span>Areas of Expertise</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Cognitive Psychology", "AI Ethics", "UX Design Strategy", "Instructional Tech", "Data Visualization"].map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-surface-container border border-outline-variant/40 text-on-surface-variant rounded-full text-xs font-semibold">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-primary text-on-primary rounded-3xl p-6 shadow-sm">
            <h3 className="font-heading text-headline-sm font-bold mb-4 flex items-center gap-2 text-white">
              <span className="material-symbols-outlined text-primary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
              <span>Recent Accolades</span>
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="material-symbols-outlined text-primary-fixed text-xl">military_tech</span>
                <div>
                  <p className="text-sm font-bold">Global Educator of the Year 2023</p>
                  <p className="text-xs text-primary-fixed opacity-80">EdTech Innovation Summit</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="material-symbols-outlined text-primary-fixed text-xl">star</span>
                <div>
                  <p className="text-sm font-bold">Top 1% Course Instructor</p>
                  <p className="text-xs text-primary-fixed opacity-80">Crashup Achievement Award</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-[2rem] p-8 h-full shadow-sm">
            <h3 className="font-heading text-headline-md font-bold mb-6 flex items-center gap-3 text-on-surface">
              <span className="material-symbols-outlined text-primary">auto_stories</span>
              <span>Teaching Philosophy</span>
            </h3>
            <div className="space-y-6 text-on-surface-variant text-sm font-medium leading-relaxed">
              <p>
                &ldquo;Education is not the filling of a pail, but the lighting of a fire.&rdquo; My approach to instruction is rooted in the belief that every student possesses a unique cognitive map that simply needs the right orientation.
              </p>
              <p>
                I prioritize <strong className="text-on-surface">Active Learning Architectures</strong>—systems where students aren&apos;t passive consumers but active co-creators of knowledge. By blending the rigor of academic theory with the pragmatism of real-world industry application, I aim to equip my students with not just skills, but a framework for continuous evolution.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="bg-surface-container/60 p-4 rounded-2xl flex items-start gap-4 border border-outline-variant/10">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm text-primary">
                    <span className="material-symbols-outlined text-sm">visibility</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-on-surface">Visual Learning</h4>
                    <p className="text-xs text-on-surface-variant mt-0.5">Focusing on high-fidelity diagrams and spatial layouts.</p>
                  </div>
                </div>
                <div className="bg-surface-container/60 p-4 rounded-2xl flex items-start gap-4 border border-outline-variant/10">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm text-primary">
                    <span className="material-symbols-outlined text-sm">psychology</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-on-surface">Metacognition</h4>
                    <p className="text-xs text-on-surface-variant mt-0.5">Teaching students how to understand their own learning processes.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Courses Section */}
      <section className="mb-12">
        <div className="flex justify-between items-end mb-6 px-2">
          <div>
            <h2 className="font-heading text-headline-md font-bold text-on-surface">Active Courses</h2>
            <p className="text-xs text-on-surface-variant mt-1">Top performing curricula currently in session.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-surface-container-lowest border border-outline-variant/60 rounded-3xl overflow-hidden group shadow-sm hover:translate-y-[-2px] transition-all duration-300">
              <div className="h-48 w-full overflow-hidden relative">
                <img alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={course.image} />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider text-primary shadow-sm border border-white/50">
                  {course.difficulty}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h4 className="font-heading font-bold text-sm text-on-surface group-hover:text-primary transition-colors truncate">{course.title}</h4>
                  <span className="font-bold text-sm text-on-surface shrink-0">{course.price}</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-on-surface-variant">group</span>
                    <span className="text-xs text-on-surface-variant font-medium">{course.students} students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-xs text-on-surface-variant font-bold">{course.rating}</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${course.completion}%` }}></div>
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
                  <span>{course.completion}% completion</span>
                  <span>Active</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Edit Profile Modal Dialog */}
      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#141320] border border-outline-variant/60 rounded-2xl max-w-md w-full p-6 shadow-xl relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setEditOpen(false)}
              className="absolute right-4 top-4 p-1 rounded-full hover:bg-surface-container text-on-surface-variant"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
            <h3 className="font-heading text-headline-sm font-bold text-on-surface mb-4">Edit Profile Settings</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Display Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  required
                />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setEditOpen(false)}
                  className="px-4 py-2 border border-outline-variant rounded-xl font-bold text-xs text-on-surface-variant hover:bg-surface-container cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-primary text-on-primary rounded-xl font-bold text-xs hover:opacity-90 active:scale-95 transition-all shadow-md cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
