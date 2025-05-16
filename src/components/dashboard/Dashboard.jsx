import { useOutletContext, useLocation } from 'react-router-dom';
import StudentDashboard from './StudentDashboard/StudentDashboard';
import HelpdeskStepperForm from '../../pages/Helpdeskform';
import HelpdeskDataRecords from '../../pages/HelpdeskDataRecords';
import BadgeCard from '../cards/BadgeCard';
import FeatureCard from '../cards/FeatureCard';
import WelcomeSection from './Counselor/WelcomeSection';
import QuickStatsCards from './Counselor/QuickStatsCards';
import AssignedStudentsTable from './Counselor/AssignedStudentsTable';
import RecentActivityFeed from './Counselor/RecentActivityFeed';
import ChatSummaryCard from './Counselor/ChatSummaryCard';
import FiltersPanel from './Counselor/FiltersPanel';
import User from '../../pages/Users';
// Placeholder for Students component (uncomment and adjust path as needed)
// import Students from '../../pages/Students'; // Adjust path as needed
import {
  UserGroupIcon,
  ClockIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  DocumentMagnifyingGlassIcon,
  PhoneIcon,
  FireIcon,
  NoSymbolIcon,
  PencilSquareIcon,
  FolderIcon,
  DocumentArrowUpIcon,
  DocumentCheckIcon,
  PaperAirplaneIcon,
  XCircleIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  PlusCircleIcon,
  MinusCircleIcon,
  UserIcon,
  ChartPieIcon,
  FilmIcon,
  AcademicCapIcon,
  QuestionMarkCircleIcon,
  BookOpenIcon,
  UserCircleIcon,
  BuildingOffice2Icon,
  RectangleStackIcon,
  HomeIcon,
  TicketIcon,
} from '@heroicons/react/24/outline';

// Temporary placeholder for Students component to avoid runtime error
const Students = () => <div>Students Component Placeholder</div>;

const Dashboard = () => {
  const { userRole } = useOutletContext() || {};
  const location = useLocation();

  console.log('Dashboard userRole:', userRole);

  // Define features and menu items for super_admin (copied from Sidebar.js)
  const features = {
    super_admin: [
      'Student Management',
      'Counselor Management',
      'Course Management',
      'Universities',
      'Courses Table',
    ],
    admin: [
      'User Management',
      'Analytics',
      'Content Management',
      'Help-Desk Officer',
      'Media Uploads',
    ],
    student: ['Profile View', 'Course Access', 'Help-Desk Officer'],
    counselor: ['Student Management', 'Course Management', 'Help-Desk Officer'],
    media_channel: ['Content Management', 'Media Uploads'],
    helpdesk_officer: ['Help-Desk Officer', 'User Queries', 'Upload Data', 'Data Records'],
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

  const featureRoutes = {
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

  const featureIcons = {
    'User Management': UserGroupIcon,
    'Analytics': ChartPieIcon,
    'Content Management': DocumentTextIcon,
    'Help-Desk Officer': QuestionMarkCircleIcon,
    'Media Uploads': FilmIcon,
    'Profile View': UserIcon,
    'Course Access': BookOpenIcon,
    'Course Management': AcademicCapIcon,
    'Student Management': UserGroupIcon,
    'Counselor Management': UserCircleIcon,
    'User Queries': QuestionMarkCircleIcon,
    'Upload Data': DocumentArrowUpIcon,
    'Data Records': DocumentTextIcon,
    'Universities': BuildingOffice2Icon,
    'Courses Table': RectangleStackIcon,
  };

  // Map feature names to display names for FeatureCard (to match Sidebar menu item names)
  const featureDisplayNames = {
    'Student Management': 'Students',
    'Counselor Management': 'Counselors',
    'Course Management': 'Courses',
    'Universities': 'Universities',
    'Courses Table': 'Courses Table',
  };

  // Compute menu items for super_admin
  const allowedFeatures = features[userRole] || [];
  const menuItems = userRole === 'super_admin'
    ? baseMenuItems.filter(
        (item) => item.feature === null || allowedFeatures.includes(item.feature)
      )
    : [];

  // Derive features to display for super_admin, including submenu items
  const superAdminFeatures = userRole === 'super_admin'
    ? menuItems
        .filter((item) => item.feature && item.path !== '/') // Exclude Dashboard
        .map((item) => ({
          feature: item.feature,
          displayName: featureDisplayNames[item.feature] || item.feature,
        }))
        .concat(
          menuItems
            .filter((item) => item.subItems)
            .flatMap((item) =>
              item.subItems
                .filter((subItem) => allowedFeatures.includes(subItem.feature))
                .map((subItem) => ({
                  feature: subItem.feature,
                  displayName: featureDisplayNames[subItem.feature] || subItem.feature,
                }))
            )
        )
    : [];

  const superAdminMetrics = [
    { title: 'Total Leads', value: 26, color: 'bg-blue-500', icon: UserGroupIcon, type: 'metric' },
    { title: 'Pending Leads', value: 4, color: 'bg-red-500', icon: ClockIcon, type: 'metric' },
    { title: 'Pending Tasks', value: 12, color: 'bg-blue-500', icon: DocumentTextIcon, type: 'metric' },
    { title: 'Unread Communications', value: 0, color: 'bg-blue-500', icon: EnvelopeIcon, type: 'metric' },
    { title: 'Total Profiles', value: 25, color: 'bg-blue-500', icon: CheckCircleIcon, type: 'metric' },
    { title: 'Under Review Documents', value: 6, color: 'bg-blue-500', icon: DocumentMagnifyingGlassIcon, type: 'metric' },
    { title: 'Applied Candidates', value: 8, color: 'bg-blue-500', icon: DocumentTextIcon, type: 'metric' },
    { title: 'Followup', value: 6, color: 'bg-blue-500', icon: PhoneIcon, type: 'metric' },
    { title: 'Hot Lead', value: 1, color: 'bg-red-500', icon: FireIcon, type: 'metric' },
    { title: 'Cold Lead', value: 0, color: 'bg-blue-500', icon: FireIcon, type: 'metric' },
    { title: 'Not Interested', value: 1, color: 'bg-blue-500', icon: NoSymbolIcon, type: 'metric' },
    { title: 'Recommendation Given', value: 3, color: 'bg-blue-500', icon: PencilSquareIcon, type: 'metric' },
    { title: 'Documents Pending', value: 2, color: 'bg-blue-500', icon: FolderIcon, type: 'metric' },
    { title: 'Documents Submitted', value: 4, color: 'bg-blue-500', icon: DocumentArrowUpIcon, type: 'metric' },
    { title: 'Application Submitted', value: 2, color: 'bg-blue-500', icon: DocumentCheckIcon, type: 'metric' },
    { title: 'Offer Letter Received', value: 1, color: 'bg-blue-500', icon: DocumentMagnifyingGlassIcon, type: 'metric' },
    { title: 'Visa Process Started', value: 1, color: 'bg-blue-500', icon: PaperAirplaneIcon, type: 'metric' },
    { title: 'Visa Accepted', value: 0, color: 'bg-blue-500', icon: CheckCircleIcon, type: 'metric' },
    { title: 'Visa Rejected', value: 0, color: 'bg-blue-500', icon: XCircleIcon, type: 'metric' },
    { title: 'Invoice Raised', value: 0, color: 'bg-blue-500', icon: CurrencyDollarIcon, type: 'metric' },
    { title: 'Payout Received', value: 0, color: 'bg-blue-500', icon: CurrencyDollarIcon, type: 'metric' },
    { title: 'Payout Pending', value: 0, color: 'bg-blue-500', icon: ClockIcon, type: 'metric' },
    { title: 'QS Pending', value: 0, color: 'bg-blue-500', icon: ChartBarIcon, type: 'metric' },
    { title: 'QS Approved', value: 0, color: 'bg-blue-500', icon: CheckCircleIcon, type: 'metric' },
    { title: 'Student Created', value: 10, color: 'bg-blue-500', icon: PlusCircleIcon, type: 'user', role: 'student', status: 'Active: 8, Pending: 2' },
    { title: 'Student Deleted', value: 1, color: 'bg-red-500', icon: MinusCircleIcon, type: 'user', role: 'student' },
    { title: 'Counselor Created', value: 5, color: 'bg-blue-500', icon: PlusCircleIcon, type: 'user', role: 'counselor', status: 'Active: 4, Pending: 1' },
    { title: 'Counselor Deleted', value: 0, color: 'bg-red-500', icon: MinusCircleIcon, type: 'user', role: 'counselor' },
    { title: 'Media Channel Created', value: 3, color: 'bg-blue-500', icon: PlusCircleIcon, type: 'user', role: 'media_channel', status: 'Active: 3, Pending: 0' },
    { title: 'Media Channel Deleted', value: 0, color: 'bg-red-500', icon: MinusCircleIcon, type: 'user', role: 'media_channel' },
    { title: 'Helpdesk Created', value: 2, color: 'bg-blue-500', icon: PlusCircleIcon, type: 'user', role: 'helpdesk_officer', status: 'Active: 2, Pending: 0' },
    { title: 'Helpdesk Deleted', value: 0, color: 'bg-red-500', icon: MinusCircleIcon, type: 'user', role: 'helpdesk_officer' },
  ];

  const mockUsers = [
    { id: 'S001', name: 'Jane Smith', role: 'student', status: 'Active', assignedTo: '', region: 'North America' },
    { id: 'C001', name: 'Dr. Lee', role: 'counselor', status: 'Active', assignedTo: 'Admin', region: 'Asia' },
    { id: 'M001', name: 'Mark Jones', role: 'media_channel', status: 'Pending', assignedTo: '', region: 'Europe' },
    { id: 'H001', name: 'Sarah Adams', role: 'helpdesk_officer', status: 'Inactive', assignedTo: 'Admin', region: 'Africa' },
  ];

  const handleAssign = (id) => {
    console.log(`Assigning user ${id}`);
  };

  const handleUpdateStatus = (id, status) => {
    console.log(`Updating user ${id} status to ${status}`);
  };

  const handleView = (user) => {
    console.log(`Viewing user:`, user);
  };

  if (userRole === 'student') {
    return <StudentDashboard />;
  }

  if (userRole === 'helpdesk_officer') {
    if (location.pathname === '/helpdesk/upload-data') {
      return <HelpdeskStepperForm />;
    }
    if (location.pathname === '/helpdesk/data-records') {
      return <HelpdeskDataRecords />;
    }
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Welcome, Helpdesk Officer!</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features[userRole].map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              route={featureRoutes[feature]}
              icon={featureIcons[feature] || DocumentTextIcon}
            />
          ))}
        </div>
      </div>
    );
  }

  if (userRole === 'super_admin') {
    if (location.pathname === '/users') {
      return (
        <User
          role="super_admin"
          users={mockUsers}
          onAssign={handleAssign}
          onUpdateStatus={handleUpdateStatus} // Fixed prop name
          onView={handleView}
        />
      );
    }
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Welcome, Super Admin!</h2>
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Admin Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {superAdminFeatures.map(({ feature, displayName }, index) => (
              <FeatureCard
                key={index}
                feature={displayName} // Use display name for user-friendly text
                route={featureRoutes[feature]}
                icon={featureIcons[feature] || DocumentTextIcon}
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {superAdminMetrics.map((item, index) => (
            <BadgeCard
              key={index}
              value={item.value}
              title={item.title}
              icon={item.icon}
              color={item.color}
              type={item.type}
              status={item.status}
            />
          ))}
        </div>
      </div>
    );
  }

  if (userRole === 'admin') {
    if (location.pathname === '/users') {
      return (
        <User
          role="admin"
          users={mockUsers}
          onAssign={handleAssign}
          onUpdateStatus={handleUpdateStatus} // Fixed prop name
          onView={handleView}
        />
      );
    }
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold capitalize mb-6 text-gray-800">
          Welcome, {userRole.replace('_', ' ')}!
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {superAdminMetrics
            .filter((item) => item.type === 'metric')
            .map((item, index) => (
              <BadgeCard
                key={index}
                value={item.value}
                title={item.title}
                icon={item.icon}
                color={item.color}
                type={item.type}
                status={item.status}
              />
            ))}
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Admin Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features[userRole].map((feature, index) => (
              <FeatureCard
                key={index}
                feature={feature}
                route={featureRoutes[feature]}
                icon={featureIcons[feature] || DocumentTextIcon}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (userRole === 'counselor' && location.pathname === '/students') {
    return <Students />;
  }

  if (userRole === 'counselor') {
    return (
      <div className="flex-1">
        <WelcomeSection counselorName="John Doe" />
        <QuickStatsCards />
        <FiltersPanel />
        <AssignedStudentsTable />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivityFeed />
          <ChatSummaryCard />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold capitalize mb-6 text-gray-800">
        Welcome, {userRole || 'Guest'}!
      </h2>
      {features[userRole] && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features[userRole].map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              route={featureRoutes[feature]}
              icon={featureIcons[feature] || DocumentTextIcon}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;