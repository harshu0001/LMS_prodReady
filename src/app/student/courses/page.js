import { db } from "../../../lib/db";
import { getSession } from "../../../lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function EnrolledCoursesSelectionPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  // Fetch student enrollments
  const enrollments = await db.enrollment.findMany({
    where: { studentId: session.userId },
    include: { course: true },
    orderBy: { lastAccessedAt: "desc" },
  });

  return (
    <main className="p-gutter max-w-container-max mx-auto pb-32">
      {/* Header */}
      <section className="mb-xl">
        <div className="flex items-center gap-2 mb-2 text-on-surface-variant">
          <span className="font-semibold text-[11px] uppercase tracking-wider">Dashboard</span>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="font-semibold text-[11px] uppercase tracking-wider text-primary">My Courses</span>
        </div>
        <h2 className="font-heading text-[28px] md:text-display-lg text-on-background tracking-tight font-extrabold leading-tight">
          My Enrolled Courses
        </h2>
        <p className="text-body-lg text-on-surface-variant mt-2 max-w-2xl">
          You are currently enrolled in <strong className="text-primary font-bold">{enrollments.length}</strong> {enrollments.length === 1 ? "course" : "courses"}. Select a course below to continue watching and studying.
        </p>
      </section>

      {/* Grid of Courses */}
      {enrollments.length === 0 ? (
        <section className="text-center py-16 bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-8 max-w-xl mx-auto shadow-sm">
          <span className="material-symbols-outlined text-6xl text-primary/30 mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
          <h3 className="font-heading text-headline-sm font-bold text-on-surface">No Enrolled Courses</h3>
          <p className="text-sm text-on-surface-variant mt-2 max-w-md mx-auto">
            You haven't enrolled in any courses yet. Go to your dashboard to see our recommended courses and get started!
          </p>
          <Link
            href="/student/dashboard"
            className="inline-block mt-6 bg-primary text-on-primary px-6 py-2.5 rounded-xl font-bold text-xs shadow-md hover:opacity-90 active:scale-95 transition-all"
          >
            Explore Courses
          </Link>
        </section>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrollments.map((enr) => {
            // Check if course description is JSON string
            let cleanDesc = enr.course.description;
            try {
              const parsed = JSON.parse(enr.course.description);
              cleanDesc = parsed.text;
            } catch (e) {
              // Not JSON, keep description as is
            }

            return (
              <Link
                key={enr.id}
                href={`/student/courses/${enr.course.id}`}
                className="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden hover:shadow-md transition-all group flex flex-col justify-between shadow-sm cursor-pointer"
              >
                <div>
                  <div className="h-44 overflow-hidden relative border-b border-outline-variant/30">
                    <img
                      alt={enr.course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={enr.course.imageUrl}
                    />
                    <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded text-[10px] text-white font-bold uppercase tracking-wider">
                      {enr.completed ? "Completed" : "Active"}
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded">
                      {enr.course.category}
                    </span>
                    <h4 className="font-heading font-bold text-base text-on-surface group-hover:text-primary transition-colors mt-3 leading-snug line-clamp-2">
                      {enr.course.title}
                    </h4>
                    <p className="text-xs text-on-surface-variant mt-2 line-clamp-2 leading-relaxed">
                      {cleanDesc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="h-px bg-outline-variant/30 mb-4"></div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-on-surface-variant">
                      <span>Progress</span>
                      <span>{enr.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all" 
                        style={{ width: `${enr.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-surface border border-outline-variant/60 hover:bg-primary hover:text-on-primary hover:border-primary text-on-surface py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1">
                    <span>Watch Lessons</span>
                    <span className="material-symbols-outlined text-sm">play_circle</span>
                  </button>
                </div>
              </Link>
            );
          })}
        </section>
      )}
    </main>
  );
}
