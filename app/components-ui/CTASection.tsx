import Link from "next/link";

export default function CTASection() {
  return (
    <div className="max-w-4xl mx-auto px-6">
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
          <Link href="/components" className="px-8 py-3 bg-accent hover-accent text-white rounded-lg font-medium transition-colors">
            Browse Components
          </Link>
          <Link href="/docs" className="px-8 py-3 border border-default hover:bg-surface text-primary rounded-lg font-medium transition-colors">
            View Documentation
          </Link>
        </div>
      </div>
    </div>
  );
}