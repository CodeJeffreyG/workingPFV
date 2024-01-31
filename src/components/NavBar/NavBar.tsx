import React, { useState } from "react";
import "./navbar.css";
import Dropdown from "../SelectBox/SelectBox"; // Update the import path as necessary
import { Node } from "../Utils/types/types";

interface Option {
  value: string;
  label: string;
}

// Define the props expected by the NavBar component
interface NavBarProps {
  viewGrid: Node[][];
  clearGrid: (
    grid: Node[][],
    setGrid: React.Dispatch<React.SetStateAction<Node[][]>>
  ) => void;
  setViewGrid: React.Dispatch<React.SetStateAction<Node[][]>>;
  Bfs: (
    grid: Node[][],
    setGrid: React.Dispatch<React.SetStateAction<Node[][]>>
  ) => void;
  Dfs: (
    grid: Node[][],
    setGrid: React.Dispatch<React.SetStateAction<Node[][]>>
  ) => void;
}

const NavBar: React.FC<NavBarProps> = ({
  viewGrid,
  clearGrid,
  setViewGrid,
  Bfs,
  Dfs,
}) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("");

  const algorithms: Option[] = [
    { value: "bfs", label: "BFS" },
    { value: "dfs", label: "DFS" },
  ];
  const handleAlgorithmChange = (value: string) => {
    setSelectedAlgorithm(value);
  };

  const handleStart = () => {
    if (selectedAlgorithm === "dfs") {
      Dfs(viewGrid, setViewGrid);
    } else {
      Bfs(viewGrid, setViewGrid);
    }
  };

  return (
    <nav>
      <div>Path-Finding Visualizer</div>
      <ul>
        <li>
          <Dropdown
            options={algorithms}
            placeholder="Select Algorithm"
            onOptionSelected={handleAlgorithmChange}
          />
        </li>
        <li>{/* Speed dropdown or other UI elements */}</li>
        <li>
          <button onClick={() => clearGrid(viewGrid, setViewGrid)}>
            Clear
          </button>
        </li>
        <li>
          <button onClick={handleStart}>Start</button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
