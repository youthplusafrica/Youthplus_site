/**
 * Event Promo Persistence Utility
 * 
 * Manages localStorage-based persistence for event promo modals/popups.
 * Rules:
 * - If user clicks CTA (books) once, never show again
 * - If user dismisses 3 consecutive times, never show again
 * - Dismissals reset if CTA is clicked
 */

export type PromoState = {
  hasBooked: boolean;
  dismissCount: number;
  permanentlyDismissed: boolean;
};

const STORAGE_PREFIX = "yplus.event.promo";

/**
 * Get storage keys for an event
 */
function getStorageKeys(eventId: string) {
  return {
    booked: `${STORAGE_PREFIX}:${eventId}:booked`,
    dismissCount: `${STORAGE_PREFIX}:${eventId}:dismissCount`,
  };
}

/**
 * Get current promo state for an event
 */
export function getPromoState(eventId: string): PromoState {
  if (typeof window === "undefined") {
    return { hasBooked: false, dismissCount: 0, permanentlyDismissed: false };
  }

  try {
    const keys = getStorageKeys(eventId);
    const hasBooked = localStorage.getItem(keys.booked) === "1";
    const dismissCountStr = localStorage.getItem(keys.dismissCount) || "0";
    const dismissCount = parseInt(dismissCountStr, 10) || 0;
    const permanentlyDismissed = hasBooked || dismissCount >= 3;

    return {
      hasBooked,
      dismissCount,
      permanentlyDismissed,
    };
  } catch {
    // localStorage unavailable or error - fail gracefully
    return { hasBooked: false, dismissCount: 0, permanentlyDismissed: false };
  }
}

/**
 * Mark event as booked (CTA clicked)
 */
export function markBooked(eventId: string): void {
  if (typeof window === "undefined") return;

  try {
    const keys = getStorageKeys(eventId);
    localStorage.setItem(keys.booked, "1");
    // Reset dismiss count since booking overrides dismissals
    localStorage.setItem(keys.dismissCount, "0");
  } catch {
    // localStorage unavailable - fail gracefully
  }
}

/**
 * Mark event as dismissed (increment dismiss count)
 */
export function markDismissed(eventId: string): void {
  if (typeof window === "undefined") return;

  try {
    const state = getPromoState(eventId);
    // Don't increment if already booked or permanently dismissed
    if (state.hasBooked || state.permanentlyDismissed) {
      return;
    }

    const keys = getStorageKeys(eventId);
    const newCount = state.dismissCount + 1;
    localStorage.setItem(keys.dismissCount, newCount.toString());
  } catch {
    // localStorage unavailable - fail gracefully
  }
}

/**
 * Check if promo should be shown for an event
 */
export function shouldShowPromo(eventId: string): boolean {
  const state = getPromoState(eventId);
  return !state.permanentlyDismissed && !state.hasBooked;
}

