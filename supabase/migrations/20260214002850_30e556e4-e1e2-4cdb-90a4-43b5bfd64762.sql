
-- Drop the overly permissive INSERT policy
DROP POLICY "Anyone can sign up to waitlist" ON public.waitlist;

-- Create a more restrictive INSERT policy that validates email is provided
CREATE POLICY "Anyone can sign up to waitlist with valid email"
ON public.waitlist
FOR INSERT
TO anon, authenticated
WITH CHECK (
  email IS NOT NULL AND length(trim(email)) > 5 AND email LIKE '%_@_%.__%'
);
