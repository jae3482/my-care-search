import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("✅ Supabase URL:", SUPABASE_URL);
console.log("✅ Supabase Anon Key:", SUPABASE_ANON_KEY?.substring(0, 10) + "..."); // 키 앞 10자리만 출력

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("🚨 Supabase 환경변수가 설정되지 않았습니다! .env.local 파일을 확인하세요.");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
