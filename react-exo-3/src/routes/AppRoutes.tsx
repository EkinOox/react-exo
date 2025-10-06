import { Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from '../components/appLayout/AppLayout'
import { ProtectedRoute } from '../components/auth/ProtectedRoute'
import { Home } from '../pages/Home'
import { LoginPage } from '../pages/Login'
import { TasksLayout } from '../pages/tasks'
import { TasksListPage } from '../pages/TasksList'
import { TaskDetailPage } from '../pages/TaskDetail'
import { NotFound } from '../pages/NotFound'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Route de login publique */}
      <Route path="/login" element={<LoginPage />} />
      
      <Route element={<AppLayout />}> {/* layout global */}
        <Route index element={<Home />} />
        
        {/* Routes protégées pour les tâches */}
        <Route path="tasks" element={
          <ProtectedRoute>
            <TasksLayout />
          </ProtectedRoute>
        } />
        
        <Route path="tasks/list" element={
          <ProtectedRoute>
            <TasksListPage />
          </ProtectedRoute>
        } />
        
        <Route path="tasks/category/:category" element={
          <ProtectedRoute>
            <TasksListPage />
          </ProtectedRoute>
        } />
        
        <Route path="tasks/status/:status" element={
          <ProtectedRoute>
            <TasksListPage />
          </ProtectedRoute>
        } />
        
        <Route path="tasks/category/:category/status/:status" element={
          <ProtectedRoute>
            <TasksListPage />
          </ProtectedRoute>
        } />
        
        {/* Route pour les détails d'une tâche avec useSearchParams */}
        <Route path="tasks/detail" element={
          <ProtectedRoute>
            <TaskDetailPage />
          </ProtectedRoute>
        } />
        
        {/* Route pour les détails d'une tâche spécifique */}
        <Route path="tasks/:id" element={
          <ProtectedRoute>
            <TaskDetailPage />
          </ProtectedRoute>
        } />
        
        <Route path="" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}