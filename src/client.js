import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dxscxtlcodwrdtqxdpvr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4c2N4dGxjb2R3cmR0cXhkcHZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAxODE2MDMsImV4cCI6MjA0NTc1NzYwM30.QMuhvhEarNGJmdOmxQUvs0VCXfObYst9_2nkDM2lO3I";
export const supabase = createClient(supabaseUrl, supabaseKey);
