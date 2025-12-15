import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { collectionId, collectionName, price, tools } = body;

    // Validate the data
    if (!collectionId || !collectionName || !price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Ensure tools is an array
    const toolsList = Array.isArray(tools) ? tools : [];

    // Get the origin from headers
    const origin = req.headers.get('origin') || 'http://localhost:3000';

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: collectionName,
              description: `Complete tool kit with ${toolsList.length} items`,
            },
            unit_amount: Math.round(price * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // Collect shipping address
      shipping_address_collection: {
        allowed_countries: ['IE'], // Add countries you ship to
      },
      // Optionally collect phone number
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${origin}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/collections/${collectionId}`,
      metadata: {
        collectionId: collectionId.toString(),
        collectionName,
        toolsCount: toolsList.length.toString(),
      },
    });

    console.log('Created session:', session.id, 'URL:', session.url);

    // Return the checkout URL
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
