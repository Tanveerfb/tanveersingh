"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { FaNewspaper } from "react-icons/fa6";

export default function AdminDashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/admin/login");
    }
  }, [user, loading, router]);

  async function handleSignOut() {
    await signOut(auth);
    router.replace("/admin/login");
  }

  if (loading || !user) return null;

  return (
    <div className="admin-dashboard">
      <header className="admin-dash-header">
        <h1 className="admin-dash-title">Dashboard</h1>
        <div className="admin-dash-meta">
          <span className="admin-dash-user">{user.email}</span>
          <button
            type="button"
            className="admin-signout-btn"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="admin-dash-grid">
        <div className="admin-dash-card admin-dash-card--soon">
          <span className="admin-dash-card-icon" aria-hidden>
            <FaNewspaper />
          </span>
          <div>
            <h2 className="admin-dash-card-title">Posts</h2>
            <p className="admin-dash-card-desc">
              Manage blog posts — coming soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
