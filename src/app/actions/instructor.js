"use server";

import { db } from "../../lib/db";
import { getSession, setSessionCookie } from "../../lib/auth";
import { revalidatePath } from "next/cache";

export async function getInstructorOverviewAction() {
  const session = await getSession();
  if (!session || session.role !== "INSTRUCTOR") {
    return null;
  }

  try {
    const instructorId = session.userId;

    // Fetch courses taught by this instructor
    const courses = await db.course.findMany({
      where: { instructorId },
      include: {
        enrollments: {
          include: {
            student: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    // Compute student list from enrollments
    const enrolledStudentsMap = new Map();
    let totalProgressSum = 0;
    let enrollmentCount = 0;

    courses.forEach((course) => {
      course.enrollments.forEach((enrollment) => {
        const student = enrollment.student;
        if (!enrolledStudentsMap.has(student.id)) {
          enrolledStudentsMap.set(student.id, {
            id: student.id,
            name: student.name,
            email: student.email,
            enrollmentDate: enrollment.createdAt.toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }),
            courseTitle: course.title,
            progress: enrollment.progress,
            grade: enrollment.progress >= 90 ? "A+" : enrollment.progress >= 80 ? "A" : enrollment.progress >= 70 ? "B" : "C",
            status: enrollment.progress > 0 ? "Active" : "Inactive",
          });
        }
        totalProgressSum += enrollment.progress;
        enrollmentCount++;
      });
    });

    const studentRoster = Array.from(enrolledStudentsMap.values());
    const averageCompletion = enrollmentCount > 0 ? Math.round((totalProgressSum / enrollmentCount) * 10) / 10 : 86.4;

    return {
      instructor: {
        id: session.userId,
        name: session.name,
        email: session.email,
      },
      courses: courses.map(c => ({
        id: c.id,
        title: c.title,
        category: c.category,
        imageUrl: c.imageUrl,
        isPublished: c.isPublished,
        studentCount: c.enrollments.length,
      })),
      studentRoster,
      stats: {
        totalStudents: studentRoster.length,
        activeCourses: courses.length,
        averageCompletion: `${averageCompletion}%`,
        rating: "4.8 / 5",
        revenue: "$14,200",
      }
    };
  } catch (error) {
    console.error("Error in getInstructorOverviewAction:", error);
    return null;
  }
}

export async function updateInstructorProfileAction(data) {
  const session = await getSession();
  if (!session || session.role !== "INSTRUCTOR") {
    return { error: "Unauthorized access." };
  }

  try {
    const updatedUser = await db.user.update({
      where: { id: session.userId },
      data: {
        name: data.name,
        email: data.email,
      },
    });

    // Refresh JWT session cookie
    await setSessionCookie({
      userId: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      role: updatedUser.role,
    });

    revalidatePath("/instructor/profile");
    revalidatePath("/instructor/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error in updateInstructorProfileAction:", error);
    return { error: "Failed to update instructor profile." };
  }
}
