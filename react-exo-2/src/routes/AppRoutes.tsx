import { Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from '../components/appLayout/AppLayout'
import { Home } from '../pages/Home'
import { TasksLayout } from '../pages/tasks'
import { TasksListPage } from '../pages/TasksList'
import { TaskDetailPage } from '../pages/TaskDetail'
import { NotFound } from '../pages/NotFound'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}> {/* layout global */}
        <Route index element={<Home />} />
        <Route path="tasks" element={<TasksLayout />} />
        
        {/* Routes pour la liste des tâches avec paramètres */}
        <Route path="tasks/list" element={<TasksListPage />} />
        <Route path="tasks/category/:category" element={<TasksListPage />} />
        <Route path="tasks/status/:status" element={<TasksListPage />} />
        <Route path="tasks/category/:category/status/:status" element={<TasksListPage />} />
        
        {/* Route pour les détails d'une tâche avec useSearchParams */}
        <Route path="tasks/detail" element={<TaskDetailPage />} />
        
        {/* Route pour les détails d'une tâche spécifique (ancienne méthode) */}
        <Route path="tasks/:id" element={<TaskDetailPage />} />
        
        <Route path="" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}