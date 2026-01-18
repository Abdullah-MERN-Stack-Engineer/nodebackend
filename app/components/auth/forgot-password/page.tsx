"use client";

import { useState } from "react";

const forgotPasswordCode = `// forgotPassword.js - Password Reset
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { sendPasswordResetEmail } = require('./email');
const User = require('./models/User');

// Request password reset
const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
    
    // Save token to user (expires in 1 hour)
    user.passwordResetToken = resetTokenHash;
    user.passwordResetExpires = Date.now() + 60 * 60 * 1000;
    await user.save();
    
    // Send email
    await sendPasswordResetEmail(user.email, resetToken);
    
    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Reset password
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    
    const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');
    
    const user = await User.findOne({
      passwordResetToken: resetTokenHash,
      passwordResetExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }
    
    // Update password
    user.password = await bcrypt.hash(newPassword, 12);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    
    res.json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { requestPasswordReset, resetPassword };`;

const userModelCode = `// models/User.js - Extended User Model
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  passwordResetToken: {
    type: String
  },
  passwordResetExpires: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);`;

const emailServiceCode = `// email.js - Email Service for Password Reset
const nodemailer = require('nodemailer');

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

const sendPasswordResetEmail = async (userEmail, resetToken) => {
  const resetUrl = \`\${process.env.FRONTEND_URL}/reset-password?token=\${resetToken}\`;
  
  const html = \`
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #008236;">Password Reset Request</h2>
      <p>You requested a password reset for your NodeBackend account.</p>
      <p>Click the button below to reset your password:</p>
      <a href="\${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #008236; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">Reset Password</a>
      <p>If you didn't request this, please ignore this email.</p>
      <p>This link will expire in 1 hour.</p>
    </div>
  \`;
  
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: userEmail,
      subject: 'Password Reset Request',
      html
    };
    
    const result = await transporter.sendMail(mailOptions);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error.message };
  }
};

module.exports = { sendPasswordResetEmail };`;

const routesCode = `// routes/forgotPassword.js - Password Reset Routes
const express = require('express');
const { requestPasswordReset, resetPassword } = require('../forgotPassword');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Request password reset
router.post('/forgot-password', [
  body('email').isEmail().withMessage('Please provide a valid email')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  await requestPasswordReset(req, res);
});

// Reset password
router.post('/reset-password', [
  body('token').notEmpty().withMessage('Token is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  await resetPassword(req, res);
});

module.exports = router;`;

export default function ForgotPasswordComponent() {
  const [activeTab, setActiveTab] = useState("forgot");
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const tabs = [
    { id: "forgot", label: "Password Reset", code: forgotPasswordCode },
    { id: "email", label: "Email Service", code: emailServiceCode },
    { id: "model", label: "User Model", code: userModelCode },
    { id: "routes", label: "Routes", code: routesCode }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-primary">Forgot Password</h1>
        <p className="text-secondary text-lg mb-4">
          Secure password reset via email with token validation and expiration
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {["Email", "Crypto", "Tokens", "Nodemailer"].map(tag => (
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
                onClick={() => copyToClipboard("npm install crypto bcryptjs nodemailer express-validator", "install")}
                className="text-sm text-accent hover:text-accent transition-colors"
              >
                {copied === "install" ? "Copied!" : "Copy"}
              </button>
            </div>
            <code className="text-sm text-primary">npm install crypto bcryptjs nodemailer express-validator</code>
          </div>
          
          <div className="bg-surface border border-default rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-secondary">API Routes</span>
              <button
                onClick={() => copyToClipboard("POST /auth/forgot-password\nPOST /auth/reset-password", "routes")}
                className="text-sm text-accent hover:text-accent transition-colors"
              >
                {copied === "routes" ? "Copied!" : "Copy"}
              </button>
            </div>
            <code className="text-sm text-primary">
              POST /auth/forgot-password<br/>
              POST /auth/reset-password
            </code>
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
    </div>
  );
}