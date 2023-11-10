import React, { useState, useEffect } from "react";
import { Dfs, Bfs } from "./Algos";
import "./grid.css";

interface Node {
  isWall: boolean;
  isStart: boolean;
  isFinish: boolean;
  isVisited: boolean;
  previousNode: Node | null;
  row: number;
  col: number;
  count: number;
  backTracked: boolean;
}

interface Props {
  grid: Node[][];
}

const ViewGrid: React.FC<Props> = ({ grid }) => {
  const [viewGrid, setViewGrid] = useState<Node[][]>(grid);

  const [mouseClick, setMouseClick] = useState<boolean>(false);

  const [currentNode, setCurrentNode] = useState<Node>({
    isWall: false,
    isStart: false,
    isFinish: false,
    isVisited: false,
    previousNode: null,
    row: 4,
    col: 4,
    count: 0,
    backTracked: false,
  });

  //changes normal node to wall node
  const changeState = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const currentId = e.currentTarget.id;
    let parsedId = currentId.split(",").map((x) => Number(x));
    let tempGrid = [...viewGrid];
    let node = tempGrid[parsedId[0]][parsedId[1]];
    if (node.isStart || node.isFinish) return;

    node.isWall = !node.isWall;
    setViewGrid(tempGrid);
  };

  //checks if its startNode or finishNode if it is able to drag node
  const mouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    const currentId = e.currentTarget.id;
    let parsedId = currentId.split(",").map((x) => Number(x));
    let node = viewGrid[parsedId[0]][parsedId[1]];

    if (node.isStart || node.isFinish) {
      setCurrentNode(node);
      setMouseClick(true);
    }
  };

  //turns start/finish node draggable off
  const mouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setMouseClick(false);
  };

  //if mouseClick State is set to true... then swap the currentNode with the node the mouse just entered.
  //keeps swapping until mouseClick is set to false.
  const onMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (mouseClick) {
      const currentId = e.currentTarget.id;
      let parsedId = currentId.split(",").map((x) => Number(x));

      let tempGrid = [...viewGrid];

      let node = viewGrid[parsedId[0]][parsedId[1]]; //Node to switch
      let startNode = tempGrid[currentNode.row][currentNode.col]; //node with start

      tempGrid[currentNode.row][currentNode.col] = {
        ...startNode,
        isWall: node.isWall,
        isStart: node.isStart,
        isFinish: node.isFinish,
      };
      tempGrid[parsedId[0]][parsedId[1]] = {
        ...node,
        isWall: startNode.isWall,
        isStart: startNode.isStart,
        isFinish: startNode.isFinish,
      };

      setViewGrid(tempGrid);
      setCurrentNode(node);
    }
  };

  return (
    <>
      {viewGrid.map((row: Node[], rowIndex: number) => (
        <div className="rowContainer" key={rowIndex}>
          {row.map((col: Node, colIndex: number) => (
            <div
              onClick={changeState}
              key={colIndex}
              onMouseDown={mouseDown}
              onMouseUp={mouseUp}
              onMouseEnter={(e) => onMouseEnter(e)}
              style={
                col.isStart
                  ? { backgroundColor: "green" }
                  : col.isFinish
                  ? { backgroundColor: "red" }
                  : col.isWall
                  ? { backgroundColor: "black" }
                  : col.isVisited
                  ? { backgroundColor: "blue" }
                  : col.backTracked
                  ? { backgroundColor: "gold" }
                  : { backgroundColor: "rgb(71 85 105)" }
              }
              className="node"
              id={`${col.row},${col.col}`}
            >
              {/* {grid[rowIndex][colIndex].count} */}
            </div>
          ))}
        </div>
      ))}
      <button onClick={() => Bfs(viewGrid, setViewGrid)}>start</button>
    </>
  );
};

export default ViewGrid;
