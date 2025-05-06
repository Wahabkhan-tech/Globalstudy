import { useState } from 'react';
import BadgeModal from './BadgeModal';

const BadgeCard = ({ value, title, icon: Icon, color, type, status }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className={`p-4 rounded-lg shadow-md text-white ${color} cursor-pointer hover:opacity-90 transition-opacity duration-200`}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex items-center space-x-3">
          <Icon className="w-6 h-6" />
          <div>
            <h4 className="text-lg font-semibold">{title}</h4>
            <p className="text-xl">{value}</p>
            {status && <p className="text-sm">{status}</p>}
          </div>
        </div>
      </div>
      <BadgeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        value={value}
        status={status}
      />
    </>
  );
};

export default BadgeCard;