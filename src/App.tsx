import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import Index from './pages/Index'
const LessonPage = lazy(() => import('./pages/LessonPage'))
const MetodyNaukiPage = lazy(() => import('./pages/MetodyNaukiPage'))
const AdminPage = lazy(() => import('./pages/AdminPage'))

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/lekcja/2-metody-nauki" element={<MetodyNaukiPage />} />
          <Route path="/lekcja/:slug" element={<LessonPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
