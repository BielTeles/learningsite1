import { Suspense } from "react";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { LazySection } from "@/components/performance/lazy-section";
import { SectionSkeleton } from "@/components/performance/loading-skeleton";
import { OrganizationSchema, WebsiteSchema, ServiceSchema } from "@/components/seo/structured-data";

// Lazy load components for better performance
import dynamic from "next/dynamic";

const About = dynamic(() => import("@/components/sections/about").then(mod => ({ default: mod.About })), {
  loading: () => <SectionSkeleton />,
  ssr: true
});

const Services = dynamic(() => import("@/components/sections/services").then(mod => ({ default: mod.Services })), {
  loading: () => <SectionSkeleton />,
  ssr: true
});

const Projects = dynamic(() => import("@/components/sections/projects").then(mod => ({ default: mod.Projects })), {
  loading: () => <SectionSkeleton />,
  ssr: true
});

const Team = dynamic(() => import("@/components/sections/team").then(mod => ({ default: mod.Team })), {
  loading: () => <SectionSkeleton />,
  ssr: true
});

const Contact = dynamic(() => import("@/components/sections/contact").then(mod => ({ default: mod.Contact })), {
  loading: () => <SectionSkeleton />,
  ssr: true
});

const Footer = dynamic(() => import("@/components/sections/footer").then(mod => ({ default: mod.Footer })), {
  loading: () => <div className="h-96 bg-background" />,
  ssr: true
});

export default function Home() {
  return (
    <>
      {/* Structured Data for SEO */}
      <OrganizationSchema />
      <WebsiteSchema />
      <ServiceSchema />
      
      <Header />
      <main>
        {/* Hero is critical, load immediately */}
        <Hero />
        
        {/* Other sections use lazy loading */}
        <LazySection fallback={<SectionSkeleton />}>
          <Suspense fallback={<SectionSkeleton />}>
            <About />
          </Suspense>
        </LazySection>

        <LazySection fallback={<SectionSkeleton />}>
          <Suspense fallback={<SectionSkeleton />}>
            <Services />
          </Suspense>
        </LazySection>

        <LazySection fallback={<SectionSkeleton />}>
          <Suspense fallback={<SectionSkeleton />}>
            <Projects />
          </Suspense>
        </LazySection>

        <LazySection fallback={<SectionSkeleton />}>
          <Suspense fallback={<SectionSkeleton />}>
            <Team />
          </Suspense>
        </LazySection>

        <LazySection fallback={<SectionSkeleton />}>
          <Suspense fallback={<SectionSkeleton />}>
            <Contact />
          </Suspense>
        </LazySection>
      </main>
      
      <LazySection fallback={<div className="h-96 bg-background" />}>
        <Suspense fallback={<div className="h-96 bg-background" />}>
          <Footer />
        </Suspense>
      </LazySection>
    </>
  );
}
