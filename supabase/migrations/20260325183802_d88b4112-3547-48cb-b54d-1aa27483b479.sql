INSERT INTO public.lesson_configs (lesson_slug, title, start_survey_enabled, feedback_survey_enabled)
VALUES ('2-metody-nauki', 'Lekcja 2 – Metody uczenia się i NotebookLM', true, true)
ON CONFLICT (lesson_slug) DO NOTHING;