"use client";

import Link from "next/link";

export default function PaymentsComponent() {
  const subComponents = [
    {
      id: "stripe-payments",
      name: "Stripe Payment Processing",
      description: "Accept payments with Stripe integration and webhooks",
      tags: ["Stripe", "Payments", "Webhooks"]
    },
    {
      id: "subscription-billing",
      name: "Subscription Billing",
      description: "Recurring billing and subscription management",
      tags: ["Subscriptions", "Recurring", "Billing"]
    },
    {
      id: "payment-methods",
      name: "Payment Methods",
      description: "Manage customer payment methods and cards",
      tags: ["Cards", "Payment Methods", "Customer"]
    },
    {
      id: "invoicing",
      name: "Invoice Generation",
      description: "Generate and send invoices to customers",
      tags: ["Invoices", "PDF", "Email"]
    },
    {
      id: "refunds",
      name: "Refund Management",
      description: "Process refunds and handle disputes",
      tags: ["Refunds", "Disputes", "Processing"]
    },
    {
      id: "payment-analytics",
      name: "Payment Analytics",
      description: "Track payment metrics and generate reports",
      tags: ["Analytics", "Reports", "Metrics"]
    },
    {
      id: "multi-currency",
      name: "Multi-Currency Support",
      description: "Accept payments in multiple currencies",
      tags: ["Currency", "International", "Exchange"]
    },
    {
      id: "paypal-integration",
      name: "PayPal Integration",
      description: "Accept PayPal payments alongside Stripe",
      tags: ["PayPal", "Alternative", "Integration"]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
     

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
          <Link href="/components" className="hover:text-white">Components</Link>
          <span>/</span>
          <span>Payment Processing</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Payment Processing Components</h1>
          <p className="text-slate-400 text-lg mb-4">
            Complete payment system with Stripe, subscriptions, invoicing, and analytics
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {["Stripe", "Subscriptions", "Invoicing", "Refunds", "Multi-Currency"].map(tag => (
              <span key={tag} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subComponents.map((component) => (
            <Link
              key={component.id}
              href={`/components/payments/${component.id}`}
              className="group block p-6 bg-slate-900 border border-slate-800 rounded-lg hover:border-[#539E43] transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold group-hover:text-[#539E43] transition-colors">
                  {component.name}
                </h3>
                <svg className="w-5 h-5 text-slate-400 group-hover:text-[#539E43] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              
              <p className="text-slate-400 text-sm mb-4">
                {component.description}
              </p>
              
              <div className="flex flex-wrap gap-1">
                {component.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 bg-slate-800 text-slate-300 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}