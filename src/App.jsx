import Dashboard from "./app/components/dashboard/dashboard"
import LairryInstituteLogin from "./app/Login/LoginAndStatusgate1"
import LairryOTPVerification from "./app/Login/OtpVerification"
import LoginAndStatusgate3 from "./app/Login/LoginAndStatusgate3";
import LoginStatus from "./app/Login/LoginStatusApproved";
import Sidebar from "./app/components/Sidebar";
import CreateExam from "./app/ExamManagement/CreateExam";
import MarkingnExcel from "./app/ExamManagement/MarkingnExcel";
import SalesRevenue from "./app/Finance/SalesRevenue";
import SettingsSecurity from "./app/Settings/SettingsSecurity";
import DashBoard2 from "./app/components/dashboard/DashBoard2";
import DashboardLayout from "./Layouts/DashboardLayout";
import StudentManagement from "./app/Students/StudentManagement";
import TopBar from "./app/components/TopBar";


import { createBrowserRouter, RouterProvider } from 'react-router-dom'






export default function App() {
  


  return (


    

    <div>

      
     <DashboardLayout/>
       <MarkingnExcel /> 
       <CreateExam/> 
      <StudentManagement/> 
      <SalesRevenue />
     <SettingsSecurity /> 




    </div>
  )
}
