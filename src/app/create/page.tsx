import CreateForm from '@/components/create-form/CreateForm';
import prisma from '@/db';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { redirect } from 'next/navigation';

async function createForm(questions: object, formData: FormData) {
  'use server';

  const title = formData.get('title')?.toString();
  if (!questions || !title) return;

  await prisma.form.create({
    data: {
      title,
      questions: JSON.stringify(questions),
    },
  });

  revalidatePath('/');
  redirect('/');
}

export default function Page() {
  return (
    <main className="container mx-auto p-4">
      <header className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">NextJS Forms</h1>

        <Link
          className="border-2 border-base-300 bg-base-200 px-10 py-1 rounded font-bold hover:bg-base-300"
          href="/"
        >
          Cancel
        </Link>
      </header>

      <div className="p-6" />

      <CreateForm createFormAction={createForm} />
    </main>
  );
}
