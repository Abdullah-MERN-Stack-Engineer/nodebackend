import Link from "next/link";

interface ComponentsContentProps {
  activeComponent: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  componentsData: any;
  mainComponents: any[];
}

export default function ComponentsContent({ 
  activeComponent, 
  searchQuery, 
  setSearchQuery, 
  componentsData, 
  mainComponents 
}: ComponentsContentProps) {
  const filteredSubComponents = componentsData[activeComponent as keyof typeof componentsData]?.filter((component: any) =>
    component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    component.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || [];

  return (
    <div className="flex-1">
      <div className="p-6">
        {/* Header with Search */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {mainComponents.find(c => c.id === activeComponent)?.name} Components
            </h1>
            <p className="text-secondary">
              Production-ready {mainComponents.find(c => c.id === activeComponent)?.name.toLowerCase()} components
            </p>
          </div>
          
          <div className="w-80">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
              </svg>
              <input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-surface border border-default rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none text-primary"
              />
            </div>
          </div>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubComponents.map((component: any) => (
            <Link
              key={component.id}
              href={`/components/${activeComponent}/${component.id}`}
              className="group block p-6 bg-surface border border-default rounded-lg hover:border-accent transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
                  {component.name}
                </h3>
                <svg className="w-5 h-5 text-secondary group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              
              <p className="text-secondary text-sm mb-4">
                {component.description}
              </p>
              
              <div className="flex flex-wrap gap-1">
                {component.tags.map((tag: string) => (
                  <span key={tag} className="text-xs px-2 py-1 bg-code text-secondary rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {filteredSubComponents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-secondary">No components found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}