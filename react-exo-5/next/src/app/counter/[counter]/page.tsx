import Counter from "@/app/components/counter";
import Link from "next/link";

export default async function counterPage({
  params,
}: {
  params: Promise<{ counter: string }>;
}) {
  const { counter } = await params;
  
  return (
    <div className="font-sans min-h-screen liquid-wave">
      {/* Arrière-plan avec gradient liquide */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 -z-10"></div>
      
      <div className="min-h-screen p-8 sm:p-20 flex flex-col items-center justify-center">
        
        {/* Header avec navigation */}
        <div className="liquid-glass p-6 rounded-2xl mb-8 w-full max-w-2xl">
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Counter #{counter}
            </h1>
            <Link 
              href="/counter"
              className="liquid-glass px-4 py-2 rounded-lg hover:scale-105 transition-all duration-300 text-sm font-medium"
            >
              ← Retour
            </Link>
          </nav>
        </div>

        {/* Composant Counter stylisé */}
        <div className="w-full max-w-lg">
          <Counter initialValue={counter} />
        </div>

        {/* Informations additionnelles */}
        <div className="liquid-glass p-6 rounded-xl mt-8 text-center max-w-md">
          <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Numéro initial
          </h3>
          <div className="text-3xl font-bold opacity-80 mb-2">{counter}</div>
          <p className="text-sm opacity-60">
            Votre compteur a démarré avec cette valeur
          </p>
        </div>

        {/* Navigation supplémentaire */}
        <div className="flex gap-4 mt-8">
          <Link 
            href="/"
            className="liquid-glass px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-medium"
          >
            🏠 Accueil
          </Link>
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
