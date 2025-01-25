"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { GameMode } from "@/lib/types";

interface Track {
  name: string;
  artist: string;
  streams: number;
  image: string;
}

// Componente de Juego Principal
const GamePlay: React.FC<{
  mode: GameMode;
  onGameOver: (score: number) => void;
}> = ({ mode, onGameOver }) => {
  const [score, setScore] = useState<number>(0);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTracks, setCurrentTracks] = useState<Track[]>([]);

  useEffect(() => {
    // TODO: Implementar lógica de fetch de canciones según el modo
    const mockTracks: Track[] = [
      {
        name: "Canción 1",
        artist: "Artista 1",
        streams: 1000000,
        image: "/placeholder-1.jpg",
      },
      {
        name: "Canción 2",
        artist: "Artista 2",
        streams: 500000,
        image: "/placeholder-2.jpg",
      },
    ];
    setTracks(mockTracks);
    setCurrentTracks(mockTracks.slice(0, 2));
  }, [mode]);

  const checkAnswer = (guess: "higher" | "lower") => {
    const [first, second] = currentTracks;
    const isCorrect =
      guess === "higher"
        ? second.streams > first.streams
        : second.streams < first.streams;

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
      // TODO: Cargar siguiente track
    } else {
      onGameOver(score);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-center items-center">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Puntuación: {score}</h2>
      </div>
      <div className="flex space-x-12 items-center">
        {currentTracks.map((track, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <img
              src={track.image}
              alt={track.name}
              className="w-64 h-64 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl">{track.name}</h3>
            <p className="text-gray-400">{track.artist}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-12 space-x-4">
        <button
          onClick={() => checkAnswer("higher")}
          className="bg-green-600 text-white px-8 py-4 rounded-lg text-xl hover:bg-green-700"
        >
          Más Reproducciones ↑
        </button>
        <button
          onClick={() => checkAnswer("lower")}
          className="bg-red-600 text-white px-8 py-4 rounded-lg text-xl hover:bg-red-700"
        >
          Menos Reproducciones ↓
        </button>
      </div>
    </div>
  );
};

export default GamePlay;
