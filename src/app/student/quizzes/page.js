"use client";

import React, { useState } from "react";

export default function QuizzesPage() {
  const [filter, setFilter] = useState("all");
  const [quizzes, setQuizzes] = useState([
    {
      id: 1,
      title: "Foundations of Microeconomics",
      details: "Module 04 • 20 Questions • 30 Mins",
      status: "completed",
      score: "Score: 95/100",
      icon: "check_circle",
      iconClass: "bg-green-50 text-green-600",
      buttonText: "Review Answers",
      buttonClass: "border border-primary text-primary font-bold hover:bg-primary hover:text-on-primary",
    },
    {
      id: 2,
      title: "Consumer Theory and Market Demand",
      details: "Module 04 • 15 Questions • 45 Mins",
      status: "in_progress",
      score: "Resume session...",
      icon: "pending",
      iconClass: "bg-primary-fixed text-primary",
      buttonText: "Take Quiz",
      buttonClass: "bg-primary text-on-primary font-bold hover:opacity-90 shadow-sm",
    },
    {
      id: 3,
      title: "Supply, Elasticity, and Surplus",
      details: "Module 04 • 25 Questions • 60 Mins",
      status: "not_started",
      score: "Not attempted",
      icon: "lock_open",
      iconClass: "bg-surface-container text-on-surface-variant",
      buttonText: "Start Test",
      buttonClass: "border border-outline-variant text-on-surface-variant font-bold hover:bg-surface-container",
    },
    {
      id: 4,
      title: "Final Module Assessment",
      details: "Module 04 • 50 Questions • 120 Mins",
      status: "locked",
      score: "Unlock by completing others",
      icon: "lock",
      iconClass: "bg-surface-container text-on-surface-variant",
      buttonText: "Unavailable",
      buttonClass: "bg-surface-container-highest text-on-surface-variant font-bold opacity-50 cursor-not-allowed",
    },
  ]);

  const [proficiency, setProficiency] = useState([
    { name: "Economic Theory", val: 92, class: "bg-emerald-500" },
    { name: "Mathematical Analysis", val: 78, class: "bg-primary" },
    { name: "Real-world Application", val: 64, class: "bg-amber-400" },
  ]);

  const completedCount = quizzes.filter((q) => q.status === "completed").length;
  const progressPercent = Math.round((completedCount / quizzes.length) * 100);

  const handleQuizAction = (quizId, currentStatus) => {
    if (currentStatus === "locked") {
      alert("This assessment is locked. Please finish the preceding assessments first!");
      return;
    }

    if (currentStatus === "completed") {
      alert(`Reviewing answers for: ${quizzes.find((q) => q.id === quizId).title}\nCorrect Answers: 19/20.`);
      return;
    }

    // Interactive simulator: take the quiz and complete it
    const score = Math.floor(Math.random() * 20) + 80; // mock score 80-100
    const nextQuizzes = quizzes.map((q) => {
      if (q.id === quizId) {
        return {
          ...q,
          status: "completed",
          score: `Score: ${score}/100`,
          icon: "check_circle",
          iconClass: "bg-green-50 text-green-600",
          buttonText: "Review Answers",
          buttonClass: "border border-primary text-primary font-bold hover:bg-primary hover:text-on-primary",
        };
      }
      return q;
    });

    // Unlock next locked quiz
    const currentCompletedIdx = quizzes.findIndex((q) => q.id === quizId);
    if (currentCompletedIdx !== -1 && currentCompletedIdx + 1 < nextQuizzes.length) {
      const nextQuiz = nextQuizzes[currentCompletedIdx + 1];
      if (nextQuiz.status === "locked" || nextQuiz.status === "not_started") {
        nextQuiz.status = "in_progress";
        nextQuiz.icon = "pending";
        nextQuiz.iconClass = "bg-primary-fixed text-primary";
        nextQuiz.score = "Resume session...";
        nextQuiz.buttonText = "Take Quiz";
        nextQuiz.buttonClass = "bg-primary text-on-primary font-bold hover:opacity-90 shadow-sm";
      }
    }

    setQuizzes(nextQuizzes);

    // Dynamic proficiency bump
    const nextProficiency = proficiency.map((p) => {
      return {
        ...p,
        val: Math.min(100, p.val + Math.floor(Math.random() * 5) + 2),
      };
    });
    setProficiency(nextProficiency);

    alert(`Quiz completed successfully! You scored ${score}/100.`);
  };

  const filteredQuizzes = quizzes.filter((q) => {
    if (filter === "all") return true;
    return q.status === filter;
  });

  return (
    <div className="p-md md:p-xl space-y-xl max-w-container-max mx-auto w-full pb-32">
      {/* Header Info Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md">
        <div>
          <h2 className="font-heading text-[26px] md:text-headline-md font-bold text-on-surface">Applied Economics Roadmap</h2>
          <p className="text-sm text-on-surface-variant mt-0.5">Track your assessments and module progress.</p>
        </div>
        <div className="flex bg-surface-container p-1 rounded-full border border-outline-variant/60">
          <span className="px-3 py-1 text-xs font-bold bg-primary text-on-primary rounded-full">Module 04</span>
          <span className="px-3 py-1 text-xs text-on-surface-variant font-medium">Applied Economics</span>
        </div>
      </div>

      {/* Summary Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-md">
        {/* Overall Performance Card */}
        <div className="md:col-span-2 soft-ui-card rounded-2xl p-lg flex flex-col justify-between overflow-hidden relative border border-outline-variant/60">
          <div className="relative z-10">
            <p className="text-xs text-on-surface-variant uppercase tracking-widest font-bold mb-1">Overall Module Performance</p>
            <h2 className="font-heading text-[36px] md:text-[48px] text-primary font-extrabold">{progressPercent >= 50 ? "84%" : "48%"}</h2>
            <div className="flex items-center gap-xs text-green-600 mt-1 font-semibold text-xs">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span>+5.2% from previous module</span>
            </div>
          </div>
          <div className="mt-md relative z-10">
            <div className="flex justify-between text-xs font-bold mb-xs text-on-surface-variant">
              <span>Progress to Completion</span>
              <span>{completedCount} / {quizzes.length} Assessments</span>
            </div>
            <div className="h-2 bg-surface-container rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-1000" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
          {/* Background Gradient Circle */}
          <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-primary opacity-5 rounded-full blur-3xl"></div>
        </div>

        {/* Quick Stats Cards */}
        <div className="soft-ui-card rounded-2xl p-md flex flex-col items-center justify-center text-center gap-sm border border-outline-variant/60">
          <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-primary shadow-sm border border-outline-variant/10">
            <span className="material-symbols-outlined">timer</span>
          </div>
          <div>
            <p className="font-heading text-headline-sm text-on-surface font-bold">12.5 hrs</p>
            <p className="text-xs text-on-surface-variant font-medium mt-0.5">Total Study Time</p>
          </div>
        </div>

        <div className="soft-ui-card rounded-2xl p-md flex flex-col items-center justify-center text-center gap-sm border border-outline-variant/60">
          <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary shadow-sm border border-outline-variant/10">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
          </div>
          <div>
            <p className="font-heading text-headline-sm text-on-surface font-bold">Top 15%</p>
            <p className="text-xs text-on-surface-variant font-medium mt-0.5">Class Percentile</p>
          </div>
        </div>
      </section>

      {/* Quiz List Section */}
      <section className="space-y-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-sm">
          <div>
            <h3 className="font-heading text-headline-sm font-bold text-on-surface">Assessment Roadmap</h3>
            <p className="text-xs text-on-surface-variant">Complete all assessments to unlock the module certification.</p>
          </div>
          <div className="flex items-center gap-xs">
            <span className="text-xs text-on-surface-variant font-bold mr-1">Filter:</span>
            <div className="flex bg-surface-container p-1 rounded-lg border border-outline-variant/40">
              {[
                { label: "All", val: "all" },
                { label: "Done", val: "completed" },
                { label: "Pending", val: "in_progress" },
              ].map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => setFilter(opt.val)}
                  className={`px-3 py-1 text-xs rounded font-bold transition-all ${
                    filter === opt.val
                      ? "bg-surface-container-lowest text-primary shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Assessment List */}
        <div className="space-y-sm">
          {filteredQuizzes.map((quiz) => (
            <div 
              key={quiz.id} 
              className={`soft-ui-card rounded-2xl p-md md:p-lg flex flex-col md:flex-row items-center gap-md border border-outline-variant/60 ${
                quiz.status === "locked" ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center border border-outline-variant/10 shadow-sm ${quiz.iconClass}`}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: quiz.status === "completed" ? "'FILL' 1" : "'FILL' 0" }}>
                  {quiz.icon}
                </span>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h4 className="font-heading text-headline-sm text-on-surface font-semibold">{quiz.title}</h4>
                <p className="text-xs text-on-surface-variant mt-0.5">{quiz.details}</p>
              </div>
              <div className="flex flex-col items-center md:items-end gap-1 shrink-0">
                <div className="text-xs font-bold text-on-surface">{quiz.score}</div>
                <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block text-center uppercase ${
                  quiz.status === "completed" 
                    ? "bg-green-50 text-green-700" 
                    : quiz.status === "in_progress" 
                      ? "bg-primary-fixed text-primary" 
                      : quiz.status === "not_started" 
                        ? "bg-surface-container text-on-surface-variant" 
                        : "bg-surface-container-high text-on-surface-variant"
                }`}>
                  {quiz.status.replace("_", " ")}
                </div>
              </div>
              <button 
                onClick={() => handleQuizAction(quiz.id, quiz.status)}
                className={`w-full md:w-auto px-6 py-2 rounded-xl text-xs flex items-center justify-center gap-xs active:scale-95 transition-all shrink-0 ${quiz.buttonClass}`}
                disabled={quiz.status === "locked"}
              >
                <span>{quiz.buttonText}</span>
                {quiz.status === "in_progress" && (
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                )}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Aesthetic Module Breakdown Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-xl">
        <div className="soft-ui-card rounded-2xl p-lg space-y-md relative overflow-hidden border border-outline-variant/60">
          <h3 className="font-heading text-headline-sm font-bold text-on-surface">Module Proficiency</h3>
          <div className="space-y-sm">
            {proficiency.map((prof, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>{prof.name}</span>
                  <span className="font-bold">{prof.val}%</span>
                </div>
                <div className="h-1.5 w-full bg-surface-container rounded-full">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${prof.class}`}
                    style={{ width: `${prof.val}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          {/* proficiency background */}
          <img 
            alt="Proficiency background" 
            className="absolute -right-20 -bottom-20 w-64 opacity-5 pointer-events-none grayscale" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGojHv8Fb7NY7ka6EfqtOk26knex2i7uEy8ygnM0ZKwoKG6rnxVo8iYukBXwQFaYe2n2WgtRv_u22S2OS2YH8LV9G929ZyYCeHW_w39l_iEB3BCzp54mF3ifw-NVNx5F5aPMFOMFcDJFtTaaFglduK2pa6l4Rh6w2F_uUgPZiDpuisRLicLUBk_xmUWzNoObEGaUnh1pzAk2L7DwUkfv3LpSHp5-SpwWvfAevnCjJ4AziHM9bXs-_zwXOj8N4S099RVH-i7PsGLbpv"
          />
        </div>

        <div className="soft-ui-card rounded-2xl p-lg bg-primary-container text-on-primary flex flex-col justify-center relative overflow-hidden border border-primary/20 shadow-lg">
          <div className="relative z-10">
            <h3 className="font-heading text-headline-sm font-bold mb-2">Ready for the Final?</h3>
            <p className="text-xs opacity-90 mb-md leading-relaxed">
              You've covered {progressPercent >= 50 ? "85%" : "50%"} of the core concepts in this module. We recommend one more review of 'Consumer Theory' before taking the final assessment.
            </p>
            <button 
              onClick={() => alert("Loading 'Consumer Theory' review concepts...")}
              className="px-6 py-3 bg-white text-primary font-bold rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all text-xs"
            >
              Review Concepts
            </button>
          </div>
          {/* Background Decorative Element */}
          <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
        </div>
      </section>

      {/* Footer spacer */}
      <footer className="pt-xl text-center text-xs text-on-surface-variant/40 border-t border-outline-variant/10">
        © 2024 Lumina Learning Ecosystem. All rights reserved.
      </footer>
    </div>
  );
}
