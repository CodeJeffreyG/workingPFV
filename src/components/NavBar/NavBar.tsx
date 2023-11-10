import React from "react";
import "./navbar.css";
import { Algos, Speed } from "../SelectBox/SelectBox";

const NavBar: React.FC = () => {
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
          <button>PlaceHolder</button>
        </li>
        <li>placeholder</li>
      </ul>
    </nav>
  );
};

export default NavBar;
