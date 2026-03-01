
-- Lesson configs
CREATE TABLE public.lesson_configs (
  lesson_slug text PRIMARY KEY,
  title text NOT NULL DEFAULT '',
  start_survey_enabled boolean NOT NULL DEFAULT true,
  feedback_survey_enabled boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.lesson_configs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read lesson configs" ON public.lesson_configs FOR SELECT USING (true);

-- Survey sessions
CREATE TABLE public.survey_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_slug text NOT NULL REFERENCES public.lesson_configs(lesson_slug) ON DELETE CASCADE,
  name text,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  archived_at timestamptz
);
ALTER TABLE public.survey_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read survey sessions" ON public.survey_sessions FOR SELECT USING (true);

-- Survey responses
CREATE TABLE public.survey_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  lesson_slug text NOT NULL,
  session_id uuid NOT NULL REFERENCES public.survey_sessions(id) ON DELETE CASCADE,
  survey_type text NOT NULL,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb
);
ALTER TABLE public.survey_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit survey response" ON public.survey_responses
  FOR INSERT WITH CHECK (survey_type IN ('start', 'feedback') AND session_id IS NOT NULL AND lesson_slug IS NOT NULL);
CREATE POLICY "Public read start survey responses" ON public.survey_responses
  FOR SELECT USING (survey_type = 'start');

-- Enable realtime for live results
ALTER PUBLICATION supabase_realtime ADD TABLE public.survey_responses;
