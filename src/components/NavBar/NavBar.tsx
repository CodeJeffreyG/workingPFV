import React, { useState } from "react";
import "./navbar.css"; // Make sure this path is correct
import Dropdown from "../SelectBox/SelectBox"; // Update the import path as necessary
import { Node } from "../Utils/types/types";

interface Option {
  value: string;
  label: string;
}

interface NavBarProps {
  viewGrid: Node[][];
  clearGrid: (
    grid: Node[][],
    setGrid: React.Dispatch<React.SetStateAction<Node[][]>>
  ) => void;
  setViewGrid: React.Dispatch<React.SetStateAction<Node[][]>>;
  Bfs: (
    grid: Node[][],
    setGrid: React.Dispatch<React.SetStateAction<Node[][]>>,
    speed: string
  ) => void;
  Dfs: (
    grid: Node[][],
    setGrid: React.Dispatch<React.SetStateAction<Node[][]>>,
    speed: string
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
  const [selectedSpeed, setSelectedSpeed] = useState<string>("normal");

  const algorithms: Option[] = [
    { value: "bfs", label: "BFS" },
    { value: "dfs", label: "DFS" },
  ];

  const speeds: Option[] = [
    { value: "slow", label: "Slow" },
    { value: "normal", label: "Normal" },
    { value: "fast", label: "Fast" },
  ];

  const handleAlgorithmChange = (value: string) => {
    setSelectedAlgorithm(value);
  };

  const handleSpeedChange = (value: string) => {
    setSelectedSpeed(value);
  };

  const handleStart = () => {
    if (selectedAlgorithm === "dfs") {
      Dfs(viewGrid, setViewGrid, selectedSpeed);
    } else {
      Bfs(viewGrid, setViewGrid, selectedSpeed);
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
        <li>
          <Dropdown
            options={speeds}
            placeholder="Select Speed"
            onOptionSelected={handleSpeedChange}
          />
        </li>
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
