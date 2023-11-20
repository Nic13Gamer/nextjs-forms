import { QuestionType } from '@/components/create-form/CreateForm';
import Question from '@/components/form/Question';
import prisma from '@/db';
import { Form } from '@prisma/client';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

async function getForm(id: string) {
  const form = await prisma.form.findUnique({
    where: {
      id,
    },
  });

  return form;
}

async function submitForm(
  questions: QuestionType[],
  form: Form,
  data: FormData
) {
  'use server';

  let responses: any = [];
  questions.map((q) => {
    const answer = data.get(q.id.toString());

    if (!answer) return;

    const response = {
      questionId: q.id.toString(),
      answer,
    };
    responses.push(response);
  });

  await prisma.formResponse.create({
    data: {
      response: JSON.stringify(responses),
      formId: form.id,
    },
  });

  redirect('/');
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const form = await getForm(id);

  if (!form || !form.questions) notFound();
  const questions = JSON.parse(form?.questions) as QuestionType[];

  const submitFormAction = submitForm.bind(null, questions).bind(null, form);

  return (
    <main className="container mx-auto p-4">
      <header className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">NextJS Forms</h1>
      </header>

      <div className="p-6" />

      <main className="bg-base-200 rounded-md xl:mx-64 py-4">
        <div className="pb-2">
          <h1 className="text-4xl font-semibold text-center">{form.title}</h1>

          <form
            action={submitFormAction}
            className="flex flex-col gap-4 py-4 px-4 xl:px-32"
          >
            <div className="rounded-lg bg-base-300">
              {questions.map((question) => (
                <Question key={question.id} question={question} />
              ))}

              <div className="flex justify-between gap-5 p-4">
                <button
                  className="border-2 text-center text-neutral-content text-xl border-neutral-content bg-neutral w-full mt-2 py-3 rounded font-bold hover:bg-base-content"
                  type="submit"
                >
                  Submit
                </button>
                <Link
                  href="/"
                  className="border-2 text-center text-neutral-content text-xl border-neutral-content bg-neutral w-full mt-2 py-3 rounded font-bold hover:bg-base-content"
                >
                  Cancel
                </Link>
              </div>

              <div className="p-4">
                <p>
                  This form is not made by <b>NextJS Forms</b>, do not submit
                  personal details.
                </p>
                <p>Created at {form.createdAt.toUTCString()}</p>
              </div>
            </div>
          </form>
        </div>
      </main>
    </main>
  );
}
