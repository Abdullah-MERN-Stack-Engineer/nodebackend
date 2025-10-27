"use client";

import { useState } from "react";
import Link from "next/link";

const authCode = `// auth.js - Basic Authentication
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// Register new user
const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create user
    const user = new User({
      email,
      password: hashedPassword,
      name
    });
    
    await user.save();
    
    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      message: 'User created successfully',
      token,
      user: { id: user._id, email: user.email, name: user.name }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, email: user.email, name: user.name }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Auth middleware
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { register, login, authMiddleware };`;

const userModel = `// models/User.js - User Model
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
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);`;

const routesCode = `// routes/auth.js - Auth Routes
const express = require('express');
const { register, login, authMiddleware } = require('../auth');
const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Protected route example
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;`;

export default function BasicAuthComponent() {
  const [activeTab, setActiveTab] = useState("auth");
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const tabs = [
    { id: "auth", label: "Auth Logic", code: authCode },
    { id: "model", label: "User Model", code: userModel },
    { id: "routes", label: "Routes", code: routesCode }
  ];

  return (
    <div className="min-h-screen bg-primary text-primary">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center gap-2 text-sm text-secondary mb-6">
          <Link href="/components" className="hover:text-primary">Components</Link>
          <span>/</span>
          <Link href="/components/auth" className="hover:text-primary">Authentication</Link>
          <span>/</span>
          <span>Basic Authentication</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Basic Authentication</h1>
          <p className="text-secondary text-lg mb-4">
            JWT-based authentication with registration, login, and middleware protection
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {["JWT", "bcrypt", "Express", "MongoDB"].map(tag => (
              <span key={tag} className="px-3 py-1 bg-surface text-secondary rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Installation</h2>
          <div className="space-y-4">
            <div className="bg-surface border border-default rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-secondary">Install dependencies</span>
                <button
                  onClick={() => copyToClipboard("npm install jsonwebtoken bcryptjs mongoose express", "install")}
                  className="text-sm text-accent hover:text-accent transition-colors"
                >
                  {copied === "install" ? "Copied!" : "Copy"}
                </button>
              </div>
              <code className="text-sm text-primary">npm install jsonwebtoken bcryptjs mongoose express</code>
            </div>
            
            <div className="bg-surface border border-default rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-secondary">API Routes</span>
                <button
                  onClick={() => copyToClipboard("POST /auth/register\nPOST /auth/login\nGET /auth/profile (protected)", "routes")}
                  className="text-sm text-accent hover:text-accent transition-colors"
                >
                  {copied === "routes" ? "Copied!" : "Copy"}
                </button>
              </div>
              <code className="text-sm text-primary">
                POST /auth/register<br/>
                POST /auth/login<br/>
                GET /auth/profile (protected)
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
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
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
          <h2 className="text-xl font-semibold mb-4">Usage</h2>
          <div className="bg-surface border border-default rounded-lg p-4">
            <ol className="text-secondary space-y-2 text-sm">
              <li>1. Create a User model in your models directory</li>
              <li>2. Set up your JWT_SECRET in environment variables</li>
              <li>3. Import and use the auth functions in your routes</li>
              <li>4. Use authMiddleware to protect routes that require authentication</li>
              <li>5. Send JWT token in Authorization header: Bearer &lt;token&gt;</li>
            </ol>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <div className="bg-code border border-default rounded-lg p-4">
            <code className="text-sm text-primary">
              JWT_SECRET=your_super_secret_jwt_key_here<br/>
              MONGODB_URI=mongodb://localhost:27017/your-database
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}