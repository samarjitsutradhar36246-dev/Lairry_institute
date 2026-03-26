import { Routes, Route } from "react-router-dom";
// Auth Pages

// Layout & Protection
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import PublicOnlyRoute from './components/ProtectedRoute/PublicOnlyRoute'
// Pages
import Register from './pages/Authentication/Register'
import DashBoardFinal from './pages/dashboard/DashboardFinal'

import Login from './pages/Authentication/Login'
import ForgotPassword from './pages/Authentication/ForgotPassword'
import ResetPassword from './pages/Authentication/ResetPassword'
import SettingsPage from "./pages/Settings/SettingsPage";

import AppLayout from "./components/Layouts/AppLayout";

import Exams from './components/ExamManagement/Exams'
import CreateExam from './components/ExamManagement/CreateExam'
import UpdateExam from './components/ExamManagement/UpdateExam'

import Subjects from "./components/SubjectManagement/Subjects";
import CreateSubjects from "./components/SubjectManagement/CreateSubjects";
import UpdateSubjectAndExam from "./components/SubjectManagement/UpdateSubjectAndExam";

import TestPapers from "./components/Test Paper Management/TestPapers";
import CreateTestPapers from "./components/Test Paper Management/CreateTestPapers";
import UpdateSubjectsTestPaper from './components/Test Paper Management/UpdateSubjectsTestPaper'

import Questions from './components/Questions Management/Questions'
import CreateQuestions from './components/Questions Management/CreateQuestions'
import UpdateQuestion from './components/Questions Management/UpdateQuestion'

import StudentEnrolledDetails from './components/StudentManagement/StudentEnrolledDetails'
import PrivacyPolicy from "./pages/Privacy Policy/PrivacyPolicy";
import TermsAndConditions from "./pages/Terms and Conditions/TermsAndConditions";
import Disclaimer from "./pages/Disclaimer/Disclaimer";
import ContactUs from "./pages/Contact Us/ContactUs";
function App() {

  return (
<>
    <Routes>

      {/* AUTH RECOVERY ROUTES (NO GUARDS EVER) */}
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />



      {/* PUBLIC ROUTES */}
      <Route path="/login" element={
        <PublicOnlyRoute >
          <Login />
        </PublicOnlyRoute>
      } />
      <Route path="/register" element={
        <PublicOnlyRoute>
          <Register />
        </PublicOnlyRoute>
      } />


      {/* PROTECTED ROUTES */}
      <Route element={<ProtectedRoute />}>

        <Route element={<AppLayout />}>
          <Route path="/" element={<DashBoardFinal />} />

        <Route path="/institute/exams-overview" element={<Exams/>}/>
         <Route path="/institute/create-exams" element={<CreateExam />} />
         <Route path="/institute/update-exams/:exam_id" element={<UpdateExam />} />

        <Route path="/institute/exam/subjects-overview" element={<Subjects />} />
        <Route path="/institute/create-subjects" element={<CreateSubjects />} />
         <Route path="/institute/update-subject/:subject_id" element={<UpdateSubjectAndExam />} />

        <Route path="/institute/exam/subject/testpapers-overview" element={<TestPapers/>}/>
        <Route path="/institute/exam/subject/create-testpapers" element={<CreateTestPapers/>}/>

        <Route path="/institute/exam/subject/update-testpaper/:test_paper_id" element={<UpdateSubjectsTestPaper/>}/>

        <Route path="/institute/exam/subject/testpaper/questions-overview" element={<Questions/>}/>
        <Route path="/institute/exam/subject/testpaper/create-questions" element={<CreateQuestions/>}/>
        <Route path="/institute/exam/subject/testpaper/update-question/:question_id" element={<UpdateQuestion/>}/>
        <Route path="/dashboard/studentenrolleddetails/:student_id/:exam_id/:subject_id/:test_paper_ids" element={<StudentEnrolledDetails/>}/>
        <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
        <Route path="/terms-and-conditions" element={<TermsAndConditions/>}/>
        <Route path="/disclaimer" element={<Disclaimer/>}/>
        <Route path="/contact-us" element={<ContactUs/>}/>
         <Route path="/settings" element={<SettingsPage />}/>
        </Route>

      </Route>
    </Routes>

    
</>
  );
}

export default App;
