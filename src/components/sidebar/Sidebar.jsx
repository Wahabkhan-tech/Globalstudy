import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  UserGroupIcon,
  ChartBarIcon,
  DocumentTextIcon,
  TicketIcon,
  FilmIcon,
  UserIcon,
  BookOpenIcon,
  QuestionMarkCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightOnRectangleIcon,
  AcademicCapIcon,
  UserCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  BuildingOffice2Icon,
  RectangleStackIcon,
} from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { logout } from '../../utils/auth';

const Sidebar = ({ isCollapsed, setIsCollapsed, userRole }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openSubMenu, setOpenSubMenu] = useState({});

  const features = {
    super_admin: [
      'Student Management',
      'Counselor Management',
      'Course Management',
      'Universities',
      'Courses Table',
    ],
    student: ['Profile View', 'Course Access', 'Help-Desk Officer'],
    counselor: [
      'Student Management',
      'Help-Desk Officer',
      // Removed 'Course Management', 'Universities', 'Courses Table'
    ],
    media_channel: ['Content Management', 'Media Uploads'],
    helpdesk_officer: ['Help-Desk Officer', 'User Queries', 'Upload Data', 'Data Records'],
  };

  const FeatureRoutes = {
    'User Management': '/users',
    'Analytics': '/analytics',
    'Content Management': '/content',
    'Help-Desk Officer': '/helpdesk',
    'Media Uploads': '/media',
    'Profile View': '/profile',
    'Course Access': '/courses',
    'Course Management': '/courses',
    'Student Management': '/students',
    'Counselor Management': '/counselors',
    'User Queries': '/queries',
    'Upload Data': '/helpdesk/upload-data',
    'Data Records': '/helpdesk/data-records',
    'Universities': '/courses/universities',
    'Courses Table': '/courses/table',
  };

  const baseMenuItems = [
    { name: 'Dashboard', path: '/', icon: HomeIcon, feature: null },
    { name: 'Users', path: '/users', icon: UserGroupIcon, feature: 'User Management' },
    { name: 'Analytics', path: '/analytics', icon: ChartBarIcon, feature: 'Analytics' },
    { name: 'Content', path: '/content', icon: DocumentTextIcon, feature: 'Content Management' },
    { name: 'Helpdesk', path: '/helpdesk', icon: TicketIcon, feature: 'Help-Desk Officer' },
    { name: 'Media', path: '/media', icon: FilmIcon, feature: 'Media Uploads' },
    { name: 'Profile', path: '/profile', icon: UserIcon, feature: 'Profile View' },
    { name: 'Courses', path: '/courses', icon: BookOpenIcon, feature: 'Course Access' },
    {
      name: 'Courses',
      path: '/courses',
      icon: BookOpenIcon,
      feature: 'Course Management',
      subItems: [
        { name: 'Universities', path: '/courses/universities', icon: BuildingOffice2Icon, feature: 'Universities' },
        { name: 'Courses Table', path: '/courses/table', icon: RectangleStackIcon, feature: 'Courses Table' },
      ],
    },
    { name: 'Students', path: '/students', icon: AcademicCapIcon, feature: 'Student Management' },
    { name: 'Counselors', path: '/counselors', icon: UserCircleIcon, feature: 'Counselor Management' },
    { name: 'Queries', path: '/queries', icon: QuestionMarkCircleIcon, feature: 'User Queries' },
    { name: 'Upload Data', path: '/helpdesk/upload-data', icon: DocumentTextIcon, feature: 'Upload Data' },
    { name: 'Data Records', path: '/helpdesk/data-records', icon: DocumentTextIcon, feature: 'Data Records' },
  ];

  const allowedFeatures = features[userRole] || [];
  const menuItems = baseMenuItems.filter(
    (item) => item.feature === null || allowedFeatures.includes(item.feature)
  );

  useEffect(() => {
    console.log('Initializing submenus. User role:', userRole);
    const initialSubMenus = menuItems
      .filter((item) => item.subItems)
      .reduce((acc, item) => ({ ...acc, [item.name]: true }), {});
    setOpenSubMenu(initialSubMenus);
    console.log('Submenu state set to:', initialSubMenus);
  }, [userRole]);

  useEffect(() => {
    console.log('Checking location:', location.pathname, 'isCollapsed:', isCollapsed);
    if (location.pathname === '/') {
      setIsCollapsed(false);
    }
  }, [location.pathname, setIsCollapsed]);

  const toggleSidebar = () => {
    console.log('Toggling sidebar. Current isCollapsed:', isCollapsed);
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    console.log('Logging out');
    logout();
    navigate('/login');
  };

  const toggleSubMenu = (name) => {
    console.log('Toggling submenu:', name, 'Current state:', openSubMenu[name]);
    setOpenSubMenu((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div
      className={`fixed top-0 left-0 pt-4 bg-[#FAF9F6] text-black h-screen shadow-lg transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between mb-6 p-4">
        <div className="flex items-center">
          <svg
            className="w-8 h-8 text-black"
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
          {!isCollapsed && <h2 className="text-xl font-semibold ml-3">Global Study</h2>}
        </div>
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-full bg-blue-500 text-white hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-white transition-colors duration-200"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRightIcon className="w-5 h-5" /> : <ChevronLeftIcon className="w-5 h-5" />}
        </button>
      </div>
      <div className="flex flex-col pt-6 justify-between h-[calc(100%-6rem)] overflow-y-auto">
        <ul className="space-y-2 px-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.subItems ? (
                <>
                  <div
                    className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                      location.pathname === item.path ||
                      item.subItems.some((subItem) => location.pathname === subItem.path)
                        ? 'bg-blue-500 text-white'
                        : 'text-black hover:bg-blue-500 hover:text-white'
                    }`}
                    onClick={() => toggleSubMenu(item.name)}
                    aria-label={item.name}
                  >
                    <item.icon className="w-5 h-5" />
                    {!isCollapsed && <span className="ml-3 flex-1">{item.name}</span>}
                    {!isCollapsed && (
                      <button>
                        {openSubMenu[item.name] ? (
                          <ChevronUpIcon className="w-5 h-5" />
                        ) : (
                          <ChevronDownIcon className="w-5 h-5" />
                        )}
                      </button>
                    )}
                  </div>
                  {!isCollapsed && openSubMenu[item.name] && (
                    <ul className="ml-6 mt-2 space-y-1">
                      {item.subItems
                        .filter((subItem) => allowedFeatures.includes(subItem.feature))
                        .map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              to={subItem.path}
                              className={`flex items-center p-2 rounded-lg text-sm transition-colors duration-200 ${
                                location.pathname === subItem.path
                                  ? 'bg-blue-500 text-white'
                                  : 'text-black hover:bg-blue-500 hover:text-white'
                              }`}
                              aria-label={subItem.name}
                            >
                              <subItem.icon className="w-4 h-4" />
                              <span className="ml-3">{subItem.name}</span>
                            </Link>
                          </li>
                        ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'bg-blue-500 text-white'
                      : 'text-black hover:bg-blue-500 hover:text-white'
                  }`}
                  aria-label={item.name}
                >
                  <item.icon className="w-5 h-5" />
                  {!isCollapsed && <span className="ml-3">{item.name}</span>}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <div className="px-2 mb-4">
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-3 rounded-lg hover:bg-red-500 hover:text-amber-50 text-red-500 transition-colors duration-200"
            aria-label="Logout"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            {!isCollapsed && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;