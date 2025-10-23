import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <svg className="w-4 h-4 md:w-4 md:h-4 lg:w-6 lg:h-6 mx-1" viewBox="0 0 256 289" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
                <path d="M128 288.464c-3.975 0-7.685-1.06-11.13-2.915l-35.247-20.936c-5.3-2.915-2.65-3.975-1.06-4.505 7.155-2.385 8.48-2.915 15.9-7.156.796-.53 1.856-.265 2.65.265l27.032 16.166c1.06.53 2.385.53 3.18 0l105.74-61.217c1.06-.53 1.59-1.59 1.59-2.915V83.08c0-1.325-.53-2.385-1.59-2.915l-105.74-60.953c-1.06-.53-2.385-.53-3.18 0L20.405 80.166c-1.06.53-1.59 1.855-1.59 2.915v122.17c0 1.06.53 2.385 1.59 2.915l28.887 16.695c15.636 7.95 25.44-1.325 25.44-10.6V93.68c0-1.59 1.326-3.18 3.181-3.18h13.516c1.59 0 3.18 1.325 3.18 3.18v120.58c0 20.936-11.396 33.126-31.272 33.126-6.095 0-10.865 0-24.38-6.625l-27.827-15.9C4.24 220.885 0 213.465 0 205.515V83.346C0 75.396 4.24 67.976 11.13 64L116.87 2.783c6.625-3.71 15.635-3.71 22.26 0L244.87 64C251.76 67.975 256 75.395 256 83.346v122.17c0 7.95-4.24 15.37-11.13 19.345L139.13 286.08c-3.445 1.59-7.42 2.385-11.13 2.385zm32.596-84.009c-46.377 0-55.917-21.2-55.917-39.221 0-1.59 1.325-3.18 3.18-3.18h13.781c1.59 0 2.916 1.06 2.916 2.65 2.12 14.045 8.215 20.936 36.306 20.936 22.26 0 31.802-5.035 31.802-16.96 0-6.891-2.65-11.926-37.367-15.372-28.886-2.915-46.907-9.275-46.907-32.33 0-21.467 18.02-34.187 48.232-34.187 33.921 0 50.617 11.926 52.737 37.101 0 .795-.265 1.59-.795 2.385-.53.53-1.325 1.06-2.12 1.06h-13.78c-1.326 0-2.65-1.06-2.916-2.385-3.18-14.575-11.395-19.345-33.126-19.345-24.38 0-27.296 8.48-27.296 14.84 0 7.686 3.445 10.07 36.306 14.31 32.597 4.24 47.967 10.336 47.967 33.127-.265 23.321-19.345 36.571-53.002 36.571z" fill="#539E43"/>
              </svg>
              <span className="text-lg font-semibold">NodeBackend</span>
            </Link>
            <p className="text-slate-400 text-sm">
              Production-ready Node.js components for faster backend development.
            </p>
          </div>

          {/* Components */}
          <div>
            <h3 className="font-semibold mb-4">Components</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/components/auth" className="hover:text-[#539E43]">Authentication</Link></li>
              <li><Link href="/components/email" className="hover:text-[#539E43]">Email Service</Link></li>
              <li><Link href="/components/chat" className="hover:text-[#539E43]">Real-time Chat</Link></li>
              <li><Link href="/components/payments" className="hover:text-[#539E43]">Payments</Link></li>
              <li><Link href="/components/file-storage" className="hover:text-[#539E43]">File Storage</Link></li>
              <li><Link href="/components/crud-api" className="hover:text-[#539E43]">CRUD API</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/docs" className="hover:text-[#539E43]">Documentation</Link></li>
              <li><Link href="/components" className="hover:text-[#539E43]">Browse Components</Link></li>
              <li><a href="mailto:hello@nodebackend.com" className="hover:text-[#539E43]">Request Component</a></li>
              <li><a href="mailto:support@nodebackend.com" className="hover:text-[#539E43]">Support</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="https://github.com/nodebackend" className="hover:text-[#539E43]">GitHub</a></li>
              <li><a href="https://twitter.com/nodebackend" className="hover:text-[#539E43]">Twitter</a></li>
              <li><a href="mailto:hello@nodebackend.com" className="hover:text-[#539E43]">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © 2024 NodeBackend. All rights reserved.
          </p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-slate-400 hover:text-[#539E43] text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-slate-400 hover:text-[#539E43] text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}