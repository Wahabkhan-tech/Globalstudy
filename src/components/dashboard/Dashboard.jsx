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
import User from '../../pages/Users'; // Adjust path as needed
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
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { userRole } = useOutletContext() || {};
  const location = useLocation();

  console.log('Dashboard userRole:', userRole);

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
    'User Queries': '/queries',
    'Upload Data': '/helpdesk/upload-data',
    'Data Records': '/helpdesk/data-records',
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
    'User Queries': QuestionMarkCircleIcon,
    'Upload Data': DocumentArrowUpIcon,
    'Data Records': DocumentTextIcon,
  };

  const features = {
    super_admin: [
      'User Management',
      'Analytics',
      'Content Management',
      'Help-Desk Officer',
      'Media Uploads',
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

  // Mock user data for super_admin User Management
  const mockUsers = [
    { id: 'S001', name: 'Jane Smith', role: 'student', status: 'Active', assignedTo: '', region: 'North America' },
    { id: 'C001', name: 'Dr. Lee', role: 'counselor', status: 'Active', assignedTo: 'Admin', region: 'Asia' },
    { id: 'M001', name: 'Mark Jones', role: 'media_channel', status: 'Pending', assignedTo: '', region: 'Europe' },
    { id: 'H001', name: 'Sarah Adams', role: 'helpdesk_officer', status: 'Inactive', assignedTo: 'Admin', region: 'Africa' },
  ];

  const handleAssign = (id) => {
    console.log(`Assigning user ${id}`);
    // Add assign logic (e.g., API call)
  };

  const handleUpdateStatus = (id, status) => {
    console.log(`Updating user ${id} status to ${status}`);
    // Add status update logic (e.g., API call)
  };

  const handleView = (user) => {
    console.log(`Viewing user:`, user);
    // Add view logic (e.g., navigate to user profile)
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
          onupdatesStatus={handleUpdateStatus}
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
          onUpdateStatus={handleUpdateStatus}
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