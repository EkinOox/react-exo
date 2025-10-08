"use client";

export default function RefreshButton() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <button 
      onClick={handleRefresh}
      className="liquid-glass px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-medium opacity-80 hover:opacity-100"
    >
      🎲 Nouveau numéro
    </button>
  );
}