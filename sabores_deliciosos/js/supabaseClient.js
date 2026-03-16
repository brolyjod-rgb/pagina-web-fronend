// supabaseClient.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// 🔹 Cambia estos datos por los de tu proyecto Supabase
const SUPABASE_URL = 'https://tu-proyecto.supabase.co';  // reemplaza con tu URL de Supabase
const SUPABASE_ANON_KEY = 'tu-ANON-KEY';                // reemplaza con tu ANON KEY

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
