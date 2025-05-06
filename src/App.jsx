import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import Users from './pages/Users';
import Analytics from './pages/Analytics';
import Content from './pages/Content';
import Media from './pages/Media';
import Profile from './pages/Profile';
import Courses from './pages/Courses';
import Students from './pages/Students';
import Queries from './pages/Queries';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { getCurrentUser } from './utils/auth';
import Helpdesk from './pages/Helpdesk';
import Counselors from './components/dashboard/badge/Counselors';
import MediaChannelPartner from './components/dashboard/badge/MediaChannelPartner';
import HelpdeskManager from './components/dashboard/badge/HelpdeskManager';
import VisaStatus from './components/dashboard/badge/VisaStatus';
import AppliedCandidates from './components/dashboard/badge/AppliedCandidates';
import Payout from './components/dashboard/badge/Payout';
import Universities from './components/dashboard/badge/Universities';
import Student from './components/dashboard/badge/Student';

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
          <Route path="students" element={<Students />} /> {/* Existing Students page */}
          <Route path="queries" element={<Queries />} />
          <Route path="dashboard/students" element={<Student />} /> {/* New badge Student */}
          <Route path="dashboard/counselors" element={<Counselors />} />
          <Route path="dashboard/media-channel" element={<MediaChannelPartner />} />
          <Route path="dashboard/helpdesk-manager" element={<HelpdeskManager />} />
          <Route path="dashboard/visa-status" element={<VisaStatus />} />
          <Route path="dashboard/applied-candidates" element={<AppliedCandidates />} />
          <Route path="dashboard/payout" element={<Payout />} />
          <Route path="dashboard/universities" element={<Universities />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;