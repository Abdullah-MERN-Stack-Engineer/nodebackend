"use client";

import Link from "next/link";

export default function FileStorageComponent() {
  const subComponents = [
    {
      id: "aws-s3-upload",
      name: "AWS S3 File Upload",
      description: "Upload files to Amazon S3 with presigned URLs",
      tags: ["AWS S3", "Upload", "Presigned URLs"]
    },
    {
      id: "local-file-storage",
      name: "Local File Storage",
      description: "Store files locally with Multer and file management",
      tags: ["Local", "Multer", "File System"]
    },
    {
      id: "image-processing",
      name: "Image Processing",
      description: "Resize, crop, and optimize images with Sharp",
      tags: ["Images", "Sharp", "Processing"]
    },
    {
      id: "file-validation",
      name: "File Validation",
      description: "Validate file types, sizes, and security checks",
      tags: ["Validation", "Security", "File Types"]
    },
    {
      id: "cdn-integration",
      name: "CDN Integration",
      description: "Serve files through CloudFront or other CDNs",
      tags: ["CDN", "CloudFront", "Performance"]
    },
    {
      id: "file-compression",
      name: "File Compression",
      description: "Compress files and archives with ZIP support",
      tags: ["Compression", "ZIP", "Archives"]
    },
    {
      id: "file-sharing",
      name: "File Sharing",
      description: "Generate shareable links with expiration and permissions",
      tags: ["Sharing", "Links", "Permissions"]
    },
    {
      id: "backup-system",
      name: "File Backup System",
      description: "Automated file backup and recovery system",
      tags: ["Backup", "Recovery", "Automation"]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
          <Link href="/components" className="hover:text-white">Components</Link>
          <span>/</span>
          <span>File Storage</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">File Storage Components</h1>
          <p className="text-slate-400 text-lg mb-4">
            Complete file management with AWS S3, local storage, processing, and sharing
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {["AWS S3", "Image Processing", "File Validation", "CDN", "Backup"].map(tag => (
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
              href={`/components/file-storage/${component.id}`}
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