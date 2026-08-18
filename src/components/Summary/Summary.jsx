import React from "react";
import { Link } from "react-router-dom";

const Summary = () => {
  return (
    <section className="py-16 md:py-20 px-5 md:px-8">
      <div className="max-w-7xl mx-auto rounded-[1.5rem] bg-[var(--navy)] text-[var(--on-navy)] px-8 py-12 md:px-16 md:py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8 overflow-hidden relative">
        <div
          aria-hidden
          className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[var(--accent)] opacity-25 blur-2xl"
        />
        <div className="relative z-10 max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-3">
            Become a host
          </p>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight text-[var(--on-navy)]">
            Own a car? Put it to work.
          </h2>
          <p className="mt-3 text-[var(--on-navy)]/75 text-lg">
            Set a daily rate. Approve who drives. Get paid for the days it&apos;s out.
          </p>
        </div>
        <Link
          to="/carHost"
          className="btn-accent relative z-10 inline-flex items-center justify-center px-8 py-3.5 rounded-[var(--radius-sm)] font-bold transition shrink-0"
        >
          Host your car
        </Link>
      </div>
    </section>
  );
};

export default Summary;
