import React from "react";

const steps = [
  {
    n: "01",
    title: "Choose a location",
    description: "Pick from cities across our rental network.",
  },
  {
    n: "02",
    title: "Pick your dates",
    description: "Flexible pick-up and return times that fit your trip.",
  },
  {
    n: "03",
    title: "Book & drive",
    description: "Confirm in minutes and hit the road with a trusted host.",
  },
];

const OurServices = () => {
  return (
    <section className="py-20 md:py-24 bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-3">
            How it works
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--ink)] tracking-tight">
            Rent in three simple steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {steps.map((step, i) => (
            <div key={step.n} className="relative text-center md:text-left px-2">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-7 left-[28%] right-[-40%] h-px bg-[var(--line)]" />
              )}
              <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)] font-bold text-lg mb-5">
                {step.n}
              </div>
              <h3 className="text-xl font-bold text-[var(--ink)] mb-2">{step.title}</h3>
              <p className="text-[var(--muted)] leading-relaxed max-w-xs md:max-w-none mx-auto md:mx-0">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
