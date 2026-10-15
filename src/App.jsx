
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import PublicLayout from './Layout/Public';
import Home from './pages/Home/Home';
import About from './pages/About';
import StudentSignup from './pages/auth/signup/StudentSignup';
import TeacherSignup from './pages/auth/signup/TeacherSignup';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/Register';
import Students from './pages/Students';
import StudentDetails from './pages/StudentDetails';
import AddStudent from './pages/AddStudents';

function App() {
  return (
    <>
      <Toaster position="top-right" />

      <Routes>
        {/* Public layout */}
        <Route path="/" element={<PublicLayout />}>
          {/* Home page */}
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
      </Routes>
    </>
  );
}

export default App;
