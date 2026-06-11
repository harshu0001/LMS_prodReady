"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getStudentProfileDetailsAction, updateStudentProfileAction } from "../../actions/student";


export default function StudentProfilePage() {
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    role: "Senior UI Designer & Python Enthusiast",
    location: "San Francisco, CA",
    email: "alex.j@lumina.edu",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmmgXejxBaOgT1lwd7MY6LTXEEJulxn5c_O8-C21hFTn_PGczkLy51SwZZ7Os6tIc0UUDKXHbStn3a18vlzvb7E_uGvQ2b-D5iR7T8rL3UkaSLKfEmUciQWGrAEEAHn5HJT19_LDVcIjMHQJzu_t_ENegWYQuHBaKJ0m_-GWcbX9B7ICl4J-C4GgDXU0vo56T1zvlreztLVbpUoB3koWw64lyZr33U8U9OFYwTkxDn89kU964eLBXeACH27ZNuAkyN9JqNl3tUEgah",
    courses: 12,
    avgScore: "84%",
    points: "2.4k",
  });

  const [skills, setSkills] = useState([
    { name: "UI Design", val: 95 },
    { name: "Python", val: 78 },
    { name: "Data Analysis", val: 62 },
    { name: "UX Research", val: 88 },
  ]);

  const [certificates, setCertificates] = useState([
    { title: "UI Masterclass", date: "Oct 2023", icon: "workspace_premium", colorClass: "bg-indigo-50 text-indigo-600" },
    { title: "Python Core", date: "Jan 2024", icon: "terminal", colorClass: "bg-emerald-50 text-emerald-600" },
    { title: "User Psychology", date: "Mar 2024", icon: "psychology", colorClass: "bg-amber-50 text-amber-600" },
    { title: "Data Visualization", date: "Apr 2024", icon: "monitoring", colorClass: "bg-rose-50 text-rose-600" },
  ]);

  const [activities, setActivities] = useState([
    { id: 1, type: "play_circle", text: "Started Advanced Prototyping module", time: "2 hours ago", bgClass: "bg-primary/10 text-primary" },
    { id: 2, type: "check_circle", text: "Completed Python Dictionaries quiz with 100%", time: "Yesterday at 4:15 PM", bgClass: "bg-emerald-100 text-emerald-700" },
    { id: 3, type: "emoji_events", text: "Earned Fast Learner badge", time: "3 days ago", bgClass: "bg-amber-100 text-amber-700" },
    { id: 4, type: "chat", text: "Posted a comment in UX Discussion Forum", time: "Last week", bgClass: "bg-slate-100 text-slate-700" },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...profile });

  React.useEffect(() => {
    async function loadProfile() {
      const details = await getStudentProfileDetailsAction();
      if (details) {
        const updatedProfile = {
          ...profile,
          name: details.name,
          email: details.email,
          role: details.role === "Undergraduate" ? "Senior UI Designer & Python Enthusiast" : details.role,
          courses: details.coursesCount,
        };
        setProfile(updatedProfile);
        setEditForm(updatedProfile);
      }
    }
    loadProfile();
  }, []);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const result = await updateStudentProfileAction({
      name: editForm.name,
      email: editForm.email,
    });

    if (result.success) {
      setProfile(editForm);
      setIsEditing(false);

      // Add activity log
      setActivities([
        {
          id: Date.now(),
          type: "manage_accounts",
          text: "Updated user profile details",
          time: "Just now",
          bgClass: "bg-indigo-50 text-indigo-700",
        },
        ...activities,
      ]);

      // Reload to propagate updated name to the sidebar layout immediately
      window.location.reload();
    } else {
      alert(result.error || "Failed to save profile changes.");
    }
  };

  const handleClaimBadge = () => {
    const title = prompt("Enter the name of your new Certificate:");
    if (!title) return;

    setCertificates([
      ...certificates,
      {
        title: title,
        date: "Jun 2026",
        icon: "workspace_premium",
        colorClass: "bg-primary-fixed text-primary",
      },
    ]);

    setActivities([
      {
        id: Date.now(),
        type: "emoji_events",
        text: `Claimed new Certificate: ${title}`,
        time: "Just now",
        bgClass: "bg-amber-100 text-amber-700",
      },
      ...activities,
    ]);
  };

  return (
    <div className="p-md md:p-xl max-w-container-max mx-auto pb-32">
      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-sm backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-outline-variant p-lg max-w-md w-full shadow-2xl relative">
            <h3 className="font-heading text-headline-sm font-bold text-on-surface mb-md">Edit Profile</h3>
            <form onSubmit={handleEditSubmit} className="space-y-sm">
              <div>
                <label className="text-xs font-bold text-on-surface-variant block mb-1">Name</label>
                <input 
                  type="text" 
                  value={editForm.name} 
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full bg-slate-50 border border-outline-variant/60 rounded-xl px-sm py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-on-surface-variant block mb-1">Title / Headline</label>
                <input 
                  type="text" 
                  value={editForm.role} 
                  onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                  className="w-full bg-slate-50 border border-outline-variant/60 rounded-xl px-sm py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-on-surface-variant block mb-1">Location</label>
                <input 
                  type="text" 
                  value={editForm.location} 
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  className="w-full bg-slate-50 border border-outline-variant/60 rounded-xl px-sm py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-on-surface-variant block mb-1">Email</label>
                <input 
                  type="email" 
                  value={editForm.email} 
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full bg-slate-50 border border-outline-variant/60 rounded-xl px-sm py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div className="flex gap-md pt-md">
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-2.5 border border-outline-variant rounded-xl font-bold text-xs text-on-surface hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2.5 bg-primary text-on-primary rounded-xl font-bold text-xs hover:opacity-90 transition-opacity shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Profile Header / Asymmetric Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-md mb-xl">
        {/* Identity Card */}
        <div className="lg:col-span-2 soft-ui-card rounded-2xl p-lg flex flex-col md:flex-row gap-lg items-center md:items-start relative overflow-hidden border border-outline-variant/60 shadow-sm">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
          <div className="relative group shrink-0">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-lg border-4 border-white transition-transform group-hover:scale-105 duration-500">
              <img 
                className="w-full h-full object-cover" 
                src={profile.avatar}
                alt={profile.name}
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 border-4 border-white rounded-full flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-white text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            </div>
          </div>
          <div className="flex-grow text-center md:text-left pt-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-md mb-1">
              <h2 className="font-heading text-headline-md font-bold text-on-surface">{profile.name}</h2>
              <button 
                onClick={() => {
                  setEditForm({ ...profile });
                  setIsEditing(true);
                }}
                className="mx-auto md:mx-0 px-3 py-1 bg-surface-container border border-outline-variant/60 rounded-lg text-xs font-bold text-on-surface hover:bg-surface-container-high transition-colors flex items-center gap-1 active:scale-95"
              >
                <span className="material-symbols-outlined text-xs">edit</span>
                <span>Edit Profile</span>
              </button>
            </div>
            <p className="text-sm text-on-surface-variant mb-4">{profile.role}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
              <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full">
                <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
                <span className="text-xs font-semibold">{profile.location}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full">
                <span className="material-symbols-outlined text-primary text-[18px]">mail</span>
                <span className="text-xs font-semibold">{profile.email}</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-md border-t border-outline-variant/60 pt-6">
              <div>
                <p className="font-heading text-headline-sm text-primary font-bold mb-0">{profile.courses}</p>
                <p className="text-xs text-on-surface-variant font-medium mt-0.5">Courses</p>
              </div>
              <div>
                <p className="font-heading text-headline-sm text-primary font-bold mb-0">{profile.avgScore}</p>
                <p className="text-xs text-on-surface-variant font-medium mt-0.5">Avg Score</p>
              </div>
              <div>
                <p className="font-heading text-headline-sm text-primary font-bold mb-0">{profile.points}</p>
                <p className="text-xs text-on-surface-variant font-medium mt-0.5">Points</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Radar / Bento Piece */}
        <div className="soft-ui-card rounded-2xl p-lg flex flex-col border border-outline-variant/60 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-heading text-headline-sm font-bold text-on-surface">Skill Matrix</h3>
            <button 
              onClick={() => {
                const updated = skills.map((s) => ({ ...s, val: Math.min(100, s.val + Math.floor(Math.random() * 5)) }));
                setSkills(updated);
              }}
              className="text-primary hover:underline font-bold text-xs"
            >
              Update Map
            </button>
          </div>
          <div className="flex-grow flex flex-col justify-center space-y-4">
            {skills.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1 text-xs font-semibold text-on-surface">
                  <span>{skill.name}</span>
                  <span className="text-primary">{skill.val}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-1000" 
                    style={{ width: `${skill.val}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Earned Certificates Bento Grid */}
      <section className="mb-xl">
        <div className="flex items-center justify-between mb-md">
          <h3 className="font-heading text-headline-sm font-bold text-on-surface">Earned Certificates</h3>
          <button 
            onClick={handleClaimBadge}
            className="flex items-center gap-1.5 text-primary hover:text-primary-container transition-colors font-bold text-xs"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Claim Certificate</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
          {certificates.map((cert, index) => (
            <div 
              key={index} 
              className="soft-ui-card rounded-2xl p-md flex flex-col items-center text-center group cursor-pointer border border-outline-variant/60 shadow-sm hover:scale-105 duration-300"
            >
              <div className={`w-20 h-20 mb-4 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 ${cert.colorClass}`}>
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {cert.icon}
                </span>
              </div>
              <h4 className="font-semibold text-sm text-on-surface mb-1">{cert.title}</h4>
              <p className="text-[11px] text-on-surface-variant font-medium">Completed {cert.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activity & Featured Course */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl">
        {/* Activity Feed */}
        <div className="soft-ui-card rounded-2xl p-lg border border-outline-variant/60 shadow-sm">
          <h3 className="font-heading text-headline-sm font-bold text-on-surface mb-lg">Recent Activity</h3>
          <div className="space-y-6 max-h-[350px] overflow-y-auto custom-scrollbar pr-2">
            {activities.map((act) => (
              <div key={act.id} className="flex gap-4 items-start">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-outline-variant/10 shadow-sm ${act.bgClass}`}>
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {act.type}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-on-surface leading-tight font-medium" dangerouslySetInnerHTML={{ __html: act.text }}></p>
                  <p className="text-[10px] text-on-surface-variant mt-1">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Learning */}
        <div className="flex flex-col gap-md">
          <div className="soft-ui-card rounded-2xl p-lg bg-primary text-on-primary relative overflow-hidden flex-1 border border-primary/20 shadow-lg flex flex-col justify-between">
            {/* Visual Pattern overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg fill="none" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
                <pattern height="20" id="dots2" patternUnits="userSpaceOnUse" width="20" x="0" y="0">
                  <circle cx="2" cy="2" fill="white" r="1"></circle>
                </pattern>
                <rect fill="url(#dots2)" height="100%" width="100%"></rect>
              </svg>
            </div>
            <div className="relative z-10">
              <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold mb-4">In Progress</div>
              <h3 className="font-heading text-headline-md font-bold mb-2">Design Systems for Enterprise</h3>
              <p className="text-primary-fixed-dim text-xs mb-6 max-w-xs leading-relaxed">Master the art of creating scalable UI architectures and multi-layered tokens.</p>
              <div className="mb-8">
                <div className="flex justify-between items-end mb-2 text-xs font-semibold">
                  <span>45% Completed</span>
                  <span>8/14 Lessons</span>
                </div>
                <div className="h-3 w-full bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: "45%" }}></div>
                </div>
              </div>
            </div>
            <Link 
              href="/student/courses/1" 
              className="relative z-10 block text-center w-full py-3 bg-white text-primary rounded-xl font-bold hover:bg-slate-50 transition-colors text-sm shadow-md active:scale-95"
            >
              Resume Lesson
            </Link>
          </div>

          {/* Stats Strip */}
          <div className="grid grid-cols-2 gap-md">
            <div className="soft-ui-card rounded-2xl p-md flex items-center gap-4 border border-outline-variant/60 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center border border-outline-variant/10 shadow-sm shrink-0">
                <span className="material-symbols-outlined text-emerald-600">timer</span>
              </div>
              <div>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Study Time</p>
                <p className="font-heading text-headline-sm text-on-surface font-bold">124h</p>
              </div>
            </div>
            <div className="soft-ui-card rounded-2xl p-md flex items-center gap-4 border border-outline-variant/60 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center border border-outline-variant/10 shadow-sm shrink-0">
                <span className="material-symbols-outlined text-indigo-600">local_fire_department</span>
              </div>
              <div>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Streak</p>
                <p className="font-heading text-headline-sm text-on-surface font-bold">14 Days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
