"use server";

import { db } from "../../lib/db";
import { getSession } from "../../lib/auth";
import { revalidatePath } from "next/cache";

export async function createCourseAction(data) {
  const session = await getSession();
  if (!session || session.role !== "INSTRUCTOR") {
    return { error: "Unauthorized access. Instructors only." };
  }

  const { title, category, imageUrl, description, videoUrl, assets } = data;

  if (!title || !category || !description) {
    return { error: "Course title, category, and description are required." };
  }

  try {
    // Serialize custom fields into the description field
    const serializedDescription = JSON.stringify({
      text: description,
      videoUrl: videoUrl || "",
      assets: assets || [],
    });

    const fallbackImageUrl = imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuDQbysyx8KE8hOa9clULNFGMbwwG0e1mQY7Nji4RjONyOVyHPou1AtFeKYL61PDRFbVAJneHovPbiY-de4kR2oKy-FAEiK39IQZe-OiVVrgxSBY16d0B6g__UV4HrTwG6RfcTfZz0z3LREEdFzBXukFRB6wy56WVW-fIsb2I0xqWqnL7UU4lcVwZouTQ30H47gATwizBFHnXG-oK0sj-tIcNy1HJagsAex_IO9M-Q4QRJAUnsQ9nDkKekp_VdskqEJ5Rktgzw41jDWn";

    // 1. Create Course in Database
    const course = await db.course.create({
      data: {
        title,
        category,
        imageUrl: fallbackImageUrl,
        description: serializedDescription,
        instructorId: session.userId,
        isPublished: true,
      },
    });

    // 2. Create Recommendation in Database so it shows up in "Recommended for You"
    await db.recommendation.create({
      data: {
        title,
        desc: description,
        rating: "5.0",
        reviews: "0",
        icon: "school",
        bgClass: "bg-primary-container text-on-primary-container",
      },
    });

    revalidatePath("/student/dashboard");
    revalidatePath("/instructor/dashboard");
    return { success: true, courseId: course.id };
  } catch (error) {
    console.error("Error in createCourseAction server action:", error);
    return { error: "Failed to publish course." };
  }
}

export async function enrollInCourseAction(courseId) {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized access. Please log in." };
  }

  try {
    const studentId = session.userId;

    // Check if enrollment already exists
    const existingEnrollment = await db.enrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId,
          courseId,
        },
      },
    });

    if (existingEnrollment) {
      return { success: true, alreadyEnrolled: true };
    }

    // Create enrollment
    await db.enrollment.create({
      data: {
        studentId,
        courseId,
        progress: 0,
        completed: false,
      },
    });

    revalidatePath("/student/dashboard");
    revalidatePath("/student/courses");
    return { success: true };
  } catch (error) {
    console.error("Error in enrollInCourseAction server action:", error);
    return { error: "Failed to enroll in course." };
  }
}

export async function enrollInCourseByTitleAction(title) {
  const session = await getSession();
  if (!session) return { error: "Please log in." };

  try {
    const studentId = session.userId;
    // Find the course by title
    const course = await db.course.findFirst({
      where: { title: { equals: title, mode: 'insensitive' } },
    });

    if (!course) {
      // If no matching course in DB, return error or direct to first course in database
      const firstCourse = await db.course.findFirst();
      if (firstCourse) {
        // Enroll in first course as a fallback
        await db.enrollment.upsert({
          where: {
            studentId_courseId: {
              studentId,
              courseId: firstCourse.id,
            },
          },
          update: {},
          create: {
            studentId,
            courseId: firstCourse.id,
            progress: 0,
            completed: false,
          },
        });
        return { success: true, courseId: firstCourse.id };
      }
      return { error: "Course not found." };
    }

    // Check if enrollment already exists
    const existingEnrollment = await db.enrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId,
          courseId: course.id,
        },
      },
    });

    if (!existingEnrollment) {
      // Create enrollment
      await db.enrollment.create({
        data: {
          studentId,
          courseId: course.id,
          progress: 0,
          completed: false,
        },
      });
    }

    revalidatePath("/student/dashboard");
    revalidatePath("/student/courses");
    return { success: true, courseId: course.id };
  } catch (error) {
    console.error("Enrollment error by title:", error);
    return { error: "Failed to enroll." };
  }
}

export async function getCourseDetailsAction(courseId) {
  const session = await getSession();
  if (!session) return null;

  try {
    const course = await db.course.findUnique({
      where: { id: courseId },
      include: {
        instructor: {
          select: { name: true },
        },
      },
    });
    return course;
  } catch (error) {
    console.error("Error in getCourseDetailsAction:", error);
    return null;
  }
}
