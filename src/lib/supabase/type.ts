// types/profile.ts
export type UserProfile = {
  id: string
  full_name: string
  avatar_url?: string
  bio?: string
  job_title?: string
  is_freelancer?: boolean
  created_at?: string
}