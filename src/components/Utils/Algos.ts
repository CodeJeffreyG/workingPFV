import { Node } from "./types/types";

const speedToDelay: any = {
  slow: 100, // Slow speed in milliseconds
  normal: 50, // Normal speed in milliseconds
  fast: 10, // Fast speed in milliseconds
};

//write an algorithim that finds the shortest path back from the finishNode to the startNode
const bfsTraverseBack = (
  grid: Array<Array<Node>>,
  setGrid: React.Dispatch<React.SetStateAction<Array<Array<Node>>>>,
  finishNode: Node
) => {
  const upDownLeftRight: any = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  const traverse = (queue: Node[]) => {
    if (queue.length === 0) return;

    const currentNode = queue.shift();
    if (!currentNode) return;

    if (currentNode.isStart) {
      setGrid([...grid]); // Update the grid
      return;
    }

    let checkWeights: any = [];

    for (let arr of upDownLeftRight) {
      const [i, j] = arr;
      if (checkBackTrack(currentNode.row + i, currentNode.col + j, grid))
        checkWeights.push(grid[currentNode.row + i][currentNode.col + j]);
    }

    const smallestWeight: Node | null = checkSmallestWeight(checkWeights);

    if (smallestWeight) {
      queue.push(smallestWeight);
      grid[smallestWeight.row][smallestWeight.col].isVisited = false;
      grid[smallestWeight.row][smallestWeight.col].backTracked = true;
    }

    setGrid([...grid]); // Update the grid

    setTimeout(() => {
      traverse(queue); // Recursive call for the next iteration
    }, 100);
  };

  const queue = [finishNode];
  traverse(queue);
};

const Dfs = (
  grid: Array<Array<Node>>,
  setGrid: React.Dispatch<React.SetStateAction<Array<Array<Node>>>>,
  speed: string
) => {
  // Find the starting node
  let currentSpeed = speedToDelay[speed];
  const startNode = grid
    .map((row) => row.find((col) => col.isStart))
    .filter((x) => x)[0];

  // Initialize the count variable and the upDownLeftRight array
  let count = 0;
  const upDownLeftRight: any = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  // Initialize the stack with the starting node and count
  const stack = [[startNode, count]];

  // Define the recursive dfsTimeout function
  const dfsTimeout = () => {
    // Pop the next node and count off the stack
    let [currentNode, walkedSteps]: any = stack.pop();

    // If the node is undefined, return
    if (!currentNode) return;

    // If the node is the finish node, return
    if (currentNode.isFinish) {
      console.log("finish Node found!");
      bfsTraverseBack(grid, setGrid, currentNode);
      return;
    }

    // Mark the node as visited and set its count property
    currentNode.isVisited = true;
    currentNode.count = walkedSteps;

    // Update the grid state to reflect the changes to the node
    let tempGrid = [...grid];
    tempGrid[currentNode.row][currentNode.col] = currentNode;
    setGrid(tempGrid);

    // Check each neighbor of the current node
    for (let arr of upDownLeftRight) {
      // Deconstruct the indexes of the neighbor
      const [i, j] = arr;

      // If the neighbor is a valid node, add it to the stack with an increased count
      if (check(currentNode.row + i, currentNode.col + j, grid)) {
        stack.push([
          grid[currentNode.row + i][currentNode.col + j],
          walkedSteps + 1,
        ]);
      }
    }

    // Call dfsTimeout again after 1 second to continue the DFS algorithm
    setTimeout(dfsTimeout, currentSpeed);
  };

  // Call dfsTimeout to start the DFS algorithm
  dfsTimeout();
};

const Bfs = (
  grid: Array<Array<Node>>,
  setGrid: React.Dispatch<React.SetStateAction<Array<Array<Node>>>>,
  speed: string
) => {
  let currentSpeed = speedToDelay[speed];
  // Find the starting node
  const startNode = grid
    .map((row) => row.find((col) => col.isStart))
    .filter((x) => x)[0];

  // Initialize the upDownLeftRight array
  const upDownLeftRight: any = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  // Initialize the queue with the starting node
  const queue = [startNode];

  // Define the bfsTimeout function
  const bfsTimeout = () => {
    // If the queue is empty, return
    if (queue.length === 0) return;

    // Dequeue the next node
    const currentNode = queue.shift();

    // If the node is undefined, return
    if (!currentNode) return;

    // If the node is the finish node, return
    if (currentNode.isFinish) {
      console.log("finish Node found!");
      bfsTraverseBack(grid, setGrid, currentNode);
      return;
    }

    // Mark the node as visited
    currentNode.isVisited = true;

    // Update the grid state to reflect the changes to the node
    let tempGrid = [...grid];
    tempGrid[currentNode.row][currentNode.col] = currentNode;
    setGrid(tempGrid);

    // Check each neighbor of the current node
    for (let arr of upDownLeftRight) {
      // Deconstruct the indexes of the neighbor
      const [i, j] = arr;

      // Calculate the indexes of the neighbor
      const newRow = currentNode.row + i;
      const newCol = currentNode.col + j;

      // If the neighbor is a valid node, enqueue it
      if (check(newRow, newCol, grid)) {
        const neighborNode = grid[newRow][newCol];

        // Skip the neighbor if it has already been visited
        if (neighborNode.isVisited) continue;

        // Enqueue the neighbor
        queue.push(neighborNode);

        // Mark the neighbor as visited
        neighborNode.isVisited = true;

        // Update the count property of the neighbor
        neighborNode.count = currentNode.count + 1;
      }
    }

    // Call bfsTimeout again after a short delay to continue the BFS algorithm
    setTimeout(bfsTimeout, currentSpeed);
  };

  // Call bfsTimeout to start the BFS algorithm
  bfsTimeout();
};

//checks if each node is a valid index in the graph, also checks if node is a valid type of node
const check = (
  row: number,
  col: number,
  grid: Array<Array<Node>>
): boolean | void => {
  // Check if the row and column are within the grid bounds
  if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length)
    return false;

  // Get the current node and check if it meets the criteria to be included in the DFS algorithm
  const currentNode = grid[row][col];
  const correctCriteria =
    !currentNode.isWall && !currentNode.isStart && !currentNode.isVisited;

  // Return true if the current node meets the criteria, false otherwise
  return correctCriteria;
};

const checkBackTrack = (
  row: number,
  col: number,
  grid: Array<Array<Node>>
): boolean | void => {
  if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length)
    return false;

  const currentNode = grid[row][col];
  const correctCriteria = !currentNode.isWall && currentNode.isVisited;

  return correctCriteria;
};

const checkSmallestWeight = (checkWeights: Node[]): Node | null => {
  if (checkWeights.length === 0) {
    return null;
  }

  return checkWeights.reduce((prev, curr) =>
    prev.count < curr.count ? prev : curr
  )!;
};

const clearGrid = (
  grid: Array<Array<Node>>,
  setGrid: React.Dispatch<React.SetStateAction<Array<Array<Node>>>>
) => {
  const tempGrid = grid.map((row) => {
    return row.map((cell) => {
      if (cell.isStart || cell.isFinish) {
        return {
          ...cell,
          isWall: false,
          isVisited: false,
          previousNode: null,
          count: 0,
          backTracked: false,
        };
      } else {
        return {
          ...cell,
          isWall: false,
          isStart: false,
          isFinish: false,
          isVisited: false,
          previousNode: null,
          count: 0,
          backTracked: false,
        };
      }
    });
  });

  // Set the state after the loops are completed
  setGrid(tempGrid);
};

export { Dfs, Bfs, clearGrid };

// let arr = [9, 5, 9, 5, 1, 1, 1];

// const fuckingGayFunction = (arr: any) => {
//     let bigArray = [];
//     let i = 0;

//     while(i !== arr.length) {
//         let subArray = [];

//         for(let j = i; j < i + 3; j += 1) {
//             if(arr[j] === undefined) break;
//             subArray.push(arr[j]);
//         }

//         if(subArray.length === 3) bigArray.push(subArray)
//         i += 1
//     }

//     return bigArray
// }

// console.log(fuckingGayFunction(arr));
