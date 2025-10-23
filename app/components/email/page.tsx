"use client";

import Link from "next/link";

export default function EmailComponent() {
  const subComponents = [
    {
      id: "basic-email",
      name: "Basic Email Service",
      description: "Send emails with Nodemailer and SMTP configuration",
      tags: ["Nodemailer", "SMTP", "Templates"]
    },
    {
      id: "email-templates",
      name: "Email Templates",
      description: "Pre-built HTML email templates for common use cases",
      tags: ["HTML", "Templates", "Responsive"]
    },
    {
      id: "bulk-email",
      name: "Bulk Email Sender",
      description: "Send emails to multiple recipients with queue management",
      tags: ["Bulk", "Queue", "Rate Limiting"]
    },
    {
      id: "email-verification",
      name: "Email Verification",
      description: "Verify email addresses with confirmation tokens",
      tags: ["Verification", "Tokens", "Security"]
    },
    {
      id: "newsletter",
      name: "Newsletter System",
      description: "Manage subscribers and send newsletters",
      tags: ["Newsletter", "Subscribers", "Campaign"]
    },
    {
      id: "transactional-email",
      name: "Transactional Emails",
      description: "Order confirmations, receipts, and notifications",
      tags: ["Transactional", "Orders", "Receipts"]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
          <Link href="/components" className="hover:text-white">Components</Link>
          <span>/</span>
          <span>Email Service</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Email Service Components</h1>
          <p className="text-slate-400 text-lg mb-4">
            Complete email system with templates, bulk sending, and verification
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {["Nodemailer", "Templates", "SMTP", "Bulk Email", "Verification"].map(tag => (
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
              href={`/components/email/${component.id}`}
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