import React from "react";

const Loader = ({ label = "Loading..." }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 py-20" role="status" aria-live="polite">
      <div className="animate-spin rounded-full h-11 w-11 border-2 border-[var(--line)] border-t-[var(--accent)]" />
      <p className="text-sm text-[var(--muted)]">{label}</p>
    </div>
  );
};

export default Loader;
