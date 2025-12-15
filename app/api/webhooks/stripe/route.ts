import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = headers().get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature' },
      { status: 400 }
    );
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Retrieve the full session with shipping details
      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ['shipping_details'],
      });
      
      console.log('Payment successful!', {
        sessionId: fullSession.id,
        collectionId: fullSession.metadata?.collectionId,
        collectionName: fullSession.metadata?.collectionName,
        amountTotal: fullSession.amount_total,
        customerEmail: fullSession.customer_details?.email,
        shippingAddress: fullSession.shipping_details?.address,
      });

      // Save order to database
      try {
        const order = await prisma.order.create({
          data: {
            stripeSessionId: fullSession.id,
            stripePaymentId: fullSession.payment_intent as string,
            
            // Customer info
            email: fullSession.customer_details?.email || '',
            customerName: fullSession.customer_details?.name || null,
            phone: fullSession.customer_details?.phone || null,
            
            // Order details
            collectionId: parseInt(fullSession.metadata?.collectionId || '0'),
            collectionName: fullSession.metadata?.collectionName || '',
            amount: fullSession.amount_total || 0,
            currency: fullSession.currency || 'eur',
            status: 'paid',
            
            // Shipping address
            shippingName: fullSession.shipping_details?.name || null,
            shippingLine1: fullSession.shipping_details?.address?.line1 || null,
            shippingLine2: fullSession.shipping_details?.address?.line2 || null,
            shippingCity: fullSession.shipping_details?.address?.city || null,
            shippingState: fullSession.shipping_details?.address?.state || null,
            shippingPostal: fullSession.shipping_details?.address?.postal_code || null,
            shippingCountry: fullSession.shipping_details?.address?.country || null,
            
            // Items (you can fetch from collection or pass via metadata)
            items: {},
            
            paidAt: new Date(),
          },
        });

        console.log('Order saved to database:', order.id);

        // TODO: Send confirmation email with order details and shipping address
        
      } catch (dbError) {
        console.error('Failed to save order to database:', dbError);
      }
      
      break;

    case 'checkout.session.async_payment_succeeded':
      console.log('Async payment succeeded');
      break;

    case 'checkout.session.async_payment_failed':
      console.log('Async payment failed');
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
