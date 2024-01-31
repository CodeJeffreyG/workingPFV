import React, { useState } from "react";
import "./select.css"; // Ensure this path is correct

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  placeholder: string;
  onOptionSelected: (value: string) => void; // Callback prop for when an option is selected
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder,
  onOptionSelected,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value: string) => () => {
    setSelectedOption(value);
    setIsOpen(false);
    onOptionSelected(value); // Call the callback function with the selected value
  };

  return (
    <div className="dropdown-container">
      <div className="dropdown-header" onClick={toggling}>
        {selectedOption
          ? options.find((option) => option.value === selectedOption)?.label
          : placeholder}
      </div>
      {isOpen && (
        <div className="dropdown-list-container">
          <ul className="dropdown-list">
            {options.map((option) => (
              <li
                className="dropdown-list-item"
                onClick={onOptionClicked(option.value)}
                key={option.value}
              >
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
