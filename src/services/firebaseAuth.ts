import {
  signInAnonymously,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'
import { auth } from './firebaseConfig'

class FirebaseAuthService {
  // Sign in anonymously (no login required for family)
  async signInAnonymously(): Promise<User> {
    try {
      const result = await signInAnonymously(auth)
      return result.user
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      throw new Error(`Failed to sign in: ${errorMsg}`)
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    try {
      await firebaseSignOut(auth)
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      throw new Error(`Failed to sign out: ${errorMsg}`)
    }
  }

  // Listen to auth state changes
  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, callback)
  }

  // Get current user
  getCurrentUser(): User | null {
    return auth.currentUser
  }
}

export default new FirebaseAuthService()
