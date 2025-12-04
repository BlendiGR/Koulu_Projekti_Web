import { useState } from "react";
import { ChevronDown } from "lucide-react";

const Dropdown = ({
  title,
  children,
  disabled = false,
  defaultExpanded = false,
  badge = null,
  rightLabel = null,
  className = "",
  headerClassName = "",
  contentClassName = "",
  onToggle = null,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleToggle = () => {
    if (disabled) return;
    
    const newState = !isExpanded;
    setIsExpanded(newState);
    
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <div 
      className={`bg-beige rounded-2xl shadow-lg border border-brown-100 overflow-hidden ${
        disabled ? 'opacity-60 cursor-not-allowed' : ''
      } ${className}`}
    >
      <button
        onClick={handleToggle}
        disabled={disabled}
        className={`w-full px-6 py-4 flex items-center justify-between transition-colors duration-200 ${
          disabled 
            ? 'cursor-not-allowed' 
            : 'hover:bg-beige/30 cursor-pointer'
        } ${headerClassName}`}
        aria-expanded={isExpanded}
        aria-disabled={disabled}
      >
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-bold text-gray-800">
            {title}
          </h3>
          {badge !== null && (
            <span className="bg-brown-200 text-brown-800 px-3 py-1 rounded-full text-sm font-semibold">
              {badge}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {rightLabel && (
            <span className="text-lg font-bold text-gray-800">
              {rightLabel}
            </span>
          )}
          <ChevronDown 
            className={`w-6 h-6 text-gray-600 transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            } ${disabled ? 'opacity-50' : ''}`}
          />
        </div>
      </button>

      <div 
        className={`transition-all duration-300 ease-in-out ${
          isExpanded 
            ? 'max-h-[2000px] opacity-100' 
            : 'max-h-0 opacity-0'
        }`}
        style={{ overflow: isExpanded ? 'visible' : 'hidden' }}
      >
        <div className={`px-6 pb-6 pt-2 ${contentClassName}`}>
          <hr className="border-brown-100 mb-6" />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
