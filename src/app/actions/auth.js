"use server";

import { db } from "../../lib/db";
import { setSessionCookie, deleteSessionCookie, getSession } from "../../lib/auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function login(prevState, formData) {
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { error: "Please enter email and password." };
  }

  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { error: "Invalid email or password." };
    }

    const passwordValid = await bcrypt.compare(password, user.passwordHash);
    if (!passwordValid) {
      return { error: "Invalid email or password." };
    }

    // Generate JWT and set HttpOnly session cookie
    await setSessionCookie({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    // Return redirect destination
    let redirectUrl = "/student/dashboard";
    if (user.role === "ADMIN") {
      redirectUrl = "/admin/dashboard";
    } else if (user.role === "INSTRUCTOR") {
      redirectUrl = "/instructor/dashboard";
    }

    return { success: true, redirectUrl };
  } catch (error) {
    console.error("Login action error:", error);
    return { error: "An unexpected error occurred. Please try again." };
  }
}

export async function signup(prevState, formData) {
  const name = formData.get("fullName")?.toString().trim();
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString();

  if (!name || !email || !password) {
    return { error: "Please fill in all fields." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "An account with this email already exists." };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // Create user (default role STUDENT)
    const user = await db.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: "STUDENT",
      },
    });

    // Auto-enroll the new student in standard courses
    const publishedCourses = await db.course.findMany({
      where: { isPublished: true },
    });

    // Populate mock progress to make the dashboard alive
    const mockProgresses = [68, 42, 18];
    for (let i = 0; i < publishedCourses.length; i++) {
      const progress = mockProgresses[i] || 0;
      await db.enrollment.create({
        data: {
          studentId: user.id,
          courseId: publishedCourses[i].id,
          progress,
          completed: progress === 100,
        },
      });

      // Create default deadlines linked to these courses
      if (i === 0) {
        await db.deadline.create({
          data: {
            userId: user.id,
            courseId: publishedCourses[i].id,
            title: "UI Design Assignment",
            subtitle: "Final High-Fidelity Prototype",
            dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
          },
        });
      } else if (i === 1) {
        await db.deadline.create({
          data: {
            userId: user.id,
            courseId: publishedCourses[i].id,
            title: "Python Quiz #4",
            subtitle: "Functions and Data Structures",
            dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days
          },
        });
      } else if (i === 2) {
        await db.deadline.create({
          data: {
            userId: user.id,
            courseId: publishedCourses[i].id,
            title: "Project Pitch",
            subtitle: "Group Presentation Materials",
            dueDate: new Date(Date.now() + 11 * 24 * 60 * 60 * 1000), // 11 days
          },
        });
      }
    }

    // Seed default weekly streak days (Mon - Fri of current week)
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const mondayOffset = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);

    const days = [
      { label: "M", offset: 0, completed: true },
      { label: "T", offset: 1, completed: true },
      { label: "W", offset: 2, completed: false },
      { label: "T", offset: 3, completed: false },
      { label: "F", offset: 4, completed: false },
    ];

    for (const day of days) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + day.offset);
      date.setHours(0, 0, 0, 0);

      await db.streakDay.create({
        data: {
          userId: user.id,
          label: day.label,
          completed: day.completed,
          date: date,
        },
      });
    }

    // Auto-login
    await setSessionCookie({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    return { success: true, redirectUrl: "/student/dashboard" };
  } catch (error) {
    console.error("Signup action error:", error);
    return { error: "An unexpected error occurred. Please try again." };
  }
}

export async function logout() {
  await deleteSessionCookie();
  redirect("/login");
}

export async function logoutToLanding() {
  await deleteSessionCookie();
  redirect("/");
}

export async function getCurrentUserAction() {
  const session = await getSession();
  if (!session) return null;

  try {
    const user = await db.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
    return user;
  } catch (error) {
    console.error("Error in getCurrentUserAction:", error);
    return null;
  }
}

