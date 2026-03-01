import { useState, useEffect, useCallback } from 'react'
import { adminCall } from '@/lib/adminApi'
import { ThemeToggle } from '@/components/ThemeToggle'

interface Lesson {
  lesson_slug: string
  title: string
  start_survey_enabled: boolean
  feedback_survey_enabled: boolean
}

interface Session {
  id: string
  lesson_slug: string
  name: string
  status: string
  created_at: string
  archived_at: string | null
}

interface SurveyResponse {
  id: string
  created_at: string
  survey_type: string
  payload: Record<string, unknown>
  session_id: string
}

export default function AdminPage() {
  const [passcode, setPasscode] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [lessons, setLessons] = useState<Lesson[]>([])
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const [sessions, setSessions] = useState<Session[]>([])
  const [responses, setResponses] = useState<SurveyResponse[]>([])
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null)
  const [surveyTypeFilter, setSurveyTypeFilter] = useState<'start' | 'feedback' | ''>('')

  const [newSlug, setNewSlug] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newSessionName, setNewSessionName] = useState('')

  const verify = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      await adminCall(passcode, 'verify')
      setAuthenticated(true)
    } catch {
      setError('Nieprawidłowy kod dostępu')
    } finally {
      setLoading(false)
    }
  }, [passcode])

  const loadLessons = useCallback(async () => {
    const data = await adminCall(passcode, 'list_lessons')
    setLessons(data)
  }, [passcode])

  const loadSessions = useCallback(async (slug: string) => {
    const data = await adminCall(passcode, 'list_sessions', { slug })
    setSessions(data)
  }, [passcode])

  const loadResponses = useCallback(async (slug: string, sessionId?: string, surveyType?: string) => {
    const params: Record<string, unknown> = { slug }
    if (sessionId) params.session_id = sessionId
    if (surveyType) params.survey_type = surveyType
    const data = await adminCall(passcode, 'get_responses', params)
    setResponses(data)
  }, [passcode])

  useEffect(() => {
    if (authenticated) loadLessons()
  }, [authenticated, loadLessons])

  useEffect(() => {
    if (selectedSlug) {
      loadSessions(selectedSlug)
      loadResponses(selectedSlug, selectedSessionId || undefined, surveyTypeFilter || undefined)
    }
  }, [selectedSlug, selectedSessionId, surveyTypeFilter, loadSessions, loadResponses])

  const createLesson = async () => {
    if (!newSlug.trim()) return
    await adminCall(passcode, 'create_lesson', { slug: newSlug.trim(), title: newTitle.trim() || newSlug.trim() })
    setNewSlug('')
    setNewTitle('')
    loadLessons()
  }

  const deleteLesson = async (slug: string) => {
    if (!confirm(`Usunąć lekcję "${slug}"?`)) return
    await adminCall(passcode, 'delete_lesson', { slug })
    if (selectedSlug === slug) { setSelectedSlug(null); setSessions([]); setResponses([]) }
    loadLessons()
  }

  const createSession = async () => {
    if (!selectedSlug) return
    await adminCall(passcode, 'create_session', { slug: selectedSlug, name: newSessionName.trim() || undefined })
    setNewSessionName('')
    loadSessions(selectedSlug)
    loadResponses(selectedSlug)
  }

  const archiveSession = async (sessionId: string) => {
    await adminCall(passcode, 'archive_session', { session_id: sessionId })
    if (selectedSlug) loadSessions(selectedSlug)
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-full max-w-sm space-y-6 p-8">
          <h1 className="font-heading text-2xl font-bold text-foreground text-center">Panel admina</h1>
          <input
            type="password"
            placeholder="Kod dostępu"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && verify()}
            className="w-full border border-border bg-background text-foreground rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {error && <p className="text-destructive text-sm text-center">{error}</p>}
          <button
            onClick={verify}
            disabled={loading || !passcode}
            className="w-full py-3 bg-primary text-primary-foreground font-heading font-semibold rounded-lg disabled:opacity-50 hover:opacity-90 transition-all"
          >
            {loading ? 'Sprawdzam...' : 'Wejdź'}
          </button>
        </div>
      </div>
    )
  }

  const activeSession = sessions.find((s) => s.status === 'active')
  const archivedSessions = sessions.filter((s) => s.status === 'archived')

  const feedbackResponses = responses.filter((r) => r.survey_type === 'feedback')
  const startResponses = responses.filter((r) => r.survey_type === 'start')

  const avgRating = feedbackResponses.length
    ? (feedbackResponses.reduce((sum, r) => sum + Number(r.payload.rating || 0), 0) / feedbackResponses.length).toFixed(1)
    : '—'

  // Feedback aggregates
  const countMultiFeedback = (field: string) => {
    const counts: Record<string, number> = {}
    feedbackResponses.forEach((r) => {
      const arr = r.payload[field]
      if (Array.isArray(arr)) arr.forEach((v: string) => { counts[v] = (counts[v] || 0) + 1 })
    })
    return Object.entries(counts).sort((a, b) => b[1] - a[1])
  }

  const countSingleFeedback = (field: string) => {
    const counts: Record<string, number> = {}
    feedbackResponses.forEach((r) => {
      const v = r.payload[field] as string
      if (v) counts[v] = (counts[v] || 0) + 1
    })
    return Object.entries(counts).sort((a, b) => b[1] - a[1])
  }

  const bestWorkedAgg = countMultiFeedback('best_worked')
  const paceAgg = countSingleFeedback('pace')

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="font-heading text-lg font-bold text-foreground">🛠 Panel admina</h1>
          <ThemeToggle />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6 grid md:grid-cols-[280px_1fr] gap-6">
        {/* Sidebar */}
        <div className="space-y-4">
          <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-muted-foreground">Lekcje</h2>
          <div className="space-y-2">
            {lessons.map((l) => (
              <div
                key={l.lesson_slug}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedSlug === l.lesson_slug ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                }`}
                onClick={() => { setSelectedSlug(l.lesson_slug); setSelectedSessionId(null); setSurveyTypeFilter('') }}
              >
                <p className="font-medium text-foreground text-sm">{l.title}</p>
                <p className="text-xs text-muted-foreground font-mono">/{l.lesson_slug}</p>
                <button onClick={(e) => { e.stopPropagation(); deleteLesson(l.lesson_slug) }} className="text-xs text-destructive mt-1 hover:underline">Usuń</button>
              </div>
            ))}
          </div>
          <div className="border border-border rounded-lg p-3 space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Nowa lekcja</p>
            <input placeholder="Slug" value={newSlug} onChange={(e) => setNewSlug(e.target.value.replace(/[^a-z0-9-]/g, ''))} className="w-full border border-border bg-background text-foreground rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <input placeholder="Tytuł" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full border border-border bg-background text-foreground rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <button onClick={createLesson} disabled={!newSlug.trim()} className="w-full py-2 bg-primary text-primary-foreground text-sm font-semibold rounded disabled:opacity-50 hover:opacity-90 transition-all">Dodaj</button>
          </div>
        </div>

        {/* Main */}
        <div className="space-y-6">
          {!selectedSlug ? (
            <p className="text-muted-foreground text-center py-16">Wybierz lekcję z listy po lewej</p>
          ) : (
            <>
              {/* Sessions */}
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-lg font-bold text-foreground">Sesje</h2>
                  <a href={`/lekcja/${selectedSlug}`} target="_blank" rel="noopener" className="text-xs text-primary hover:underline">Otwórz stronę ucznia →</a>
                </div>
                {activeSession && (
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold uppercase text-primary">Aktywna</span>
                        <p className="font-medium text-foreground">{activeSession.name || 'Bez nazwy'}</p>
                        <p className="text-xs text-muted-foreground">{new Date(activeSession.created_at).toLocaleString('pl')}</p>
                      </div>
                      <button onClick={() => archiveSession(activeSession.id)} className="text-xs border border-border px-3 py-1 rounded hover:bg-muted transition-all">Archiwizuj</button>
                    </div>
                  </div>
                )}
                <div className="flex gap-2">
                  <input placeholder="Nazwa nowej sesji (np. 8A 2026-03-04)" value={newSessionName} onChange={(e) => setNewSessionName(e.target.value)} className="flex-1 border border-border bg-background text-foreground rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  <button onClick={createSession} className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded hover:opacity-90 transition-all">Nowa sesja</button>
                </div>
                {archivedSessions.length > 0 && (
                  <details className="text-sm">
                    <summary className="cursor-pointer text-muted-foreground hover:text-foreground">Archiwalne sesje ({archivedSessions.length})</summary>
                    <div className="mt-2 space-y-1">
                      {archivedSessions.map((s) => (
                        <div key={s.id} className={`flex justify-between items-center p-2 rounded cursor-pointer transition-all ${selectedSessionId === s.id ? 'bg-muted' : 'hover:bg-muted/50'}`} onClick={() => setSelectedSessionId(selectedSessionId === s.id ? null : s.id)}>
                          <span className="text-foreground">{s.name || 'Bez nazwy'}</span>
                          <span className="text-xs text-muted-foreground">{s.archived_at ? new Date(s.archived_at).toLocaleDateString('pl') : ''}</span>
                        </div>
                      ))}
                    </div>
                  </details>
                )}
              </div>

              {/* Filter */}
              <div className="flex gap-2">
                {(['', 'start', 'feedback'] as const).map((t) => (
                  <button key={t} onClick={() => setSurveyTypeFilter(t)} className={`px-4 py-2 text-sm rounded-lg border transition-all ${surveyTypeFilter === t ? 'border-primary bg-primary/10 text-foreground' : 'border-border text-muted-foreground hover:text-foreground'}`}>
                    {t === '' ? 'Wszystkie' : t === 'start' ? 'Ankieta startowa' : 'Feedback'}
                  </button>
                ))}
                <span className="flex items-center text-xs text-muted-foreground ml-auto">{responses.length} wyników</span>
              </div>

              {/* Feedback aggregates */}
              {feedbackResponses.length > 0 && (surveyTypeFilter === '' || surveyTypeFilter === 'feedback') && (
                <div className="bg-card border border-border rounded-lg p-6 space-y-6">
                  <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-muted-foreground">Podsumowanie feedback</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-foreground">{avgRating}</p>
                      <p className="text-xs text-muted-foreground">Średnia ocena</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-foreground">{feedbackResponses.length}</p>
                      <p className="text-xs text-muted-foreground">Odpowiedzi</p>
                    </div>
                  </div>

                  {/* best_worked */}
                  {bestWorkedAgg.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-foreground">Co działało najlepiej?</p>
                      {bestWorkedAgg.map(([label, count]) => (
                        <div key={label} className="flex justify-between text-sm">
                          <span className="text-foreground">{label}</span>
                          <span className="text-muted-foreground font-medium">{count}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* pace */}
                  {paceAgg.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-foreground">Tempo</p>
                      {paceAgg.map(([label, count]) => (
                        <div key={label} className="flex justify-between text-sm">
                          <span className="text-foreground">{label}</span>
                          <span className="text-muted-foreground font-medium">{count}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Responses list */}
              <div className="space-y-3">
                {responses.map((r) => (
                  <div key={r.id} className="bg-card border border-border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${r.survey_type === 'start' ? 'bg-primary/10 text-primary' : 'bg-accent-terracotta/10 text-accent-terracotta'}`}>{r.survey_type}</span>
                      <span className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString('pl')}</span>
                    </div>
                    <div className="grid gap-1 text-sm">
                      {Object.entries(r.payload).map(([key, val]) => (
                        <div key={key} className="flex gap-2">
                          <span className="text-muted-foreground font-mono text-xs min-w-[100px]">{key}:</span>
                          <span className="text-foreground">{Array.isArray(val) ? (val as string[]).join(', ') : String(val)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
