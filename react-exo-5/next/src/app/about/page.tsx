

import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="font-sans min-h-screen liquid-wave">
      {/* Arrière-plan avec gradient liquide */}
      <div className="fixed inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-green-900 dark:to-blue-900 -z-10"></div>
      
      <div className="min-h-screen p-8 sm:p-20 flex flex-col items-center justify-center">
        
        {/* Header avec navigation */}
        <div className="liquid-glass p-6 rounded-2xl mb-8 w-full max-w-2xl">
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              About Us
            </h1>
            <Link 
              href="/"
              className="liquid-glass px-4 py-2 rounded-lg hover:scale-105 transition-all duration-300 text-sm font-medium"
            >
              ← Retour
            </Link>
          </nav>
        </div>

        {/* Contenu principal */}
        <div className="liquid-glass p-8 w-full max-w-4xl mb-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
              Bienvenue sur notre page À propos
            </h2>
            <p className="text-xl opacity-80 max-w-2xl mx-auto">
              Découvrez notre vision, notre mission et l&apos;équipe derrière cette magnifique application Next.js avec effet liquid glass.
            </p>
          </div>

          {/* Grille de cartes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            
            {/* Carte Mission */}
            <div className="liquid-glass p-6 rounded-xl text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-white text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Notre Mission
              </h3>
              <p className="opacity-80">
                Créer des expériences web modernes et intuitives avec les dernières technologies React et Next.js.
              </p>
            </div>

            {/* Carte Vision */}
            <div className="liquid-glass p-6 rounded-xl text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white text-2xl">👁️</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Notre Vision
              </h3>
              <p className="opacity-80">
                Repousser les limites du design web avec des interfaces glassmorphism époustouflantes.
              </p>
            </div>

            {/* Carte Équipe */}
            <div className="liquid-glass p-6 rounded-xl text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center">
                <span className="text-white text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
                Notre Équipe
              </h3>
              <p className="opacity-80">
                Des développeurs passionnés par l&apos;innovation et l&apos;excellence technique.
              </p>
            </div>
          </div>
        </div>

        {/* Section Technologies */}
        <div className="liquid-glass p-8 w-full max-w-4xl mb-8">
          <h3 className="text-2xl font-semibold text-center mb-8 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Technologies Utilisées
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="liquid-glass p-4 rounded-lg text-center hover:scale-105 transition-all duration-300">
              <div className="text-2xl mb-2">⚛️</div>
              <div className="font-medium">React 19</div>
            </div>
            
            <div className="liquid-glass p-4 rounded-lg text-center hover:scale-105 transition-all duration-300">
              <div className="text-2xl mb-2">🚀</div>
              <div className="font-medium">Next.js 15</div>
            </div>
            
            <div className="liquid-glass p-4 rounded-lg text-center hover:scale-105 transition-all duration-300">
              <div className="text-2xl mb-2">🎨</div>
              <div className="font-medium">Tailwind CSS</div>
            </div>
            
            <div className="liquid-glass p-4 rounded-lg text-center hover:scale-105 transition-all duration-300">
              <div className="text-2xl mb-2">⚡</div>
              <div className="font-medium">Turbopack</div>
            </div>
          </div>
        </div>

        {/* Contact / Footer */}
        <div className="liquid-glass p-6 rounded-xl text-center w-full max-w-2xl">
          <h4 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Restons en contact
          </h4>
          <p className="opacity-80 mb-4">
            Intéressé par notre travail ? N&apos;hésitez pas à nous contacter !
          </p>
          <div className="flex gap-4 justify-center">
            <button className="liquid-glass px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-medium">
              📧 Contact
            </button>
            <button className="liquid-glass px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-medium">
              💼 Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


