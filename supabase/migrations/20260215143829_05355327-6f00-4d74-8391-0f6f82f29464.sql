-- Add name length constraint
ALTER TABLE public.waitlist 
ADD CONSTRAINT waitlist_name_max_length CHECK (name IS NULL OR length(trim(name)) <= 100);

-- Add case-insensitive unique constraint on email
CREATE UNIQUE INDEX waitlist_email_unique ON public.waitlist (lower(trim(email)));