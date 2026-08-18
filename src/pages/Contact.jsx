import React, { useState } from "react";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import { apiFetch } from "../utils/api";

const ContactUsPage = () => {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      await apiFetch("api/contact", {
        method: "POST",
        auth: false,
        body: JSON.stringify(form),
      });
      setSent(true);
    } catch (err) {
      setError(err.message || "Could not send message");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-[var(--bg)] min-h-screen pt-28 pb-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start max-w-5xl mx-auto">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--ink)] leading-tight mb-4">
              Let's have a <span className="text-[var(--brand)]">chat</span>
            </h1>
            <p className="text-lg text-[var(--muted)] leading-relaxed mb-8">
              Questions about renting, hosting, or a booking? We can help.
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-[var(--surface)] rounded-xl border border-[var(--line)]">
                <h3 className="font-semibold text-[var(--ink)]">Email</h3>
                <p className="text-[var(--muted)]">support@rentnhost.com</p>
              </div>
              <div className="p-4 bg-[var(--surface)] rounded-xl border border-[var(--line)]">
                <h3 className="font-semibold text-[var(--ink)]">Hours</h3>
                <p className="text-[var(--muted)]">24/7 support for active rentals</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-[var(--surface)] p-8 rounded-2xl border border-[var(--line)] shadow-[var(--shadow)] space-y-4">
            {sent ? (
              <p className="text-[var(--success)] font-medium py-8 text-center">Thanks — we'll get back to you soon.</p>
            ) : (
              <>
                <div>
                  <label className="text-sm font-medium text-[var(--ink)]">Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="mt-1 w-full px-4 py-3 rounded-lg border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] outline-none focus:ring-2 focus:ring-[var(--brand)]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[var(--ink)]">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="mt-1 w-full px-4 py-3 rounded-lg border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] outline-none focus:ring-2 focus:ring-[var(--brand)]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[var(--ink)]">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="mt-1 w-full px-4 py-3 rounded-lg border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] outline-none focus:ring-2 focus:ring-[var(--brand)]"
                  />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <Button type="submit" className="w-full" disabled={sending}>
                  {sending ? "Sending…" : "Send message"}
                </Button>
              </>
            )}
          </form>
        </div>
      </Container>
    </div>
  );
};

export default ContactUsPage;
