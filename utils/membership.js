/**
 * utils/membership.js
 * Simple localStorage helpers for gating access to ArtisAuc pages.
 */

export const MEMBERSHIP_KEY = 'artisauc_membership';

export function hasMembership() {
  if (typeof window === 'undefined') {
    return false;
  }
  const data = window.localStorage.getItem(MEMBERSHIP_KEY);
  return data === 'true' || !!data;
}

export function getMembershipDetails() {
  if (typeof window === 'undefined') {
    return null;
  }
  const data = window.localStorage.getItem(MEMBERSHIP_KEY);
  if (!data) return null;
  if (data === 'true') return { status: 'active' };
  try {
    return JSON.parse(data);
  } catch (e) {
    return { status: 'active' };
  }
}

export function setMembership(value) {
  if (typeof window === 'undefined') {
    return;
  }
  if (!value) {
    window.localStorage.removeItem(MEMBERSHIP_KEY);
  } else if (typeof value === 'object') {
    window.localStorage.setItem(MEMBERSHIP_KEY, JSON.stringify(value));
  } else {
    window.localStorage.setItem(MEMBERSHIP_KEY, 'true');
  }
}

export function clearMembership() {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.removeItem(MEMBERSHIP_KEY);
}
