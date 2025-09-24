import React, { useEffect } from 'react';

// Sets a custom purple arrow cursor via CSS data URL
export default function CustomCursor() {
  useEffect(() => {
    // Simple purple arrow SVG (20x28) with hotspot at 0 0
    const svg = encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="28" viewBox="0 0 20 28">\n  <path d="M2 2 L2 22 L7 18 L11 26 L14 24 L10 16 L16 16 Z" fill="#7e22ce" stroke="#4c1d95" stroke-width="1.5" stroke-linejoin="round"/>\n</svg>'
    );
    const url = `url("data:image/svg+xml,${svg}") 0 0, auto`;
    const prev = document.body.style.cursor;
    document.body.style.cursor = url;
    return () => {
      document.body.style.cursor = prev;
    };
  }, []);
  return null;
}

