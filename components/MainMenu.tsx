import { GameMode } from "@/lib/types";

interface GameModeOption {
  label: string;
  value: GameMode;
  icon: string;
}

// Componente de Menú Principal
const GameModeSelector: React.FC<{
  onSelectMode: (mode: GameMode) => void;
}> = ({ onSelectMode }) => {
  const gameModes: GameModeOption[] = [
    { label: "Canciones Actuales", value: "current", icon: "🔥" },
    { label: "2020s", value: "2020", icon: "🌟" },
    { label: "2010s", value: "2010", icon: "🎉" },
    { label: "2000s", value: "2000", icon: "📀" },
    { label: "1990s", value: "1990", icon: "📼" },
    { label: "1980s", value: "1980", icon: "🎸" },
    { label: "Modo Aleatorio", value: "random", icon: "🎲" },
  ];

  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-8 text-green-500">
        Spotify Higher or Lower
      </h1>
      <div className="grid grid-cols-3 gap-4 w-full max-w-4xl px-4">
        {gameModes.map((mode) => (
          <button
            key={mode.value}
            onClick={() => onSelectMode(mode.value)}
            className="bg-gray-800 text-white p-6 rounded-lg hover:bg-green-600 
            transition-colors duration-300 flex flex-col items-center space-y-2"
          >
            <span className="text-4xl">{mode.icon}</span>
            <span className="text-lg font-semibold">{mode.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameModeSelector;
