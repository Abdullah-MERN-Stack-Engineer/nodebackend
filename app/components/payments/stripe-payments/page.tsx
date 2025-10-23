"use client";

import { useState } from "react";
import Link from "next/link";

const stripeCode = `// stripe.js - Stripe Payment Processing
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('./models/Payment');

// Create payment intent
const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = 'usd', customerId, metadata = {} } = req.body;
    
    if (!amount || amount < 50) {
      return res.status(400).json({ error: 'Amount must be at least $0.50' });
    }
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      customer: customerId,
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    
    // Save payment record
    const payment = new Payment({
      stripePaymentIntentId: paymentIntent.id,
      amount: amount,
      currency,
      status: 'pending',
      customerId,
      metadata
    });
    
    await payment.save();
    
    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentId: payment._id
    });
  } catch (error) {
    console.error('Payment intent creation failed:', error);
    res.status(500).json({ error: 'Payment processing failed' });
  }
};

// Create customer
const createCustomer = async (req, res) => {
  try {
    const { email, name, phone } = req.body;
    
    const customer = await stripe.customers.create({
      email,
      name,
      phone,
    });
    
    res.json({ customerId: customer.id });
  } catch (error) {
    console.error('Customer creation failed:', error);
    res.status(500).json({ error: 'Customer creation failed' });
  }
};

module.exports = { createPaymentIntent, createCustomer };`;

const webhookCode = `// webhook.js - Stripe Webhook Handler
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('./models/Payment');

// Webhook handler
const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(\`Webhook Error: \${err.message}\`);
  }
  
  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(event.data.object);
        break;
      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;
      default:
        console.log(\`Unhandled event type \${event.type}\`);
    }
    
    res.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
};

// Handle successful payment
const handlePaymentSuccess = async (paymentIntent) => {
  await Payment.findOneAndUpdate(
    { stripePaymentIntentId: paymentIntent.id },
    { 
      status: 'completed',
      completedAt: new Date()
    }
  );
  
  console.log('Payment succeeded:', paymentIntent.id);
};

// Handle failed payment
const handlePaymentFailed = async (paymentIntent) => {
  await Payment.findOneAndUpdate(
    { stripePaymentIntentId: paymentIntent.id },
    { status: 'failed' }
  );
  
  console.log('Payment failed:', paymentIntent.id);
};

module.exports = { handleWebhook };`;

const routesCode = `// routes/payments.js - Payment Routes
const express = require('express');
const { createPaymentIntent, createCustomer } = require('../stripe');
const { handleWebhook } = require('../webhook');
const { authMiddleware } = require('../auth');
const router = express.Router();

// Create payment intent
router.post('/create-payment-intent', authMiddleware, createPaymentIntent);

// Create customer
router.post('/create-customer', authMiddleware, createCustomer);

// Webhook endpoint (no auth middleware)
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

// Get payment history
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const { customerId } = req.query;
    
    const payments = await Payment.find({ customerId })
      .sort({ createdAt: -1 })
      .limit(50);
    
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payment history' });
  }
});

module.exports = router;`;

export default function StripePaymentsComponent() {
  const [activeTab, setActiveTab] = useState("stripe");
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const tabs = [
    { id: "stripe", label: "Stripe Integration", code: stripeCode },
    { id: "webhook", label: "Webhook Handler", code: webhookCode },
    { id: "routes", label: "Routes", code: routesCode }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
          <Link href="/components" className="hover:text-white">Components</Link>
          <span>/</span>
          <Link href="/components/payments" className="hover:text-white">Payment Processing</Link>
          <span>/</span>
          <span>Stripe Payment Processing</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Stripe Payment Processing</h1>
          <p className="text-slate-400 text-lg mb-4">
            Accept payments with Stripe integration, webhooks, and customer management
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {["Stripe", "Payments", "Webhooks", "Customer"].map(tag => (
              <span key={tag} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Installation</h2>
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Install dependencies</span>
                <button
                  onClick={() => copyToClipboard("npm install stripe mongoose", "install")}
                  className="text-sm text-[#539E43] hover:text-[#4a8a3c] transition-colors"
                >
                  {copied === "install" ? "Copied!" : "Copy"}
                </button>
              </div>
              <code className="text-sm text-slate-300">npm install stripe mongoose</code>
            </div>
            
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">API Routes</span>
                <button
                  onClick={() => copyToClipboard("POST /payments/create-payment-intent\nPOST /payments/create-customer\nPOST /payments/webhook", "routes")}
                  className="text-sm text-[#539E43] hover:text-[#4a8a3c] transition-colors"
                >
                  {copied === "routes" ? "Copied!" : "Copy"}
                </button>
              </div>
              <code className="text-sm text-slate-300">
                POST /payments/create-payment-intent<br/>
                POST /payments/create-customer<br/>
                POST /payments/webhook
              </code>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex border-b border-slate-700 mb-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-[#539E43] border-b-2 border-[#539E43]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-lg">
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <span className="text-sm text-slate-400">
                {tabs.find(t => t.id === activeTab)?.label}
              </span>
              <button
                onClick={() => copyToClipboard(tabs.find(t => t.id === activeTab)?.code || "", activeTab)}
                className="flex items-center gap-2 px-3 py-1 bg-[#539E43] hover:bg-[#4a8a3c] text-white text-sm rounded transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                {copied === activeTab ? "Copied!" : "Copy Code"}
              </button>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-slate-300">
                {tabs.find(t => t.id === activeTab)?.code}
              </code>
            </pre>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Usage</h2>
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
            <ol className="text-slate-300 space-y-2 text-sm">
              <li>1. Set up Stripe account and get API keys</li>
              <li>2. Create payment intent on server</li>
              <li>3. Use client secret on frontend with Stripe Elements</li>
              <li>4. Handle webhook events for payment status</li>
              <li>5. Update payment records in database</li>
            </ol>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
            <code className="text-sm text-slate-300">
              STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key<br/>
              STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret<br/>
              MONGODB_URI=mongodb://localhost:27017/payments
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}