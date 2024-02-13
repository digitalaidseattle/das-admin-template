/**
 *  authService.ts
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { AuthError, OAuthResponse, User, UserResponse } from '@supabase/supabase-js'
import supabaseClient from './supabaseClient'


class AuthService {

  signOut = async (): Promise<{ error: AuthError | null }> => {
    return supabaseClient.auth.signOut()
  }

  hasUser = (): boolean => {
    return this.getUser() != null
  }

  getUser = async (): Promise<User | null> => {
    return supabaseClient.auth.getUser()
      .then((response: UserResponse) => response.data.user)
  }

  signInWithGoogle = async (): Promise<OAuthResponse> => {
    return supabaseClient.auth.signInWithOAuth({ provider: 'google' })
  }
}

const authService = new AuthService()
export { authService }
