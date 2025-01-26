const GameOverScreen: React.FC<{
  score: number;
  onRestart: () => void;
}> = ({ score, onRestart }) => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-5xl font-bold mb-8">Juego Terminado</h2>
      <p className="text-3xl mb-12">Puntuación: {score}</p>
      <button
        onClick={onRestart}
        className="bg-green-600 text-white px-10 py-4 rounded-lg text-xl hover:bg-green-700"
      >
        Jugar de Nuevo
      </button>
    </div>
  );
};

export default GameOverScreen;
