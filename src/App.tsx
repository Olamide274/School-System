
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

// Pages
import Login from "@/pages/Login";
import Dashboard from "@/pages/dashboard/Dashboard";
import Profile from "@/pages/Profile";
import Attendance from "@/pages/Attendance";
import NotFound from "@/pages/NotFound";
import Students from "@/pages/Students";
import Teachers from "@/pages/Teachers";
import Classes from "@/pages/Classes";
import Subjects from "@/pages/Subjects";
import Index from "@/pages/Index";
import Timetable from "@/pages/Timetable";
import Library from "@/pages/Library";
import Fees from "@/pages/Fees";
import Settings from "@/pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/students" element={<Students />} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/classes" element={<Classes />} />
              <Route path="/subjects" element={<Subjects />} />
              <Route path="/timetable" element={<Timetable />} />
              <Route path="/library" element={<Library />} />
              <Route path="/fees" element={<Fees />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
