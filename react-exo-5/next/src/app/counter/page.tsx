import Link from "next/link";
import RefreshButton from "../components/RefreshButton";

// Fonction pour générer un chiffre aléatoire
function getRandomNumber(): number {
  return Math.floor(Math.random() * 10000) + 1; // Chiffre entre 1 et 10000
}

export default function Page() {
  const randomNumber = getRandomNumber();
  
  return (
    <div className="font-sans min-h-screen liquid-wave">
      {/* Arrière-plan avec gradient liquide */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 -z-10"></div>
      
      <div className="min-h-screen p-8 sm:p-20 flex flex-col items-center justify-center">
        
        {/* Header avec navigation */}
        <div className="liquid-glass p-6 rounded-2xl mb-8 w-full max-w-2xl">
          <nav className="flex justify-between items-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              🎲 Counter Generator
            </h1>
            <Link 
              href="/"
              className="liquid-glass px-4 py-2 rounded-lg hover:scale-105 transition-all duration-300 text-sm font-medium"
            >
              ← Accueil
            </Link>
          </nav>
        </div>

        {/* Contenu principal */}
        <div className="liquid-glass p-8 w-full max-w-2xl text-center mb-8">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
              <span className="text-white text-4xl">🎯</span>
            </div>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
              Générateur de Compteur Aléatoire
            </h2>
            <p className="text-lg opacity-80 mb-8">
              Créez un compteur avec une valeur de départ aléatoire !
            </p>
          </div>

          {/* Numéro généré */}
          <div className="liquid-glass p-6 rounded-xl mb-8">
            <h3 className="text-lg font-semibold mb-4 opacity-80">Numéro généré :</h3>
            <div className="text-6xl font-bold bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">
              {randomNumber}
            </div>
            <p className="text-sm opacity-60">Rechargez la page pour un nouveau numéro</p>
          </div>

          {/* Bouton d'action principal */}
          <Link 
            href={`/counter/${randomNumber}`}
            className="liquid-glass px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300 font-semibold text-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl inline-block mb-6"
          >
            <span className="flex items-center gap-2">
              <span>🚀</span>
              <span>Lancer le Counter {randomNumber}</span>
            </span>
          </Link>

          {/* Bouton de rechargement */}
          <div className="mt-4">
            <RefreshButton />
          </div>
        </div>

        {/* Navigation supplémentaire */}
        <div className="flex gap-4">
          <Link 
            href="/about"
            className="liquid-glass px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-medium"
          >
            ℹ️ À propos
          </Link>
        </div>
      </div>
    </div>
  );
}