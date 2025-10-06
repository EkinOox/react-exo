# Support Express API

Minimal API de support pour les labs (tasks CRUD simplifie).

## Utilisation
- Prerequis: Node 20 (voir .nvmrc a la racine du repo)
- Installation:
  - `cd support/express-api`
  - `npm install`
- Lancer:
  - `npm start` (ecoute sur http://localhost:3001)

## Endpoints
- POST `/login` -> recupere un token `{ token }` pour `student@example.com` / `password`
- GET `/tasks` -> liste des taches (publique)
- GET `/tasks/:id` -> detail (public)
- POST `/tasks` -> creer `{ title: string }` (Bearer token requis)
- PATCH `/tasks/:id` -> mettre a jour partiellement `{ title?, completed?, hidden? }` (Bearer token requis)

CORS est active pour faciliter le developpement en local (Next/Vite).

### Options de filtre (GET /tasks)
- `?status=active|completed|all` (defaut: `active`)
- `?showHidden=true` pour inclure les taches cachees

### Exemples
- Lister actives (defaut): `curl http://localhost:3001/tasks`
- Lister toutes: `curl "http://localhost:3001/tasks?status=all&showHidden=true"`
- Login (token): `curl -X POST -H 'Content-Type: application/json' -d '{"email":"student@example.com","password":"password"}' http://localhost:3001/login`
- Marquer complete: `curl -X PATCH -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <TOKEN>' -d '{"completed": true}' http://localhost:3001/tasks/1`
- Cacher: `curl -X PATCH -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <TOKEN>' -d '{"hidden": true}' http://localhost:3001/tasks/1`
