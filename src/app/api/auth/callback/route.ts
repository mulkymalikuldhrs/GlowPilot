import { NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { createClient } from '@/lib/supabase/client';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.headers.get('cookie') ?? ''
          },
          set(name: string, value: string, options: CookieOptions) {
            // If the cookie is set, update the headers
          },
          remove(name: string, options: CookieOptions) {
            // If the cookie is removed, update the headers
          },
        },
      }
    )
    const { data: { user }, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && user) {
       // Check if profile exists. This is a simplified check.
       // In a real app, you might want to handle this more robustly.
       const client = createClient();
       const { data: profile } = await client.from('profiles').select('id').eq('id', user.id).single();

       if(profile) {
            return NextResponse.redirect(`${origin}/chat`);
       } else {
           // New user, redirect to onboarding
           return NextResponse.redirect(`${origin}/onboarding`);
       }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login?error=auth-code-error`);
}
