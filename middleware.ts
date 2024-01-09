import { createMiddlewareClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers';


export async function middleware(request: NextRequest) {
  

  // Create a Supabase client configured to use cookies
  const supabase = createServerComponentClient({cookies});

  // Refresh session if expired - required for Server Components
  const {data} = await supabase.auth.getUser();
  if(data.user==null){
    return NextResponse.redirect(new URL("/?error=Please login first to access this route" , request.url))
  }

  return NextResponse.next()
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: ["/addhome","/dashboard"],
}