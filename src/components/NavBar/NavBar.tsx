import React from "react";
import "./navbar.css";
import Dropdown from "../SelectBox/SelectBox"; // Update this path to the actual location of your Dropdown component
import { Node } from "../Utils/types/types";

const algorithms = [
  { value: "bfs", label: "BFS" },
  { value: "dfs", label: "DFS" },
];

const speeds = [
  { value: "slow", label: "Slow" },
  { value: "normal", label: "Normal" },
  { value: "fast", label: "Fast" },
];

interface NavBarProps {
  viewGrid: Node[][];
  clearGrid: (grid: Node[][], setGrid: any) => any;
  setViewGrid: any;
  Bfs: any;
}

const NavBar: React.FC<NavBarProps> = ({
  viewGrid,
  clearGrid,
  setViewGrid,
  Bfs,
}) => {
  return (
    <nav>
      <div>Path-Finding Visualizer</div>
      <ul>
        <li>
          <Dropdown options={algorithms} placeholder="Algorithms" />
        </li>
        <li>
          <Dropdown options={speeds} placeholder="Speed" />
        </li>
        <li>
          <button onClick={() => clearGrid(viewGrid, setViewGrid)}>
            Clear
          </button>
        </li>
        <li>
          <button onClick={() => Bfs(viewGrid, setViewGrid)}>Start</button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
