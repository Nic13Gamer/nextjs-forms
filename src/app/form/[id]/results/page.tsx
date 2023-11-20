import FormResponse from '@/components/form/results/FormResponse';
import prisma from '@/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getForm(id: string) {
  const form = await prisma.form.findUnique({
    where: {
      id,
    },
  });

  return form;
}

async function getFormResponses(formId: string) {
  const formResponses = await prisma.formResponse.findMany({
    where: {
      formId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return formResponses;
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const form = await getForm(id);
  const formResponses = await getFormResponses(id);

  if (!form) notFound();

  return (
    <main className="container mx-auto p-4">
      <header className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">NextJS Forms</h1>

        <Link
          href="/"
          className="border-2 border-base-300 bg-base-200 px-10 py-1 rounded font-bold hover:bg-base-300"
        >
          Home
        </Link>
      </header>

      <div className="p-6" />

      <main className="bg-base-200 rounded-md xl:mx-64 py-4">
        <div className="pb-2">
          <h1 className="text-4xl font-semibold text-center">
            Results for form: {form.title}
          </h1>
          <h2 className="text-xl text-center">
            <b>{formResponses.length}</b> response
            {formResponses.length !== 1 && 's'}
          </h2>

          <div className="flex flex-col gap-4 py-4 px-4 xl:px-32 mt-2">
            {formResponses.map((r) => (
              <FormResponse key={r.id} form={form} response={r} />
            ))}
          </div>
        </div>
      </main>
    </main>
  );
}
