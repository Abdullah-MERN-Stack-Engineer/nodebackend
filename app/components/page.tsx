"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ComponentsContent from "../components-ui/ComponentsContent";

const componentsData = {
  auth: [
    {
      id: "register",
      name: "User Registration",
      description: "Complete user registration with email verification and validation",
      tags: ["JWT", "bcrypt", "Validation", "Email"]
    },
    {
      id: "login",
      name: "User Login",
      description: "Secure user authentication with JWT token generation",
      tags: ["JWT", "bcrypt", "Authentication"]
    },
    {
      id: "logout",
      name: "User Logout",
      description: "Secure logout with token invalidation and cleanup",
      tags: ["JWT", "Security", "Session"]
    },
    {
      id: "forgot-password",
      name: "Forgot Password",
      description: "Password reset via email with secure token validation",
      tags: ["Email", "Crypto", "Security"]
    },
    {
      id: "reset-password",
      name: "Reset Password",
      description: "Complete password reset flow with token verification",
      tags: ["Security", "Validation", "Crypto"]
    },
    {
      id: "change-password",
      name: "Change Password",
      description: "Secure password updates with current password validation",
      tags: ["Security", "bcrypt", "Validation"]
    },
    {
      id: "email-verification",
      name: "Email Verification",
      description: "Email verification system with confirmation tokens",
      tags: ["Email", "Verification", "Tokens"]
    },
    {
      id: "two-factor-auth",
      name: "Two-Factor Authentication",
      description: "TOTP-based 2FA with QR code generation and backup codes",
      tags: ["2FA", "TOTP", "Security"]
    },
    {
      id: "jwt-middleware",
      name: "JWT Middleware",
      description: "Authentication middleware for protecting routes",
      tags: ["JWT", "Middleware", "Security"]
    }
  ],
  email: [
    {
      id: "send-email",
      name: "Send Email",
      description: "Basic email sending with SMTP configuration",
      tags: ["Nodemailer", "SMTP", "Email"]
    },
    {
      id: "email-templates",
      name: "Email Templates",
      description: "Dynamic HTML email templates with variables",
      tags: ["Templates", "HTML", "Dynamic"]
    },
    {
      id: "bulk-email",
      name: "Bulk Email Sender",
      description: "Send bulk emails with queue management and rate limiting",
      tags: ["Bulk", "Queue", "Rate Limiting"]
    },
    {
      id: "email-verification-service",
      name: "Email Verification Service",
      description: "Complete email verification service with templates",
      tags: ["Verification", "Templates", "Service"]
    },
    {
      id: "newsletter",
      name: "Newsletter System",
      description: "Newsletter subscription and management system",
      tags: ["Newsletter", "Subscription", "Management"]
    }
  ],
  chat: [
    {
      id: "basic-chat",
      name: "Basic Real-time Chat",
      description: "Simple real-time messaging with Socket.io",
      tags: ["Socket.io", "Real-time", "WebSocket"]
    },
    {
      id: "chat-rooms",
      name: "Chat Rooms",
      description: "Multi-room chat system with user management",
      tags: ["Rooms", "Users", "Management"]
    },
    {
      id: "private-messaging",
      name: "Private Messaging",
      description: "One-to-one private messaging system",
      tags: ["Private", "Messaging", "Direct"]
    },
    {
      id: "file-sharing",
      name: "File Sharing in Chat",
      description: "Share files and images in chat conversations",
      tags: ["Files", "Images", "Upload"]
    }
  ],
  payments: [
    {
      id: "stripe-checkout",
      name: "Stripe Checkout",
      description: "Complete Stripe payment integration with checkout",
      tags: ["Stripe", "Checkout", "Payments"]
    },
    {
      id: "subscription-billing",
      name: "Subscription Billing",
      description: "Recurring subscription billing with Stripe",
      tags: ["Subscriptions", "Recurring", "Billing"]
    },
    {
      id: "payment-webhooks",
      name: "Payment Webhooks",
      description: "Handle Stripe webhooks for payment events",
      tags: ["Webhooks", "Events", "Processing"]
    },
    {
      id: "refund-system",
      name: "Refund System",
      description: "Complete refund processing and management",
      tags: ["Refunds", "Processing", "Management"]
    }
  ],
  "file-storage": [
    {
      id: "aws-s3-upload",
      name: "AWS S3 File Upload",
      description: "Upload files to Amazon S3 with presigned URLs",
      tags: ["AWS", "S3", "Upload"]
    },
    {
      id: "local-file-upload",
      name: "Local File Upload",
      description: "Upload and store files locally with Multer",
      tags: ["Local", "Multer", "Storage"]
    },
    {
      id: "image-processing",
      name: "Image Processing",
      description: "Resize, compress and process images with Sharp",
      tags: ["Images", "Processing", "Sharp"]
    },
    {
      id: "file-validation",
      name: "File Validation",
      description: "Validate file types, sizes and security checks",
      tags: ["Validation", "Security", "Types"]
    }
  ],
  "crud-api": [
    {
      id: "basic-crud",
      name: "Basic CRUD Operations",
      description: "Complete CRUD API with MongoDB/PostgreSQL",
      tags: ["CRUD", "MongoDB", "PostgreSQL"]
    },
    {
      id: "advanced-filtering",
      name: "Advanced Filtering",
      description: "Advanced query filtering, sorting and pagination",
      tags: ["Filtering", "Sorting", "Pagination"]
    },
    {
      id: "data-validation",
      name: "Data Validation",
      description: "Comprehensive data validation with Joi/Zod",
      tags: ["Validation", "Joi", "Zod"]
    },
    {
      id: "api-rate-limiting",
      name: "API Rate Limiting",
      description: "Rate limiting and throttling for API endpoints",
      tags: ["Rate Limiting", "Throttling", "Security"]
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
  const searchParams = useSearchParams();
  const [activeComponent, setActiveComponent] = useState(() => {
    const component = searchParams.get("component");
    return (component && componentsData[component as keyof typeof componentsData]) ? component : "auth";
  });

  useEffect(() => {
    const component = searchParams.get("component");
    if (component && componentsData[component as keyof typeof componentsData]) {
      setActiveComponent(component);
    }
  }, [searchParams]);

  return (
    <ComponentsContent
      activeComponent={activeComponent}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      componentsData={componentsData}
      mainComponents={mainComponents}
    />
  );
}