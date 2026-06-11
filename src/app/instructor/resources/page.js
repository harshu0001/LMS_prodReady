"use client";

import React, { useState, useEffect, useRef } from "react";
import { getInstructorOverviewAction } from "../../actions/instructor";

const MOCK_ASSETS = [
  {
    id: "asset-1",
    name: "syllabus_v2_final.pdf",
    course: "Advanced UI Design Masterclass",
    type: "PDF",
    icon: "picture_as_pdf",
    iconColor: "text-red-500",
    status: "Live",
    size: "1.2 MB",
  },
  {
    id: "asset-2",
    name: "intro_to_typography.mp4",
    course: "Advanced UI Design Masterclass",
    type: "Video",
    icon: "videocam",
    iconColor: "text-blue-500",
    status: "Live",
    size: "42.5 MB",
  },
  {
    id: "asset-3",
    name: "react_lifecycle_diagram.png",
    course: "Python for Beginners",
    type: "Image",
    icon: "article",
    iconColor: "text-amber-500",
    status: "Draft",
    size: "450 KB",
  },
  {
    id: "asset-4",
    name: "project_assets_bundle.zip",
    course: "Cybersecurity Essentials",
    type: "Archive",
    icon: "folder_zip",
    iconColor: "text-purple-500",
    status: "Live",
    size: "8.4 MB",
  }
];

export default function ResourcesPage() {
  const [courses, setCourses] = useState([]);
  const [assets, setAssets] = useState(MOCK_ASSETS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getInstructorOverviewAction();
        if (data && data.courses) {
          setCourses(data.courses);
        } else {
          setCourses([
            { id: "c1", title: "Advanced UI Design Masterclass", studentCount: 24 },
            { id: "c2", title: "Python for Beginners", studentCount: 18 },
            { id: "c3", title: "Cybersecurity Essentials", studentCount: 12 }
          ]);
        }
      } catch (err) {
        console.error("Failed to load courses for resources:", err);
      }
    }
    loadData();
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFilesUpload(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFilesUpload(e.target.files);
    }
  };

  const handleFilesUpload = (filesList) => {
    const uploadedArray = Array.from(filesList);
    const newAssets = uploadedArray.map((file, i) => {
      const extension = file.name.split(".").pop().toUpperCase();
      let icon = "article";
      let iconColor = "text-amber-500";

      if (extension === "PDF") {
        icon = "picture_as_pdf";
        iconColor = "text-red-500";
      } else if (["MP4", "MOV", "AVI"].includes(extension)) {
        icon = "videocam";
        iconColor = "text-blue-500";
      } else if (["ZIP", "RAR", "TAR"].includes(extension)) {
        icon = "folder_zip";
        iconColor = "text-purple-500";
      }

      return {
        id: `upload-${Date.now()}-${i}`,
        name: file.name,
        course: courses[0]?.title || "General Library",
        type: extension,
        icon,
        iconColor,
        status: "Live",
        size: `${Math.round(file.size / 1024 / 10.24) / 100} MB`,
      };
    });

    setAssets((prev) => [...newAssets, ...prev]);
    alert(`${uploadedArray.length} file(s) uploaded and saved to library!`);
  };

  const filteredAssets = assets.filter((asset) =>
    asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-12 max-w-container-max mx-auto w-full pb-32">
      <header className="mb-8">
        <h1 className="font-heading text-[32px] md:text-display-lg font-extrabold text-on-surface leading-tight">
          Teaching Resources
        </h1>
        <p className="text-body-lg text-on-surface-variant mt-2 max-w-2xl leading-relaxed">
          Central library for your instructional assets across all courses.
        </p>
      </header>

      {/* Bento Grid - Folders & Upload */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Course Folders */}
        <section className="md:col-span-2 bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-heading text-headline-sm font-bold text-on-surface">Course Folders</h3>
            <button 
              onClick={() => alert("View all folders")}
              className="text-primary font-bold text-xs flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>View All</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {courses.map((course, idx) => (
              <div 
                key={course.id || idx}
                onClick={() => alert(`Opening folder for: ${course.title}`)}
                className="group cursor-pointer p-4 rounded-xl bg-surface-container-low border border-transparent hover:border-primary/20 hover:bg-surface-container-highest transition-all duration-300"
              >
                <span className="material-symbols-outlined text-primary text-[40px] mb-3" style={{ fontVariationSettings: "'FILL' 1" }}>folder</span>
                <h4 className="font-bold text-sm text-on-surface mb-1 truncate">{course.title}</h4>
                <p className="text-xs text-on-surface-variant font-medium">{(idx * 6 + 12) % 25} Files</p>
              </div>
            ))}
          </div>
        </section>

        {/* Drag-and-Drop Upload */}
        <section 
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`bg-surface-container-lowest border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center group cursor-pointer transition-all duration-300 ${isDragActive ? "border-primary bg-primary/5 scale-98" : "border-outline-variant/75 hover:border-primary hover:scale-101"}`}
        >
          <div className="w-16 h-16 rounded-full bg-primary-container/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-primary duration-300">
            <span className="material-symbols-outlined text-[32px]">cloud_upload</span>
          </div>
          <h3 className="font-bold text-sm text-on-surface mb-2">Drag & Drop Files</h3>
          <p className="text-xs text-on-surface-variant mb-4 px-4">Upload PDF, Video, or ZIP archives for your lessons.</p>
          <button className="bg-primary text-on-primary px-6 py-2 rounded-lg font-bold text-xs shadow-md">Browse Files</button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileInputChange} 
            multiple 
            className="hidden" 
          />
        </section>
      </div>

      {/* Recent Assets Section */}
      <section className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-outline-variant/60 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-[#141320]">
          <h3 className="font-heading text-headline-sm font-bold text-on-surface">Recent Assets</h3>
          <div className="flex gap-2 w-full sm:w-auto items-center">
            <div className="relative flex-grow sm:flex-grow-0">
              <input 
                type="text"
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 rounded-full border border-outline-variant bg-surface-container-lowest text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all w-full sm:w-64"
              />
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base">search</span>
            </div>
            <button 
              onClick={() => alert("Filter Assets")}
              className="p-2 rounded-lg border border-outline-variant bg-surface hover:bg-surface-container transition-colors cursor-pointer flex items-center justify-center shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low border-b border-outline-variant/60">
              <tr>
                <th className="px-6 py-4 font-bold text-xs text-on-surface-variant">File Name</th>
                <th className="px-6 py-4 font-bold text-xs text-on-surface-variant">Course Association</th>
                <th className="px-6 py-4 font-bold text-xs text-on-surface-variant">Size</th>
                <th className="px-6 py-4 font-bold text-xs text-on-surface-variant">Type</th>
                <th className="px-6 py-4 font-bold text-xs text-on-surface-variant">Status</th>
                <th className="px-6 py-4 font-bold text-xs text-on-surface-variant text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {filteredAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className={`material-symbols-outlined ${asset.iconColor}`}>{asset.icon}</span>
                      <span className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">{asset.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-on-surface-variant font-medium">{asset.course}</td>
                  <td className="px-6 py-4 text-xs text-on-surface-variant font-medium">{asset.size}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-wider">
                      {asset.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 text-xs font-semibold ${asset.status === "Live" ? "text-emerald-600" : "text-on-surface-variant"}`}>
                      <span className={`w-2 h-2 rounded-full ${asset.status === "Live" ? "bg-emerald-600" : "bg-outline"}`}></span>
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => alert(`Actions for ${asset.name}`)}
                      className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors text-xl cursor-pointer"
                    >
                      more_vert
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 bg-surface-container-low flex justify-between items-center border-t border-outline-variant/40">
          <p className="text-xs text-on-surface-variant font-medium">Showing {filteredAssets.length} of {assets.length} files</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg border border-outline-variant font-bold text-xs hover:bg-surface transition-colors disabled:opacity-50" disabled>Previous</button>
            <button className="px-4 py-2 rounded-lg border border-outline-variant font-bold text-xs hover:bg-surface transition-colors">Next</button>
          </div>
        </div>
      </section>
    </main>
  );
}
