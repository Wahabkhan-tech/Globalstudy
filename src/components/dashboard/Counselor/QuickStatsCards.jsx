import { UserGroupIcon, DocumentTextIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const QuickStatsCards = () => {
  const stats = [
    { title: 'Assigned Students', value: 10, icon: UserGroupIcon, color: 'bg-blue-500' },
    { title: 'Pending Applications', value: 3, icon: DocumentTextIcon, color: 'bg-yellow-500' },
    { title: 'New Messages', value: 5, icon: EnvelopeIcon, color: 'bg-green-500' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`flex items-center p-4 rounded-lg shadow ${stat.color} text-white`}
        >
          <stat.icon className="w-8 h-8 mr-3" />
          <div>
            <p className="text-lg font-semibold">{stat.value}</p>
            <p className="text-sm">{stat.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStatsCards;