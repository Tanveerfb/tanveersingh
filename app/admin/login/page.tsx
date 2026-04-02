"use client";

import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminLoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace("/admin");
    }
  }, [user, loading, router]);

  async function handleGoogle() {
    setError(null);
    setGoogleSubmitting(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      router.replace("/admin");
    } catch {
      setError("Google sign-in failed.");
    } finally {
      setGoogleSubmitting(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/admin");
    } catch {
      setError("Invalid credentials.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return null;

  return (
    <div className="admin-login-page">
      <form className="admin-login-form" onSubmit={handleLogin} noValidate>
        <h1 className="admin-login-title">Admin</h1>

        <div className="admin-field">
          <label htmlFor="admin-email" className="admin-label">
            Email
          </label>
          <input
            id="admin-email"
            type="email"
            className="admin-input"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="admin-field">
          <label htmlFor="admin-password" className="admin-label">
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            className="admin-input"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="admin-error">{error}</p>}

        <button type="submit" className="admin-btn" disabled={submitting}>
          {submitting ? "Signing in..." : "Sign In"}
        </button>

        <div className="admin-divider">
          <span>or</span>
        </div>

        <button
          type="button"
          className="admin-btn admin-btn--google"
          disabled={googleSubmitting}
          onClick={handleGoogle}
        >
          <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden>
            <path
              fill="#4285F4"
              d="M44.5 20H24v8.5h11.7C34.2 33.6 29.6 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 6 1.1 8.2 3l6-6C34.5 5.4 29.5 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.8 0 20-7.8 20-21 0-1.4-.1-2.7-.5-4z"
            />
            <path
              fill="#34A853"
              d="M6.3 14.7l7 5.1C15.2 16.1 19.3 13 24 13c3.1 0 6 1.1 8.2 3l6-6C34.5 5.4 29.5 3 24 3c-7.7 0-14.3 4.4-17.7 11.7z"
            />
            <path
              fill="#FBBC05"
              d="M24 45c5.5 0 10.5-1.9 14.3-5.1l-6.6-5.4C29.7 36.1 27 37 24 37c-5.6 0-10.3-3.4-11.7-8.5l-7 5.4C8.7 40.7 15.8 45 24 45z"
            />
            <path
              fill="#EA4335"
              d="M44.5 20H24v8.5h11.7c-.8 2.3-2.3 4.3-4.3 5.7l6.6 5.4C41.6 36.2 44.5 30.5 44.5 24c0-1.4-.1-2.7-.5-4z"
            />
          </svg>
          {googleSubmitting ? "Signing in..." : "Sign in with Google"}
        </button>
      </form>
    </div>
  );
}
