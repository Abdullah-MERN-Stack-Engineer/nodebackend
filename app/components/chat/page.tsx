"use client";

import Link from "next/link";

export default function ChatComponent() {
  const subComponents = [
    {
      id: "basic-chat",
      name: "Basic Real-time Chat",
      description: "WebSocket-based chat with Socket.io and message history",
      tags: ["Socket.io", "WebSocket", "Real-time"]
    },
    {
      id: "chat-rooms",
      name: "Chat Rooms",
      description: "Create and manage multiple chat rooms with permissions",
      tags: ["Rooms", "Permissions", "Management"]
    },
    {
      id: "private-messaging",
      name: "Private Messaging",
      description: "One-on-one private messaging between users",
      tags: ["Private", "Direct", "Messaging"]
    },
    {
      id: "file-sharing",
      name: "File Sharing in Chat",
      description: "Share files, images, and documents in chat",
      tags: ["Files", "Images", "Upload"]
    },
    {
      id: "typing-indicators",
      name: "Typing Indicators",
      description: "Show when users are typing in real-time",
      tags: ["Typing", "Indicators", "Real-time"]
    },
    {
      id: "message-reactions",
      name: "Message Reactions",
      description: "React to messages with emojis and reactions",
      tags: ["Reactions", "Emojis", "Interactive"]
    },
    {
      id: "chat-moderation",
      name: "Chat Moderation",
      description: "Moderate chat with word filters and user management",
      tags: ["Moderation", "Filters", "Admin"]
    },
    {
      id: "voice-chat",
      name: "Voice Chat",
      description: "WebRTC-based voice chat integration",
      tags: ["Voice", "WebRTC", "Audio"]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
          <Link href="/components" className="hover:text-white">Components</Link>
          <span>/</span>
          <span>Real-time Chat</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Real-time Chat Components</h1>
          <p className="text-slate-400 text-lg mb-4">
            Complete chat system with rooms, messaging, file sharing, and moderation
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {["Socket.io", "WebSocket", "Real-time", "Rooms", "File Sharing"].map(tag => (
              <span key={tag} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subComponents.map((component) => (
            <Link
              key={component.id}
              href={`/components/chat/${component.id}`}
              className="group block p-6 bg-slate-900 border border-slate-800 rounded-lg hover:border-[#539E43] transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold group-hover:text-[#539E43] transition-colors">
                  {component.name}
                </h3>
                <svg className="w-5 h-5 text-slate-400 group-hover:text-[#539E43] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              
              <p className="text-slate-400 text-sm mb-4">
                {component.description}
              </p>
              
              <div className="flex flex-wrap gap-1">
                {component.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 bg-slate-800 text-slate-300 rounded">
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