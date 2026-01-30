// routes/InstituteRoutes.js
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// Login & OTP
import LairryInstituteLogin from "../pages/Login/LoginAndStatusgate1";
import LairryOTPVerification from "../pages/Login/OtpVerification";
import LoginAndStatusgate3 from "../pages/Login/LoginAndStatusgate3";
import LoginRejected from "../pages/Login/LoginRejected";
import LoginStatusApproved from "../pages/Login/LoginStatusApproved";

// Onboarding
import InstituteDetails1 from "../pages/OnBoarding/InstituteDetails1";
import OwnerDetails2 from "../pages/OnBoarding/OwnerDetails2";
import ExamCatagories3 from "../pages/OnBoarding/ExamCatagories3";
import BankPayoutinfo4 from "../pages/OnBoarding/BankPayoutinfo4";
import SubmissionConfirmation from "../pages/OnBoarding/SubmissionConfirmation";

// Dashboard & Settings
import DashboardLayout from "../Layouts/InstituteLayout";
import DashBoard from "../pages/dashboard/DashBoard";
import Exams from "../pages/ExamManagement/Exams";
import CreateExam from "../pages/ExamManagement/CreateExam";
import MarkingnExcel from "../pages/ExamManagement/MarkingnExcel";
import StudentManagement from "../pages/Students/StudentManagement";
import SalesRevenue from "../pages/Finance/SalesRevenue";
import SettingsSecurity from "../pages/Settings/SettingsSecurity";
import InstituteAdminProfile from "../pages/InstituteAdminProfile";
import InstitutesLogin from "../pages/Authentication/InstituteLogin";
import InstituteSignup from "../pages/Authentication/InstituteSignup";
import InstituteProfile from "../pages/Profile/InstituteProfile";

// Public
// import NotFound from "../pages/public/NotFound";

export default function InstituteRoutes() {
  return (
    <Routes>
      {/* Login & OTP */}
      <Route path="/institutes-login" element={<InstitutesLogin />} />
      <Route path="/institutes-signup" element={<InstituteSignup />} />
      {/* <Route path="/" element={<LairryInstituteLogin />} />
      <Route path="/otp-verification" element={<LairryOTPVerification />} />
      <Route path="/login-status" element={<LoginAndStatusgate3 />} />
      <Route path="/login-approved" element={<LoginStatusApproved />} />
      <Route path="/login-rejected" element={<LoginRejected />} /> */}

      {/* Onboarding */}
      <Route path="/onboarding/institute-details" element={<InstituteDetails1 />} />
      <Route path="/onboarding/owner-details" element={<OwnerDetails2 />} />
      <Route path="/onboarding/exam-categories" element={<ExamCatagories3 />} />
      <Route path="/onboarding/bank-payout" element={<BankPayoutinfo4 />} />
      <Route path="/onboarding/submission-confirmation" element={<SubmissionConfirmation />} />

      {/* Dashboard Layout Routes */}
      <Route element={<ProtectedRoute />}>
      <Route path="/institute" element={<DashboardLayout />}>
        <Route index element={<DashBoard />} />
        <Route path="exams" element={<Exams />} />
        <Route path="exams/create" element={<CreateExam />} />
        <Route path="marking" element={<MarkingnExcel />} />
        <Route path="students" element={<StudentManagement />} />
        <Route path="sales" element={<SalesRevenue />} />
        <Route path="settings" element={<SettingsSecurity />} />
        <Route path="institute-admin-profile" element={<InstituteAdminProfile />} />
        <Route path="institute-profile" element={<InstituteProfile />} />
        
      </Route>
      </Route>

      {/* Catch-all for 404 */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}
