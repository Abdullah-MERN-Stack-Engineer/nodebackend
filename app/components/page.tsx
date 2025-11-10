"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ComponentsSidebar from "../components-ui/ComponentsSidebar";
import ComponentsContent from "../components-ui/ComponentsContent";

const componentsData = {
  auth: [
    {
      id: "basic-auth",
      name: "Basic Authentication",
      description: "JWT-based login, register, and middleware protection",
      tags: ["JWT", "bcrypt", "Express"]
    },
    {
      id: "forgot-password",
      name: "Forgot Password",
      description: "Secure password reset via email with token validation",
      tags: ["Email", "Crypto", "Tokens"]
    },
    {
      id: "email-verification",
      name: "Email Verification",
      description: "Verify user email addresses with confirmation tokens",
      tags: ["Email", "Verification", "Tokens"]
    },
    {
      id: "google-oauth",
      name: "Google OAuth",
      description: "Sign in with Google using OAuth 2.0 integration",
      tags: ["OAuth", "Google", "Passport"]
    },
    {
      id: "two-factor-auth",
      name: "Two-Factor Authentication",
      description: "TOTP-based 2FA with QR code generation",
      tags: ["2FA", "TOTP", "QR Code"]
    }
  ],
  email: [
    {
      id: "basic-email",
      name: "Basic Email",
      description: "Send emails using Nodemailer with SMTP configuration",
      tags: ["Nodemailer", "SMTP", "Templates"]
    },
    {
      id: "email-templates",
      name: "Email Templates",
      description: "HTML email templates with dynamic content",
      tags: ["Templates", "HTML", "Dynamic"]
    },
    {
      id: "bulk-email",
      name: "Bulk Email",
      description: "Send bulk emails with queue management",
      tags: ["Bulk", "Queue", "Performance"]
    }
  ],
  chat: [
    {
      id: "basic-chat",
      name: "Basic Chat",
      description: "Real-time messaging with Socket.io",
      tags: ["Socket.io", "Real-time", "WebSocket"]
    },
    {
      id: "chat-rooms",
      name: "Chat Rooms",
      description: "Multi-room chat system with user management",
      tags: ["Rooms", "Users", "Management"]
    }
  ],
  payments: [
    {
      id: "stripe-payments",
      name: "Stripe Payments",
      description: "Accept payments using Stripe API",
      tags: ["Stripe", "Payments", "API"]
    },
    {
      id: "subscriptions",
      name: "Subscriptions",
      description: "Recurring billing with Stripe subscriptions",
      tags: ["Subscriptions", "Recurring", "Billing"]
    }
  ],
  "file-storage": [
    {
      id: "aws-s3-upload",
      name: "AWS S3 Upload",
      description: "Upload files to Amazon S3 bucket",
      tags: ["AWS", "S3", "Upload"]
    },
    {
      id: "local-storage",
      name: "Local Storage",
      description: "Store files locally with Multer",
      tags: ["Local", "Multer", "Files"]
    }
  ],
  "crud-api": [
    {
      id: "basic-crud",
      name: "Basic CRUD",
      description: "Create, Read, Update, Delete operations",
      tags: ["CRUD", "MongoDB", "Express"]
    }
  ]
};

const mainComponents = [
  { id: "auth", name: "Authentication" },
  { id: "email", name: "Email Service" },
  { id: "chat", name: "Real-time Chat" },
  { id: "payments", name: "Payment Processing" },
  { id: "file-storage", name: "File Storage" },
  { id: "crud-api", name: "CRUD API" }
];

export default function ComponentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeComponent, setActiveComponent] = useState("auth");
  const searchParams = useSearchParams();

  useEffect(() => {
    const component = searchParams.get("component");
    if (component && componentsData[component as keyof typeof componentsData]) {
      setActiveComponent(component);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-primary text-primary">
      <div className="flex">
        <ComponentsSidebar 
          activeComponent={activeComponent}
          setActiveComponent={setActiveComponent}
        />
        <ComponentsContent
          activeComponent={activeComponent}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          componentsData={componentsData}
          mainComponents={mainComponents}
        />
      </div>
    </div>
  );
}