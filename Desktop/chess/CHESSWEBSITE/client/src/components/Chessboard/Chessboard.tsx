import React from "react";
import ChessPiece from "./ChessPiece";

const Chessboard: React.FC = () => {
  const renderSquare = (row: number, col: number) => {
    const isEvenSquare = (row + col) % 2 === 0;
    const color = isEvenSquare ? "bg-[#f0d9b5]" : "bg-[#b58863]";

    return (
    <div className={`w-20 h-20 ${color}`}>
        <ChessPiece row={row} col={col}/>
    </div>
    );
  };

  const renderRow = (row: number) => {
    const squares = [];

    for (let col = 0; col < 8; col++) {
      squares.push(renderSquare(row, col));
    }

    return <div className="flex flex-row">{squares}</div>;
  };

  const renderBoard = () => {
    const rows = [];

    for (let row = 0; row < 8; row++) {
      rows.push(renderRow(row));
    }

    return <div className="flex flex-col">{rows}</div>;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex items-center">{renderBoard()}</div>
    </div>
  );
};

export default Chessboard;
