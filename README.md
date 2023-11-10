#Pathfinding Visualizer
Pathfinding Visualizer is a web application that visualizes the process of finding the shortest path between a start node and an end node on a grid. The grid is made up of rows and columns, and each cell on the grid represents a node. Each node can be of different types, indicated by different colors on the UI. For example, isWall: true makes the node black.

Currently, the only available algorithm for finding the shortest path is Depth-First Search (DFS). Other algorithms, such as Breadth-First Search (BFS), will be added soon.

Installation
To run the application locally, you'll need to have Node.js and npm installed on your machine. Once you've installed Node.js, follow these steps:

Clone this repository to your local machine.
Navigate to the project directory in your terminal.
Run npm install to install the necessary dependencies.
Run npm start to start the application on localhost:3000.
Usage
Once the application is running, you can click and drag on the grid to create walls or move the start and end nodes. Pressing the "Visualize" button will run the DFS algorithm to find the shortest path between the start and end nodes, and the path will be displayed in yellow. Pressing "Clear" will reset the grid to its original state.

Future Updates
In future updates, more pathfinding algorithms will be added to the application. Additionally, users will be able to customize the grid size and node colors.

Contributing
Contributions to this project are welcome! If you find a bug or have an idea for a new feature, please open an issue or submit a pull request.

License
This project is licensed under the MIT License - see the LICENSE.md file for details.
# workingPFV
