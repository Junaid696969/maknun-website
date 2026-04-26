import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request: Request) {
  try {
    const { orderTotal, customer } = await request.json();

    console.log(`💳 BACKEND SECURELY CONTACTING RAZORPAY...`);

    // 1. We unlock the vault and load your Razorpay keys
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID as string,
      key_secret: process.env.RAZORPAY_KEY_SECRET as string,
    });

    // 2. We package the order details for Razorpay
    // IMPORTANT: Razorpay expects the amount in PAISE (₹1 = 100 Paise)
    const options = {
      amount: orderTotal * 100, 
      currency: "INR",
      receipt: `mak_${Date.now()}`,
    };

    // 3. We ask Razorpay to securely create a payment session
    const order = await razorpay.orders.create(options);

    console.log(`✅ RAZORPAY ORDER CREATED: ${order.id}`);

    // 4. Send Razorpay's official approval back to the checkout page
    return NextResponse.json({
      success: true,
      gateway_order_id: order.id,
      amount: order.amount,
      currency: order.currency
    }, { status: 200 });

  } catch (error) {
    console.error("Razorpay Server Error:", error);
    return NextResponse.json({ message: "Failed to initialize Razorpay" }, { status: 500 });
  }
}