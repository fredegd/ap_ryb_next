"use client";

import './BackgroundAnimation.css';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function BackgroundAnimation() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={`background-animation ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}>
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>

    </div>
  );
};


