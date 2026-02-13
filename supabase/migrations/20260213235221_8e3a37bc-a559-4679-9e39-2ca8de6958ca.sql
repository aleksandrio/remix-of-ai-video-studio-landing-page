
-- Table for collecting interest/waitlist signups for online materials
CREATE TABLE public.waitlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public signup form)
CREATE POLICY "Anyone can sign up to waitlist"
  ON public.waitlist
  FOR INSERT
  WITH CHECK (true);

-- No public read access (only admin via dashboard)
CREATE POLICY "No public read access"
  ON public.waitlist
  FOR SELECT
  USING (false);
