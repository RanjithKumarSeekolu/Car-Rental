import React from "react";

const features = [
  {
    title: "Verified hosts",
    description: "Hosts are checked with documentation before they can list.",
  },
  {
    title: "24/7 support",
    description: "Help whenever you need it during your rental.",
  },
  {
    title: "Clear pricing",
    description: "The daily rate you see is what you pay — no surprise fees.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 md:py-24 bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-3">
            Why RentNHost
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--ink)] tracking-tight">
            What you actually get
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--bg)] p-8"
            >
              <div className="w-10 h-1 rounded-full bg-[var(--accent)] mb-6" />
              <h3 className="text-xl font-bold text-[var(--ink)] mb-3">{f.title}</h3>
              <p className="text-[var(--muted)] leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
