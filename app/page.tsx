"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/components?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/components');
    }
  };

  return (
    <section className="relative flex flex-col items-center text-primary text-sm min-h-screen overflow-hidden">
      {/* Enhanced Hero Section */}
      <div className="relative max-w-5xl mx-auto px-6 mt-20">
        {/* Status Badge */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 border border-default text-primary rounded-full px-4 py-2 bg-surface backdrop-blur">
            <div className="size-2.5 bg-success rounded-full bg-green-700 animate-pulse"></div>
            <span className="text-sm">30+ Production-Ready Components</span>
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-4 text-primary flex items-center justify-center gap-2">
            Production-Ready 
            <span className="flex items-center">
              N<svg class="size-5" viewBox="0 0 256 289" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
            <path d="M128 288.464c-3.975 0-7.685-1.06-11.13-2.915l-35.247-20.936c-5.3-2.915-2.65-3.975-1.06-4.505 7.155-2.385 8.48-2.915 15.9-7.156.796-.53 1.856-.265 2.65.265l27.032 16.166c1.06.53 2.385.53 3.18 0l105.74-61.217c1.06-.53 1.59-1.59 1.59-2.915V83.08c0-1.325-.53-2.385-1.59-2.915l-105.74-60.953c-1.06-.53-2.385-.53-3.18 0L20.405 80.166c-1.06.53-1.59 1.855-1.59 2.915v122.17c0 1.06.53 2.385 1.59 2.915l28.887 16.695c15.636 7.95 25.44-1.325 25.44-10.6V93.68c0-1.59 1.326-3.18 3.181-3.18h13.516c1.59 0 3.18 1.325 3.18 3.18v120.58c0 20.936-11.396 33.126-31.272 33.126-6.095 0-10.865 0-24.38-6.625l-27.827-15.9C4.24 220.885 0 213.465 0 205.515V83.346C0 75.396 4.24 67.976 11.13 64L116.87 2.783c6.625-3.71 15.635-3.71 22.26 0L244.87 64C251.76 67.975 256 75.395 256 83.346v122.17c0 7.95-4.24 15.37-11.13 19.345L139.13 286.08c-3.445 1.59-7.42 2.385-11.13 2.385zm32.596-84.009c-46.377 0-55.917-21.2-55.917-39.221 0-1.59 1.325-3.18 3.18-3.18h13.781c1.59 0 2.916 1.06 2.916 2.65 2.12 14.045 8.215 20.936 36.306 20.936 22.26 0 31.802-5.035 31.802-16.96 0-6.891-2.65-11.926-37.367-15.372-28.886-2.915-46.907-9.275-46.907-32.33 0-21.467 18.02-34.187 48.232-34.187 33.921 0 50.617 11.926 52.737 37.101 0 .795-.265 1.59-.795 2.385-.53.53-1.325 1.06-2.12 1.06h-13.78c-1.326 0-2.65-1.06-2.916-2.385-3.18-14.575-11.395-19.345-33.126-19.345-24.38 0-27.296 8.48-27.296 14.84 0 7.686 3.445 10.07 36.306 14.31 32.597 4.24 47.967 10.336 47.967 33.127-.265 23.321-19.345 36.571-53.002 36.571z" fill="#539E43"/>
        </svg>de.js
            </span>
            Components.
          </h1>
          <p className="text-xl md:text-2xl text-secondary mb-2">
            The Backend Components You Actually Need
          </p>
          <p className="text-base text-secondary max-w-2xl mx-auto">
            Get production-ready Node.js components for authentication, payments, chat, file storage, and more. 
            <span className="text-green-700 font-medium"> Own your code, own your data.</span>
          </p>
        </div>

        {/* Enhanced Search */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <form onSubmit={handleSearch} className="w-full max-w-2xl">
            <div className="relative">
              <div className="flex items-center bg-surface backdrop-blur border border-default rounded-xl px-4 py-4 group focus-within:ring-2 focus-within:ring-accent focus-within:border-accent transition-all">
                <svg className="w-5 h-5 text-secondary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search for auth, payments, chat, file upload..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-primary placeholder:text-secondary text-lg"
                />
                <kbd className="hidden sm:flex items-center gap-1 ml-3 px-2 py-1 text-xs text-secondary border border-default rounded bg-code">
                  <span>⌘</span><span>K</span>
                </kbd>
              </div>
            </div>
          </form>
          
          {/* Quick Actions */}
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/components" className="px-6 py-3 bg-green-700 hover:bg-green-800 text-white rounded-lg flex items-center gap-2 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Browse Components
            </Link>
            <Link href="/docs" className="px-6 py-3 border border-default hover:bg-surface text-primary rounded-lg font-medium transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Documentation
            </Link>
          </div>
        </div>

        {/* Popular Components Preview */}
        <div className="text-center">
          <p className="text-sm text-secondary mb-4">Popular components:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Authentication", "Stripe Payments", "Real-time Chat", "File Upload", "Email Service"].map((component) => (
              <span key={component} className="px-3 py-1 bg-surface text-secondary rounded-full text-sm border border-default hover:border-accent transition-colors cursor-pointer">
                {component}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choose Your Component</h2>
          <p className="text-secondary max-w-2xl mx-auto">Click on any component to explore sub-components and get production-ready code</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Authentication",
              description: "JWT, OAuth, 2FA, password reset, and more",
              href: "/components/auth",
              subCount: 9
            },
            {
              name: "Email Service",
              description: "SMTP, templates, bulk sending, verification",
              href: "/components/email",
              subCount: 6
            },
            {
              name: "Real-time Chat",
              description: "WebSocket, rooms, file sharing, moderation",
              href: "/components/chat",
              subCount: 8
            },
            {
              name: "Payment Processing",
              description: "Stripe, subscriptions, invoicing, refunds",
              href: "/components/payments",
              subCount: 8
            },
            {
              name: "File Storage",
              description: "AWS S3, local storage, image processing",
              href: "/components/file-storage",
              subCount: 8
            },
            {
              name: "CRUD API",
              description: "REST operations, filtering, validation",
              href: "/components/crud-api",
              subCount: 8
            }
          ].map((component) => (
            <Link
              key={component.name}
              href={component.href}
              className="group block py-6 px-8 bg-surface border border-default rounded-xl hover:border-accent hover:bg-code transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-1 text-xs text-secondary">
                  <span>{component.subCount}</span>
                  <span>components</span>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                {component.name}
              </h3>
              
              <p className="text-secondary text-sm mb-4">
                {component.description}
              </p>
              
              <div className="flex items-center text-accent text-sm font-medium">
                <span>Explore components</span>
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Problem Section */}
      <div className="max-w-4xl mx-auto px-6 mt-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">The Problem We Solve</h2>
          <p className="text-secondary text-lg leading-relaxed">
            Sometimes clients require custom solutions or developers prefer to write logic themselves, 
            but it's tedious to write the same code again and again. AI also generates buggy code that 
            we cannot rely upon, and sometimes we don't want to use 3rd party services like Clerk, 
            Firebase, or Supabase. So here's NodeBackend which gives production-ready and tested 
            backend components with a huge variety of more than 30+ components.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-secondary">Copy-paste ready components that work out of the box. No configuration needed.</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Production Ready</h3>
            <p className="text-secondary">Battle-tested code with proper error handling, validation, and security.</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Own Your Data</h3>
            <p className="text-secondary">No vendor lock-in. Host on your own servers with complete control.</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-20">
          <div>
            <div className="text-4xl font-bold text-accent mb-2">30+</div>
            <div className="text-secondary">Ready Components</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-accent mb-2">100%</div>
            <div className="text-secondary">Production Ready</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-accent mb-2">0</div>
            <div className="text-secondary">Vendor Lock-in</div>
          </div>
        </div>

        {/* Want More Components Section */}
        <div className="text-center py-16 border-t border-default mb-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Want More Components?</h2>
            <p className="text-secondary mb-8">
              Missing a component you need? We're constantly adding new production-ready components based on developer feedback.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:hello@nodebackend.com" className="px-8 py-3 bg-accent hover-accent text-white rounded-lg font-medium transition-colors">
                Request Component
              </a>
              <Link href="/components" className="px-8 py-3 border border-default hover:bg-surface text-primary rounded-lg font-medium transition-colors">
                Browse Existing
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-16 border-t border-default">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Faster?</h2>
          <p className="text-secondary mb-8 max-w-2xl mx-auto">
            Stop reinventing the wheel. Get production-ready backend components and focus on what makes your product unique.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/components" className="px-8 py-3 bg-green-700 hover:bg-green-900 hover-accent text-white rounded-lg font-medium transition-colors">
              Browse Components
            </Link>
            <Link href="/docs" className="px-8 py-3 border border-default hover:bg-surface text-primary rounded-lg font-medium transition-colors">
              View Documentation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}