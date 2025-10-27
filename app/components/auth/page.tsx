"use client";

import { useState } from "react";
import Link from "next/link";

export default function AuthComponent() {
  const subComponents = [
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
      id: "change-password",
      name: "Change Password",
      description: "Secure password updates with current password validation",
      tags: ["Security", "bcrypt", "Validation"]
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
    },
    {
      id: "session-management",
      name: "Session Management",
      description: "Handle user sessions with Redis or memory store",
      tags: ["Sessions", "Redis", "Memory"]
    },
    {
      id: "role-based-access",
      name: "Role-Based Access",
      description: "User roles and permissions management system",
      tags: ["RBAC", "Permissions", "Roles"]
    },
    {
      id: "account-lockout",
      name: "Account Lockout",
      description: "Prevent brute force attacks with account lockout",
      tags: ["Security", "Brute Force", "Rate Limiting"]
    }
  ];

  return (
    <div className="min-h-screen bg-primary text-primary">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-secondary mb-6">
          <Link href="/components" className="hover:text-primary">Components</Link>
          <span>/</span>
          <span>Authentication</span>
        </div>

        {/* Component Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Authentication Components</h1>
          <p className="text-secondary text-lg mb-4">
            Complete authentication system with JWT, OAuth, 2FA, and security features
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {["JWT", "OAuth", "2FA", "Email Verification", "Password Reset"].map(tag => (
              <span key={tag} className="px-3 py-1 bg-surface text-secondary rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Sub Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subComponents.map((component) => (
            <Link
              key={component.id}
              href={`/components/auth/${component.id}`}
              className="group block p-6 bg-surface border border-default rounded-lg hover:border-accent transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
                  {component.name}
                </h3>
                <svg className="w-5 h-5 text-secondary group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              
              <p className="text-secondary text-sm mb-4">
                {component.description}
              </p>
              
              <div className="flex flex-wrap gap-1">
                {component.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 bg-code text-secondary rounded">
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