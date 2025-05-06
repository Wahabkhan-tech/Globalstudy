import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import { getCurrentUser } from '../../utils/auth';

const Layout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userRole, setUserRole] = useState('helpdesk_officer');

  useEffect(() => {
    const user = getCurrentUser();
    console.log('getCurrentUser result:', user);
    if (user) {
      setUserRole(user.role || 'guest');
    }
  }, []);

  const isStudent = userRole === 'student';

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <div className="flex flex-1">
        {!isStudent && (
          <Sidebar
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            userRole={userRole}
          />
        )}
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ${
            isStudent ? 'ml-0' : isCollapsed ? 'ml-20' : 'ml-64'
          }`}
        >
          <Navbar
            userRole={userRole}
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            isStudent={isStudent}
          />
          <main className="flex-1 p-6 pt-20 overflow-auto">
            <Outlet context={{ userRole, setUserRole }} />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;