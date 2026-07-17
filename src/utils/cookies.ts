export const setSharedCookie = (name: string, value: string) => {
  const isProd = window.location.hostname.endsWith('rankbeacon.dev');
  const domain = isProd ? '; domain=.rankbeacon.dev' : '';
  // Secure, Lax, 1-year max-age cookie shared across all subdomains
  document.cookie = `${name}=${encodeURIComponent(value)}${domain}; path=/; max-age=31536000; SameSite=Lax; Secure`;
};

export const getSharedCookie = (name: string): string => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop()?.split(';').shift() || '');
  return '';
};

export const deleteSharedCookie = (name: string) => {
  const isProd = window.location.hostname.endsWith('rankbeacon.dev');
  const domain = isProd ? '; domain=.rankbeacon.dev' : '';
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC${domain}; path=/; SameSite=Lax; Secure`;
};
