"use client";

import { useState } from "react";
import Link from "next/link";

const chatServerCode = `// chat.js - Basic Real-time Chat Server
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const Message = require('./models/Message');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"]
  }
});

// Store active users
const activeUsers = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join room
  socket.on('join-room', async (data) => {
    const { roomId, userId, username } = data;
    
    socket.join(roomId);
    activeUsers.set(socket.id, { userId, username, roomId });
    
    // Notify others in room
    socket.to(roomId).emit('user-joined', {
      userId,
      username,
      message: \`\${username} joined the chat\`
    });
    
    // Send recent messages
    try {
      const messages = await Message.find({ roomId })
        .populate('userId', 'username')
        .sort({ createdAt: -1 })
        .limit(50);
      
      socket.emit('previous-messages', messages.reverse());
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  });

  // Handle new message
  socket.on('send-message', async (data) => {
    const { roomId, message, userId } = data;
    const user = activeUsers.get(socket.id);
    
    if (!user) return;
    
    try {
      // Save message to database
      const newMessage = new Message({
        content: message,
        userId,
        roomId,
        timestamp: new Date()
      });
      
      await newMessage.save();
      await newMessage.populate('userId', 'username');
      
      // Broadcast to room
      io.to(roomId).emit('new-message', {
        id: newMessage._id,
        content: newMessage.content,
        username: newMessage.userId.username,
        timestamp: newMessage.timestamp,
        userId: newMessage.userId._id
      });
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    const user = activeUsers.get(socket.id);
    if (user) {
      socket.to(user.roomId).emit('user-left', {
        username: user.username,
        message: \`\${user.username} left the chat\`
      });
      activeUsers.delete(socket.id);
    }
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(\`Chat server running on port \${PORT}\`);
});

module.exports = { app, server, io };`;

const messageModelCode = `// models/Message.js - Message Model
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  roomId: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  messageType: {
    type: String,
    enum: ['text', 'image', 'file', 'system'],
    default: 'text'
  }
}, {
  timestamps: true
});

messageSchema.index({ roomId: 1, timestamp: -1 });

module.exports = mongoose.model('Message', messageSchema);`;

const clientCode = `// client/chat.js - Client-side Chat Implementation
const socket = io(process.env.REACT_APP_SERVER_URL);

class ChatClient {
  constructor(roomId, userId, username) {
    this.roomId = roomId;
    this.userId = userId;
    this.username = username;
    this.setupEventListeners();
  }

  // Join chat room
  joinRoom() {
    socket.emit('join-room', {
      roomId: this.roomId,
      userId: this.userId,
      username: this.username
    });
  }

  // Send message
  sendMessage(message) {
    if (message.trim()) {
      socket.emit('send-message', {
        roomId: this.roomId,
        message: message.trim(),
        userId: this.userId
      });
    }
  }

  // Setup event listeners
  setupEventListeners() {
    // Receive new messages
    socket.on('new-message', (data) => {
      this.displayMessage(data);
    });

    // Receive previous messages
    socket.on('previous-messages', (messages) => {
      messages.forEach(msg => this.displayMessage(msg));
    });

    // User joined
    socket.on('user-joined', (data) => {
      this.displaySystemMessage(data.message);
    });

    // User left
    socket.on('user-left', (data) => {
      this.displaySystemMessage(data.message);
    });
  }

  // Display message in UI
  displayMessage(data) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.innerHTML = \`
      <div class="message-header">
        <span class="username">\${data.username}</span>
        <span class="timestamp">\${new Date(data.timestamp).toLocaleTimeString()}</span>
      </div>
      <div class="message-content">\${data.content}</div>
    \`;
    document.getElementById('messages').appendChild(messageElement);
  }

  // Display system message
  displaySystemMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'system-message';
    messageElement.textContent = message;
    document.getElementById('messages').appendChild(messageElement);
  }

  // Disconnect
  disconnect() {
    socket.disconnect();
  }
}

// Usage example
const chat = new ChatClient('room1', 'user123', 'John Doe');
chat.joinRoom();

module.exports = ChatClient;`;

export default function BasicChatComponent() {
  const [activeTab, setActiveTab] = useState("server");
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const tabs = [
    { id: "server", label: "Chat Server", code: chatServerCode },
    { id: "model", label: "Message Model", code: messageModelCode },
    { id: "client", label: "Client Code", code: clientCode }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
          <Link href="/components" className="hover:text-white">Components</Link>
          <span>/</span>
          <Link href="/components/chat" className="hover:text-white">Real-time Chat</Link>
          <span>/</span>
          <span>Basic Real-time Chat</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Basic Real-time Chat</h1>
          <p className="text-slate-400 text-lg mb-4">
            WebSocket-based chat with Socket.io, message history, and room management
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {["Socket.io", "WebSocket", "Real-time", "MongoDB"].map(tag => (
              <span key={tag} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Installation</h2>
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Install dependencies</span>
                <button
                  onClick={() => copyToClipboard("npm install socket.io express mongoose", "install")}
                  className="text-sm text-[#539E43] hover:text-[#4a8a3c] transition-colors"
                >
                  {copied === "install" ? "Copied!" : "Copy"}
                </button>
              </div>
              <code className="text-sm text-slate-300">npm install socket.io express mongoose</code>
            </div>
            
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Socket Events</span>
                <button
                  onClick={() => copyToClipboard("join-room, send-message, new-message, user-joined, user-left", "events")}
                  className="text-sm text-[#539E43] hover:text-[#4a8a3c] transition-colors"
                >
                  {copied === "events" ? "Copied!" : "Copy"}
                </button>
              </div>
              <code className="text-sm text-slate-300">
                join-room, send-message, new-message<br/>
                user-joined, user-left, previous-messages
              </code>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex border-b border-slate-700 mb-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-[#539E43] border-b-2 border-[#539E43]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-lg">
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <span className="text-sm text-slate-400">
                {tabs.find(t => t.id === activeTab)?.label}
              </span>
              <button
                onClick={() => copyToClipboard(tabs.find(t => t.id === activeTab)?.code || "", activeTab)}
                className="flex items-center gap-2 px-3 py-1 bg-[#539E43] hover:bg-[#4a8a3c] text-white text-sm rounded transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                {copied === activeTab ? "Copied!" : "Copy Code"}
              </button>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-slate-300">
                {tabs.find(t => t.id === activeTab)?.code}
              </code>
            </pre>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Usage</h2>
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
            <ol className="text-slate-300 space-y-2 text-sm">
              <li>1. Start the Socket.io server with Express</li>
              <li>2. Connect client to server with room and user info</li>
              <li>3. Join room to receive and send messages</li>
              <li>4. Handle real-time events for messaging</li>
              <li>5. Store messages in MongoDB for persistence</li>
            </ol>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
            <code className="text-sm text-slate-300">
              FRONTEND_URL=http://localhost:3000<br/>
              MONGODB_URI=mongodb://localhost:27017/chat<br/>
              PORT=5000
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}