import { Node } from "../components/Utils/types/types";

export const clearGrid = (
  grid: Array<Array<Node>>,
  setGrid: React.Dispatch<React.SetStateAction<Array<Array<Node>>>>,
  startNode: Node = grid[4][4],
  finishNode: Node = grid[4][20]
) => {
  const clearedGrid = grid.map((row) =>
    row.map((node) => {
      if (node === startNode || node === finishNode) {
        return {
          ...node,
          isVisited: false,
          backTracked: false,
        };
      } else {
        return {
          ...node,
          isWall: false,
          isVisited: false,
          backTracked: false,
        };
      }
    })
  );

  setGrid(clearedGrid);
};
