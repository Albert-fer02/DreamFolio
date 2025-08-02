"use client";

import * as React from "react";

export function Footer() {
  const [time, setTime] = React.useState('');
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="py-8 bg-black/50 text-muted-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
        <div className="flex justify-center items-center gap-6 mb-4">
          <span>Status: Available for opportunities</span>
          <span>Location: New York, USA</span>
          <span>Timezone: {time} (EST)</span>
        </div>
        <p>&copy; {new Date().getFullYear()} Dreamcoder08. All Rights Reserved.</p>
        <p>Visits: 1337</p>
      </div>
    </footer>
  );
} 