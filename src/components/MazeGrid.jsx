import { useState } from 'react';

function MazeGrid() {
  let initialMaze = [
    ['wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
    ['start', 'path', 'path', 'path', 'path', 'wall'],
    ['wall', 'wall', 'wall', 'wall', 'path', 'wall'],
    ['wall', 'end', 'path', 'path', 'path', 'wall'],
    ['wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
  ];
  const [width, setWidth] = useState(initialMaze[0].length);
  const [height, setHeight] = useState(initialMaze.length);

  const [maze, setMaze] = useState(initialMaze);

  function bfs(startNode) {
    // BFS algorithm to find the shortest path from startNode to 'end'
    let queue = [startNode];
    let visited = new Set(`${startNode[0]},${startNode[1]}`);

    function visitCell([x, y]) {
      console.log(x, y);
      if (maze[y][x] === 'end') {
        console.log('Path found');
        return true;
      }
      return false;
    }

    function step() {
      if (queue.length === 0) {
        console.log('No path found');
        return;
      }
      const [x, y] = queue.shift();
      console.log('new step');
      const dirs = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ];

      for (const [dx, dy] of dirs) {
        const nx = x + dx;
        const ny = y + dy;
        if (
          nx >= 0 &&
          nx < width &&
          ny >= 0 &&
          ny < height &&
          !visited.has(`${nx},${ny}`)
        ) {
          visited.add(`${nx},${ny}`);
          if (maze[ny][nx] === 'path' || maze[ny][nx] === 'end') {
            if (visitCell([nx, ny])) {
              return true;
            }
            queue.push([nx, ny]);
          }
        }
      }
      step();
    }

    step();

    // return true/false if path found
  }

  function dfs(startNode) {
    // DFS algorithm to find a path from startNode to 'end'
    let stack = [startNode];
    let visited = new Set(`${startNode[0]},${startNode[1]}`);

    function visitCell([x, y]) {
      console.log(x, y);
      if (maze[y][x] === 'end') {
        console.log('Path found');
        return true;
      }
      return false;
    }

    function step() {
      if (stack.length === 0) {
        console.log('No path found');
        return;
      }
      const [x, y] = stack.pop();
      console.log('new step');
      const dirs = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ];

      for (const [dx, dy] of dirs) {
        const nx = x + dx;
        const ny = y + dy;
        if (
          nx >= 0 &&
          nx < width &&
          ny >= 0 &&
          ny < height &&
          !visited.has(`${nx},${ny}`)
        ) {
          visited.add(`${nx},${ny}`);
          if (maze[ny][nx] === 'path' || maze[ny][nx] === 'end') {
            if (visitCell([nx, ny])) {
              return true;
            }
            stack.push([nx, ny]);
          }
        }
      }
      step();
    }

    step();
    return false;
    // return true/false if path found
  }

  function generateMaze(height, width) {
    let matrix = [];

    for (let i = 0; i < height; i++) {
      let row = [];
      for (let j = 0; j < width; j++) {
        // Math.random() < 0.5 ? row.push('wall') : row.push('path');
        row.push('wall');
      }
      matrix.push(row);
    }

    const dirs = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    function isCellValid(x, y) {
      return (
        y >= 0 && x >= 0 && x < width && y < height && matrix[y][x] === 'wall'
      );
    }

    function carvePath(x, y) {
      matrix[y][x] = 'path';

      const directions = dirs.sort(() => Math.random() - 0.5);

      for (let [dx, dy] of directions) {
        const nx = x + dx * 2;
        const ny = y + dy * 2;

        if (isCellValid(nx, ny)) {
          matrix[y + dy][x + dx] = 'path';
          carvePath(nx, ny);
        }
      }
    }

    carvePath(1, 1);

    matrix[1][0] = 'start';
    const endX = (width - 1) % 2 === 0 ? width - 2 : width - 1;
    const endY = (height - 2) % 2 === 0 ? height - 3 : height - 2;
    matrix[endY][endX] = 'end';
    setHeight(matrix.length);
    setWidth(matrix[0].length);
    setMaze(matrix);
    // return matrix;
  }

  return (
    <div className="maze-grid">
      <div className="controls">
        {/** Button */}
        <button className="maze-btn" onClick={() => generateMaze(20, 20)}>
          Refresh Maze
        </button>
        <button className="maze-btn" onClick={() => bfs([1, 0])}>
          BFS
        </button>
        <button className="maze-btn" onClick={() => dfs([1, 0])}>
          DFS
        </button>
      </div>
      <div className="maze">
        {maze.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className={`cell ${cell}`}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MazeGrid;
