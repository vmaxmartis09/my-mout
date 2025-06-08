// lib/api/userService.ts

import { supabase } from "@/lib/supabase/client"
import { UserProfile } from "@/lib/supabase/type"


export async function fetchUserProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching profile:', error.message)
    return null
  }

  return data
}