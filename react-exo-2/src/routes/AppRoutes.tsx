import { Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from '../components/appLayout/AppLayout'
import { Home } from '../pages/Home'
import { TasksLayout } from '../pages/tasks'
import { NotFound } from '../pages/NotFound'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}> {/* layout global */}
        <Route index element={<Home />} />
        <Route path="tasks" element={<TasksLayout />} />
        <Route path="" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}