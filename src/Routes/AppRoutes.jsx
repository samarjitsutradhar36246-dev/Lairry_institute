import { Routes, Route } from "react-router-dom";
import LairryInstituteLogin from "../app/Login/LoginAndStatusgate1";
import DashboardLayout from "../Layouts/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import Exams from "../pages/dashboard/Exams";
import CreateExam from "../pages/dashboard/CreateExam";
import NotFound from "../pages/public/NotFound";
import LairryOTPVerification from "../app/Login/OtpVerification";
import LoginStatus from "../app/Login/LoginStatusApproved";
import DashBoard2 from "../app/components/dashboard/DashBoard2";
import LoginAndStatusgate3 from "../app/Login/LoginAndStatusgate3";




export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LairryInstituteLogin />} />
      <Route path="/OtpVerification" element={<LairryOTPVerification/>} />
      <Route path="/LoginStatus" element={<LoginAndStatusgate3/>} />
      <Route path="/Loginapproved" element={<LoginStatus/>} />
      <Route path="/dashboard" element={<DashBoard2/>} />
      <Route path="/" element={</>} />
       <Route path="/" element={< />} />
         <Route path="/" element={< />} />
             <Route path="/" element={< />} />
      <Route path="/exams" element={<Exams />} />
      <Route path="/exams/create" element={<CreateExam />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
