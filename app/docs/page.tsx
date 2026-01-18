"use client";

import { useState } from "react";
import Link from "next/link";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("getting-started");

  const sections = [
    { id: "getting-started", title: "Getting Started"},
    { id: "installation", title: "Installation"},
    { id: "components", title: "Components"},
    { id: "authentication", title: "Authentication"},
    { id: "best-practices", title: "Best Practices"},
    { id: "troubleshooting", title: "Troubleshooting"},
    { id: "api-reference", title: "API Reference"},
    { id: "examples", title: "Examples"}
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "getting-started":
        return (
          <div className="prose max-w-none">
            <h1 className="text-3xl font-bold mb-6">Getting Started with NodeBackend</h1>
            
            <p className="text-lg text-secondary mb-6">
              NodeBackend provides production-ready Node.js components that you can copy and paste into your projects. 
              Each component is self-contained, well-documented, and battle-tested.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-accent">What is NodeBackend?</h2>
            <p className="text-secondary mb-6">
              NodeBackend is a collection of backend components designed to accelerate your Node.js development. 
              Instead of writing the same authentication, payment processing, or file upload logic repeatedly, 
              you can simply copy our tested components and integrate them into your project.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-accent">Key Features</h2>
            <ul className="list-disc list-inside text-secondary space-y-2 mb-6">
              <li><strong>Production Ready:</strong> All components are battle-tested and include proper error handling</li>
              <li><strong>Copy-Paste Friendly:</strong> No complex setup or configuration required</li>
              <li><strong>Own Your Code:</strong> No vendor lock-in, you own and control everything</li>
              <li><strong>Well Documented:</strong> Each component includes usage examples and API documentation</li>
              <li><strong>Modern Stack:</strong> Built with latest Node.js, Express, and MongoDB/PostgreSQL</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 text-accent">Quick Start</h2>
            <div className="bg-code border border-default rounded-lg p-4 mb-6">
              <pre className="text-sm text-primary">
{`1. Browse components at /components
2. Choose a component (e.g., Authentication)
3. Select a sub-component (e.g., Basic Auth)
4. Copy the code and install dependencies
5. Configure environment variables
6. Start building!`}
              </pre>
            </div>

            <div className="bg-surface border border-accent/30 rounded-lg p-4 mb-6">
              <p className="text-accent">
                <strong>💡 Tip:</strong> Start with the Authentication component if you&apos;re building a new application. 
                It provides the foundation for user management and security.
              </p>
            </div>
          </div>
        );

      case "installation":
        return (
          <div className="prose max-w-none">
            <h1 className="text-3xl font-bold mb-6">Installation Guide</h1>
            
            <h2 className="text-2xl font-semibold mb-4 text-accent">Prerequisites</h2>
            <ul className="list-disc list-inside text-secondary space-y-2 mb-6">
              <li>Node.js 16+ installed</li>
              <li>npm or yarn package manager</li>
              <li>MongoDB or PostgreSQL database</li>
              <li>Basic knowledge of Express.js</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 text-accent">Project Setup</h2>
            <div className="bg-code border border-default rounded-lg p-4 mb-6">
              <pre className="text-sm text-primary">
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

            <h2 className="text-2xl font-semibold mb-4 text-accent">Basic Express Setup</h2>
            <div className="bg-code border border-default rounded-lg p-4 mb-6">
              <pre className="text-sm text-primary">
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

            <h2 className="text-2xl font-semibold mb-4 text-accent">Environment Variables</h2>
            <div className="bg-code border border-default rounded-lg p-4 mb-6">
              <pre className="text-sm text-primary">
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
          <div className="prose max-w-none">
            <h1 className="text-3xl font-bold mb-6">Components Overview</h1>
            
            <p className="text-lg text-secondary mb-6">
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
                <div key={component.name} className="bg-surface border border-default rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2 text-accent">{component.name}</h3>
                  <p className="text-secondary mb-4">{component.description}</p>
                  <div className="space-y-1 mb-4">
                    {component.subComponents.map((sub) => (
                      <div key={sub} className="text-sm text-secondary">• {sub}</div>
                    ))}
                  </div>
                  <Link href={component.href} className="text-accent hover:text-accent text-sm font-medium">
                    View Components →
                  </Link>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-semibold mb-4 text-accent">Component Structure</h2>
            <p className="text-secondary mb-4">Each component follows a consistent structure:</p>
            <ul className="list-disc list-inside text-secondary space-y-2 mb-6">
              <li><strong>Main Logic:</strong> Core functionality and business logic</li>
              <li><strong>Models:</strong> Database schemas and validation</li>
              <li><strong>Routes:</strong> Express.js route handlers</li>
              <li><strong>Middleware:</strong> Authentication and validation middleware</li>
              <li><strong>Tests:</strong> Unit and integration tests</li>
              <li><strong>Documentation:</strong> Usage examples and API reference</li>
            </ul>
          </div>
        );

      default:
        return (
          <div className="prose max-w-none">
            <h1 className="text-3xl font-bold mb-6">Documentation</h1>
            <p className="text-secondary">Select a section from the sidebar to get started.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <div className="max-w-7xl py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-surface border h-[700px] border-default rounded-lg p-4 sticky top-8">
              <h2 className="text-lg font-semibold mb-4">Documentation</h2>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                      activeSection === section.id
                        ? 'bg-accent text-white'
                        : 'text-secondary hover:bg-code hover:text-primary'
                    }`}
                  >
                    
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-surface border border-default rounded-lg p-8">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}