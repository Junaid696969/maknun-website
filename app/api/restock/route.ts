import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from 'next-sanity';

const resend = new Resend(process.env.RESEND_API_KEY);

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_WRITE_TOKEN, 
  useCdn: false,
  apiVersion: '2023-01-01',
});

export async function POST(req: Request) {
  try {
    const { email, productName, productId } = await req.json();

    await writeClient.create({
      _type: 'restockRequest',
      email,
      productName,
      productId,
      createdAt: new Date().toISOString(),
    });

    await resend.emails.send({
      from: 'Maknun <onboarding@resend.dev>',
      to: email,
      subject: `Restock Alert Set: ${productName}`,
      html: `
        <div style="font-family: serif; text-align: center; padding: 40px; border: 1px solid #eee;">
          <h1 style="letter-spacing: 4px; color: #000;">MAKNUN</h1>
          <p style="color: #666; text-transform: uppercase; font-size: 11px; letter-spacing: 2px;">Heritage Redefined</p>
          <div style="margin: 40px 0;">
            <p style="font-size: 16px;">We have successfully set an alert for the <strong>${productName}</strong>.</p>
            <p style="font-size: 16px;">You will be the first to know when it is back in our collection.</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Restock Error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}