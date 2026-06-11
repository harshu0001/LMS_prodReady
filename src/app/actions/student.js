"use server";

import { db } from "../../lib/db";
import { getSession, setSessionCookie } from "../../lib/auth";
import { revalidatePath } from "next/cache";

export async function toggleStreakDayAction(dayId) {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized access." };
  }

  try {
    const streakDay = await db.streakDay.findFirst({
      where: {
        id: dayId,
        userId: session.userId,
      },
    });

    if (!streakDay) {
      return { error: "Streak day not found." };
    }

    const updated = await db.streakDay.update({
      where: { id: dayId },
      data: { completed: !streakDay.completed },
    });

    // Revalidate student dashboard layout cache
    revalidatePath("/student/dashboard");
    return { success: true, completed: updated.completed };
  } catch (error) {
    console.error("Error toggling streak day:", error);
    return { error: "Failed to update streak." };
  }
}

export async function addDeadlineAction(title) {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized access." };
  }

  if (!title || !title.trim()) {
    return { error: "Deadline title cannot be empty." };
  }

  try {
    const getFutureDate = (days) => {
      const d = new Date();
      d.setDate(d.getDate() + days);
      return d;
    };

    const newDeadline = await db.deadline.create({
      data: {
        userId: session.userId,
        title: title.trim(),
        subtitle: "Self-paced Task",
        dueDate: getFutureDate(21), // default to 3 weeks in the future
        status: "PENDING",
      },
    });

    revalidatePath("/student/dashboard");
    return { success: true, deadline: newDeadline };
  } catch (error) {
    console.error("Error adding deadline:", error);
    return { error: "Failed to create deadline." };
  }
}

export async function getStudentProfileDetailsAction() {
  const session = await getSession();
  if (!session) return null;

  try {
    const user = await db.user.findUnique({
      where: { id: session.userId },
      include: {
        enrollments: true,
        streakDays: true,
      },
    });

    if (!user) return null;

    return {
      name: user.name,
      email: user.email,
      role: user.role === "ADMIN" ? "System Administrator" : user.role === "INSTRUCTOR" ? "Instructor" : "Undergraduate",
      location: "San Francisco, CA",
      coursesCount: user.enrollments.length,
      streakDaysCount: user.streakDays.filter(d => d.completed).length,
    };
  } catch (error) {
    console.error("Error in getStudentProfileDetailsAction:", error);
    return null;
  }
}

export async function updateStudentProfileAction(data) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized access." };

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

    revalidatePath("/student/profile");
    revalidatePath("/student/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error in updateStudentProfileAction:", error);
    return { error: "Failed to update profile." };
  }
}


