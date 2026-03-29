ALTER TABLE public.contact_submissions ADD COLUMN status text NOT NULL DEFAULT 'new';

-- Update RLS: allow authenticated users to update status
CREATE POLICY "Authenticated users can update submission status"
ON public.contact_submissions
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);