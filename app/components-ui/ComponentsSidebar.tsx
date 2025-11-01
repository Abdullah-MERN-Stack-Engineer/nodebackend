"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface ComponentsSidebarProps {
  activeComponent: string;
  setActiveComponent: (component: string) => void;
}

const mainComponents = [
  { id: "auth", name: "Authentication" },
  { id: "email", name: "Email Service" },
  { id: "chat", name: "Real-time Chat" },
  { id: "payments", name: "Payment Processing" },
  { id: "file-storage", name: "File Storage" },
  { id: "crud-api", name: "CRUD API" }
];

export default function ComponentsSidebar({ activeComponent }: ComponentsSidebarProps) {
  const searchParams = useSearchParams();
  const currentComponent = searchParams.get('component') || 'auth';

  return (
    <div className="w-64 rounded-md bg-surface h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Components</h2>
        <nav className="space-y-2">
          {mainComponents.map((component) => (
            <Link
              key={component.id}
              href={`/components?component=${component.id}`}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors block ${
                currentComponent === component.id
                  ? 'bg-accent text-white'
                  : 'text-secondary hover:bg-code hover:text-primary'
              }`}
            >
              {component.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}