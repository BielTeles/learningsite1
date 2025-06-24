"use client";

import { useReportWebVitals } from 'next/web-vitals';

// Type for analytics provider
type AnalyticsProvider = {
  track: (_eventName: string, _properties: Record<string, unknown>) => void;
};

// Mock analytics provider for development
const analyticsProvider: AnalyticsProvider = {
  track: (_eventName: string, _properties: Record<string, unknown>) => {
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(`[Web Vitals] ${_eventName}:`, _properties);
    }
  }
};

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Track web vitals for analytics
    analyticsProvider.track('web-vital', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
      timestamp: Date.now(),
      url: typeof window !== 'undefined' ? window.location.href : '',
    });

    // Send to external analytics service in production
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      // Send to Google Analytics 4 if available
      if ('gtag' in window && typeof window.gtag === 'function') {
        window.gtag('event', metric.name, {
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          metric_rating: metric.rating,
          metric_id: metric.id,
          metric_delta: metric.delta,
        });
      }
    }
  });

  return null;
} 