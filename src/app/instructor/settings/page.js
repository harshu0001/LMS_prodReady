"use client";

import React, { useState } from "react";

export default function AccountSettingsPage() {
  const [settings, setSettings] = useState({
    autoGrading: true,
    discussionBoards: true,
    whiteboard: false,
    pushNotifications: true,
    emailDigests: true,
    smsReminders: false,
    contentFiltering: true,
    profileVisibility: "public",
  });

  const [zoomConnected, setZoomConnected] = useState(true);
  const [classroomConnected, setClassroomConnected] = useState(false);

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    alert("Instructor preferences saved successfully!");
  };

  return (
    <main className="flex-grow p-6 md:p-8 lg:p-12 max-w-7xl mx-auto w-full pb-32">
      <div className="mb-8">
        <h2 className="font-heading text-[32px] md:text-headline-lg font-extrabold text-on-surface leading-tight">
          Account Settings
        </h2>
        <p className="text-body-md text-on-surface-variant mt-2">
          Manage your teaching workspace and instructor preferences.
        </p>
      </div>

      {/* Bento Grid Layout for Settings */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Teaching Environment (Large Card) */}
        <section className="md:col-span-8 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/60 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <span className="material-symbols-outlined">co_present</span>
            </div>
            <h3 className="font-heading text-headline-sm font-bold text-on-surface">Teaching Environment</h3>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-surface hover:bg-surface-container transition-colors border border-outline-variant/20 hover:border-outline-variant group">
              <div className="flex flex-col pr-4">
                <span className="text-sm font-bold text-on-surface">Smart Auto-Grading</span>
                <span className="text-xs text-on-surface-variant mt-0.5">Enable AI-assisted grading for multiple choice and short answers.</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={settings.autoGrading}
                  onChange={() => handleToggle("autoGrading")}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-surface hover:bg-surface-container transition-colors border border-outline-variant/20 hover:border-outline-variant group">
              <div className="flex flex-col pr-4">
                <span className="text-sm font-bold text-on-surface">Discussion Boards</span>
                <span className="text-xs text-on-surface-variant mt-0.5">Allow students to create and engage in course-specific threads.</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={settings.discussionBoards}
                  onChange={() => handleToggle("discussionBoards")}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-surface hover:bg-surface-container transition-colors border border-outline-variant/20 hover:border-outline-variant group">
              <div className="flex flex-col pr-4">
                <span className="text-sm font-bold text-on-surface">Collaborative Whiteboard</span>
                <span className="text-xs text-on-surface-variant mt-0.5">Activate real-time drawing during live lecture sessions.</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={settings.whiteboard}
                  onChange={() => handleToggle("whiteboard")}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Notifications (Side Card) */}
        <section className="md:col-span-4 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/60 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-secondary-container/30 text-secondary">
                <span className="material-symbols-outlined">notifications_active</span>
              </div>
              <h3 className="font-heading text-headline-sm font-bold text-on-surface">Notifications</h3>
            </div>
            <div className="space-y-4">
              <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Alert Channels</p>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={settings.pushNotifications}
                    onChange={() => handleToggle("pushNotifications")}
                    className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4" 
                  />
                  <span className="text-sm font-semibold text-on-surface">Push Notifications</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={settings.emailDigests}
                    onChange={() => handleToggle("emailDigests")}
                    className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4" 
                  />
                  <span className="text-sm font-semibold text-on-surface">Email Digests</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={settings.smsReminders}
                    onChange={() => handleToggle("smsReminders")}
                    className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4" 
                  />
                  <span className="text-sm font-semibold text-on-surface">SMS Reminders</span>
                </label>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-outline-variant/30 mt-6">
            <button 
              onClick={() => alert("Deep configurations alerts panel")}
              className="w-full py-2.5 px-4 bg-secondary-container text-on-secondary-container rounded-xl font-bold text-xs hover:opacity-90 transition-opacity cursor-pointer"
            >
              Configure All Alerts
            </button>
          </div>
        </section>

        {/* Integrations (Bento Square) */}
        <section className="md:col-span-6 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/60 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-tertiary-fixed text-tertiary">
                <span className="material-symbols-outlined">extension</span>
              </div>
              <h3 className="font-heading text-headline-sm font-bold text-on-surface">Integrations</h3>
            </div>
            <span 
              onClick={() => alert("Open integrations list")}
              className="text-xs font-bold text-primary cursor-pointer hover:underline"
            >
              View All
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Zoom Card */}
            <div className="p-4 rounded-xl bg-surface border border-outline-variant/30 flex flex-col gap-3 hover:bg-surface-container transition-all">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center border border-outline-variant/20 overflow-hidden shrink-0">
                  <img alt="Zoom Logo" className="w-6 h-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4jS5mzEyskH9y1p0VXIlC0wsQ3DebSmOtkrtpRASjyrz53he6BoInEVlGfpvN2O1q0wrfJTe6XGDjDj5uZl1GEIRbpqKjqFlYbtQf8M5cKCllsM1x2B4QAQZ31frlcXnQFiEQExME_P4Cey9iRu19fOVtUw1B5OlvIoLiJAl_I3uHOshhdkJPBK-4C11LBOgH5jKlsLi6gF5JP0O4KVSjEh1R8TlsoFkZYq2XCsrsUloRWUTgcPSU7Vs-CjjeYnl60Mjn8JCw2P-w"/>
                </div>
                {zoomConnected ? (
                  <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-[9px] font-bold rounded uppercase">Active</span>
                ) : (
                  <button onClick={() => setZoomConnected(true)} className="text-primary font-bold text-[10px] hover:underline cursor-pointer">Connect</button>
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-on-surface">Zoom Meetings</p>
                <p className="text-xs text-on-surface-variant">Host live sessions directly.</p>
              </div>
            </div>

            {/* Google Classroom Card */}
            <div className="p-4 rounded-xl bg-surface border border-outline-variant/30 flex flex-col gap-3 hover:bg-surface-container transition-all">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center border border-outline-variant/20 overflow-hidden shrink-0">
                  <img alt="Google Classroom Logo" className="w-6 h-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAo2_WGrbhcVOYDBHt6OshDDxfIVG4oc67jWIn2Z3jy3HovrplsRBUC3-8HFzZg7BXDBs41-vRH3QWo2aAP6Ra1C49mKDpWoH9AJuqEZJ5A_DYOUH-LsrD7DIFdtqCZzA-txUiHju1N_UdpVa-HSIqNTWLIacWCWUeu0qBHDOjpPdmJLjMGXY9bFwIk5WwWJurXmYE7M5-z-9Hx8-BfBnyVMwOZwHoxj8xYG6f8Q9pwjG2AE19rkaTFbCL8i5ozLBbYkaD_klv7z8A-"/>
                </div>
                {classroomConnected ? (
                  <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-[9px] font-bold rounded uppercase">Active</span>
                ) : (
                  <button onClick={() => setClassroomConnected(true)} className="text-primary font-bold text-[10px] hover:underline cursor-pointer">Connect</button>
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-on-surface">Google Classroom</p>
                <p className="text-xs text-on-surface-variant">Sync rosters and grades.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy & Safety (Bento Square) */}
        <section className="md:col-span-6 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/60 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-error-container text-error">
                <span className="material-symbols-outlined">admin_panel_settings</span>
              </div>
              <h3 className="font-heading text-headline-sm font-bold text-on-surface">Privacy &amp; Safety</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between group cursor-pointer" onClick={() => handleToggle("contentFiltering")}>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-on-surface">Content Filtering</span>
                  <span className="text-xs text-on-surface-variant mt-0.5">{settings.contentFiltering ? "Automated slur and spam protection is on." : "Automated filter disabled."}</span>
                </div>
                <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-xl">chevron_right</span>
              </div>

              <div className="h-px bg-outline-variant/30"></div>

              <div className="flex items-center justify-between group cursor-pointer" onClick={() => alert("Edit visibility settings")}>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-on-surface">Profile Visibility</span>
                  <span className="text-xs text-on-surface-variant mt-0.5">Control who can see your bio (Currently: Public).</span>
                </div>
                <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-xl">chevron_right</span>
              </div>

              <div className="h-px bg-outline-variant/30"></div>

              <div className="flex items-center justify-between group cursor-pointer" onClick={() => alert("Downloading CSV of student logs...")}>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-on-surface">Data Export</span>
                  <span className="text-xs text-on-surface-variant mt-0.5">Download a CSV of all student interaction records.</span>
                </div>
                <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-xl">download</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Action Bar */}
      <div className="mt-8 flex items-center justify-end gap-4">
        <button 
          onClick={() => {
            if (confirm("Discard all changes?")) {
              window.location.reload();
            }
          }}
          className="px-6 py-2.5 rounded-xl font-bold text-xs text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
        >
          Discard Changes
        </button>
        <button 
          onClick={handleSave}
          className="px-8 py-2.5 bg-primary text-on-primary rounded-xl font-bold text-xs hover:shadow-lg hover:opacity-90 transition-all scale-100 active:scale-95 cursor-pointer"
        >
          Save Preferences
        </button>
      </div>
    </main>
  );
}
