import { useState } from 'react';

function MazeGrid() {
  let initialMaze = [
    ['wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
    ['start', 'path', 'path', 'path', 'path', 'wall'],
    ['wall', 'wall', 'wall', 'wall', 'path', 'wall'],
    ['wall', 'end', 'path', 'path', 'path', 'wall'],
    ['wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
  ];

  const [maze, setMaze] = useState(initialMaze);

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

    setMaze(matrix);
    // return matrix;
  }

  return (
    <div className="maze-grid">
      {/** Button */}
      <button className="maze-btn" onClick={() => generateMaze(20, 20)}>
        Refresh Maze
      </button>
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
