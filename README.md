# 🚀 React Cours - Exercices Progressifs

Ce repository contient une série d'exercices progressifs pour apprendre React.js avec TypeScript et Vite.

## 📋 Vue d'ensemble

| Exercice | Focus | Technologies | Statut |
|----------|-------|-------------|--------|
| **react-exo-1** | Composants de base | React + TypeScript + Hooks | ✅ Complet |
| **react-exo-2** | Routing & Navigation | React Router + Glassmorphism | ✅ Complet |
| **react-exo-3** | Authentification & API | Context API + JWT + Express | ✅ Complet |

---

## 🎯 **REACT-EXO-1** - Fondamentaux React

### 📖 **Objectifs d'apprentissage**
- Créer des composants React fonctionnels
- Utiliser les hooks (`useState`, `useEffect`)
- Gérer l'état local et les props
- Optimiser les performances avec `useDeferredValue`, `useTransition`

### 🧩 **Composants implémentés**

#### **Hello Component**
- **Fichier :** `src/components/hello/Hello.tsx`
- **Fonctionnalité :** Affichage d'un message de bienvenue personnalisé
- **Props :** `text` (string), `name` (string, optionnel)
- **State :** Compteur local avec `useState`

#### **Counter Component**
- **Fichier :** `src/components/counter/Counter.tsx`
- **Fonctionnalité :** Compteur interactif avec boutons
- **Actions :** Incrémenter (+1), Décrémenter (-1), Reset (0)
- **State :** Valeur numérique avec `useState`

#### **Timer Component**
- **Fichier :** `src/components/timer/Timer.tsx`
- **Fonctionnalité :** Timer avancé avec contrôles
- **Features :**
  - ⏱️ Timer en temps réel avec `useEffect`
  - ⚙️ Intervalle configurable (ms)
  - ▶️ Start/Stop avec état persistant
  - 🔄 Reset timer et intervalle
- **Props :** `initialTime` (number), `ticks` (number)
- **CSS :** Design moderne avec transitions

#### **Liste Component**
- **Fichier :** `src/components/liste/Liste.tsx`
- **Fonctionnalité :** Liste performante avec filtres
- **Features :**
  - 📊 Génération de 1000+ items
  - 🔍 Recherche en temps réel
  - 🏷️ Filtrage par catégorie
  - ⚡ Optimisations : `useDeferredValue`, `useTransition`, `useMemo`
- **Data :** Items avec ID, nom, catégorie, description, prix

### 🎨 **Styling**
- CSS modules pour chaque composant
- Design responsive et moderne
- Transitions et animations CSS

---

## 🌐 **REACT-EXO-2** - Routing & Navigation

### 📖 **Objectifs d'apprentissage**
- Implémenter React Router DOM
- Créer des layouts et navigations
- Utiliser les paramètres d'URL (`useSearchParams`, `useParams`)
- Appliquer un design glassmorphism moderne

### 🏗️ **Architecture**

#### **Structure des routes**
```typescript
/ → Home (page d'accueil)
/tasks → TasksLayout (hub des tâches)
/tasks/list → TasksList (liste complète)
/tasks/detail?id=X → TaskDetail (détail d'une tâche)
/404 → NotFound (page d'erreur)
```

#### **Composants de navigation**

##### **AppLayout**
- **Fichier :** `src/components/appLayout/AppLayout.tsx`
- **Fonctionnalité :** Layout principal avec header/footer
- **Features :**
  - 🧭 Navigation glassmorphism avec `NavLink`
  - 🔍 Input de navigation rapide vers tâches (debounced)
  - 📱 Responsive design

##### **AppRoutes**
- **Fichier :** `src/routes/AppRoutes.tsx`
- **Fonctionnalité :** Configuration centralisée des routes
- **Structure :** Routes imbriquées avec layouts

### 📄 **Pages implémentées**

#### **Home Page**
- **Fichier :** `src/pages/Home.tsx`
- **Design :** Carte glassmorphism avec call-to-action
- **Navigation :** Liens vers les tâches

#### **Tasks Pages**
- **TasksLayout :** Hub principal des tâches
- **TasksList :** Affichage complet avec filtres par catégorie
- **TaskDetail :** Vue détaillée avec navigation par URL params

### 🎨 **Design Glassmorphism**
- **Backdrop blur :** `backdrop-filter: blur()`
- **Transparence :** `rgba()` avec opacité
- **Bordures :** Semi-transparentes avec `border`
- **Ombres :** `box-shadow` multicouches
- **Animations :** Transitions fluides

### 📊 **Gestion des données**
- Mock data avec tâches réalistes
- Interface TypeScript pour type safety
- Filtrage et recherche côté client

---

## 🔐 **REACT-EXO-3** - Authentification & API

### 📖 **Objectifs d'apprentissage**
- Implémenter l'authentification JWT
- Créer un système Context API avancé
- Intégrer une API Express.js
- Gérer les states complexes avec `useReducer`
- Protéger des routes avec des guards

### 🏛️ **Architecture d'authentification**

#### **AuthContext (React Context API)**
- **Fichier :** `src/context/AuthContext.tsx`
- **Pattern :** Context + Reducer pour state management
- **Features :**
  - 🔑 Gestion JWT avec localStorage
  - ⚡ Vérification automatique du token
  - 🔄 Refresh périodique de la validation
  - 🚨 Gestion d'erreurs centralisée

#### **AuthContext Structure**
```typescript
interface AuthState {
  isAuthenticated: boolean
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
}

interface AuthContextType {
  login: (credentials) => Promise<void>
  logout: () => void
  clearError: () => void
  getAuthHeaders: () => Headers
}
```

### 🔒 **Composants d'authentification**

#### **Login Page**
- **Fichier :** `src/pages/Login.tsx`
- **Features :**
  - 📝 Formulaire avec validation
  - 🔄 Loading states
  - ↩️ Redirection automatique après login
  - 💾 Persistance de la destination

#### **ProtectedRoute**
- **Fichier :** `src/components/auth/ProtectedRoute.tsx`
- **Fonctionnalité :** Guard pour routes protégées
- **Behavior :** Redirection vers `/login` si non connecté

#### **AuthStatus**
- **Fichier :** `src/components/auth/AuthStatus.tsx`
- **Fonctionnalité :** Indicateur de statut dans le header
- **Display :** Email utilisateur + bouton logout/login

### 🛠️ **Services & API**

#### **Task Service**
- **Fichier :** `src/services/taskService.ts`
- **Fonctionnalité :** Layer d'abstraction pour l'API
- **Features :**
  - 🔗 Intégration avec AuthContext
  - 📡 Appels HTTP avec Axios
  - 🗂️ CRUD complet sur les tâches

#### **Express API Backend**
- **Dossier :** `exo-4_support/express-api/`
- **Endpoints :**
  - `POST /login` → Authentification JWT
  - `GET /tasks` → Liste des tâches (public)
  - `GET /tasks/:id` → Détail tâche (public)
  - `POST /tasks` → Créer tâche (auth required)
  - `PATCH /tasks/:id` → Modifier tâche (auth required)
  - `DELETE /tasks/:id` → Supprimer tâche (auth required)

### 🎯 **Fonctionnalités CRUD**

#### **CreateTask Modal**
- **Fichier :** `src/components/tasks/CreateTask.tsx`
- **Features :** Formulaire avec validation et feedback

#### **EditTask Modal**
- **Fichier :** `src/components/tasks/EditTaskModal.tsx`
- **Features :** Modification en temps réel

#### **DeleteTask Modal**
- **Fichier :** `src/components/tasks/DeleteTaskModal.tsx`
- **Features :** Confirmation avec glassmorphism

### 🔍 **Debug & Development**

#### **AuthDebug Component**
- **Fichier :** `src/components/debug/AuthDebug.tsx`
- **Fonctionnalité :** Panel de debug pour le Context
- **Affichage :**
  - 📊 Status d'authentification
  - 👤 Données utilisateur
  - 🔑 Token JWT (tronqué)
  - 📋 Headers d'authentification
  - 🔓 Payload JWT décodé

### ⚡ **Optimisations & Performance**
- **Debouncing :** Navigation rapide vers tâches
- **Memoization :** Callbacks optimisés
- **Lazy Loading :** Composants chargés à la demande
- **Error Boundaries :** Gestion d'erreurs robuste

---

## 🚀 **Installation & Lancement**

### 📋 **Prérequis**
- Node.js 18+ 
- npm ou yarn
- Git

### 🔧 **Setup global**
```bash
# Cloner le repository
git clone https://github.com/EkinOox/react-exo.git
cd react-exo
```

### 🎯 **Exercice 1 - Composants de base**
```bash
cd react-exo-1
npm install
npm run dev
# → http://localhost:5173
```

### 🌐 **Exercice 2 - Routing**
```bash
cd react-exo-2
npm install
npm run dev
# → http://localhost:5174
```

### 🔐 **Exercice 3 - Authentification**
```bash
# 1. Lancer l'API Express
cd exo-4_support/express-api
npm install
npm start
# → http://localhost:3001

# 2. Lancer l'app React (nouveau terminal)
cd react-exo-3
npm install
npm run dev
# → http://localhost:5175
```

### 🔑 **Identifiants de test**
```
Email: student@example.com
Mot de passe: password
```

---

## 🛠️ **Technologies utilisées**

### 🎨 **Frontend**
- **React 18** - Library UI
- **TypeScript** - Type safety
- **Vite** - Build tool moderne
- **React Router DOM** - Navigation SPA
- **Axios** - HTTP client
- **CSS3** - Glassmorphism & animations

### 🔙 **Backend**
- **Express.js** - API REST
- **JWT** - Authentification
- **CORS** - Cross-origin requests
- **Node.js** - Runtime JavaScript

### 🧰 **Development Tools**
- **ESLint** - Linting
- **TypeScript Compiler** - Type checking
- **Vite HMR** - Hot Module Replacement

---

## 📚 **Concepts avancés couverts**

### ⚛️ **React Patterns**
- **Hooks personnalisés** (`useAuth`)
- **Context API** pour state global
- **Reducer Pattern** pour states complexes
- **Compound Components** (modals)
- **Render Props** et **Children patterns**

### 🔄 **State Management**
- **Local State** avec `useState`
- **Global State** avec Context
- **Derived State** avec `useMemo`
- **Async State** avec custom hooks

### 🎭 **Performance Optimizations**
- **React.memo** pour éviter re-renders
- **useCallback** pour callbacks stables
- **useDeferredValue** pour UX responsive
- **useTransition** pour updates non-bloquantes

### 🔐 **Security Best Practices**
- **JWT** avec expiration
- **Token refresh** automatique
- **Protected routes** avec guards
- **Headers Authorization** sécurisés

---

## 🎓 **Progression pédagogique**

### 🥉 **Niveau débutant (exo-1)**
- Syntaxe JSX
- Props et state
- Event handling
- Conditional rendering

### 🥈 **Niveau intermédiaire (exo-2)**
- Client-side routing
- URL parameters
- Layout patterns
- CSS moderne

### 🥇 **Niveau avancé (exo-3)**
- Authentication flows
- API integration
- Context management
- CRUD operations

---

## 🔮 **Prochaines étapes**

### 🚧 **Améliorations potentielles**
- [ ] Tests unitaires avec Vitest
- [ ] Tests E2E avec Playwright
- [ ] PWA avec service workers
- [ ] State management avec Zustand/Redux
- [ ] Server-Side Rendering avec Next.js
- [ ] Database integration (PostgreSQL)
- [ ] Real-time features (WebSockets)

---

## 👨‍💻 **Commande d'installation template**

Pour créer un nouveau projet React avec Vite :

```bash
npm create vite@latest react-spa --template react-ts
```

> **Note :** "react-spa" étant le nom du projet. Choisissez TypeScript pour une meilleure expérience de développement.

---

**🎯 Objectif :** Maîtriser React.js de A à Z avec une approche progressive et des projets concrets !

