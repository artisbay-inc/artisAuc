/**
 * utils/membership.js
 * Simple localStorage helpers for gating access to ArtisAuc pages.
 */

export const MEMBERSHIP_KEY = 'artisauc_membership';

export function hasMembership() {
  if (typeof window === 'undefined') {
    return false;
  }
  return window.localStorage.getItem(MEMBERSHIP_KEY) === 'true';
}

export function setMembership(value) {
  if (typeof window === 'undefined') {
    return;
  }
  if (value) {
    window.localStorage.setItem(MEMBERSHIP_KEY, 'true');
  } else {
    window.localStorage.removeItem(MEMBERSHIP_KEY);
  }
}
