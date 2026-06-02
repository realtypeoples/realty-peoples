/* Connects the site to Supabase. Publishable key is browser-safe; RLS protects data. */
const SUPABASE_URL = "https://gqrlzjwlylffvvsyqfds.supabase.co";
const SUPABASE_KEY = "sb_publishable_x5W27JH0l9cpEUC80_-JDQ_vB317vei";
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
