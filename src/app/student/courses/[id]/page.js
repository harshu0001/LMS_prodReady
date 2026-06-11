"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import VideoPlayer from "../../../../components/VideoPlayer";
import { getCourseDetailsAction } from "../../../actions/courses";

export default function CoursePlayerPage({ params }) {
  // Read route parameter using React.use()
  const { id } = use(params);

  // Layout State
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("notes");
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lessons State
  const [modules, setModules] = useState([
    {
      title: "Module 1: Design Foundations",
      lessons: [
        { id: "1-1", title: "Introduction to Soft UI", duration: "12:45", completed: true, active: true, videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
        { id: "1-2", title: "Color Theory for Interfaces", duration: "18:20", completed: false, active: false, videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
        { id: "1-3", title: "Typography Systems", duration: "22:15", completed: false, active: false, locked: true },
      ],
    },
  ]);

  const [activeLesson, setActiveLesson] = useState({
    title: "Introduction to Soft UI Design",
    desc: "In this lesson, we explore the psychology behind soft tonal layering and how to implement it effectively.",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    assets: ["Design_Guide.pdf"],
  });

  // Notes state
  const [notes, setNotes] = useState([
    { id: 1, text: "Soft UI relies on tonal layering rather than heavy drop shadows to create depth.", timestamp: "01:15" },
    { id: 2, text: "The use of Indigo (#3525cd) as a primary brand anchor provides trust and stability.", timestamp: "03:40" },
  ]);
  const [newNoteText, setNewNoteText] = useState("");

  // Simulated comments state
  const [comments, setComments] = useState([
    { author: "Marcus Thorne", avatar: "JD", text: "This approach to spacing makes so much sense! The 8pt grid is a lifesaver.", time: "2 hours ago" },
    { author: "Elena Rodriguez", avatar: "ER", text: "Are there any Figma plugins that automate this shadow rendering?", time: "5 hours ago" },
  ]);
  const [newCommentText, setNewCommentText] = useState("");

  useEffect(() => {
    async function loadCourse() {
      if (!id) return;
      try {
        const data = await getCourseDetailsAction(id);
        if (data) {
          setCourse(data);

          // Parse description JSON
          let parsedDesc = data.description;
          let videoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // Fallback URL
          let assets = ["Design_Guide.pdf"];

          try {
            const parsed = JSON.parse(data.description);
            parsedDesc = parsed.text;
            if (parsed.videoUrl) videoUrl = parsed.videoUrl;
            if (parsed.assets && parsed.assets.length > 0) assets = parsed.assets;
          } catch (e) {
            // Description is plain text
          }

          setActiveLesson({
            title: `Welcome to ${data.title}`,
            desc: parsedDesc,
            videoUrl: videoUrl,
            assets: assets,
          });

          // Set modules list
          setModules([
            {
              title: "Module 1: Getting Started",
              lessons: [
                { id: "1-1", title: `Welcome to ${data.title}`, duration: "05:00", completed: true, active: true, videoUrl: videoUrl, assets: assets },
                { id: "1-2", title: "Course Curriculum Overview", duration: "08:15", completed: false, active: false, videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
              ],
            },
            {
              title: "Module 2: Practical Labs",
              lessons: [
                { id: "2-1", title: "Milestones & Lab 1.1", duration: "15:30", completed: false, active: false, locked: true },
              ]
            }
          ]);
        }
      } catch (err) {
        console.error("Failed to load course player database details:", err);
      } finally {
        setLoading(false);
      }
    }
    loadCourse();
  }, [id]);

  const selectLesson = (modIndex, lesIndex) => {
    const target = modules[modIndex].lessons[lesIndex];
    if (target.locked) {
      alert("This lesson is locked. Complete the previous sections first!");
      return;
    }

    const nextModules = [...modules];
    // Reset active
    nextModules.forEach((m) => m.lessons.forEach((l) => (l.active = false)));
    nextModules[modIndex].lessons[lesIndex].active = true;
    setModules(nextModules);

    setActiveLesson({
      title: target.title,
      desc: target.desc || `Detailed overview of ${target.title}. Practice standard definitions, templates, and layouts to build dynamic designs.`,
      videoUrl: target.videoUrl || "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      assets: target.assets || ["Asset_Cheat_Sheet.pdf"],
    });
  };

  const markComplete = () => {
    const nextModules = [...modules];
    let foundActive = false;
    let nextToActivate = null;

    for (let m = 0; m < nextModules.length; m++) {
      for (let l = 0; l < nextModules[m].lessons.length; l++) {
        const lesson = nextModules[m].lessons[l];
        if (lesson.active) {
          lesson.completed = true;
          foundActive = true;
          // Unlock next lesson if it exists
          const nextLesson = nextModules[m].lessons[l + 1] || (nextModules[m + 1] && nextModules[m + 1].lessons[0]);
          if (nextLesson) {
            nextLesson.locked = false;
            nextToActivate = { m: l + 1 < nextModules[m].lessons.length ? m : m + 1, l: l + 1 < nextModules[m].lessons.length ? l + 1 : 0 };
          }
          break;
        }
      }
      if (foundActive) break;
    }

    setModules(nextModules);

    if (nextToActivate) {
      selectLesson(nextToActivate.m, nextToActivate.l);
    } else {
      alert("Congratulations! You completed the last lesson of this course!");
    }
  };

  const addNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    setNotes([
      ...notes,
      {
        id: Date.now(),
        text: newNoteText,
        timestamp: "02:15",
      },
    ]);
    setNewNoteText("");
  };

  const addComment = (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    setComments([
      ...comments,
      {
        author: "Alex Johnson",
        avatar: "AJ",
        text: newCommentText,
        time: "Just now",
      },
    ]);
    setNewCommentText("");
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-surface text-on-surface font-semibold text-sm">
        Loading Course Player...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-surface text-on-surface p-6">
        <h3 className="font-heading text-headline-sm font-bold text-error">Course Not Found</h3>
        <p className="text-xs text-on-surface-variant mt-2">The course could not be loaded from the database.</p>
        <Link href="/student/dashboard" className="mt-4 bg-primary text-on-primary px-6 py-2.5 rounded-xl font-bold text-xs">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-surface-container-lowest">
      {/* Collapsible Left Sidebar: Curriculum */}
      <aside 
        style={{ width: sidebarOpen ? "320px" : "0px" }}
        className="shrink-0 bg-surface border-r border-outline-variant flex flex-col h-full overflow-hidden transition-all duration-300 z-30"
      >
        <div className="p-md border-b border-outline-variant">
          <h2 className="font-heading text-headline-sm font-bold text-on-surface font-extrabold">{course.title}</h2>
          <p className="text-xs text-on-surface-variant mt-1">Instructor: {course.instructor.name}</p>
        </div>
        <div className="flex-grow overflow-y-auto custom-scrollbar p-xs space-y-md">
          {modules.map((mod, modIdx) => (
            <div key={mod.title} className="space-y-1">
              <div className="w-full flex items-center justify-between p-sm rounded-lg font-heading text-sm font-bold text-on-surface text-left">
                <span>{mod.title}</span>
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </div>
              <div className="space-y-1">
                {mod.lessons.map((les, lesIdx) => (
                  <div 
                    key={les.id}
                    onClick={() => selectLesson(modIdx, lesIdx)}
                    className={`flex items-center gap-3 p-sm rounded-lg group cursor-pointer border-l-4 transition-all ${
                      les.active 
                        ? "bg-secondary-container border-primary" 
                        : "border-transparent hover:bg-surface-container-low"
                    } ${les.locked ? "opacity-60 cursor-not-allowed" : ""}`}
                  >
                    <span 
                      className={`material-symbols-outlined text-lg ${les.completed ? "text-primary" : "text-outline"}`}
                      style={{ fontVariationSettings: les.completed ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      {les.locked ? "lock" : les.completed ? "check_circle" : "radio_button_unchecked"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-semibold truncate ${les.active ? "text-on-secondary-container" : "text-on-surface"}`}>
                        {les.title}
                      </p>
                      <p className={`text-[10px] ${les.active ? "text-on-secondary-container/80" : "text-on-surface-variant"}`}>
                        {les.duration}
                      </p>
                    </div>
                    {!les.locked && (
                      <span className={`material-symbols-outlined text-sm ${les.active ? "text-primary" : "text-outline opacity-0 group-hover:opacity-100"}`}>
                        play_circle
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="p-md border-t border-outline-variant bg-surface-container-lowest">
          <button 
            onClick={() => alert("Certificate claimed!")}
            className="w-full bg-primary text-on-primary font-bold py-2.5 rounded-lg hover:bg-primary-container transition-all flex items-center justify-center gap-2 text-sm shadow-md cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">emoji_events</span>
            <span>Download Certificate</span>
          </button>
        </div>
      </aside>

      {/* Main Video & Content Area */}
      <section className="flex-grow flex flex-col overflow-y-auto custom-scrollbar">
        {/* Sidebar toggler tab */}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute left-2 top-2 z-40 bg-white dark:bg-[#12111a] shadow-md hover:bg-slate-100 border border-outline-variant/40 p-1.5 rounded-full flex items-center justify-center cursor-pointer"
        >
          <span className="material-symbols-outlined text-on-surface-variant text-lg">
            {sidebarOpen ? "menu_open" : "menu"}
          </span>
        </button>

        {/* Video Player */}
        <div className="w-full max-w-[1100px] mx-auto p-md md:p-xl space-y-md">
          {/* Functional Dynamic Video Player component! */}
          <VideoPlayer videoUrl={activeLesson.videoUrl} />

          {/* Lesson Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-md border-b border-outline-variant/30 pb-lg">
            <div className="flex-1">
              <h2 className="font-heading text-[22px] md:text-headline-md font-bold text-on-surface">{activeLesson.title}</h2>
              <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">{activeLesson.desc}</p>
            </div>
            <div className="flex gap-sm shrink-0">
              <button className="px-sm py-2 bg-surface border border-outline-variant rounded-lg font-bold text-xs text-on-surface hover:bg-surface-container-low transition-colors flex items-center gap-1 active:scale-95 cursor-pointer">
                <span className="material-symbols-outlined text-xs">chevron_left</span>
                <span>Previous</span>
              </button>
              <button 
                onClick={markComplete}
                className="px-sm py-2 bg-primary text-on-primary rounded-lg font-bold text-xs hover:bg-primary-container transition-all flex items-center gap-1 active:scale-95 shadow-sm cursor-pointer"
              >
                <span>Complete &amp; Next</span>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="border-b border-outline-variant/30 flex gap-lg">
            {[
              { id: "notes", name: "Lesson Notes" },
              { id: "resources", name: `Resources (${activeLesson.assets?.length || 0})` },
              { id: "discussion", name: "Discussion" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-md font-semibold text-xs transition-colors relative cursor-pointer ${
                  activeTab === tab.id
                    ? "text-primary border-b-2 border-primary"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Tab View */}
          <div className="py-md">
            {activeTab === "notes" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
                <div className="lg:col-span-2 space-y-md">
                  <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-lg shadow-sm">
                    <h3 className="font-heading text-headline-sm font-bold text-on-surface mb-md">Key Takeaways</h3>
                    <ul className="space-y-sm">
                      {notes.map((note) => (
                        <li key={note.id} className="flex gap-3 items-start group">
                          <span className="material-symbols-outlined text-primary text-xs mt-1">lens</span>
                          <div className="flex-1 text-sm text-on-surface-variant leading-relaxed">
                            <span className="font-semibold text-primary inline-block mr-1">[{note.timestamp}]</span>
                            {note.text}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Add Private Note form */}
                  <form onSubmit={addNote} className="flex gap-4 bg-surface-container-low p-md rounded-2xl border border-dashed border-outline-variant/60 hover:border-primary/50 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary border border-outline-variant/40 shrink-0">
                      <span className="material-symbols-outlined">edit_note</span>
                    </div>
                    <div className="flex-grow">
                      <input 
                        type="text"
                        placeholder="Add private note..."
                        value={newNoteText}
                        onChange={(e) => setNewNoteText(e.target.value)}
                        className="bg-transparent border-none outline-none text-sm w-full placeholder-on-surface-variant/60"
                      />
                      <p className="text-[10px] text-on-surface-variant mt-0.5">Press Enter to save. Your notes are private.</p>
                    </div>
                    <button type="submit" className="material-symbols-outlined text-primary hover:scale-110 active:scale-95 transition-transform shrink-0 cursor-pointer">
                      add_circle
                    </button>
                  </form>
                </div>

                <div className="space-y-md">
                  <div className="glass-panel p-md rounded-xl">
                    <h4 className="font-heading text-sm font-bold text-on-surface mb-sm">Lesson Assets</h4>
                    <div className="space-y-sm">
                      {activeLesson.assets?.map((asset, index) => (
                        <div 
                          key={index}
                          onClick={() => alert(`Downloading asset: ${asset}`)}
                          className="flex items-center justify-between p-sm bg-surface-container-lowest rounded-lg border border-outline-variant/60 hover:border-primary/50 transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-lg">description</span>
                            <span className="text-xs text-on-surface truncate max-w-[120px]">{asset}</span>
                          </div>
                          <span className="material-symbols-outlined text-sm opacity-40 group-hover:opacity-100 transition-opacity">download</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "resources" && (
              <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-lg shadow-sm max-w-2xl space-y-md">
                <h3 className="font-heading text-sm font-bold text-on-surface">Curated Class Assets</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
                  {activeLesson.assets?.map((asset, index) => (
                    <div 
                      key={index}
                      onClick={() => alert(`Downloading asset: ${asset}`)}
                      className="flex items-center justify-between p-md bg-surface-container-low rounded-xl border border-outline-variant/20 hover:border-primary/30 transition-colors cursor-pointer group"
                    >
                      <div>
                        <p className="text-xs font-semibold text-on-surface">{asset}</p>
                        <p className="text-[10px] text-on-surface-variant mt-0.5">PDF Document</p>
                      </div>
                      <span className="material-symbols-outlined text-primary text-sm opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all">download</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "discussion" && (
              <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-lg shadow-sm max-w-2xl space-y-lg">
                <h3 className="font-heading text-sm font-bold text-on-surface">Public Discussion</h3>
                <div className="space-y-sm">
                  {comments.map((c, i) => (
                    <div key={i} className="flex gap-4 p-md bg-surface-container-low rounded-2xl border border-outline-variant/10">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0 border border-outline-variant/20">
                        {c.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h5 className="font-semibold text-xs text-on-surface">{c.author}</h5>
                          <span className="text-[10px] text-on-surface-variant font-medium">{c.time}</span>
                        </div>
                        <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{c.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={addComment} className="flex gap-4 mt-lg">
                  <input 
                    type="text"
                    placeholder="Add a comment to the discussion..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    className="flex-grow bg-surface-container-low border border-outline-variant/60 rounded-xl px-sm py-2.5 text-xs outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                  <button type="submit" className="px-lg py-2.5 bg-primary text-on-primary rounded-xl font-bold text-xs hover:opacity-90 active:scale-95 transition-all cursor-pointer">
                    Post Comment
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
