'use client';

import * as React from 'react';
import Link from 'next/link';
import { X, Shield, ChevronDown, ChevronUp } from 'lucide-react';

interface ConsentState {
  necessary: boolean; // always true
  analytics: boolean;
  functional: boolean;
}

interface ConsentRecord {
  categories: ConsentState;
  timestamp: string;
  policyVersion: string;
}

const CONSENT_STORAGE_KEY = 'astrell_cookie_consent';
const COOKIE_POLICY_VERSION = '2026-08-02'; // Update when Cookie Policy changes

/**
 * Self-built cookie consent banner with true script-blocking.
 * No analytics/functional scripts load until explicit consent is given.
 * Implements Google Consent Mode v2 pattern.
 */
export default function CookieConsent() {
  const [showBanner, setShowBanner] = React.useState(false);
  const [showDetails, setShowDetails] = React.useState(false);
  const [consent, setConsent] = React.useState<ConsentState>({
    necessary: true,
    analytics: false,
    functional: false,
  });

  // Check for existing consent on mount
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (stored) {
        const parsed: ConsentRecord = JSON.parse(stored);
        setConsent(parsed.categories);
        // Inject scripts based on stored consent
        if (parsed.categories.analytics) {
          injectAnalytics();
        }
      } else {
        // No consent recorded — show banner
        setShowBanner(true);
      }
    } catch {
      setShowBanner(true);
    }

    // Set Google Consent Mode v2 defaults (deny all until consent)
    setGoogleConsentDefaults();
  }, []);

  /** Set Google Consent Mode v2 default state — deny everything non-essential */
  function setGoogleConsentDefaults() {
    if (typeof window !== 'undefined') {
      // Initialize dataLayer
      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(arguments);
      }
      // Default consent state: deny all
      gtag('consent', 'default', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'functionality_storage': 'denied',
        'personalization_storage': 'denied',
        'security_storage': 'granted', // Always granted for security cookies
      });
    }
  }

  /** Update Google Consent Mode with user's choices */
  function updateGoogleConsent(categories: ConsentState) {
    if (typeof window !== 'undefined') {
      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(arguments);
      }
      gtag('consent', 'update', {
        'analytics_storage': categories.analytics ? 'granted' : 'denied',
        'functionality_storage': categories.functional ? 'granted' : 'denied',
        'personalization_storage': categories.functional ? 'granted' : 'denied',
        // Ad categories stay denied unless a Marketing category is added
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
      });
    }
  }

  /** Conditionally inject GA4 script — only after analytics consent */
  function injectAnalytics() {
    if (typeof window === 'undefined') return;
    
    // Only inject if not already present
    if (document.getElementById('ga4-script')) return;
    
    const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    if (!GA_MEASUREMENT_ID) {
      console.info('[CookieConsent] GA4 measurement ID not configured — analytics script not loaded.');
      return;
    }

    // Inject GA4 script tag
    const script = document.createElement('script');
    script.id = 'ga4-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Configure GA4
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      send_page_view: true,
    });
  }

  /** Record consent and apply it */
  function saveConsent(categories: ConsentState) {
    const record: ConsentRecord = {
      categories,
      timestamp: new Date().toISOString(),
      policyVersion: COOKIE_POLICY_VERSION,
    };

    // Save to localStorage
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));

    // Update Google Consent Mode
    updateGoogleConsent(categories);

    // Conditionally inject scripts
    if (categories.analytics) {
      injectAnalytics();
    }

    // Log to Supabase (stubbed — will no-op without credentials)
    logConsentToSupabase(record);

    setConsent(categories);
    setShowBanner(false);
  }

  /** Stub: log consent to Supabase — gracefully no-ops without credentials */
  async function logConsentToSupabase(record: ConsentRecord) {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey) {
        console.info('[CookieConsent] Supabase not configured — consent logged locally only.');
        return;
      }

      // When Supabase is connected, insert into consent_logs table
      await fetch(`${supabaseUrl}/rest/v1/consent_logs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          categories: record.categories,
          timestamp: record.timestamp,
          policy_version: record.policyVersion,
        }),
      });
    } catch (err) {
      console.warn('[CookieConsent] Failed to log consent to Supabase:', err);
    }
  }

  function handleAcceptAll() {
    saveConsent({ necessary: true, analytics: true, functional: true });
  }

  function handleAcceptSelected() {
    saveConsent(consent);
  }

  function handleRejectNonEssential() {
    saveConsent({ necessary: true, analytics: false, functional: false });
  }

  if (!showBanner) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
      role="dialog"
      aria-label="Cookie consent"
      aria-modal="true"
    >
      <div className="max-w-2xl mx-auto bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
        {/* Header */}
        <div className="p-5 md:p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex items-center gap-2.5">
              <Shield size={18} className="text-[#FF3E00] shrink-0" aria-hidden="true" />
              <h2 className="font-display font-bold text-sm uppercase tracking-wider text-white">
                Cookie Preferences
              </h2>
            </div>
          </div>
          <p className="text-neutral-400 text-xs md:text-sm font-light leading-relaxed">
            We use cookies to ensure our website works properly, understand how you use it, and improve your experience.
            Non-essential cookies are only set with your consent.{' '}
            <Link href="/legal/cookie-policy" className="text-[#FF3E00] hover:underline">
              Read our Cookie Policy
            </Link>
          </p>

          {/* Expandable categories */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-500 uppercase tracking-widest mt-4 hover:text-white transition-colors"
            aria-expanded={showDetails}
            aria-controls="cookie-details"
          >
            {showDetails ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            Manage preferences
          </button>

          {showDetails && (
            <div id="cookie-details" className="mt-4 space-y-3">
              {/* Strictly Necessary */}
              <label className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="mt-0.5 accent-[#FF3E00] cursor-not-allowed"
                  aria-label="Strictly necessary cookies (always active)"
                />
                <div>
                  <div className="text-xs font-medium text-white">Strictly Necessary</div>
                  <div className="text-[11px] text-neutral-500 font-light mt-0.5">
                    Essential for the website to function. Cannot be disabled.
                  </div>
                </div>
              </label>

              {/* Analytics */}
              <label className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 cursor-pointer hover:border-white/10 transition-colors">
                <input
                  type="checkbox"
                  checked={consent.analytics}
                  onChange={(e) => setConsent(prev => ({ ...prev, analytics: e.target.checked }))}
                  className="mt-0.5 accent-[#FF3E00]"
                  aria-label="Analytics cookies"
                />
                <div>
                  <div className="text-xs font-medium text-white">Analytics</div>
                  <div className="text-[11px] text-neutral-500 font-light mt-0.5">
                    Help us understand how visitors use our website (e.g. Google Analytics).
                  </div>
                </div>
              </label>

              {/* Functional */}
              <label className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 cursor-pointer hover:border-white/10 transition-colors">
                <input
                  type="checkbox"
                  checked={consent.functional}
                  onChange={(e) => setConsent(prev => ({ ...prev, functional: e.target.checked }))}
                  className="mt-0.5 accent-[#FF3E00]"
                  aria-label="Functional cookies"
                />
                <div>
                  <div className="text-xs font-medium text-white">Functional</div>
                  <div className="text-[11px] text-neutral-500 font-light mt-0.5">
                    Remember your preferences for a more personalised experience.
                  </div>
                </div>
              </label>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="px-5 pb-5 md:px-6 md:pb-6 flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleAcceptAll}
            className="flex-1 bg-[#FF3E00] text-white hover:bg-[#E03600] py-2.5 px-4 rounded-xl font-display font-bold text-xs tracking-wider uppercase transition-all duration-200 shadow-lg shadow-[#FF3E00]/10"
            id="cookie-accept-all"
          >
            Accept All
          </button>
          {showDetails && (
            <button
              onClick={handleAcceptSelected}
              className="flex-1 bg-white/5 text-white hover:bg-white/10 py-2.5 px-4 rounded-xl font-display font-bold text-xs tracking-wider uppercase transition-all duration-200 border border-white/10"
              id="cookie-accept-selected"
            >
              Save Preferences
            </button>
          )}
          <button
            onClick={handleRejectNonEssential}
            className="flex-1 bg-transparent text-neutral-400 hover:text-white py-2.5 px-4 rounded-xl font-mono text-[10px] tracking-wider uppercase transition-all duration-200"
            id="cookie-reject"
          >
            Reject Non-Essential
          </button>
        </div>
      </div>
    </div>
  );
}
