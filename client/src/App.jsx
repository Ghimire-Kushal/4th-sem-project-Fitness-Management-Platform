import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Register from "./pages/Register";
import Login    from "./pages/Login";

// Member
import MemberDashboard from "./pages/member/MemberDashboard";
import BookSession     from "./pages/member/BookSession";
import BookTrainer     from "./pages/member/BookTrainer";
import MyPlans         from "./pages/member/MyPlans";
import MyProfile       from "./pages/member/MyProfile";
import Notifications   from "./pages/member/Notifications";
import Membership      from "./pages/member/Membership";

// Trainer
import TrainerDashboard from "./pages/trainer/TrainerDashboard";
import AssignWorkout    from "./pages/trainer/AssignWorkout";
import AssignDiet       from "./pages/trainer/AssignDiet";
import MyMembers        from "./pages/trainer/MyMembers";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers    from "./pages/admin/ManageUsers";
import ManageTrainers from "./pages/admin/ManageTrainers";
import ManageBookings from "./pages/admin/ManageBookings";
import ManagePlans    from "./pages/admin/ManagePlans";
import ManageSlots    from "./pages/admin/ManageSlots";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"    element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<div style={{ padding: 40, fontFamily: "Segoe UI" }}>403 – Access Denied</div>} />

          {/* Member routes */}
          <Route path="/dashboard"     element={<ProtectedRoute roles={["member"]}><MemberDashboard /></ProtectedRoute>} />
          <Route path="/book-session"  element={<ProtectedRoute roles={["member"]}><BookSession /></ProtectedRoute>} />
          <Route path="/book-trainer"  element={<ProtectedRoute roles={["member"]}><BookTrainer /></ProtectedRoute>} />
          <Route path="/my-plans"      element={<ProtectedRoute roles={["member"]}><MyPlans /></ProtectedRoute>} />
          <Route path="/membership"    element={<ProtectedRoute roles={["member"]}><Membership /></ProtectedRoute>} />
          <Route path="/profile"       element={<ProtectedRoute roles={["member","trainer","admin"]}><MyProfile /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute roles={["member","trainer","admin"]}><Notifications /></ProtectedRoute>} />

          {/* Trainer routes */}
          <Route path="/trainer"          element={<ProtectedRoute roles={["trainer"]}><TrainerDashboard /></ProtectedRoute>} />
          <Route path="/trainer/members"  element={<ProtectedRoute roles={["trainer"]}><MyMembers /></ProtectedRoute>} />
          <Route path="/trainer/workout"  element={<ProtectedRoute roles={["trainer"]}><AssignWorkout /></ProtectedRoute>} />
          <Route path="/trainer/diet"     element={<ProtectedRoute roles={["trainer"]}><AssignDiet /></ProtectedRoute>} />

          {/* Admin routes */}
          <Route path="/admin"           element={<ProtectedRoute roles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users"     element={<ProtectedRoute roles={["admin"]}><ManageUsers /></ProtectedRoute>} />
          <Route path="/admin/trainers"  element={<ProtectedRoute roles={["admin"]}><ManageTrainers /></ProtectedRoute>} />
          <Route path="/admin/bookings"  element={<ProtectedRoute roles={["admin"]}><ManageBookings /></ProtectedRoute>} />
          <Route path="/admin/plans"     element={<ProtectedRoute roles={["admin"]}><ManagePlans /></ProtectedRoute>} />
          <Route path="/admin/slots"     element={<ProtectedRoute roles={["admin"]}><ManageSlots /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
