'use client';

import { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { getStripe } from '@/lib/stripe-client';
import CheckoutForm from '@/components/CheckoutForm';

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get cart items from your state/context
    const cartItems = [
      // Your cart items
      { id: '1', name: 'Tool Kit', price: 299, quantity: 1 }
    ];

    fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cartItems,
        email: 'customer@example.com', // Get from your auth/form
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading checkout...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      {clientSecret && (
        <Elements 
          stripe={getStripe()} 
          options={{ clientSecret }}
        >
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
