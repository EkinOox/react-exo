"use client";

import { useState } from "react";

export default function Counter({
  initialValue,
}: {
  initialValue: string;
}) {
  const [counterValue, setCounterValue] = useState(parseInt(initialValue) || 0);

  return (
    <div className="liquid-glass p-8 rounded-2xl text-center max-w-md mx-auto">
      {/* Icône et titre */}
      <div className="mb-6">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
          <span className="text-white text-3xl">❤️</span>
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Compteur de Likes
        </h2>
      </div>

      {/* Affichage du compteur */}
      <div className="mb-8">
        <div className="liquid-glass p-6 rounded-xl mb-4">
          <div className="text-6xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {counterValue}
          </div>
          <p className="text-lg opacity-80">
            {counterValue === 0 ? "Aucun like" : counterValue === 1 ? "like" : "likes"}
          </p>
        </div>
      </div>

      {/* Bouton interactif */}
      <button 
        onClick={() => setCounterValue(counterValue + 1)}
        className="liquid-glass px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300 font-semibold text-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg hover:shadow-xl"
      >
        <span className="flex items-center gap-2">
          <span>👍</span>
          <span>J&apos;aime !</span>
        </span>
      </button>
      
      {/* Reset button */}
      {counterValue > 0 && (
        <button 
          onClick={() => setCounterValue(0)}
          className="liquid-glass px-6 py-2 rounded-lg hover:scale-105 transition-all duration-300 font-medium text-sm mt-4 opacity-60 hover:opacity-100"
        >
          🔄 Reset
        </button>
      )}
    </div>
  );
}
