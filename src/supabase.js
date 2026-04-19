import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "PUT YOUR URL HERE";
const supabaseAnonKey = "PUT YOUR KEY HERE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
