export default function ProblemSection() {
  return (
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
    </div>
  );
}