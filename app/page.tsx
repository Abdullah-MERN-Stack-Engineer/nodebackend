"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeroSection from "./components-ui/HeroSection";
import ComponentsGrid from "./components-ui/ComponentsGrid";
import ProblemSection from "./components-ui/ProblemSection";
import CTASection from "./components-ui/CTASection";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/components?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/components');
    }
  };

  return (
    <section className="relative flex flex-col items-center text-primary text-sm min-h-screen overflow-hidden">
      <HeroSection 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      <ComponentsGrid />
      <ProblemSection />
      <CTASection />
    </section>
  );
}