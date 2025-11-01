import Link from "next/link";

const components = [
  {
    name: "Authentication",
    description: "JWT, OAuth, 2FA, password reset, and more",
    href: "/components?component=auth",
    subCount: 9
  },
  {
    name: "Email Service",
    description: "SMTP, templates, bulk sending, verification",
    href: "/components?component=email",
    subCount: 6
  },
  {
    name: "Real-time Chat",
    description: "WebSocket, rooms, file sharing, moderation",
    href: "/components?component=chat",
    subCount: 8
  },
  {
    name: "Payment Processing",
    description: "Stripe, subscriptions, invoicing, refunds",
    href: "/components?component=payments",
    subCount: 8
  },
  {
    name: "File Storage",
    description: "AWS S3, local storage, image processing",
    href: "/components?component=file-storage",
    subCount: 8
  },
  {
    name: "CRUD API",
    description: "REST operations, filtering, validation",
    href: "/components?component=crud-api",
    subCount: 8
  }
];

export default function ComponentsGrid() {
  return (
    <div className="max-w-6xl mx-auto px-6 mt-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Choose Your Component</h2>
        <p className="text-secondary max-w-2xl mx-auto">Click on any component to explore sub-components and get production-ready code</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {components.map((component) => (
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
  );
}