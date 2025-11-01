"use client";

import { useState } from "react";
import Link from "next/link";

const registerCode = `// controllers/authController.js - User Registration
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendVerificationEmail } = require('../utils/emailService');
const { validateRegister } = require('../utils/validation');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    const { error } = validateRegister(req.body);
    if (error) {
      return res.status(400).json({ 
        success: false, 
        message: error.details[0].message 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User already exists with this email' 
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Generate verification token
    const verificationToken = jwt.sign(
      { email: email.toLowerCase() },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Create user
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
      verificationToken,
      isVerified: false,
      createdAt: new Date()
    });

    await user.save();

    // Send verification email
    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      success: true,
      message: 'Registration successful. Please check your email to verify your account.',
      data: {
        userId: user._id,
        email: user.email,
        name: user.name,
        isVerified: user.isVerified
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

module.exports = { register };`;

const validationCode = `// utils/validation.js - Registration Validation
const Joi = require('joi');

const validateRegister = (data) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(50)
      .pattern(/^[a-zA-Z\s]+$/)
      .required()
      .messages({
        'string.min': 'Name must be at least 2 characters long',
        'string.max': 'Name cannot exceed 50 characters',
        'string.pattern.base': 'Name can only contain letters and spaces'
      }),
    
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        'string.email': 'Please provide a valid email address'
      }),
    
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .required()
      .messages({
        'string.min': 'Password must be at least 8 characters long',
        'string.pattern.base': 'Password must contain uppercase, lowercase, number and special character'
      })
  });

  return schema.validate(data);
};

module.exports = { validateRegister };`;

export default function RegisterComponent() {
  const [activeTab, setActiveTab] = useState("controller");
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const tabs = [
    { id: "controller", label: "Controller", code: registerCode },
    { id: "validation", label: "Validation", code: validationCode }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 text-sm text-secondary mb-6">
        <Link href="/components" className="hover:text-primary">Components</Link>
        <span>/</span>
        <Link href="/components?component=auth" className="hover:text-primary">Authentication</Link>
        <span>/</span>
        <span>User Registration</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">User Registration</h1>
        <p className="text-secondary text-lg mb-4">
          Complete user registration system with validation, password hashing, and email verification
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {["JWT", "bcrypt", "Validation", "Email"].map(tag => (
            <span key={tag} className="px-3 py-1 bg-surface text-secondary rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Installation</h2>
        <div className="bg-surface border border-default rounded-lg p-4">
          <code className="text-sm text-primary">npm install bcryptjs jsonwebtoken joi express-rate-limit</code>
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