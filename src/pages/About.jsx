import React from "react";
import { Link } from "react-router-dom";
import Person1 from "../assets/Person1.png";
import Person2 from "../assets/Person2.png";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";

const AboutPage = () => {
  return (
    <div className="bg-[var(--bg)] min-h-screen">
      <section className="bg-[var(--navy)] pt-32 pb-20 text-[var(--on-navy)]">
        <Container className="text-center max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-4">About</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">About RentNHost</h1>
          <p className="text-lg text-[var(--on-navy)]/80">
            Your go-to platform for renting cars or hosting your own.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container className="max-w-3xl">
          <h2 className="text-3xl font-bold text-[var(--ink)] mb-4">Who we are</h2>
          <p className="text-lg text-[var(--muted)] leading-relaxed">
            We are passionate about a seamless experience for renters and hosts.
            RentNHost connects people who need reliable cars with owners ready to share theirs.
          </p>
        </Container>
      </section>

      <section className="py-16 border-y border-[var(--line)] bg-[var(--surface)]">
        <Container>
          <h2 className="text-3xl font-bold text-[var(--ink)] mb-10 text-center">Meet the team</h2>
          <div className="flex flex-wrap justify-center gap-10">
            <div className="text-center">
              <img src={Person1} alt="John Doe" className="rounded-full w-32 h-32 mb-4 mx-auto object-cover border-2 border-[var(--line)]" />
              <h3 className="text-xl font-bold text-[var(--ink)]">John Doe</h3>
              <p className="text-[var(--muted)]">CEO & Co-founder</p>
            </div>
            <div className="text-center">
              <img src={Person2} alt="Samantha" className="rounded-full w-32 h-32 mb-4 mx-auto object-cover border-2 border-[var(--line)]" />
              <h3 className="text-xl font-bold text-[var(--ink)]">Samantha</h3>
              <p className="text-[var(--muted)]">CTO & Co-founder</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="max-w-2xl">
          <h2 className="text-3xl font-bold text-[var(--ink)] mb-8 text-center">What our users say</h2>
          <div className="space-y-4">
            <blockquote className="bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--line)] p-6 shadow-[var(--shadow)]">
              <p className="text-lg text-[var(--ink)] mb-3">
                &ldquo;RentNHost made it so easy for me to find a car for my weekend trip. Highly recommended!&rdquo;
              </p>
              <footer className="text-[var(--muted)] text-right">— Alice Johnson</footer>
            </blockquote>
            <blockquote className="bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--line)] p-6 shadow-[var(--shadow)]">
              <p className="text-lg text-[var(--ink)] mb-3">
                &ldquo;I&apos;ve been hosting my car on RentNHost for months now, and it&apos;s been a great way to earn extra income.&rdquo;
              </p>
              <footer className="text-[var(--muted)] text-right">— Michael Lee</footer>
            </blockquote>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-[var(--navy)] text-[var(--on-navy)]">
        <Container className="text-center max-w-xl">
          <h2 className="text-3xl font-bold mb-4">Get in touch</h2>
          <p className="text-[var(--on-navy)]/80 mb-6">
            Questions or feedback? Email{" "}
            <a href="mailto:info@rentnhost.com" className="text-[var(--accent)] font-semibold hover:underline">
              info@rentnhost.com
            </a>
          </p>
          <Link to="/contact">
            <Button variant="accent">Contact us</Button>
          </Link>
        </Container>
      </section>
    </div>
  );
};

export default AboutPage;
