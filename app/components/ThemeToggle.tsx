"use client";
import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light'|'dark'>(() => (typeof window!=="undefined" && localStorage.getItem('theme') === 'dark') ? 'dark' : 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      aria-label="تغيير وضع العرض"
      className="fixed z-50 left-5 bottom-6 rounded-full px-3 py-2 shadow-md bg-[var(--color-card)] border border-[var(--color-border)] text-lg font-bold hover:bg-[var(--color-hover)] opacity-90"
      style={{ transition:'background 0.2s', minWidth:44, minHeight:44 }}
      onClick={()=>setTheme(t=>t==='dark'?'light':'dark')}
    >
      {theme==='dark' ? '☀️ نهاري' : '🌙 ليلي'}
    </button>
  );
}
