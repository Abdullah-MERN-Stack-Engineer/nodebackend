"use client";

import Link from "next/link";

export default function CrudApiComponent() {
  const subComponents = [
    {
      id: "basic-crud",
      name: "Basic CRUD Operations",
      description: "Create, Read, Update, Delete operations with MongoDB",
      tags: ["CRUD", "MongoDB", "REST API"]
    },
    {
      id: "advanced-filtering",
      name: "Advanced Filtering",
      description: "Complex queries with filtering, sorting, and pagination",
      tags: ["Filtering", "Sorting", "Pagination"]
    },
    {
      id: "data-validation",
      name: "Data Validation",
      description: "Input validation with Joi and express-validator",
      tags: ["Validation", "Joi", "Security"]
    },
    {
      id: "api-versioning",
      name: "API Versioning",
      description: "Version your APIs for backward compatibility",
      tags: ["Versioning", "Compatibility", "REST"]
    },
    {
      id: "bulk-operations",
      name: "Bulk Operations",
      description: "Handle bulk create, update, and delete operations",
      tags: ["Bulk", "Performance", "Batch"]
    },
    {
      id: "search-functionality",
      name: "Search Functionality",
      description: "Full-text search with Elasticsearch integration",
      tags: ["Search", "Elasticsearch", "Full-text"]
    },
    {
      id: "data-export",
      name: "Data Export",
      description: "Export data to CSV, Excel, and JSON formats",
      tags: ["Export", "CSV", "Excel"]
    },
    {
      id: "audit-logging",
      name: "Audit Logging",
      description: "Track all data changes with audit trails",
      tags: ["Audit", "Logging", "History"]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
          <Link href="/components" className="hover:text-white">Components</Link>
          <span>/</span>
          <span>CRUD API</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">CRUD API Components</h1>
          <p className="text-slate-400 text-lg mb-4">
            Complete REST API system with advanced filtering, validation, and data operations
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {["REST API", "MongoDB", "Validation", "Search", "Export"].map(tag => (
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
              href={`/components/crud-api/${component.id}`}
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