// supabaseClient.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// 🔹 Cambia estos datos por los de tu proyecto Supabase
const SUPABASE_URL = 'https://db.ntfthzhhpnstdhjsuavv.supabase.co';  // tu URL real de Supabase
const SUPABASE_ANON_KEY = 'tu-ANON-KEY';                               // tu ANON KEY real

// Crear cliente Supabase
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
