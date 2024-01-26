import React, { useState } from "react";
import "./CustomSelect.css"; // Make sure the path to your CSS file is correct

// Define the structure of a single option in the dropdown
interface Option {
  value: string;
  label: string;
}

// Define the props expected by the Dropdown component
interface DropdownProps {
  options: Option[];
  placeholder: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value: string) => () => {
    setSelectedOption(value);
    setIsOpen(false);
    // You can handle the selected value here (e.g., lifting the state up to the parent component or handling form submission)
    console.log(value);
  };

  return (
    <div className="dropdown-container">
      <div className="dropdown-header" onClick={toggling}>
        {selectedOption ? options.find((option) => option.value === selectedOption)?.label : placeholder}
      </div>
      {isOpen && (
        <div className="dropdown-list-container">
          <ul className="dropdown-list">
            {options.map((option) => (
              <li 
                className="dropdown-list-item" 
                onClick={onOptionClicked(option.value)} 
                key={option.value}>
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
