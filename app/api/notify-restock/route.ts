import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from 'next-sanity';

const resend = new Resend(process.env.RESEND_API_KEY);
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2023-01-01',
});

export async function POST(req: Request) {
  try {
    const { productId, productName } = await req.json();

    // 1. Find everyone who asked for this specific product
    const requests = await client.fetch(
      `*[_type == "restockRequest" && productId == $productId]`,
      { productId }
    );

    if (requests.length === 0) return NextResponse.json({ message: "No one to notify" });

    // 2. Loop through and send the "It's Back!" email to everyone
    for (const request of requests) {
      await resend.emails.send({
        from: 'Maknun <onboarding@resend.dev>',
        to: request.email,
        subject: `GOOD NEWS: ${productName} is Back!`,
        html: `
          <div style="font-family: serif; text-align: center; padding: 40px;">
            <h1 style="letter-spacing: 4px;">MAKNUN</h1>
            <p>You asked, we delivered.</p>
            <h2 style="text-transform: uppercase;">${productName} is now RESTOCKED.</h2>
            <p>Pieces are limited. Grab yours before it's gone again.</p>
            <a href="https://yourwebsite.com/product/${productId}" style="background: black; color: white; padding: 15px 30px; text-decoration: none; display: inline-block; margin-top: 20px;">SHOP NOW</a>
          </div>
        `,
      });

      // 3. Optional: Delete the request so we don't email them twice
      await client.delete(request._id);
    }

    return NextResponse.json({ success: true, notifiedCount: requests.length });
  } catch (error) {
    return NextResponse.json({ error: "Automation failed" }, { status: 500 });
  }
}