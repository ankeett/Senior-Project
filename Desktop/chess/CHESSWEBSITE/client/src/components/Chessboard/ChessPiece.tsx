import React from "react";

type ChessPieceProps = {
  row: number;
  col: number;
};

const ChessPiece: React.FC<ChessPieceProps> = ({ row, col }) => {
  // Define chess piece positions
  const piecePositions: Record<string, string> = {
    "0,0": "♜",
    "0,1": "♞",
    "0,2": "♝",
    "0,3": "♛",
    "0,4": "♚",
    "0,5": "♝",
    "0,6": "♞",
    "0,7": "♜",
    "1,0": "♟",
    "1,1": "♟",
    "1,2": "♟",
    "1,3": "♟",
    "1,4": "♟",
    "1,5": "♟",
    "1,6": "♟",
    "1,7": "♟",
    "6,0": "♙",
    "6,1": "♙",
    "6,2": "♙",
    "6,3": "♙",
    "6,4": "♙",
    "6,5": "♙",
    "6,6": "♙",
    "6,7": "♙",
    "7,0": "♖",
    "7,1": "♘",
    "7,2": "♗",
    "7,3": "♕",
    "7,4": "♔",
    "7,5": "♗",
    "7,6": "♘",
    "7,7": "♖",
  };

  const position = `${row},${col}`;
  const piece = piecePositions[position];

  return (
    <div className="w-full h-full flex items-center justify-center text-7xl cursor-pointer">
      {piece}
    </div>
  );};

export default ChessPiece;
