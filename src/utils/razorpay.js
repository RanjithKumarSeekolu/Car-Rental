export function openRazorpayCheckout({ key, orderId, amount, currency, name, description, prefill, notes }) {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.Razorpay) {
      reject(new Error('Payment checkout failed to load. Refresh and try again.'));
      return;
    }

    const rzp = new window.Razorpay({
      key,
      amount,
      currency: currency || 'INR',
      name: name || 'RentNHost',
      description: description || 'Car booking',
      order_id: orderId,
      prefill: prefill || {},
      notes: notes || {},
      theme: { color: '#FF5C1A' },
      handler: (response) => resolve(response),
      modal: {
        ondismiss: () => reject(new Error('Payment cancelled')),
      },
    });

    rzp.on('payment.failed', (response) => {
      reject(new Error(response?.error?.description || 'Payment failed'));
    });

    rzp.open();
  });
}
