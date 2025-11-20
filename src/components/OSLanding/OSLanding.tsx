'use client';

import { useState } from 'react';
import BootScreen from './BootScreen';
import Desktop from './Desktop';

export default function OSLanding() {
  const [isBooted, setIsBooted] = useState(false);

  const handleBootComplete = () => {
    setIsBooted(true);
  };

  return (
    <>
      {!isBooted && <BootScreen onBootComplete={handleBootComplete} />}
      {isBooted && <Desktop />}
    </>
  );
}
