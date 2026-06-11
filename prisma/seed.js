const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seeding...");

  // Clean existing records in dependency order
  await prisma.recommendation.deleteMany({});
  await prisma.streakDay.deleteMany({});
  await prisma.deadline.deleteMany({});
  await prisma.enrollment.deleteMany({});
  await prisma.quiz.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.user.deleteMany({});

  // Hash passwords
  const adminPasswordHash = await bcrypt.hash("boss@password", 10);
  const instructorPasswordHash = await bcrypt.hash("teacher@password", 10);
  const studentPasswordHash = await bcrypt.hash("student@password", 10);

  // Seed Users
  const admin = await prisma.user.create({
    data: {
      email: "boss@lms.in",
      passwordHash: adminPasswordHash,
      name: "Boss Admin",
      role: "ADMIN",
    },
  });

  const instructor = await prisma.user.create({
    data: {
      email: "teacher@lms.in",
      passwordHash: instructorPasswordHash,
      name: "Professor Jane",
      role: "INSTRUCTOR",
    },
  });

  const student = await prisma.user.create({
    data: {
      email: "student@lms.in",
      passwordHash: studentPasswordHash,
      name: "Alex",
      role: "STUDENT",
    },
  });

  console.log("Users seeded successfully.");

  // Seed Courses
  const uiCourse = await prisma.course.create({
    data: {
      title: "Advanced UI Design Masterclass",
      category: "Programming & Computer Science",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxnRtg1_cGnYcszh5FnTFDqcKR654QFgd8lx8zUcKAaMk8SRyOgLy6eBsf9goQhBLlVXK5Xo26MTDD2m5AChvhtWexdi6zNhglUukC8A4aF1E-P8R2lBiDrVxfZZU-kxyfZ2IWu0q_TbpBavi_V2TAKyds37tma63S98dSgrmV0xEH0prU2LWrzDwKMZARQPFx9_784wU5ChyA61kPahTJ-pkxUoiCM2YjNhkrlI0pIFDgMoJZw62T9R3GodWrY602UpDvkKNAdYsR",
      description: "Master the art of high-fidelity user interfaces, user research, wireframing, component-based design systems, and responsive layout constraints.",
      instructorId: instructor.id,
      isPublished: true,
    },
  });

  const pythonCourse = await prisma.course.create({
    data: {
      title: "Python for Beginners",
      category: "Programming & Computer Science",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxnRtg1_cGnYcszh5FnTFDqcKR654QFgd8lx8zUcKAaMk8SRyOgLy6eBsf9goQhBLlVXK5Xo26MTDD2m5AChvhtWexdi6zNhglUukC8A4aF1E-P8R2lBiDrVxfZZU-kxyfZ2IWu0q_TbpBavi_V2TAKyds37tma63S98dSgrmV0xEH0prU2LWrzDwKMZARQPFx9_784wU5ChyA61kPahTJ-pkxUoiCM2YjNhkrlI0pIFDgMoJZw62T9R3GodWrY602UpDvkKNAdYsR",
      description: "Learn Python fundamentals, syntax, control flows, data structures (lists, dictionaries, tuples), and writing clean, structured code.",
      instructorId: instructor.id,
      isPublished: true,
    },
  });

  const securityCourse = await prisma.course.create({
    data: {
      title: "Cybersecurity Essentials",
      category: "IT & Network Security",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAp-nOyLOo41Z6WQFjaLRkcByuWDY58Vvwcm29_zkPO77eIQQUnAZBRGO8OH-6BPnMVc4UUkkuySyYuojROdhulhuqIlY6SePpyJLpWrjLqYThVO6UfE57d4uTNLlc3cG6H1MyVpfZJv92SnQUZv2epnBy9j0zeW9P9Wq_FYcb7dwoVj9FrqUVeuZbxAo3iy0HePZUlsQWeFcNJTXEh4XoY_PaGvnRq-kZTtvGHSlJjcDx-wizpzvV8THZ6WIM-0dTyALu1LKS-JoG",
      description: "Dive into network security layers, firewalls, identity authorization, encryption principles, and common web application security threats.",
      instructorId: instructor.id,
      isPublished: true,
    },
  });

  console.log("Courses seeded successfully.");

  // Seed Enrollments for Alex (Student)
  await prisma.enrollment.create({
    data: {
      studentId: student.id,
      courseId: uiCourse.id,
      progress: 68,
      completed: false,
    },
  });

  await prisma.enrollment.create({
    data: {
      studentId: student.id,
      courseId: pythonCourse.id,
      progress: 42,
      completed: false,
    },
  });

  await prisma.enrollment.create({
    data: {
      studentId: student.id,
      courseId: securityCourse.id,
      progress: 18,
      completed: false,
    },
  });

  console.log("Enrollments seeded successfully.");

  // Seed Recommendations
  await prisma.recommendation.createMany({
    data: [
      {
        title: "Behavioral Psych",
        rating: "4.8",
        reviews: "2k",
        desc: "Learn why people make decisions and the cognitive biases that drive behavior.",
        icon: "psychology",
        bgClass: "bg-tertiary-container text-on-tertiary",
      },
      {
        title: "Data Visualization",
        rating: "4.9",
        reviews: "1.5k",
        desc: "Master the art of telling stories through interactive data dashboards.",
        icon: "data_exploration",
        bgClass: "bg-secondary-container text-on-secondary-container",
      },
      {
        title: "Motion Design",
        rating: "4.7",
        reviews: "800",
        desc: "Bring your static designs to life with After Effects and Lottie animations.",
        icon: "motion_photos_on",
        bgClass: "bg-primary-container text-on-primary-container",
      },
    ],
  });

  console.log("Recommendations seeded successfully.");

  // Seed Deadlines for Student
  const getFutureDate = (days) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d;
  };

  await prisma.deadline.create({
    data: {
      userId: student.id,
      courseId: uiCourse.id,
      title: "UI Design Assignment",
      subtitle: "Final High-Fidelity Prototype",
      dueDate: getFutureDate(2),
      status: "PENDING",
    },
  });

  await prisma.deadline.create({
    data: {
      userId: student.id,
      courseId: pythonCourse.id,
      title: "Python Quiz #4",
      subtitle: "Functions and Data Structures",
      dueDate: getFutureDate(5),
      status: "PENDING",
    },
  });

  await prisma.deadline.create({
    data: {
      userId: student.id,
      courseId: uiCourse.id,
      title: "Project Pitch",
      subtitle: "Group Presentation Materials",
      dueDate: getFutureDate(11),
      status: "PENDING",
    },
  });

  console.log("Deadlines seeded successfully.");

  // Seed StreakDays for Student (Monday to Friday of the current week)
  const today = new Date();
  const currentDayOfWeek = today.getDay(); // 0 (Sun) to 6 (Sat)
  // Calculate Monday date of this week
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

    await prisma.streakDay.create({
      data: {
        userId: student.id,
        label: day.label,
        completed: day.completed,
        date: date,
      },
    });
  }

  console.log("StreakDays seeded successfully.");
  console.log("Database seeding finished!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
