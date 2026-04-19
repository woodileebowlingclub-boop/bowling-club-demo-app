import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "sb_publishable_lMdglMvqdszjOrfQ6cNj_Q_Q640LLpO";
const supabaseAnonKey = "uwffpthxiostuqlnuqhl";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
