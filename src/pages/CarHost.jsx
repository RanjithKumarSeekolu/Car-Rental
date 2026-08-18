import React from "react";
import { Link, Navigate } from "react-router-dom";
import HostCarForm from "../features/cars/components/HostCarForm";
import useAuthStore from "../store/useAuthStore";
import AuthContainer from "../features/auth/components/AuthContainer";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import { isKycVerified } from "../utils/kyc";

const STEPS = ["Car details", "Location & price", "Photos"];

const CarHost = () => {
  const { user, profile } = useAuthStore();

  if (profile?.role === "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="pt-28 pb-16 min-h-screen bg-[var(--bg)]">
      <Container className="max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--ink)]">List your car</h1>
          <p className="text-[var(--muted)] mt-1">
            Add details, set a daily rate, then upload photos. You control availability and price.
          </p>
          <ol className="mt-4 flex flex-wrap gap-2">
            {STEPS.map((label, i) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 text-sm text-[var(--muted)]"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent-soft)] text-xs font-semibold text-[var(--accent)]">
                  {i + 1}
                </span>
                {label}
              </li>
            ))}
          </ol>
        </div>

        {user && profile && !isKycVerified(profile) ? (
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius)] p-8 text-center">
            <h2 className="text-xl font-bold text-[var(--ink)] mb-2">Verify your driving licence</h2>
            <p className="text-[var(--muted)] mb-6">
              New hosts submit a licence photo from Profile. An admin approves it before you can list.
            </p>
            <Link to="/dashboard?tab=profile">
              <Button variant="accent">Go to profile</Button>
            </Link>
          </div>
        ) : user ? (
          <HostCarForm />
        ) : (
          <AuthContainer intent="host" />
        )}
      </Container>
    </div>
  );
};

export default CarHost;
