"use client";

import { useState } from "react";
import BasicAuthComponent from "./auth/basic-auth/page";
import ForgotPasswordComponent from "./auth/forgot-password/page";
import BasicEmailComponent from "./email/basic-email/page";

const componentsData = {
  auth: [
    { id: "login", name: "Login", description: "User login with JWT authentication" },
    { id: "register", name: "Register", description: "User registration with validation" },
    { id: "logout", name: "Logout", description: "Secure user logout functionality" },
    { id: "forgot-password", name: "Forgot Password", description: "Password reset via email" },
    { id: "basic-auth", name: "Basic Auth", description: "Complete authentication system" }
  ],
  "file-storage": [
    { id: "aws-s3", name: "AWS S3 Upload", description: "Upload files to Amazon S3" },
    { id: "local-upload", name: "Local Upload", description: "Upload files to local storage" },
    { id: "image-resize", name: "Image Resize", description: "Resize images before upload" }
  ],
  payments: [
    { id: "stripe", name: "Stripe Integration", description: "Accept payments with Stripe" },
    { id: "paypal", name: "PayPal Integration", description: "Accept payments with PayPal" },
    { id: "subscriptions", name: "Subscriptions", description: "Recurring billing system" }
  ],
  "real-time": [
    { id: "websocket", name: "WebSocket", description: "Real-time communication" },
    { id: "chat", name: "Chat System", description: "Real-time chat application" },
    { id: "notifications", name: "Notifications", description: "Real-time notifications" }
  ]
};

const categories = [
  { id: "auth", name: "Authentication" },
  { id: "file-storage", name: "File Storage" },
  { id: "payments", name: "Payment" },
  { id: "real-time", name: "Real Time" }
];

export default function ComponentsPage() {
  const [activeCategory, setActiveCategory] = useState("auth");
  const [activeSubComponent, setActiveSubComponent] = useState("");

  const renderComponentContent = () => {
    if (activeSubComponent) {
      if (activeCategory === "auth" && activeSubComponent === "basic-auth") {
        return <BasicAuthComponent />;
      }
      if (activeCategory === "auth" && activeSubComponent === "forgot-password") {
        return <ForgotPasswordComponent />;
      }
      if (activeCategory === "file-storage" && activeSubComponent === "aws-s3") {
        return <BasicEmailComponent />;
      }
      
      return (
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4 text-primary">{componentsData[activeCategory as keyof typeof componentsData]?.find(c => c.id === activeSubComponent)?.name}</h1>
          <p className="text-secondary mb-6">{componentsData[activeCategory as keyof typeof componentsData]?.find(c => c.id === activeSubComponent)?.description}</p>
          <div className="bg-surface border border-default rounded-lg p-6">
            <p className="text-secondary">Component implementation coming soon...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-primary">{categories.find(c => c.id === activeCategory)?.name} Components</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {componentsData[activeCategory as keyof typeof componentsData]?.map((component) => (
            <div
              key={component.id}
              onClick={() => setActiveSubComponent(component.id)}
              className="p-6 bg-surface border border-default rounded-lg hover:border-accent transition-colors cursor-pointer group"
            >
              <h3 className="text-lg font-semibold mb-2 text-primary group-hover:text-accent">{component.name}</h3>
              <p className="text-secondary text-sm">{component.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-primary text-primary flex">
      {/* Sidebar */}
      <div className="w-80 bg-surface border-r border-default h-screen sticky top-0 overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-6">Components</h2>
          
          {categories.map((category) => (
            <div key={category.id} className="mb-6">
              <button
                onClick={() => {
                  setActiveCategory(category.id);
                  setActiveSubComponent("");
                }}
                className={`w-full text-left font-semibold mb-3 px-3 py-2 rounded-lg transition-colors ${
                  activeCategory === category.id
                    ? "bg-accent text-white"
                    : "text-secondary hover:text-primary hover:bg-code"
                }`}
              >
                {category.name}
              </button>
              
              {activeCategory === category.id && (
                <div className="ml-4 space-y-1">
                  {componentsData[category.id as keyof typeof componentsData]?.map((subComponent) => (
                    <button
                      key={subComponent.id}
                      onClick={() => setActiveSubComponent(subComponent.id)}
                      className={`w-full text-left text-sm px-3 py-2 rounded transition-colors ${
                        activeSubComponent === subComponent.id
                          ? "bg-code text-primary"
                          : "text-secondary hover:text-primary hover:bg-code"
                      }`}
                    >
                      {subComponent.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {renderComponentContent()}
      </div>
    </div>
  );
}