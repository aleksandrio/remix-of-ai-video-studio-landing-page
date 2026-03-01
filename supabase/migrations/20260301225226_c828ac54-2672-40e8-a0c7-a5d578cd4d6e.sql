CREATE POLICY "Auto-create active session" ON public.survey_sessions
  FOR INSERT WITH CHECK (status = 'active' AND lesson_slug IS NOT NULL);