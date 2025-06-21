"use client";

export function SectionSkeleton() {
  return (
    <div className="py-24 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header skeleton */}
        <div className="text-center mb-16">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-32 mx-auto mb-4"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-96 mx-auto mb-6"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full max-w-3xl mx-auto"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full max-w-2xl mx-auto"></div>
          </div>
        </div>

        {/* Content skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-background border border-border rounded-2xl p-8">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-2xl mb-6"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="space-y-2 mb-6">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
              </div>
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto"></div>
          <div className="space-y-4">
            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded w-full max-w-4xl mx-auto"></div>
            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded w-full max-w-3xl mx-auto"></div>
          </div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full max-w-3xl mx-auto"></div>
          <div className="flex gap-4 justify-center">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-40"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          </div>
        </div>
      </div>
    </div>
  );
} 