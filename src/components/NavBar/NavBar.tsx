import React from "react";
import "./navbar.css";
import { Node } from "../Utils/types/types";
import { Algos, Speed } from "../SelectBox/SelectBox";

interface NavBarProps {
  viewGrid: Node[][];
  clearGrid: (grid: Node[][], setGrid: any) => any;
  setViewGrid: any;
}

const NavBar: React.FC<NavBarProps> = ({
  viewGrid,
  clearGrid,
  setViewGrid,
}) => {
  return (
    <nav>
      <div>Path-Finding Visualizer</div>
      <ul>
        <li>
          <Algos />
        </li>
        <li>
          <Speed />
        </li>
        <li>
          <button onClick={() => clearGrid(viewGrid, setViewGrid)}>
            Clear
          </button>
        </li>
        <button>Start</button>
      </ul>
    </nav>
  );
};

export default NavBar;
