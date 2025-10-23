"use client";

import { useState } from "react";
import Link from "next/link";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("getting-started");

  const sections = [
    { id: "getting-started", title: "Getting Started", icon: "🚀" },
    { id: "installation", title: "Installation", icon: "📦" },
    { id: "components", title: "Components", icon: "🧩" },
    { id: "authentication", title: "Authentication", icon: "🔐" },
    { id: "best-practices", title: "Best Practices", icon: "⭐" },
    { id: "troubleshooting", title: "Troubleshooting", icon: "🔧" },
    { id: "api-reference", title: "API Reference", icon: "📚" },
    { id: "examples", title: "Examples", icon: "💡" }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "getting-started":
        return (
          <div className="prose prose-invert max-w-none">
            <h1 className="text-3xl font-bold mb-6">Getting Started with NodeBackend</h1>
            
            <p className="text-lg text-slate-300 mb-6">
              NodeBackend provides production-ready Node.js components that you can copy and paste into your projects. 
              Each component is self-contained, well-documented, and battle-tested.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-[#539E43]">What is NodeBackend?</h2>
            <p className="text-slate-300 mb-6">
              NodeBackend is a collection of backend components designed to accelerate your Node.js development. 
              Instead of writing the same authentication, payment processing, or file upload logic repeatedly, 
              you can simply copy our tested components and integrate them into your project.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-[#539E43]">Key Features</h2>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-6">
              <li><strong>Production Ready:</strong> All components are battle-tested and include proper error handling</li>
              <li><strong>Copy-Paste Friendly:</strong> No complex setup or configuration required</li>
              <li><strong>Own Your Code:</strong> No vendor lock-in, you own and control everything</li>
              <li><strong>Well Documented:</strong> Each component includes usage examples and API documentation</li>
              <li><strong>Modern Stack:</strong> Built with latest Node.js, Express, and MongoDB/PostgreSQL</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 text-[#539E43]">Quick Start</h2>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 mb-6">
              <pre className="text-sm text-slate-300">
{`1. Browse components at /components
2. Choose a component (e.g., Authentication)
3. Select a sub-component (e.g., Basic Auth)
4. Copy the code and install dependencies
5. Configure environment variables
6. Start building!`}
              </pre>
            </div>

            <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4 mb-6">
              <p className="text-blue-200">
                <strong>💡 Tip:</strong> Start with the Authentication component if you're building a new application. 
                It provides the foundation for user management and security.
              </p>
            </div>
          </div>
        );

      case "installation":
        return (
          <div className="prose prose-invert max-w-none">
            <h1 className="text-3xl font-bold mb-6">Installation Guide</h1>
            
            <h2 className="text-2xl font-semibold mb-4 text-[#539E43]">Prerequisites</h2>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-6">
              <li>Node.js 16+ installed</li>
              <li>npm or yarn package manager</li>
              <li>MongoDB or PostgreSQL database</li>
              <li>Basic knowledge of Express.js</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 text-[#539E43]">Project Setup</h2>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 mb-6">
              <pre className="text-sm text-slate-300">
{`# Create new Node.js project
mkdir my-backend
cd my-backend
npm init -y

# Install basic dependencies
npm install express mongoose dotenv cors helmet
npm install -D nodemon

# Create basic structure
mkdir src models routes middleware
touch src/app.js .env`}
              </pre>
            </div>

            <h2 className="text-2xl font-semibold mb-4 text-[#539E43]">Basic Express Setup</h2>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 mb-6">
              <pre className="text-sm text-slate-300">
{`// src/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'NodeBackend API is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`}
              </pre>
            </div>

            <h2 className="text-2xl font-semibold mb-4 text-[#539E43]">Environment Variables</h2>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 mb-6">
              <pre className="text-sm text-slate-300">
{`# .env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nodebackend
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development`}
              </pre>
            </div>
          </div>
        );

      case "components":
        return (
          <div className="prose prose-invert max-w-none">
            <h1 className="text-3xl font-bold mb-6">Components Overview</h1>
            
            <p className="text-lg text-slate-300 mb-6">
              NodeBackend components are organized into categories, each containing multiple sub-components 
              for specific use cases.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[
                {
                  name: "Authentication",
                  description: "User management, JWT tokens, OAuth integration",
                  subComponents: ["Basic Auth", "Forgot Password", "2FA", "OAuth", "Session Management"],
                  href: "/components/auth"
                },
                {
                  name: "Email Service", 
                  description: "SMTP integration, templates, bulk sending",
                  subComponents: ["Basic Email", "Templates", "Bulk Sender", "Verification"],
                  href: "/components/email"
                },
                {
                  name: "Payment Processing",
                  description: "Stripe integration, subscriptions, invoicing",
                  subComponents: ["Stripe Payments", "Subscriptions", "Invoicing", "Refunds"],
                  href: "/components/payments"
                },
                {
                  name: "File Storage",
                  description: "AWS S3, local storage, image processing",
                  subComponents: ["S3 Upload", "Local Storage", "Image Processing", "CDN"],
                  href: "/components/file-storage"
                }
              ].map((component) => (
                <div key={component.name} className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2 text-[#539E43]">{component.name}</h3>
                  <p className="text-slate-400 mb-4">{component.description}</p>
                  <div className="space-y-1 mb-4">
                    {component.subComponents.map((sub) => (
                      <div key={sub} className="text-sm text-slate-500">• {sub}</div>
                    ))}
                  </div>
                  <Link href={component.href} className="text-[#539E43] hover:text-[#4a8a3c] text-sm font-medium">
                    View Components →
                  </Link>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-semibold mb-4 text-[#539E43]">Component Structure</h2>
            <p className="text-slate-300 mb-4">Each component follows a consistent structure:</p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-6">
              <li><strong>Main Logic:</strong> Core functionality and business logic</li>
              <li><strong>Models:</strong> Database schemas and validation</li>
              <li><strong>Routes:</strong> Express.js route handlers</li>
              <li><strong>Middleware:</strong> Authentication and validation middleware</li>
              <li><strong>Configuration:</strong> Environment variables and setup</li>
            </ul>
          </div>
        );

      case "best-practices":
        return (
          <div className="prose prose-invert max-w-none">
            <h1 className="text-3xl font-bold mb-6">Best Practices</h1>
            
            <h2 className="text-2xl font-semibold mb-4 text-[#539E43]">Security</h2>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-6">
              <li>Always use environment variables for sensitive data</li>
              <li>Implement rate limiting on authentication endpoints</li>
              <li>Use HTTPS in production</li>
              <li>Validate and sanitize all user inputs</li>
              <li>Keep dependencies updated</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 text-[#539E43]">Performance</h2>
            <ul className="list-disc list-inside text-slate-300 space-y-2 mb-6">
              <li>Use database indexes for frequently queried fields</li>
              <li>Implement caching for expensive operations</li>
              <li>Use connection pooling for databases</li>
              <li>Compress responses with gzip</li>
              <li>Monitor and log performance metrics</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 text-[#539E43]">Code Organization</h2>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 mb-6">
              <pre className="text-sm text-slate-300">
{`project/
├── src/
│   ├── components/     # NodeBackend components
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   ├── utils/          # Utility functions
│   └── app.js          # Main application
├── tests/              # Test files
├── .env                # Environment variables
└── package.json`}
              </pre>
            </div>
          </div>
        );

      default:
        return <div className="text-slate-300">Select a section from the sidebar to view documentation.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      
   

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen border-r border-slate-800 p-6">
          <h2 className="text-lg font-semibold mb-6">Documentation</h2>
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-3 ${
                  activeSection === section.id
                    ? "bg-[#539E43] text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <span>{section.icon}</span>
                <span className="text-sm">{section.title}</span>
              </button>
            ))}
          </nav>

          {/* Quick Links */}
          <div className="mt-8 pt-6 border-t border-slate-800">
            <h3 className="text-sm font-semibold mb-4 text-slate-400">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/components" className="block text-sm text-slate-400 hover:text-[#539E43]">
                Browse Components
              </Link>
              <Link href="/components/auth" className="block text-sm text-slate-400 hover:text-[#539E43]">
                Authentication
              </Link>
              <Link href="/components/payments" className="block text-sm text-slate-400 hover:text-[#539E43]">
                Payments
              </Link>
              <a href="mailto:hello@nodebackend.com" className="block text-sm text-slate-400 hover:text-[#539E43]">
                Get Support
              </a>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}