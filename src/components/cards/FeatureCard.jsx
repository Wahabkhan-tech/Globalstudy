import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const FeatureCard = ({ feature, route, icon: Icon }) => {
  return (
    <Link
      to={route || '#'}
      className="bg-neutral-light p-4 rounded-lg shadow hover:bg-primary hover:text-cyan-400 transition-all duration-200 flex items-center space-x-4"
      aria-label={`Access ${feature}`}
    >
      <Icon className="w-8 h-8 text-blue-600" />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{feature}</h3>
        <p className="text-secondary">Access {feature} features.</p>
      </div>
    </Link>
  );
};

FeatureCard.propTypes = {
  feature: PropTypes.string.isRequired,
  route: PropTypes.string,
  icon: PropTypes.elementType.isRequired,
};

export default FeatureCard;