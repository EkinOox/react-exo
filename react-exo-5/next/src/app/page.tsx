import Image from "next/image";
import Link from 'next/link';
import ProductList from "./components/products"; 

export default function Home() {
  return (
    <div className="font-sans min-h-screen liquid-wave">
      {/* Arrière-plan avec gradient liquide */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 -z-10"></div>
      
      <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen gap-16 p-8 sm:p-20">
        
        {/* Header avec logo */}
        <header className="row-start-1 w-full flex justify-center pt-8">
          <div className="liquid-glass p-6 rounded-2xl">
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={180}
              height={38}
              priority
            />
          </div>
        </header>

        {/* Contenu principal */}
        <main className="row-start-2 flex flex-col gap-8 items-center max-w-4xl w-full">
          
          {/* Section d'introduction */}
          <div className="liquid-glass p-8 w-full max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bienvenue sur Next.js 15
            </h1>
            
            <ol className="font-mono list-inside list-decimal text-sm space-y-3 text-center sm:text-left">
              <li className="tracking-tight">
                Commencez par éditer{" "}
                <code className="liquid-glass px-3 py-1 rounded-lg text-xs font-semibold inline-block">
                  src/app/page.tsx
                </code>
              </li>
              <li className="tracking-tight">
                Sauvegardez et voyez vos changements instantanément !
              </li>
            </ol>
          </div>

          {/* Boutons d'action */}
          <div className="flex gap-4 items-center flex-col sm:flex-row w-full max-w-md">
            <a
              className="liquid-glass rounded-full transition-all duration-300 flex items-center justify-center gap-3 font-medium text-sm sm:text-base h-14 px-8 hover:scale-105 hover:shadow-xl w-full sm:w-auto"
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="dark:invert"
                src="/vercel.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
              />
              Deploy now
            </a>
            
            <a
              className="liquid-glass rounded-full transition-all duration-300 flex items-center justify-center font-medium text-sm sm:text-base h-14 px-8 hover:scale-105 hover:shadow-xl w-full sm:w-auto"
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read our docs
            </a>
          </div>

          {/* Section About avec effet liquid glass */}
          <div className="liquid-glass p-8 w-full max-w-2xl">
            <h2 className="text-2xl font-semibold mb-4 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              <Link href="/about">À propos de notre équipe</Link>
            </h2>
          </div>

          {/* Cartes de fonctionnalités */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
            <div className="liquid-glass p-6 text-center rounded-xl">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-white text-xl">⚡</span>
              </div>
              <h3 className="font-semibold mb-2">Performance</h3>
              <p className="text-sm opacity-80">Optimisé avec Turbopack pour une vitesse maximale</p>
            </div>
            
            <div className="liquid-glass p-6 text-center rounded-xl">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white text-xl">🎨</span>
              </div>
              <h3 className="font-semibold mb-2">Design</h3>
              <p className="text-sm opacity-80">Interface moderne avec effet liquid glass</p>
            </div>
            
            <div className="liquid-glass p-6 text-center rounded-xl">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center">
                <span className="text-white text-xl">🚀</span>
              </div>
              <h3 className="font-semibold mb-2">Production</h3>
              <p className="text-sm opacity-80">Prêt pour le déploiement en un clic</p>
            </div>
          </div>
          <ProductList />
        </main>

        {/* Footer */}
        <footer className="row-start-3 w-full pb-8">
          <div className="flex gap-6 flex-wrap items-center justify-center">
            <a
              className="liquid-glass flex items-center gap-3 px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-lg"
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/file.svg"
                alt="File icon"
                width={18}
                height={18}
              />
              <span className="font-medium">Learn</span>
            </a>
            
            <a
              className="liquid-glass flex items-center gap-3 px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-lg"
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/window.svg"
                alt="Window icon"
                width={18}
                height={18}
              />
              <span className="font-medium">Examples</span>
            </a>
            
            <a
              className="liquid-glass flex items-center gap-3 px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-lg"
              href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/globe.svg"
                alt="Globe icon"
                width={18}
                height={18}
              />
              <span className="font-medium">Next.js →</span>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}