import Form from '@/components/home/Form';
import RefreshFormsButton from '@/components/home/RefreshFormsButton';
import prisma from '@/db';
import Link from 'next/link';

export const revalidate = 30;

async function getForms() {
  return await prisma.form.findMany({
    select: { id: true, title: true, createdAt: true },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export default async function Home() {
  const forms = await getForms();

  return (
    <main className="container mx-auto p-4">
      <header className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">NextJS Forms</h1>

        <Link
          className="border-2 border-base-300 bg-base-200 px-10 py-1 rounded font-bold hover:bg-base-300"
          href="/create"
        >
          Create form
        </Link>
      </header>

      <div className="p-6" />

      <main className="bg-base-200 rounded-md lg:mx-32 py-4">
        <div className="flex gap-3 justify-center items-center pb-2">
          <h2 className="text-2xl font-semibold inline">Forms</h2>
          <RefreshFormsButton />
        </div>

        <div className="grid grid-cols-2 gap-2 md:gap-x-24 gap-y-4 px-8">
          {forms.map((form) => (
            <Form key={form.id} {...form} />
          ))}
        </div>
      </main>
    </main>
  );
}
