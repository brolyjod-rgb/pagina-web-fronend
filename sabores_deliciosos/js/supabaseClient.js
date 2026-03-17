// js/supabaseClient.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://ntfthzhhpnstdhjsuavv.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50ZnRoemhocG5zdGRoanN1YXZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2OTIxMjEsImV4cCI6MjA4OTI2ODEyMX0.P52NLGWOnsu2T2fAjeGDT1Ii1arzJDv1C2I5KnkNEGg";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
