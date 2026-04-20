import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uwffpthxiostuqlnuqh.supabase.co";
const supabaseAnonKey = "sb_publishable_lMdg1M...PUT FULL KEY HERE...";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
