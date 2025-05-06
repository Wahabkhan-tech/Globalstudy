import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircleIcon, ArrowRightOnRectangleIcon, BellIcon } from '@heroicons/react/24/outline';

const Navbar = ({ userRole, isCollapsed, isStudent }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/login');
  };

  return (
    <div
      className={`fixed top-0 bg-[#FAF9F6] text-blue-500 p-4 flex items-center z-50 shadow-md transition-all duration-300`}
      style={{
        width: isStudent ? '100vw' : isCollapsed ? 'calc(100vw - 5rem)' : 'calc(100vw - 16rem)',
        left: isStudent ? '0' : isCollapsed ? '5rem' : '16rem',
      }}
    >
      <div className="flex items-center space-x-4">
        <svg
          className="w-8 h-8 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        <h1 className="text-xl font-bold">Global Study Dashboard</h1>
      </div>
      <div className="ml-auto flex items-center space-x-3">
        <button
          className="flex items-center p-2 rounded-lg hover:bg-blue-500 hover:text-amber-50 focus:outline-none focus:ring-2 focus:ring-white transition-colors duration-200"
          aria-label="Notifications"
        >
          <BellIcon className="w-6 h-6" />
        </button>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-blue-500 hover:text-amber-50 focus:outline-none focus:ring-2 focus:ring-white transition-colors duration-200"
          aria-label="User menu"
        >
          <UserCircleIcon className="w-6 h-6" />
          <span className="capitalize">{userRole.replace('_', ' ')}</span>
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 top-full">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-blue-500 transition-colors duration-200"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;