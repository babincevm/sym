import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    'https://enbebbivitljqwetufrm.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuYmViYml2aXRsanF3ZXR1ZnJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUyMDgwNDUsImV4cCI6MjAyMDc4NDA0NX0.u61hBbPZspqGfwtONw7g_rt9sCb1XOfg3Em4veTQPDM'
);
