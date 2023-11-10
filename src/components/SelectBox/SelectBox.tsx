import { useState, useEffect } from "react";
import Select from "react-select";
import "./select.css";

import React from "react";

const Algos = () => {
  const options = [
    { value: "bfs", label: "BFS" },
    { value: "dfs", label: "DFS" },
  ];

  return (
    <Select options={options} placeholder="Algorithims" className="algo-menu" />
  );
};

const Speed = () => {
  const options = [
    { value: "slow", label: "Slow" },
    { value: "normal", label: "Normal" },
    { value: "fast", label: "Fast" },
  ];

  return <Select options={options} placeholder="Speed" className="speed-menu"/>;
};

export { Algos, Speed };
