require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User");
const MembershipPlan = require("./models/MembershipPlan");
const Membership = require("./models/Membership");
const TimeSlot = require("./models/TimeSlot");
const Booking = require("./models/Booking");
const WorkoutPlan = require("./models/WorkoutPlan");
const DietPlan = require("./models/DietPlan");
const Notification = require("./models/Notification");

const hash = (pw) => bcrypt.hash(pw, 10);

async function clear() {
  await Promise.all([
    User.deleteMany({}),
    MembershipPlan.deleteMany({}),
    Membership.deleteMany({}),
    TimeSlot.deleteMany({}),
    Booking.deleteMany({}),
    WorkoutPlan.deleteMany({}),
    DietPlan.deleteMany({}),
    Notification.deleteMany({}),
  ]);
  console.log("✓ Cleared all collections");
}

async function seedUsers() {
  const adminUsername = process.env.DEFAULT_ADMIN_USERNAME;
  const adminEmail = process.env.DEFAULT_ADMIN_EMAIL;
  const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD;
  const trainerPassword = process.env.DEMO_TRAINER_PASSWORD;
  const memberPassword = process.env.DEMO_MEMBER_PASSWORD;

  if (!adminUsername || !adminEmail || !adminPassword || !trainerPassword || !memberPassword) {
    throw new Error("Set DEFAULT_ADMIN_USERNAME, DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD, DEMO_TRAINER_PASSWORD and DEMO_MEMBER_PASSWORD in server/.env before seeding.");
  }

  const users = [
    // Admin
    { name: "Admin", username: adminUsername, email: adminEmail, password: await hash(adminPassword), role: "admin", phone: "9800000001", isActive: true },

    // 10 Trainers
    { name: "Alex Johnson", email: "alex@fitness.com", password: await hash(trainerPassword), role: "trainer", phone: "9800000101", age: 32, gender: "male", isActive: true },
    { name: "Sara Williams", email: "sara@fitness.com", password: await hash(trainerPassword), role: "trainer", phone: "9800000102", age: 28, gender: "female", isActive: true },
    { name: "Mike Chen", email: "mike@fitness.com", password: await hash(trainerPassword), role: "trainer", phone: "9800000103", age: 35, gender: "male", isActive: true },
    { name: "Priya Sharma", email: "priya@fitness.com", password: await hash(trainerPassword), role: "trainer", phone: "9800000104", age: 30, gender: "female", isActive: true },
    { name: "Carlos Rivera", email: "carlos@fitness.com", password: await hash(trainerPassword), role: "trainer", phone: "9800000105", age: 27, gender: "male", isActive: true },
    { name: "Nina Patel", email: "nina@fitness.com", password: await hash(trainerPassword), role: "trainer", phone: "9800000106", age: 31, gender: "female", isActive: true },
    { name: "Tom Brady", email: "tom@fitness.com", password: await hash(trainerPassword), role: "trainer", phone: "9800000107", age: 40, gender: "male", isActive: true },
    { name: "Lisa Kim", email: "lisa@fitness.com", password: await hash(trainerPassword), role: "trainer", phone: "9800000108", age: 29, gender: "female", isActive: true },
    { name: "David Lee", email: "david@fitness.com", password: await hash(trainerPassword), role: "trainer", phone: "9800000109", age: 33, gender: "male", isActive: true },
    { name: "Emma Stone", email: "emma@fitness.com", password: await hash(trainerPassword), role: "trainer", phone: "9800000110", age: 26, gender: "female", isActive: true },

    // 10 Members
    { name: "James Wilson", email: "james@fitness.com", password: await hash(memberPassword), role: "member", phone: "9800001001", age: 25, gender: "male", address: "123 Main St", isActive: true },
    { name: "Olivia Brown", email: "olivia@fitness.com", password: await hash(memberPassword), role: "member", phone: "9800001002", age: 22, gender: "female", address: "456 Oak Ave", isActive: true },
    { name: "Noah Davis", email: "noah@fitness.com", password: await hash(memberPassword), role: "member", phone: "9800001003", age: 30, gender: "male", address: "789 Pine Rd", isActive: true },
    { name: "Ava Martinez", email: "ava@fitness.com", password: await hash(memberPassword), role: "member", phone: "9800001004", age: 27, gender: "female", address: "321 Elm St", isActive: true },
    { name: "Liam Anderson", email: "liam@fitness.com", password: await hash(memberPassword), role: "member", phone: "9800001005", age: 35, gender: "male", address: "654 Maple Dr", isActive: true },
    { name: "Sophia Taylor", email: "sophia@fitness.com", password: await hash(memberPassword), role: "member", phone: "9800001006", age: 24, gender: "female", address: "987 Cedar Ln", isActive: true },
    { name: "Ethan Thomas", email: "ethan@fitness.com", password: await hash(memberPassword), role: "member", phone: "9800001007", age: 28, gender: "male", address: "147 Birch Blvd", isActive: true },
    { name: "Isabella Harris", email: "isabella@fitness.com", password: await hash(memberPassword), role: "member", phone: "9800001008", age: 23, gender: "female", address: "258 Walnut Way", isActive: true },
    { name: "Mason Clark", email: "mason@fitness.com", password: await hash(memberPassword), role: "member", phone: "9800001009", age: 31, gender: "male", address: "369 Spruce St", isActive: true },
    { name: "Mia Lewis", email: "mia@fitness.com", password: await hash(memberPassword), role: "member", phone: "9800001010", age: 26, gender: "female", address: "741 Willow Ave", isActive: true },
  ];

  const created = await User.insertMany(users);
  console.log(`✓ Users created: ${created.length}`);
  return created;
}

async function seedMembershipPlans() {
  const plans = [
    { name: "Basic Monthly", duration: "monthly", price: 1500, features: ["Gym Access", "Locker Room", "2 Group Classes/Week"], isActive: true },
    { name: "Standard Monthly", duration: "monthly", price: 2500, features: ["Gym Access", "Locker Room", "Unlimited Group Classes", "1 PT Session/Month"], isActive: true },
    { name: "Premium Monthly", duration: "monthly", price: 4000, features: ["Gym Access", "Locker Room", "Unlimited Classes", "4 PT Sessions/Month", "Diet Consultation"], isActive: true },
    { name: "Basic Quarterly", duration: "quarterly", price: 4000, features: ["Gym Access", "Locker Room", "2 Group Classes/Week"], isActive: true },
    { name: "Standard Quarterly", duration: "quarterly", price: 6500, features: ["Gym Access", "Locker Room", "Unlimited Group Classes", "3 PT Sessions/Quarter"], isActive: true },
    { name: "Premium Quarterly", duration: "quarterly", price: 10500, features: ["Gym Access", "Locker Room", "Unlimited Classes", "12 PT Sessions", "Diet Plan", "Body Composition Analysis"], isActive: true },
    { name: "Basic Yearly", duration: "yearly", price: 14000, features: ["Gym Access", "Locker Room", "2 Group Classes/Week"], isActive: true },
    { name: "Standard Yearly", duration: "yearly", price: 24000, features: ["Gym Access", "Locker Room", "Unlimited Classes", "12 PT Sessions/Year"], isActive: true },
    { name: "Premium Yearly", duration: "yearly", price: 38000, features: ["Gym Access", "Locker Room", "Unlimited Classes", "48 PT Sessions", "Diet + Workout Plan", "Body Analysis", "Sauna Access"], isActive: true },
    { name: "Student Monthly", duration: "monthly", price: 1200, features: ["Gym Access", "1 Group Class/Week", "Student ID Required"], isActive: true },
  ];

  const created = await MembershipPlan.insertMany(plans);
  console.log(`✓ MembershipPlans created: ${created.length}`);
  return created;
}

async function seedMemberships(members, plans) {
  const statuses = ["active", "active", "active", "active", "active", "active", "expired", "cancelled", "active", "active"];
  const payments = ["paid", "paid", "paid", "paid", "paid", "paid", "paid", "paid", "pending", "paid"];

  const memberships = members.map((m, i) => {
    const plan = plans[i % plans.length];
    const startDate = new Date(Date.now() - i * 5 * 24 * 60 * 60 * 1000);
    const durationDays = plan.duration === "monthly" ? 30 : plan.duration === "quarterly" ? 90 : 365;
    const endDate = new Date(startDate.getTime() + durationDays * 24 * 60 * 60 * 1000);
    return {
      member: m._id,
      plan: plan._id,
      startDate,
      endDate,
      status: statuses[i],
      paymentStatus: payments[i],
    };
  });

  const created = await Membership.insertMany(memberships);
  console.log(`✓ Memberships created: ${created.length}`);
  return created;
}

async function seedTimeSlots(trainers) {
  const today = new Date();
  const slots = [];

  const times = [
    { start: "06:00", end: "07:00" },
    { start: "07:00", end: "08:00" },
    { start: "08:00", end: "09:00" },
    { start: "09:00", end: "10:00" },
    { start: "10:00", end: "11:00" },
    { start: "16:00", end: "17:00" },
    { start: "17:00", end: "18:00" },
    { start: "18:00", end: "19:00" },
    { start: "19:00", end: "20:00" },
    { start: "20:00", end: "21:00" },
  ];

  for (let d = 0; d < 5; d++) {
    const date = new Date(today);
    date.setDate(today.getDate() + d);
    const dateStr = date.toISOString().split("T")[0];

    times.forEach((t, i) => {
      // Gym session slots
      slots.push({
        date: dateStr,
        startTime: t.start,
        endTime: t.end,
        capacity: 15,
        booked: Math.floor(Math.random() * 10),
        type: "gym_session",
        isActive: true,
      });

      // Trainer appointment slots (alternating trainers)
      if (i < 5) {
        slots.push({
          date: dateStr,
          startTime: t.start,
          endTime: t.end,
          capacity: 1,
          booked: i % 3 === 0 ? 1 : 0,
          trainer: trainers[i % trainers.length]._id,
          type: "trainer_appointment",
          isActive: true,
        });
      }
    });
  }

  const created = await TimeSlot.insertMany(slots);
  console.log(`✓ TimeSlots created: ${created.length}`);
  return created;
}

async function seedBookings(members, trainers, timeSlots) {
  const gymSlots = timeSlots.filter((s) => s.type === "gym_session");
  const trainerSlots = timeSlots.filter((s) => s.type === "trainer_appointment");
  const statuses = ["pending", "approved", "approved", "completed", "completed", "approved", "pending", "cancelled", "completed", "approved"];

  const bookings = members.map((m, i) => {
    const isTrainer = i % 2 === 0;
    const slot = isTrainer ? trainerSlots[i % trainerSlots.length] : gymSlots[i % gymSlots.length];
    const booking = {
      member: m._id,
      timeSlot: slot._id,
      type: isTrainer ? "trainer_appointment" : "gym_session",
      status: statuses[i],
      notes: `Demo booking ${i + 1} for ${m.name}`,
    };
    if (isTrainer) booking.trainer = trainers[i % trainers.length]._id;
    return booking;
  });

  const created = await Booking.insertMany(bookings);
  console.log(`✓ Bookings created: ${created.length}`);
  return created;
}

async function seedWorkoutPlans(members, trainers) {
  const goals = ["weight_loss", "muscle_gain", "endurance", "flexibility", "general_fitness"];
  const days = ["Monday", "Wednesday", "Friday"];

  const plans = members.map((m, i) => ({
    title: `${["Power", "Strength", "Cardio", "HIIT", "Yoga", "CrossFit", "Pilates", "Circuit", "Functional", "Hybrid"][i]} Training Plan`,
    description: `Customized ${goals[i % goals.length].replace("_", " ")} program for ${m.name}`,
    member: m._id,
    trainer: trainers[i % trainers.length]._id,
    goal: goals[i % goals.length],
    isActive: true,
    days: days.map((day) => ({
      day,
      exercises: [
        { name: "Warm-up Jog", sets: 1, reps: "10 min", notes: "Light pace" },
        { name: "Squats", sets: 4, reps: "12", notes: "Full depth" },
        { name: "Push-ups", sets: 3, reps: "15", notes: "Chest to floor" },
        { name: "Plank Hold", sets: 3, duration: "45 sec", notes: "Tight core" },
        { name: "Cool-down Stretch", sets: 1, duration: "10 min", notes: "Hold each stretch 30s" },
      ],
    })),
  }));

  const created = await WorkoutPlan.insertMany(plans);
  console.log(`✓ WorkoutPlans created: ${created.length}`);
  return created;
}

async function seedDietPlans(members, trainers) {
  const plans = members.map((m, i) => ({
    title: `${["Weight Loss", "Muscle Gain", "Balanced", "High Protein", "Low Carb", "Vegan", "Keto", "Mediterranean", "Paleo", "Intermittent Fasting"][i]} Diet Plan`,
    description: `Nutritional plan designed for ${m.name}'s fitness goals`,
    member: m._id,
    trainer: trainers[i % trainers.length]._id,
    goal: ["Lose 5kg in 3 months", "Gain lean muscle", "Maintain weight", "Increase protein intake", "Reduce body fat"][i % 5],
    dailyCalories: [1600, 2800, 2000, 2500, 1800, 1700, 2200, 2100, 2400, 1900][i],
    meals: {
      breakfast: { time: "07:00", items: ["Oatmeal", "Banana", "Green Tea"], calories: 350, notes: "Eat within 1 hour of waking" },
      lunch: { time: "13:00", items: ["Brown Rice", "Grilled Chicken", "Mixed Vegetables"], calories: 550, notes: "Largest meal of the day" },
      dinner: { time: "19:00", items: ["Lentil Soup", "Whole Wheat Bread", "Salad"], calories: 400, notes: "Light meal" },
      snacks: { time: "10:30 & 16:00", items: ["Protein Bar", "Apple", "Almonds"], calories: 250, notes: "Keep portions small" },
    },
    restrictions: i % 3 === 0 ? ["Dairy-free"] : i % 3 === 1 ? ["Gluten-free"] : ["No processed sugar"],
    isActive: true,
  }));

  const created = await DietPlan.insertMany(plans);
  console.log(`✓ DietPlans created: ${created.length}`);
  return created;
}

async function seedNotifications(members, trainers) {
  const notifs = [
    ...members.map((m, i) => ({
      user: m._id,
      title: ["Booking Confirmed", "Workout Plan Ready", "Diet Plan Assigned", "Membership Active", "Session Reminder",
              "Plan Updated", "New Trainer Assigned", "Payment Received", "Class Tomorrow", "Goal Achieved"][i],
      message: [
        "Your gym session on Monday at 07:00 has been confirmed.",
        "Your trainer has uploaded a new workout plan. Check it out!",
        "A customized diet plan has been assigned to you.",
        "Your membership is now active. Start your fitness journey!",
        "Reminder: Trainer session tomorrow at 09:00 AM.",
        "Your workout plan has been updated with new exercises.",
        "Alex Johnson is now your assigned trainer.",
        "Payment of NPR 2500 received. Thank you!",
        "Group class scheduled for tomorrow at 06:00 AM.",
        "Congratulations! You have completed 30 sessions this month.",
      ][i],
      type: ["booking", "plan", "plan", "membership", "booking", "plan", "general", "membership", "booking", "general"][i],
      isRead: i % 3 === 0,
    })),
  ];

  const created = await Notification.insertMany(notifs);
  console.log(`✓ Notifications created: ${created.length}`);
  return created;
}

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB\n");

    await clear();

    const users = await seedUsers();
    const admin = users.filter((u) => u.role === "admin");
    const trainers = users.filter((u) => u.role === "trainer");
    const members = users.filter((u) => u.role === "member");

    // Assign trainers to members
    for (let i = 0; i < members.length; i++) {
      await User.findByIdAndUpdate(members[i]._id, { assignedTrainer: trainers[i % trainers.length]._id });
    }
    console.log("✓ Trainer assignments updated");

    const plans = await seedMembershipPlans();
    await seedMemberships(members, plans);
    const timeSlots = await seedTimeSlots(trainers);
    await seedBookings(members, trainers, timeSlots);
    await seedWorkoutPlans(members, trainers);
    await seedDietPlans(members, trainers);
    await seedNotifications(members, trainers);

    console.log("\n=== SEED COMPLETE ===");
    console.log("\nDemo users created. Passwords were loaded from server/.env.");
  } catch (err) {
    console.error("Seed error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("\nDisconnected from MongoDB.");
  }
})();
