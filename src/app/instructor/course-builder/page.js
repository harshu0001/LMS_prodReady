"use client";

import React, { useState, useRef } from "react";
import VideoPlayer from "../../../components/VideoPlayer";
import { createCourseAction } from "../../actions/courses";

export default function CourseBuilderPage() {
  // Course Metadata State
  const [courseTitle, setCourseTitle] = useState("Modern UI Design Principles");
  const [courseCategory, setCourseCategory] = useState("Programming & Computer Science");
  const [courseDesc, setCourseDesc] = useState("Master the art of high-fidelity user interfaces, user research, and responsive layout constraints.");
  
  // Curriculum tree structure
  const [sections, setSections] = useState([
    {
      id: "sec-1",
      title: "Introduction to Adhyan",
      lessons: [
        { id: "les-1-1", title: "1.1 Welcome Message", type: "video", desc: "Welcome to Adhyan Learning! Learn the platform fundamentals.", videoName: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", assets: ["Syllabus.pdf"] },
        { id: "les-1-2", title: "1.2 Learning Objectives", type: "document", desc: "Define the core milestones and objectives of the course.", assets: ["Objectives_Guide.pdf"] },
      ],
    },
    {
      id: "sec-2",
      title: "Module 2: Design Systems",
      lessons: [
        { id: "les-2-1", title: "2.1 UI Foundation & Tokens", type: "video", desc: "Understand standard colors, spacing, and elevation variables.", videoName: "https://www.youtube.com/watch?v=3323cc", assets: [] },
      ],
    },
  ]);

  // Editor State (Active Section / Lesson)
  const [activeSecId, setActiveSecId] = useState("sec-1");
  const [activeLesId, setActiveLesId] = useState("les-1-1");

  const activeSec = sections.find((s) => s.id === activeSecId) || sections[0];
  const activeLes = activeSec.lessons.find((l) => l.id === activeLesId) || activeSec.lessons[0] || {
    id: "none",
    title: "No Lesson Selected",
    desc: "Create or select a lesson to begin editing.",
    type: "none",
    assets: [],
  };

  // Publish / Settings State
  const [isPublished, setIsPublished] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [freePreview, setFreePreview] = useState(false);
  const [discussionsEnabled, setDiscussionsEnabled] = useState(true);

  // Video Upload Dialog State
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [youtubeInput, setYoutubeInput] = useState("");

  const fileInputRef = useRef(null);
  const assetInputRef = useRef(null);

  // Form edit handlers
  const handleTitleChange = (val) => {
    const nextSections = sections.map((s) => {
      if (s.id === activeSecId) {
        return {
          ...s,
          lessons: s.lessons.map((l) => (l.id === activeLesId ? { ...l, title: val } : l)),
        };
      }
      return s;
    });
    setSections(nextSections);
  };

  const handleDescChange = (val) => {
    const nextSections = sections.map((s) => {
      if (s.id === activeSecId) {
        return {
          ...s,
          lessons: s.lessons.map((l) => (l.id === activeLesId ? { ...l, desc: val } : l)),
        };
      }
      return s;
    });
    setSections(nextSections);
  };

  const handleAddSection = () => {
    const name = prompt("Enter module title:");
    if (!name) return;
    setSections([
      ...sections,
      {
        id: `sec-${Date.now()}`,
        title: name,
        lessons: [],
      },
    ]);
  };

  const handleAddLesson = (secId) => {
    const title = prompt("Enter lesson title:");
    if (!title) return;
    const type = confirm("Is this a Video lesson? (OK for Video, Cancel for Document)") ? "video" : "document";

    const nextSections = sections.map((s) => {
      if (s.id === secId) {
        return {
          ...s,
          lessons: [
            ...s.lessons,
            {
              id: `les-${Date.now()}`,
              title: title,
              type: type,
              desc: "Write detailed descriptions and instructions here.",
              videoName: type === "video" ? "" : undefined,
              assets: [],
            },
          ],
        };
      }
      return s;
    });
    setSections(nextSections);
  };

  const selectLesson = (secId, lesId) => {
    setActiveSecId(secId);
    setActiveLesId(lesId);
  };

  const handleVideoFileSelected = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const blobUrl = URL.createObjectURL(file);

    const nextSections = sections.map((s) => {
      if (s.id === activeSecId) {
        return {
          ...s,
          lessons: s.lessons.map((l) => {
            if (l.id === activeLesId) {
              return { ...l, videoName: blobUrl, type: "video" };
            }
            return l;
          }),
        };
      }
      return s;
    });
    setSections(nextSections);
    setShowUploadModal(false);
    alert(`Video file "${file.name}" loaded successfully in player.`);
  };

  const handleYoutubeSubmit = (e) => {
    e.preventDefault();
    if (!youtubeInput.trim()) return;

    const nextSections = sections.map((s) => {
      if (s.id === activeSecId) {
        return {
          ...s,
          lessons: s.lessons.map((l) => {
            if (l.id === activeLesId) {
              return { ...l, videoName: youtubeInput.trim(), type: "video" };
            }
            return l;
          }),
        };
      }
      return s;
    });
    setSections(nextSections);
    setShowUploadModal(false);
    setYoutubeInput("");
    alert("YouTube video link connected successfully.");
  };

  const handleAssetUpload = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    const nextSections = sections.map((s) => {
      if (s.id === activeSecId) {
        return {
          ...s,
          lessons: s.lessons.map((l) => {
            if (l.id === activeLesId) {
              return { ...l, assets: [...(l.assets || []), file.name] };
            }
            return l;
          }),
        };
      }
      return s;
    });
    setSections(nextSections);
    alert(`File "${file.name}" linked as lesson resource asset.`);
  };

  const handlePublish = async () => {
    setPublishing(true);
    try {
      // Gather active assets and video details
      const activeVideo = activeLes.videoName || "";
      const activeAssets = activeLes.assets || [];

      const result = await createCourseAction({
        title: courseTitle,
        category: courseCategory,
        description: courseDesc,
        videoUrl: activeVideo,
        assets: activeAssets,
      });

      if (result.success) {
        setIsPublished(true);
        alert(`Course "${courseTitle}" published successfully!\nIt is now recommended for you on the student's dashboard.`);
      } else {
        alert(result.error || "Failed to publish course.");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to connect to publishing action.");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden">
      {/* Sidebar: Curriculum Outline */}
      <div className="w-full md:w-80 bg-surface-container-lowest border-r border-outline-variant flex flex-col overflow-y-auto shrink-0">
        <div className="p-4 border-b border-outline-variant flex justify-between items-center sticky top-0 bg-white dark:bg-[#141320] z-10">
          <h2 className="font-heading text-headline-sm font-bold text-on-surface font-extrabold">Curriculum</h2>
          <button 
            onClick={handleAddSection}
            className="p-1 hover:bg-slate-100 rounded-full transition-colors text-primary flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined">add_circle</span>
          </button>
        </div>
        <div className="p-2 space-y-4 flex-grow">
          {sections.map((sec) => (
            <div key={sec.id} className="space-y-1">
              <div className="flex items-center justify-between p-2.5 bg-surface-container-low rounded-lg font-bold text-xs text-on-surface select-none">
                <div className="flex items-center gap-2 truncate">
                  <span className="material-symbols-outlined text-xs">expand_more</span>
                  <span className="truncate">{sec.title}</span>
                </div>
                <button 
                  onClick={() => handleAddLesson(sec.id)}
                  className="material-symbols-outlined text-primary text-sm hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                >
                  add
                </button>
              </div>
              <div className="pl-4 space-y-1">
                {sec.lessons.map((les) => {
                  const isActive = les.id === activeLesId;
                  return (
                    <div 
                      key={les.id}
                      onClick={() => selectLesson(sec.id, les.id)}
                      className={`flex items-center gap-2.5 p-2.5 rounded-lg border cursor-pointer select-none transition-all ${
                        isActive
                          ? "bg-primary-container text-on-primary-container font-bold border-primary/20 shadow-sm"
                          : "text-on-surface-variant hover:bg-surface-container border-transparent"
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {les.type === "video" ? "play_circle" : "description"}
                      </span>
                      <span className="text-[11px] truncate">{les.title}</span>
                    </div>
                  );
                })}
                {sec.lessons.length === 0 && (
                  <p className="text-[10px] text-on-surface-variant italic pl-2 py-1">No lessons in this module.</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-outline-variant/60">
          <button 
            onClick={handleAddSection}
            className="w-full py-2.5 bg-slate-100 dark:bg-surface-container-high text-slate-700 dark:text-on-surface font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors text-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            <span>New Section</span>
          </button>
        </div>
      </div>

      {/* Central Workspace: Lesson Editor */}
      <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-background p-gutter">
        <div className="max-w-3xl mx-auto space-y-gutter">
          
          {/* Overall Course Info block */}
          <section className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-primary uppercase tracking-wider">Course Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">Course Title</label>
                <input 
                  type="text" 
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest p-2.5 text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="Enter Course Title"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">Course Category</label>
                <select 
                  value={courseCategory}
                  onChange={(e) => setCourseCategory(e.target.value)}
                  className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest p-2.5 text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                >
                  <option value="Programming & Computer Science">Programming & Computer Science</option>
                  <option value="IT & Network Security">IT & Network Security</option>
                  <option value="Design & Business Strategy">Design & Business Strategy</option>
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">Course Description</label>
              <textarea 
                rows="2"
                value={courseDesc}
                onChange={(e) => setCourseDesc(e.target.value)}
                className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest p-2.5 text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                placeholder="Brief summary of learning goals..."
              ></textarea>
            </div>
          </section>

          {/* Editor Header */}
          <div className="flex items-center justify-between">
            <nav className="flex items-center gap-2 text-on-surface-variant font-bold text-xs">
              <span>Builder</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="truncate">{activeSec.title}</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="text-on-surface dark:text-white truncate font-extrabold">{activeLes.title}</span>
            </nav>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-extrabold rounded">AUTO-SAVED</span>
            </div>
          </div>

          {/* Editor Canvas */}
          <section className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 p-8 shadow-sm space-y-8">
            {/* Title Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">Lesson Title</label>
              <input 
                className="w-full text-lg md:text-headline-md font-heading font-bold border-0 border-b border-outline-variant/30 focus:border-primary focus:ring-0 px-0 transition-all outline-none pb-2 bg-transparent" 
                placeholder="Untitled Lesson" 
                type="text" 
                value={activeLes.title}
                onChange={(e) => handleTitleChange(e.target.value)}
              />
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">Lesson Description / Instructions</label>
              <textarea 
                className="w-full p-4 border border-outline-variant/60 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-xs transition-all bg-slate-50/50 dark:bg-surface-container" 
                placeholder="Enter lesson description..." 
                rows="4"
                value={activeLes.desc}
                onChange={(e) => handleDescChange(e.target.value)}
              ></textarea>
            </div>

            {/* Asset Upload Area */}
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">Upload Lesson Content</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Video Upload */}
                <div 
                  onClick={() => {
                    if (activeLes.id === "none") {
                      alert("Please select or add a lesson first.");
                      return;
                    }
                    setShowUploadModal(true);
                  }}
                  className="border-2 border-dashed border-outline-variant rounded-xl p-6 flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-primary/5 transition-all group cursor-pointer"
                >
                  <span className="material-symbols-outlined text-4xl text-outline group-hover:text-primary transition-colors">video_library</span>
                  <span className="font-bold text-xs text-on-surface">Upload Video / Link URL</span>
                  <span className="text-[10px] text-outline text-center">Supports MP4 files or private YouTube URLs</span>
                </div>
                {/* File Upload */}
                <div 
                  onClick={() => {
                    if (activeLes.id === "none") {
                      alert("Please select or add a lesson first.");
                      return;
                    }
                    assetInputRef.current?.click();
                  }}
                  className="border-2 border-dashed border-outline-variant rounded-xl p-6 flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-primary/5 transition-all group cursor-pointer"
                >
                  <span className="material-symbols-outlined text-4xl text-outline group-hover:text-primary transition-colors">upload_file</span>
                  <span className="font-bold text-xs text-on-surface">Upload PDF/Assets</span>
                  <span className="text-[10px] text-outline text-center">Resources for students</span>
                  <input 
                    type="file" 
                    ref={assetInputRef} 
                    onChange={handleAssetUpload}
                    className="hidden" 
                  />
                </div>
              </div>
            </div>

            {/* Video Player Preview (Functional Integration!) */}
            {activeLes.type === "video" && activeLes.videoName && (
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">Video Player Preview</span>
                <div className="rounded-xl overflow-hidden border border-outline-variant/60 shadow-sm">
                  <VideoPlayer videoUrl={activeLes.videoName} />
                </div>
              </div>
            )}

            {/* List Linked Assets */}
            {activeLes.assets && activeLes.assets.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-outline-variant/30">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">Linked Materials</span>
                <div className="flex flex-wrap gap-2">
                  {activeLes.assets.map((as, i) => (
                    <div key={i} className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container border border-outline-variant/40 rounded-lg text-xs font-bold">
                      <span className="material-symbols-outlined text-sm text-primary">description</span>
                      <span>{as}</span>
                      <button 
                        onClick={() => {
                          const nextSecs = sections.map((s) => ({
                            ...s,
                            lessons: s.lessons.map((l) => (l.id === activeLesId ? { ...l, assets: l.assets.filter((a) => a !== as) } : l)),
                          }));
                          setSections(nextSecs);
                        }}
                        className="material-symbols-outlined text-xs hover:text-error text-outline transition-colors ml-1 cursor-pointer"
                      >
                        close
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Right Panel: Publish Settings */}
      <div className="hidden xl:flex w-72 bg-surface-container-lowest border-l border-outline-variant flex-col p-6 space-y-8 overflow-y-auto shrink-0">
        <div className="space-y-4">
          <h3 className="font-heading text-headline-sm font-bold text-on-surface font-extrabold">Publish Status</h3>
          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/60 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-on-surface-variant">Status</span>
              <span className={`flex items-center gap-1.5 font-bold text-[10px] uppercase ${isPublished ? "text-emerald-700" : "text-secondary"}`}>
                <span className={`w-2 h-2 rounded-full ${isPublished ? "bg-emerald-500" : "bg-secondary"}`}></span>
                {isPublished ? "Published" : "Draft"}
              </span>
            </div>
            <button 
              onClick={handlePublish}
              disabled={publishing}
              className={`w-full py-3 rounded-xl font-bold text-xs transition-colors shadow-md cursor-pointer disabled:opacity-50 ${
                isPublished 
                  ? "bg-slate-100 text-slate-700 hover:bg-slate-200" 
                  : "bg-primary text-on-primary hover:opacity-90"
              }`}
            >
              {publishing ? "Publishing..." : isPublished ? "Revert to Draft" : "Publish Now"}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-heading text-headline-sm font-bold text-on-surface font-extrabold">Settings</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-on-surface">Free Preview</span>
                <span className="text-[9px] text-outline font-semibold">Let students see this lesson</span>
              </div>
              <button 
                onClick={() => setFreePreview(!freePreview)}
                className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${freePreview ? "bg-primary" : "bg-outline-variant"}`}
              >
                <div 
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${
                    freePreview ? "right-0.5" : "left-0.5"
                  }`}
                ></div>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-on-surface">Discussions</span>
                <span className="text-[9px] text-outline font-semibold">Enable student comments</span>
              </div>
              <button 
                onClick={() => setDiscussionsEnabled(!discussionsEnabled)}
                className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${discussionsEnabled ? "bg-primary" : "bg-outline-variant"}`}
              >
                <div 
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${
                    discussionsEnabled ? "right-0.5" : "left-0.5"
                  }`}
                ></div>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-outline-variant/40">
          <h3 className="font-heading text-headline-sm font-bold text-on-surface">Course Progress</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold text-on-surface-variant">
              <span>Module completion</span>
              <span>65%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="w-[65%] h-full bg-emerald-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden File Input for Video file uploads */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleVideoFileSelected}
        accept="video/*" 
        className="hidden" 
      />

      {/* Upload Video / YouTube Link Modal Dialogue */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#141320] border border-outline-variant/60 rounded-2xl max-w-md w-full p-6 shadow-xl relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowUploadModal(false)}
              className="absolute right-4 top-4 p-1 rounded-full hover:bg-surface-container text-on-surface-variant cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
            <h3 className="font-heading text-headline-sm font-bold text-on-surface mb-6">Upload Lesson Video</h3>
            
            <div className="space-y-6">
              {/* Option A: Direct upload */}
              <div>
                <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Option 1: Upload Video File</h4>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-4 border-2 border-dashed border-outline-variant/60 rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all text-xs font-bold text-primary flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined">video_file</span>
                  <span>Select Video File</span>
                </button>
              </div>

              <div className="relative flex items-center justify-center py-2">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-outline-variant/30"></div></div>
                <span className="relative px-3 bg-white dark:bg-[#141320] text-[10px] font-bold text-on-surface-variant uppercase">Or</span>
              </div>

              {/* Option B: YouTube Link */}
              <form onSubmit={handleYoutubeSubmit} className="space-y-3">
                <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Option 2: Paste Private YouTube Link</h4>
                <input
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={youtubeInput}
                  onChange={(e) => setYoutubeInput(e.target.value)}
                  className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest p-3 text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-primary text-on-primary py-2.5 rounded-xl font-bold text-xs hover:opacity-90 active:scale-95 transition-all shadow-md cursor-pointer"
                >
                  Connect YouTube Video
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
