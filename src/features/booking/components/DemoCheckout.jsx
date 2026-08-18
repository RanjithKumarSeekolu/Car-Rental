import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { formatPrice } from '../../../utils/format';

const DemoCheckout = ({ amountPaise, description, onConfirm, onCancel }) => {
  const [paying, setPaying] = useState(false);
  const rupees = (Number(amountPaise) || 0) / 100;

  const pay = async () => {
    if (paying) return;
    setPaying(true);
    await new Promise((r) => setTimeout(r, 900));
    onConfirm();
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center px-4">
      <button type="button" className="absolute inset-0 bg-black/50" onClick={paying ? undefined : onCancel} aria-label="Close" />
      <div className="relative w-full max-w-md bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--line)] shadow-[var(--shadow-lg)] p-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-2">Pay</p>
        <h3 className="text-2xl font-bold text-[var(--ink)]">RentNHost</h3>
        <p className="text-sm text-[var(--muted)] mt-1">{description}</p>
        <p className="text-3xl font-bold text-[var(--ink)] mt-4">{formatPrice(rupees)}</p>
        <p className="text-xs text-[var(--muted)] mt-2">
          Instant test payment. No card, no UPI app, no charge.
        </p>
        <div className="mt-6 flex gap-3">
          <Button type="button" variant="outline" className="flex-1" disabled={paying} onClick={onCancel}>
            Cancel
          </Button>
          <Button type="button" variant="accent" className="flex-1" disabled={paying} onClick={pay}>
            {paying ? 'Paying…' : `Pay ${formatPrice(rupees)}`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DemoCheckout;
