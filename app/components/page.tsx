"use client";

import { useState } from "react";
import Link from "next/link";

const components = [
  {
    id: "auth",
    name: "Authentication",
    description: "JWT-based auth with login, register, and middleware",
    category: "Security",
    tags: ["JWT", "Middleware", "Express"]
  },
  {
    id: "email",
    name: "Email Service",
    description: "Send emails with templates using Nodemailer",
    category: "Communication",
    tags: ["Nodemailer", "Templates", "SMTP"]
  },
  {
    id: "chat",
    name: "Real-time Chat",
    description: "WebSocket-based chat with rooms and messaging",
    category: "Communication",
    tags: ["Socket.io", "WebSocket", "Real-time"]
  },
  {
    id: "payments",
    name: "Payment Processing",
    description: "Stripe integration for payments and subscriptions",
    category: "Commerce",
    tags: ["Stripe", "Payments", "Webhooks"]
  },
  {
    id: "file-storage",
    name: "File Storage",
    description: "Upload and manage files with AWS S3 or local storage",
    category: "Storage",
    tags: ["AWS S3", "Multer", "File Upload"]
  },
  {
    id: "crud-api",
    name: "CRUD API",
    description: "RESTful API with MongoDB/PostgreSQL operations",
    category: "Database",
    tags: ["REST", "MongoDB", "PostgreSQL"]
  }
];

export default function ComponentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(components.map(c => c.category)))];
  
  const filteredComponents = components.filter(component => {
    const matchesSearch = component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         component.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || component.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-black text-white">
     

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Backend Components</h1>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.3-4.3"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search components..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-[#539E43] focus:border-transparent outline-none"
                />
              </div>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm transition ${
                    selectedCategory === category
                      ? "bg-[#539E43] text-white"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComponents.map(component => (
            <Link
              key={component.id}
              href={`/components/${component.id}`}
              className="group block p-6 bg-slate-900 border border-slate-800 rounded-lg hover:border-[#539E43] transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold group-hover:text-[#539E43] transition-colors">
                  {component.name}
                </h3>
                <span className="text-xs px-2 py-1 bg-slate-800 text-slate-400 rounded">
                  {component.category}
                </span>
              </div>
              
              <p className="text-slate-400 text-sm mb-4 line-clamp-2">
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

        {filteredComponents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400">No components found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}