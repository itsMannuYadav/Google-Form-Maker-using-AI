"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase/client";

export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isDemo?: boolean;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  googleAccessToken: string | null;
  signInWithGoogle: () => Promise<void>;
  signInAsDemo: () => void;
  signOut: () => Promise<void>;
  setGoogleAccessToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  googleAccessToken: null,
  signInWithGoogle: async () => {},
  signInAsDemo: () => {},
  signOut: async () => {},
  setGoogleAccessToken: () => {},
});

const DEMO_USER_KEY = "ai_google_forms_demo_user";
const GOOGLE_TOKEN_KEY = "ai_google_forms_access_token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [googleAccessToken, setGoogleAccessTokenState] = useState<string | null>(null);

  useEffect(() => {
    // Restore access token from local / session storage
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem(GOOGLE_TOKEN_KEY) || sessionStorage.getItem(GOOGLE_TOKEN_KEY);
      if (savedToken) setGoogleAccessTokenState(savedToken);
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        });
      } else {
        if (typeof window !== "undefined") {
          const demoRaw = localStorage.getItem(DEMO_USER_KEY);
          if (demoRaw) {
            try {
              setUser(JSON.parse(demoRaw));
            } catch {
              setUser(null);
            }
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const setGoogleAccessToken = (token: string | null) => {
    setGoogleAccessTokenState(token);
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem(GOOGLE_TOKEN_KEY, token);
        sessionStorage.setItem(GOOGLE_TOKEN_KEY, token);
      } else {
        localStorage.removeItem(GOOGLE_TOKEN_KEY);
        sessionStorage.removeItem(GOOGLE_TOKEN_KEY);
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken || null;
      if (token) {
        setGoogleAccessToken(token);
      }

      if (typeof window !== "undefined") {
        localStorage.removeItem(DEMO_USER_KEY);
      }
      setUser({
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
      });
    } catch (error: any) {
      console.warn("Google popup sign-in encountered an issue:", error);
      throw error;
    }
  };

  const signInAsDemo = () => {
    const demoUser: AppUser = {
      uid: "admin_officer_demo",
      displayName: "Administrative Officer",
      email: "officer@gov.dept.in",
      photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      isDemo: true,
    };
    setUser(demoUser);
    if (typeof window !== "undefined") {
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (e) {
      console.warn("Sign out:", e);
    }
    setUser(null);
    setGoogleAccessToken(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(DEMO_USER_KEY);
      localStorage.removeItem(GOOGLE_TOKEN_KEY);
      sessionStorage.removeItem(GOOGLE_TOKEN_KEY);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        googleAccessToken,
        signInWithGoogle,
        signInAsDemo,
        signOut,
        setGoogleAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
