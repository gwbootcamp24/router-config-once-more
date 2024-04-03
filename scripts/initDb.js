import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const supabaseUrl = process.env.POSTGRES_HOST;
const supabaseAnonKey = process.env.SUPABASE_API_SECRET;
console.log(process.env.POSTGRES_HOST);

const supabase = createClient(supabaseUrl, supabaseAnonKey);


  getCountries();

async function getCountries() {
  const { data } = await supabase.from("users").select();
  console.log(data);
}



