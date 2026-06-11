"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function CreateBatchPage() {
  // Form State
  const [batchName, setBatchName] = useState("");
  const [course, setCourse] = useState("");
  const [teacher, setTeacher] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [capacity, setCapacity] = useState(30);
  const [autoEnroll, setAutoEnroll] = useState(false);
  const [selectedDays, setSelectedDays] = useState(["M", "W", "F"]);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:30");
  const [locationType, setLocationType] = useState("In-Person"); // In-Person or Virtual
  const [locationNote, setLocationNote] = useState("Room 402");

  // Visual Feedbacks
  const [showToast, setShowToast] = useState(false);

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  return (
    <main className="p-gutter max-w-container-max mx-auto pb-32 space-y-gutter relative">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-on-surface-variant font-semibold text-[11px] uppercase tracking-wider mb-6">
        <Link href="/admin/batches" className="hover:text-primary transition-colors">
          Batches
        </Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-on-surface">Create New Batch</span>
      </nav>

      {/* Page Header */}
      <section className="mb-8">
        <h1 className="font-heading text-display-lg-mobile md:text-headline-md text-on-surface tracking-tight font-extrabold">
          Create New Batch
        </h1>
        <p className="text-body-md text-on-surface-variant mt-1.5 max-w-2xl leading-relaxed">
          Configure a new educational session by assigning courses, teachers, and setting up the recurring schedule.
        </p>
      </section>

      {/* Form Grid */}
      <form onSubmit={handleSubmit} className="space-y-gutter">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {/* Card 1: General Info */}
          <div className="bg-surface-container-lowest border border-outline-variant/60 p-8 rounded-2xl shadow-sm flex flex-col gap-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-primary font-bold mb-2 text-xs uppercase tracking-wider">
              <span className="material-symbols-outlined text-base">info</span>
              <span>General Information</span>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                Batch Name
              </label>
              <input
                type="text"
                value={batchName}
                onChange={(e) => setBatchName(e.target.value)}
                placeholder="e.g. Advanced UX Design - Spring 26"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-xs bg-slate-50/30"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                Select Course
              </label>
              <div className="relative">
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none appearance-none bg-slate-50/30 text-xs cursor-pointer"
                >
                  <option value="" disabled>Choose from active courses</option>
                  <option value="ux">Foundations of UX Research</option>
                  <option value="ui">Visual Interface Design</option>
                  <option value="fe">Modern Frontend Frameworks</option>
                  <option value="pm">Product Management Masterclass</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant text-base">
                  keyboard_arrow_down
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                Assign Teacher
              </label>
              <input
                type="text"
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
                placeholder="Search teacher by name or ID..."
                required
                className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-xs bg-slate-50/30"
              />
            </div>
          </div>

          {/* Card 2: Timeline & Capacity */}
          <div className="bg-surface-container-lowest border border-outline-variant/60 p-8 rounded-2xl shadow-sm flex flex-col gap-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-primary font-bold mb-2 text-xs uppercase tracking-wider">
              <span className="material-symbols-outlined text-base">calendar_month</span>
              <span>Timeline & Capacity</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-xs bg-slate-50/30 cursor-pointer"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-xs bg-slate-50/30 cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                Student Capacity
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={capacity}
                  onChange={(e) => setCapacity(Number(e.target.value))}
                  className="flex-1 accent-primary h-2 bg-surface-container-highest rounded-full cursor-pointer"
                />
                <span className="shrink-0 font-bold text-xs text-primary bg-primary-container/20 px-3 py-1 rounded-full border border-primary/20">
                  {capacity} Seats
                </span>
              </div>
            </div>

            <div className="space-y-2 p-4 bg-surface-container-low/50 border border-outline-variant/40 border-dashed rounded-xl flex items-center justify-between">
              <div className="flex-1 mr-4">
                <p className="font-bold text-xs text-on-surface">Auto-Enrollment</p>
                <p className="text-[10px] text-on-surface-variant mt-1 leading-normal">
                  Automatically fill remaining seats from waitlist once published.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAutoEnroll(!autoEnroll)}
                className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer shrink-0 ${
                  autoEnroll ? "bg-primary" : "bg-outline-variant"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${
                    autoEnroll ? "right-0.5" : "left-0.5"
                  }`}
                ></div>
              </button>
            </div>
          </div>
        </div>

        {/* Card 3: Weekly Schedule */}
        <div className="bg-surface-container-lowest border border-outline-variant/60 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 text-primary font-bold mb-6 text-xs uppercase tracking-wider">
            <span className="material-symbols-outlined text-base">schedule</span>
            <span>Weekly Schedule</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Days Toggle */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                Operating Days
              </label>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {["M", "T", "W", "T", "F", "S"].map((day, idx) => {
                  const isActive = selectedDays.includes(day);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`w-9 h-9 rounded-full border text-xs font-bold transition-all active:scale-90 flex items-center justify-center cursor-pointer ${
                        isActive
                          ? "bg-primary border-primary text-on-primary shadow"
                          : "border-outline-variant text-on-surface-variant hover:border-primary/50"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Pickers */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                Session Time
              </label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-outline-variant/60 rounded-xl focus:border-primary focus:ring-0 text-xs bg-slate-50/30 cursor-pointer"
                />
                <span className="text-xs text-on-surface-variant font-semibold shrink-0">to</span>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-outline-variant/60 rounded-xl focus:border-primary focus:ring-0 text-xs bg-slate-50/30 cursor-pointer"
                />
              </div>
            </div>

            {/* Location Type */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                Location Type
              </label>
              <div className="flex bg-surface-container-low border border-outline-variant/30 p-1 rounded-xl mt-1">
                <button
                  type="button"
                  onClick={() => {
                    setLocationType("In-Person");
                    setLocationNote("Room 402");
                  }}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    locationType === "In-Person"
                      ? "bg-white text-primary shadow"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  In-Person
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLocationType("Virtual");
                    setLocationNote("Zoom Meeting Link");
                  }}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    locationType === "Virtual"
                      ? "bg-white text-primary shadow"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  Virtual
                </button>
              </div>
            </div>

            {/* Room Note */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                {locationType === "In-Person" ? "Room / Classroom" : "Virtual Link Note"}
              </label>
              <input
                type="text"
                value={locationNote}
                onChange={(e) => setLocationNote(e.target.value)}
                placeholder={locationType === "In-Person" ? "e.g. Room 402" : "e.g. Zoom Link"}
                required
                className="w-full px-4 py-2.5 border border-outline-variant/60 rounded-xl focus:border-primary focus:ring-0 text-xs bg-slate-50/30 mt-1"
              />
            </div>
          </div>
        </div>

        {/* Form Footer Buttons */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-outline-variant/40">
          <Link
            href="/admin/batches"
            className="px-6 py-2.5 rounded-xl font-bold text-xs text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            Cancel Changes
          </Link>
          <button
            type="submit"
            className="px-8 py-2.5 bg-primary text-on-primary rounded-xl font-bold text-xs shadow-lg shadow-primary/20 hover:opacity-95 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">check_circle</span>
            <span>Create Batch</span>
          </button>
        </div>
      </form>

      {/* Success Toast slide up */}
      <div
        className={`fixed bottom-8 right-8 bg-surface-container-highest border-l-4 border-emerald-500 p-4 shadow-2xl rounded-xl transition-all duration-500 z-50 flex items-center gap-4 ${
          showToast ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"
        }`}
      >
        <span className="material-symbols-outlined text-emerald-500 text-3xl shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
          task_alt
        </span>
        <div className="flex-1">
          <p className="font-bold text-xs text-on-surface leading-tight">Batch Created Successfully</p>
          <p className="text-[10px] text-on-surface-variant mt-1 leading-normal">
            The new cohort schedule has been synchronized with the instructors.
          </p>
        </div>
        <button
          onClick={() => setShowToast(false)}
          className="p-1 hover:bg-surface-container rounded-full text-on-surface-variant cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
    </main>
  );
}
