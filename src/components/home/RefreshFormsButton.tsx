'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { HiMiniArrowPath } from 'react-icons/hi2';

export default function RefreshFormsButton() {
  const [effect, setEffect] = useState(false);
  const router = useRouter();

  return (
    <button
      className="border border-neutral bg-base-300 text-neutral p-1 rounded"
      onClick={async () => {
        setEffect(true);
        router.refresh();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setEffect(false);
      }}
    >
      <div className={`${effect && 'animate-spin'}`}>
        <HiMiniArrowPath />
      </div>
    </button>
  );
}
