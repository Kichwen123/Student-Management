
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import PublicLayout from './Layout/Public';
import AdminLayout from './Layout/AdminLayout';

import Home from './pages/Home/Home';
import About from './pages/About';
import StudentSignup from './pages/auth/signup/StudentSignup';
import TeacherSignup from './pages/auth/signup/TeacherSignup';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/Register';
import Students from './pages/Students';
import StudentDetails from './pages/StudentDetails';
import AddStudent from './pages/AddStudents';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageStudents from './pages/admin/ManageStudents';
import ManageTeachers from './pages/admin/ManageTeachers';
import AdminSettings from './pages/admin/AdminSettings';
import AdminHelp from './pages/admin/AdminHelp';

function App() {
  return (
    <>
      <Toaster position="top-right" />

      <Routes>
        {/* Public layout: navbar and footer */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />

          {/* Student pages */}
          <Route path="students" element={<Students />} />
          <Route path="students/:id" element={<StudentDetails />} />
          <Route path="add-student" element={<AddStudent />} />

          {/* Other pages */}
          <Route path="about-us" element={<About />} />

          {/* Authentication routes */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="student" element={<StudentSignup />} />
          <Route path="teachers" element={<TeacherSignup />} />
        </Route>

        {/* Admin layout: displays only its own content */}
<Route path="/admin" element={<AdminLayout/>}>
  <Route index element={<AdminDashboard/>} />
  <Route path="students" element={<ManageStudents/>} />
  <Route path="teachers" element={<ManageTeachers/>} />
  <Route path="settings" element={<AdminSettings/>} />
  <Route path="help" element={<AdminHelp/>} />
</Route>      
</Routes>
    </>
  );
}

export default App;
