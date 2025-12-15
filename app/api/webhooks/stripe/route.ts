import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma'; // Make sure you have Prisma client set up

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
      const session = event.data.object;
      
      console.log('Payment successful!', {
        sessionId: session.id,
        collectionId: session.metadata?.collectionId,
        collectionName: session.metadata?.collectionName,
        amountTotal: session.amount_total,
        customerEmail: session.customer_details?.email,
        shippingAddress: session.shipping_details?.address,
      });

      // Save order to database
      try {
        const order = await prisma.order.create({
          data: {
            stripeSessionId: session.id,
            stripePaymentId: session.payment_intent as string,
            
            // Customer info
            email: session.customer_details?.email || '',
            customerName: session.customer_details?.name || null,
            phone: session.customer_details?.phone || null,
            
            // Order details
            collectionId: parseInt(session.metadata?.collectionId || '0'),
            collectionName: session.metadata?.collectionName || '',
            amount: session.amount_total || 0,
            currency: session.currency || 'eur',
            status: 'paid',
            
            // Shipping address
            shippingName: session.shipping_details?.name || null,
            shippingLine1: session.shipping_details?.address?.line1 || null,
            shippingLine2: session.shipping_details?.address?.line2 || null,
            shippingCity: session.shipping_details?.address?.city || null,
            shippingState: session.shipping_details?.address?.state || null,
            shippingPostal: session.shipping_details?.address?.postal_code || null,
            shippingCountry: session.shipping_details?.address?.country || null,
            
            // Items (you can fetch from collection or pass via metadata)
            items: {}, // You might want to pass tools data in metadata
            
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
