import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

type MoreFeature = {
  id: string;
  label: string;
  icon: React.ElementType;
};

interface MoreFeaturesDropdownProps {
  moreFeatures: MoreFeature[];
  onFeatureSelect: (featureId: string) => void;
  activeFeature: string | null;
}

const MoreFeaturesDropdown: React.FC<MoreFeaturesDropdownProps> = ({ 
  moreFeatures, 
  onFeatureSelect,
  activeFeature
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-300 text-xs relative ${
          isOpen || moreFeatures.some(f => f.id === activeFeature)
            ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-lg shadow-yellow-400/25'
            : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-700/50'
        }`}
      >
        <span>More</span>
        {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        <span className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-xs px-1 rounded-full font-bold">
          +12
        </span>
      </button>

      {isOpen && (
        <div className="mt-2 w-full animate-fade-in">
          <div className="flex flex-wrap justify-center gap-2">
            {moreFeatures.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <button
                  key={feature.id}
                  onClick={() => onFeatureSelect(feature.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-300 text-xs relative ${
                    activeFeature === feature.id
                      ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-lg shadow-yellow-400/25'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-700/50'
                  }`}
                >
                  <IconComponent className="w-3 h-3" />
                  <span>{feature.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoreFeaturesDropdown;