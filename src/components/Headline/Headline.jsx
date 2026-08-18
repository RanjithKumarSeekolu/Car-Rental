import React from "react";
import car from "../../assets/car.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Headline = () => {
  return (
    <section className="relative bg-[var(--bg)] pt-24 md:pt-28 pb-24 md:pb-28 overflow-hidden">
      {/* subtle watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-5%] top-1/2 -translate-y-1/2 text-[14rem] md:text-[18rem] font-bold text-[var(--ink)]/[0.03] leading-none select-none hidden md:block"
      >
        CAR
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-4 items-center relative z-10">
        <div className="relative flex flex-col items-start text-left max-w-[32rem]">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[0.95rem] font-semibold text-[var(--ink)]"
          >
            Find Your Ideal Car Rental.
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mt-3 text-[2.5rem] sm:text-5xl lg:text-[3.4rem] font-bold text-[var(--ink)] leading-[1.15] tracking-tight"
          >
            Easy{' '}
            <span className="text-[var(--accent)]">Renting</span>
            {' '}and
            <br />
            Secure car{' '}
            <span className="text-[var(--accent)]">Hosting</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="mt-4 text-base sm:text-lg text-[var(--muted)] leading-relaxed"
          >
            Search and discover the best car rental options with ease.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="mt-8 flex flex-row flex-wrap items-center justify-start gap-3"
          >
            <Link
              to="/allCars"
              className="btn-navy inline-flex items-center justify-center px-7 py-3.5 rounded-[var(--radius-sm)] font-semibold transition"
            >
              Find your best match.
            </Link>
            <Link
              to="/carHost"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-[var(--radius-sm)] bg-[var(--surface)] !text-[var(--ink)] font-semibold border border-[var(--line)] hover:border-[var(--navy)] transition"
            >
              Host Your Car.
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="relative flex items-center justify-center lg:justify-end min-h-[260px] md:min-h-[360px]"
        >
          <div
            aria-hidden
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-[78%] max-w-[380px] aspect-[4/5] rounded-[2rem] bg-[var(--accent)] overflow-hidden shadow-[var(--shadow-lg)]"
          >
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(-12deg, transparent, transparent 10px, rgba(255,255,255,0.4) 10px, rgba(255,255,255,0.4) 12px)",
              }}
            />
          </div>

          <img
            src={car}
            alt="Featured rental car"
            className="relative z-10 w-[110%] max-w-[600px] -ml-4 lg:-ml-12 drop-shadow-[0_25px_50px_rgba(11,31,58,0.28)] object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Headline;
