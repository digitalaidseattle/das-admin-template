import { AuthError, OAuthResponse, User, UserResponse } from '@supabase/supabase-js'
import { assert, describe, it, vi } from 'vitest'
import { authService } from './authService'
import { supabaseClient } from './supabaseClient'

describe('authservice tests', () => {

    it('getUser', () => {
        const getUserSpy = vi.spyOn(supabaseClient.auth, 'getUser')
        authService.getUser()
        assert.equal(getUserSpy.mock.calls.length, 1)
    })

    it('signOut', () => {
        const signOutSpy = vi.spyOn(supabaseClient.auth, 'signOut')
        authService.signOut()
        assert.equal(signOutSpy.mock.calls.length, 1)
    })

    it('hasUser - pass', () => {
        const data = { user: {} as User }
        const getUserSpy = vi.spyOn(supabaseClient.auth, 'getUser')
            .mockReturnValue(Promise.resolve({ data: data, error: null } as unknown as UserResponse));
        authService.hasUser()
            .then(hasUser => {
                assert.equal(getUserSpy.mock.calls.length, 1)
                assert.isTrue(hasUser)
            })
    })

    it('hasUser - fail', () => {
        const data = { user: null }
        const getUserSpy = vi.spyOn(supabaseClient.auth, 'getUser')
            .mockReturnValue(Promise.resolve({ data: data, error: {} as AuthError } as unknown as UserResponse));
        authService.hasUser()
            .then(hasUser => {
                assert.equal(getUserSpy.mock.calls.length, 1)
                assert.isFalse(hasUser)
            })
    })

    it('signInWithGoogle - pass', () => {
        const signInSpy = vi.spyOn(supabaseClient.auth, 'signInWithOAuth')
            .mockReturnValue(Promise.resolve({} as unknown as OAuthResponse));
        authService.signInWithGoogle()
            .then(_resp => {
                assert.equal(signInSpy.mock.calls.length, 1)
                assert.equal(signInSpy.mock.calls[0][0].provider, 'google')
            })
    })

})
