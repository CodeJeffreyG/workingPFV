import React, { useState, useEffect } from "react";
import { Dfs, Bfs } from "./Algos";
import "./grid.css";
import { start } from "repl";

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

  const [createWalls, setCreateWalls] = useState<boolean>(false);

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

  const getStartAndFinishNodes = (
    viewGrid: Node[][]
  ): {
    startNode: Node | null;
    endNode: Node | null;
  } => {
    let startNode: Node | null = null;
    let endNode: Node | null = null;

    // Iterate through the grid to find the start and end nodes
    viewGrid.forEach((row) => {
      row.forEach((col) => {
        if (col.isStart) {
          startNode = col;
        } else if (col.isFinish) {
          endNode = col;
        }
      });
    });

    return { startNode, endNode };
  };

  const isNodeStartOrFinish = (
    node: Node,
    startNode: Node,
    finishNode: Node,
    currentNode: Node
  ): boolean => {
    return (
      (node.row === startNode.row && node.col === startNode.col) ||
      (node.row === finishNode.row && node.col === finishNode.col) ||
      (currentNode &&
        currentNode.row !== undefined &&
        currentNode.col !== undefined &&
        node.row === currentNode.row &&
        node.col === currentNode.col)
    );
  };

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

    setMouseClick(true);

    const currentId = e.currentTarget.id;
    let parsedId = currentId.split(",").map((x) => Number(x));
    let node = viewGrid[parsedId[0]][parsedId[1]];
    let tempGrid = [...viewGrid];

    if (!node.isStart && !node.isFinish) {
      setCreateWalls(true);
      tempGrid[parsedId[0]][parsedId[1]] = {
        ...node,
        isWall: true,
        isStart: false,
        isFinish: false,
      };
      setViewGrid(tempGrid);
      // console.log("create walls is now true", createWalls);
    }

    setCurrentNode(node);
  };

  //turns start/finish node draggable off
  const mouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setMouseClick(false);
    setCreateWalls(false);
    console.log(createWalls, "create walls is now false");
  };

  //if mouseClick State is set to true... then swap the currentNode with the node the mouse just entered.
  //keeps swapping until mouseClick is set to false.
  const onMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const currentId = e.currentTarget.id;
    let parsedId = currentId.split(",").map((x) => Number(x));
    let tempGrid = [...viewGrid];
    let node = viewGrid[parsedId[0]][parsedId[1]]; // Node to switch
    let startNode = tempGrid[currentNode.row][currentNode.col]; // Node with start

    if (createWalls) {
      if (!node.isStart && !node.isFinish) {
        tempGrid[parsedId[0]][parsedId[1]] = {
          ...node,
          isWall: true,
          isStart: false,
          isFinish: false,
        };
        setViewGrid(tempGrid);
      }
    }

    if (mouseClick && !createWalls) {
      // Only execute this logic if mouseClick is true and createWalls is false
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
                  ? { backgroundColor: "green", cursor: "pointer" }
                  : col.isFinish
                  ? { backgroundColor: "red", cursor: "pointer" }
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
