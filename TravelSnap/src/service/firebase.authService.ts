import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "firebase/auth";

export const authService = {
  
  async register(email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password)
    return userCredential?.user;
  },

  async login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(getAuth(), email, password)
    return userCredential?.user;
  },

  async logout() {
    return await signOut(getAuth());
  },

  async currentUser() {
    return getAuth().currentUser;
  },

  async signinWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(getAuth(), provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      return token; // Return only the token
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
      return null;
    }
  },

  async resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(getAuth(), email);
    } catch (error) {
      console.error("Error sending password reset email:", error);
      throw error; 
    }
  }
};