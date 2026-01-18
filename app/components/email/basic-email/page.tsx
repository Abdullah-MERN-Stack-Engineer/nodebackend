"use client";

import { useState } from "react";

const emailCode = `// email.js - Basic Email Service
const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

// Send email function
const sendEmail = async (to, subject, html, text = null) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, '')
    };
    
    const result = await transporter.sendMail(mailOptions);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error.message };
  }
};

module.exports = { sendEmail };`;

const routesCode = `// routes/email.js - Email Routes
const express = require('express');
const { sendEmail } = require('../email');
const { authMiddleware } = require('../auth');
const router = express.Router();

// Send email endpoint
router.post('/send', authMiddleware, async (req, res) => {
  try {
    const { to, subject, html, text } = req.body;
    
    if (!to || !subject || !html) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const result = await sendEmail(to, subject, html, text);
    
    if (result.success) {
      res.json({ message: 'Email sent successfully', messageId: result.messageId });
    } else {
      res.status(500).json({ error: 'Failed to send email', details: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;`;

const configCode = `// config/email.js - Email Configuration
const emailConfig = {
  // Gmail configuration
  gmail: {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  },
  
  // SendGrid configuration
  sendgrid: {
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false,
    auth: {
      user: 'apikey',
      pass: process.env.SENDGRID_API_KEY
    }
  },
  
  // Mailgun configuration
  mailgun: {
    host: 'smtp.mailgun.org',
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAILGUN_SMTP_LOGIN,
      pass: process.env.MAILGUN_SMTP_PASSWORD
    }
  }
};

module.exports = emailConfig;`;

export default function BasicEmailComponent() {
  const [activeTab, setActiveTab] = useState("email");
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const tabs = [
    { id: "email", label: "Email Service", code: emailCode },
    { id: "routes", label: "Routes", code: routesCode },
    { id: "config", label: "Configuration", code: configCode }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-primary">Basic Email Service</h1>
        <p className="text-secondary text-lg mb-4">
          Send emails with Nodemailer and SMTP configuration for Gmail, SendGrid, and Mailgun
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {["Nodemailer", "SMTP", "Gmail", "SendGrid"].map(tag => (
            <span key={tag} className="px-3 py-1 bg-surface text-secondary rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-primary">Installation</h2>
        <div className="space-y-4">
          <div className="bg-surface border border-default rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-secondary">Install dependencies</span>
              <button
                onClick={() => copyToClipboard("npm install nodemailer", "install")}
                className="text-sm text-accent hover:text-accent transition-colors"
              >
                {copied === "install" ? "Copied!" : "Copy"}
              </button>
            </div>
            <code className="text-sm text-primary">npm install nodemailer</code>
          </div>
          
          <div className="bg-surface border border-default rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-secondary">API Routes</span>
              <button
                onClick={() => copyToClipboard("POST /email/send", "routes")}
                className="text-sm text-accent hover:text-accent transition-colors"
              >
                {copied === "routes" ? "Copied!" : "Copy"}
              </button>
            </div>
            <code className="text-sm text-primary">POST /email/send</code>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex border-b border-default mb-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-accent border-b-2 border-accent"
                  : "text-secondary hover:text-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-surface border border-default rounded-lg">
          <div className="flex items-center justify-between p-4 border-b border-default">
            <span className="text-sm text-secondary">
              {tabs.find(t => t.id === activeTab)?.label}
            </span>
            <button
              onClick={() => copyToClipboard(tabs.find(t => t.id === activeTab)?.code || "", activeTab)}
              className="flex items-center gap-2 px-3 py-1 bg-accent hover-accent text-white text-sm rounded transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2 2v1"/>
              </svg>
              {copied === activeTab ? "Copied!" : "Copy Code"}
            </button>
          </div>
          <pre className="p-4 overflow-x-auto text-sm bg-code">
            <code className="text-primary">
              {tabs.find(t => t.id === activeTab)?.code}
            </code>
          </pre>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-primary">Usage</h2>
        <div className="bg-surface border border-default rounded-lg p-4">
          <ol className="text-secondary space-y-2 text-sm">
            <li>1. Configure SMTP settings in environment variables</li>
            <li>2. Import and use sendEmail function in your routes</li>
            <li>3. Send POST request to /email/send with to, subject, and html</li>
            <li>4. Handle success/error responses appropriately</li>
          </ol>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-primary">Environment Variables</h2>
        <div className="bg-surface border border-default rounded-lg p-4">
          <code className="text-sm text-primary">
            SMTP_HOST=smtp.gmail.com<br/>
            SMTP_PORT=587<br/>
            SMTP_USER=your-email@gmail.com<br/>
            SMTP_PASS=your-app-password<br/>
            FROM_EMAIL=noreply@yourapp.com
          </code>
        </div>
      </div>
    </div>
  );
}