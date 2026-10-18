
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layouts
import PublicLayout from './Layout/Public';
import AdminLayout from './Layout/AdminLayout';
import TeacherLayout from './Layout/TeacherLayout';

// Public pages
import Home from './pages/Home/Home';
import About from './pages/About';
import StudentSignup from './pages/auth/signup/StudentSignup';
import TeacherSignup from './pages/auth/signup/TeacherSignup';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/Register';


// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageStudents from './pages/admin/ManageStudents';
import ManageTeachers from './pages/admin/ManageTeachers';
import AdminSettings from './pages/admin/AdminSettings';
import AdminHelp from './pages/admin/AdminHelp';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import ManageStudent from './pages/teacher/ManageStudent';
import TeacherSettings from './pages/teacher/TeacherSettings';
import TeacherDetail from './pages/teacher/TeacherDetail';
import TeacherHelp from './pages/teacher/TeacherHelp';



function App() {
  return (
    <>
      <Toaster position="top-right" />

      <Routes>
        {/* Public layout */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />

          <Route path="about-us" element={<About />} />

          {/* Authentication */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="student" element={<StudentSignup />} />
          <Route path="teachers" element={<TeacherSignup />} />
        </Route>

        {/* Admin dashboard */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="students" element={<ManageStudents />} />
          <Route path="teachers" element={<ManageTeachers />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="help" element={<AdminHelp />} />
        </Route>

        {/* Teacher dashboard */}
        <Route path="/teacher" element={<TeacherLayout/>}>
          <Route index element={<TeacherDashboard/>} />
          <Route
            path="students"
            element={<ManageStudent/>}
          />
          <Route
            path="students/:id"
            element={<TeacherDetail/>}
          />
          <Route path="settings" element={<TeacherSettings />} />
          <Route path="help" element={<TeacherHelp />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
