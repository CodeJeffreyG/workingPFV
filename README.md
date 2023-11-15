# Pathfinding Visualizer

Pathfinding Visualizer is a web application that visually represents the process of finding the shortest path between a start node and an end node on a grid. The grid is made up of rows and columns, and each cell on the grid represents a node. Each node can be of different types, indicated by different colors on the UI. For example, `isWall: true` makes the node black.

Currently, the available algorithm for finding the shortest path is Depth-First Search (DFS). Other algorithms, such as Breadth-First Search (BFS), will be added soon.

## Installation
To run the application locally, you'll need to have Node.js and npm installed on your machine. Once you've installed Node.js, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install the necessary dependencies.
4. Run `npm start` to start the application on `localhost:3000`.

## Features

### Draggable Start and Finish Nodes

- Click and hold on the green (start) or red (finish) nodes to drag them to different locations on the grid.

### Seamless Wall Placement

- Create walls effortlessly by holding down the mouse button and moving it across the grid. This allows for a seamless and intuitive wall placement experience.

### Clear Button with Node Memory

- Added a "Clear" button that resets the grid, but remembers the previous locations of the start and end nodes.

## Algorithms

- Currently, the visualizer supports Breadth-First Search (BFS) for finding the shortest path.

## How to Use

1. Click on a grid node to toggle it between a wall and an empty node.
2. Click and hold on the green (start) or red (finish) nodes to drag them.
3. Click "Start" to visualize the algorithm in action.

Feel free to experiment with different grid configurations and algorithm settings to gain insights into how various pathfinding algorithms work.

## Future Updates

In future updates, more pathfinding algorithms will be added to the application. Additionally, users will be able to customize the grid size and node colors.

## Contributing

Contributions to this project are welcome! If you find a bug or have an idea for a new feature, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

# workingPFV