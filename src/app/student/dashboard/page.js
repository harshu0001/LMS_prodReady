import { db } from "../../../lib/db";
import { getSession } from "../../../lib/auth";
import StudentDashboardClient from "./StudentDashboardClient";
import { redirect } from "next/navigation";

export default async function StudentDashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  // Fetch student user details
  const user = await db.user.findUnique({
    where: { id: session.userId },
  });

  if (!user) {
    redirect("/login");
  }

  // Fetch enrolled courses (via enrollments with course details)
  const enrollments = await db.enrollment.findMany({
    where: { studentId: user.id },
    include: { course: true },
  });

  const courses = enrollments.map((e) => ({
    id: e.course.id,
    title: e.course.title,
    category: e.course.category,
    progress: e.progress,
    imageUrl: e.course.imageUrl,
    completed: e.completed,
  }));

  // Fetch deadlines
  const dbDeadlines = await db.deadline.findMany({
    where: { userId: user.id },
    orderBy: { dueDate: "asc" },
  });

  // Format Date objects to ISO strings for client-side serialization safety
  const deadlines = dbDeadlines.map(d => ({
    ...d,
    dueDate: d.dueDate.toISOString(),
    createdAt: d.createdAt.toISOString(),
    updatedAt: d.updatedAt.toISOString(),
  }));

  // Fetch streak days
  const dbStreakDays = await db.streakDay.findMany({
    where: { userId: user.id },
    orderBy: { date: "asc" },
  });

  const streakDays = dbStreakDays.map(s => ({
    ...s,
    date: s.date.toISOString(),
    createdAt: s.createdAt.toISOString(),
    updatedAt: s.updatedAt.toISOString(),
  }));

  // Fetch newest course recommendations so newly created courses show up first
  const recommendations = await db.recommendation.findMany({
    take: 10,
    orderBy: { createdAt: "desc" }
  });

  return (
    <StudentDashboardClient
      initialUser={{ name: user.name, email: user.email }}
      initialCourses={courses}
      initialRecommendations={recommendations}
      initialDeadlines={deadlines}
      initialStreakDays={streakDays}
    />
  );
}
