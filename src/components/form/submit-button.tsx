'use client';

import { useFormStatus } from 'react-dom';

export default function SubmitButton() {
  const status = useFormStatus();

  return (
    <button
      className="border-2 text-center text-neutral-content text-xl border-neutral-content bg-neutral w-full mt-2 py-3 rounded font-bold hover:bg-base-content disabled:opacity-80 disabled:cursor-not-allowed"
      type="submit"
      disabled={status.pending}
    >
      {status.pending ? (
        <span className="loading loading-spinner loading-sm" />
      ) : (
        'Submit'
      )}
    </button>
  );
}
