// js/supabaseClient.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// ⚠️ REEMPLAZAR POR TUS VALORES REALES
const SUPABASE_URL = "https://ntfthzhhpnstdhjsuavv.supabase.co";
const SUPABASE_ANON_KEY = "TU_ANON_KEY_AQUI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
