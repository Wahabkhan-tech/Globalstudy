import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import Users from './pages/Users';
import Analytics from './pages/Analytics';
import Content from './pages/Content';
import Media from './pages/Media';
import Profile from './components/dashboard/StudentDashboard/StudentComponent/Profile';
import Courses from './pages/Courses';
import Students from './pages/Students';
import Counselor from './pages/Counselor';
import Queries from './pages/Queries';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Helpdesk from './pages/Helpdesk';
import Universities from './pages/Universities';
import CoursesTable from './pages/CoursesTable';
import { getCurrentUser } from './utils/auth';

const ProtectedRoute = ({ children }) => {
  const user = getCurrentUser();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="content" element={<Content />} />
          <Route path="helpdesk" element={<Helpdesk />} />
          <Route path="helpdesk/upload-data" element={<Dashboard />} />
          <Route path="helpdesk/data-records" element={<Dashboard />} />
          <Route path="media" element={<Media />} />
          <Route path="profile" element={<Profile />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/universities" element={<Universities />} />
          <Route path="courses/table" element={<CoursesTable />} />
          <Route path="students" element={<Students />} />
          <Route path="counselors" element={<Counselor />} />
          <Route path="queries" element={<Queries />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;