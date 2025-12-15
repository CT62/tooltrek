'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package } from 'lucide-react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // You can verify the session here if needed
    if (sessionId) {
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Confirming your order...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-3xl border-2 border-slate-100 p-12 text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-4xl font-black text-slate-900 mb-4">
          Order Successful!
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          Thank you for your purchase! You'll receive a confirmation email shortly with your order details.
        </p>
        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Package className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900">What's Next?</h2>
          </div>
          <p className="text-slate-600">
            Your complete tool kit will be prepared and shipped within 2-3 business days. 
            We'll send you tracking information once your order is on its way.
          </p>
        </div>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/collections"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-slate-100 text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-colors"
          >
            Back to Home
          </Link>
        </div>
        {sessionId && (
          <p className="text-sm text-slate-400 mt-8">
            Order ID: {sessionId.substring(0, 20)}...
          </p>
        )}
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}
