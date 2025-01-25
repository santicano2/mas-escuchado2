"use client";

import { useState } from "react";
import { GameMode } from "@/lib/types";

import GameOverScreen from "./GameOver";
import GamePlay from "./GamePlay";
import GameModeSelector from "./MainMenu";

// Componente Principal
const SpotifyGame: React.FC = () => {
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [finalScore, setFinalScore] = useState<number>(0);

  const handleGameOver = (score: number) => {
    setFinalScore(score);
    setGameOver(true);
  };

  const restartGame = () => {
    setGameMode(null);
    setGameOver(false);
    setFinalScore(0);
  };

  if (gameOver) {
    return <GameOverScreen score={finalScore} onRestart={restartGame} />;
  }

  return gameMode ? (
    <GamePlay mode={gameMode} onGameOver={handleGameOver} />
  ) : (
    <GameModeSelector onSelectMode={setGameMode} />
  );
};

export default SpotifyGame;
