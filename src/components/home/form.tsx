'use client';

import Link from 'next/link';
import { useState } from 'react';

type FormProps = {
  id: string;
  title: string;
  createdAt: Date;
};

export default function Form({ id, title, createdAt }: FormProps) {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Link
        href={`form/${id}`}
        className="rounded bg-neutral px-2 py-1 flex flex-col gap-2 text-neutral-content hover:bg-base-content"
        onClick={() => setLoading(true)}
      >
        <span className="flex gap-5 text-center justify-between">
          <h1 className="text-xl">{title}</h1>
          {loading && <span className="loading loading-spinner loading-md" />}
        </span>

        <p className="text-sm hidden md:block">
          Created at: <strong>{createdAt.toUTCString()}</strong>
        </p>
      </Link>
    </>
  );
}
