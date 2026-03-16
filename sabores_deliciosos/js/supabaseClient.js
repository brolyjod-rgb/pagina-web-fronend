// sabores_deliciosos/js/supabaseClient.js

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// URL y Anon Key de tu proyecto Supabase
const SUPABASE_URL = 'https://ntfthzhhpnstdhjsuavv.supabase.co';
const SUPABASE_ANON_KEY = 'TU_ANON_PUBLIC_KEY_AQUI';

// Crear cliente
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);