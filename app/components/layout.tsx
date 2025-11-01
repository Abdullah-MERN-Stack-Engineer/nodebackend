"use client";

import { usePathname } from "next/navigation";
import ComponentsSidebar from "../components-ui/ComponentsSidebar";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  const getActiveComponent = () => {
    const segments = pathname.split('/');
    if (segments.length >= 3) {
      return segments[2];
    }
    return "auth";
  };

  const activeComponent = getActiveComponent();

  return (
    <div className="min-h-screen bg-primary text-primary">
      <div className="flex">
        <ComponentsSidebar 
          activeComponent={activeComponent}
          setActiveComponent={() => {}}
        />
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}