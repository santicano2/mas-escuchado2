"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getSpotifyToken, searchSpotifyTracks } from "@/lib/spotify";
import { GameMode } from "@/lib/types";
import { fetchTracksWithViews } from "@/lib/youtube";

interface Track {
  name: string;
  artist: string;
  views: number;
  image: string;
  youtubeId: string;
}

const GamePlay: React.FC<{
  mode: GameMode;
  onGameOver: (score: number) => void;
}> = ({ mode, onGameOver }) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTracks, setCurrentTracks] = useState<Track[]>([]);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTracks = async () => {
      try {
        setLoading(true);
        const token = await getSpotifyToken();
        const spotifyTracks = await searchSpotifyTracks(mode, token);
        const tracksWithViews = await fetchTracksWithViews(spotifyTracks);

        setTracks(tracksWithViews);

        const initialTracks = tracksWithViews
          .sort(() => 0.5 - Math.random())
          .slice(0, 2);

        setCurrentTracks(initialTracks);
        setLoading(false);
      } catch (error) {
        console.error("Error loading tracks:", error);
        onGameOver(0);
      }
    };

    loadTracks();
  }, [mode]);

  const checkAnswer = (guess: "higher" | "lower") => {
    const [first, second] = currentTracks;
    const isCorrect =
      guess === "higher"
        ? second.views > first.views
        : second.views < first.views;

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);

      // Select next tracks
      const remainingTracks = tracks.filter(
        (track) =>
          track.youtubeId !== first.youtubeId &&
          track.youtubeId !== second.youtubeId
      );

      if (remainingTracks.length < 2) {
        onGameOver(score + 1);
        return;
      }

      const nextTracks = remainingTracks
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);

      setCurrentTracks(nextTracks);
    } else {
      onGameOver(score);
    }
  };

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex justify-center items-center">
        <p className="text-2xl">Cargando...</p>
      </div>
    );
  }

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
            <p className="text-sm text-gray-500">
              {track.views.toLocaleString()} views
            </p>
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
