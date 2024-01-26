import React, { useState, useEffect } from "react";
import { Node } from "../Utils/types/types";
import NavBar from "../NavBar/NavBar";
import { Dfs, Bfs, clearGrid } from "../Utils/Algos";
import "./grid.css";
import { start } from "repl";

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

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setMouseClick(false);
      setCreateWalls(false);
      setCurrentNode(currentNode);
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, []);

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
    <div className="pageContainer">
      <div className="navBarContainer">
        <NavBar
          viewGrid={viewGrid}
          clearGrid={clearGrid}
          setViewGrid={setViewGrid}
          Bfs={Bfs}
        />
      </div>
      <div className="gridContainer">
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
                    ? { backgroundColor: "#4CAF50", cursor: "pointer" } // Green for start
                    : col.isFinish
                    ? { backgroundColor: "#f44336", cursor: "pointer" } // Red for finish
                    : col.isWall
                    ? { backgroundColor: "#212121" } // Dark grey for walls
                    : col.isVisited
                    ? { backgroundColor: "#2196F3" } // Blue for visited
                    : col.backTracked
                    ? { backgroundColor: "#FFEB3B" } // Gold for backtracked path
                    : { backgroundColor: "#474747" } // Darker grey for normal nodes
                }
                className="node"
                id={`${col.row},${col.col}`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewGrid;
