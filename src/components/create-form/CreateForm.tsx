'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';

import { HiXCircle } from 'react-icons/hi2';

export type QuestionType = {
  id: number;
  type: string;
  title: string;
};

function SubmitButton() {
  const status = useFormStatus();

  return (
    <button
      className="border-2 text-neutral-content text-center text-2xl border-neutral-content bg-neutral w-full mt-6 py-5 rounded font-bold hover:bg-base-content disabled:opacity-80 disabled:cursor-not-allowed"
      type="submit"
      disabled={status.pending}
    >
      {status.pending ? (
        <span className="loading loading-spinner loading-md" />
      ) : (
        'Create Form'
      )}
    </button>
  );
}

export default function CreateForm({ createFormAction }: any) {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const submitFormAction = createFormAction.bind(null, questions);

  const [addQuestionModal, setAddQuestionModal] = useState(false);
  const [removeQuestionMode, setRemoveQuestionMode] = useState(false);

  function createQuestion(data: FormData) {
    const title = data.get('title')?.toString();
    if (!title) return;

    const id = questions[questions.length - 1]
      ? questions[questions.length - 1].id + 1
      : 0;

    const newQuestion = {
      id,
      type: 'text',
      title,
    };

    setQuestions([...questions, newQuestion]);
    setAddQuestionModal(false);
  }

  function removeQuestion(id: number) {
    const questionsArray = questions;

    const question = questions.find((q) => {
      return q.id === id;
    });
    if (!question) return;

    const index = questionsArray.indexOf(question);
    if (index > -1) {
      questionsArray.splice(index, 1);
    }
    setQuestions(questionsArray);

    // workaround for refreshing questions
    setRemoveQuestionMode(false);
  }

  return (
    <main className="bg-base-200 rounded-xl p-4">
      <form action={submitFormAction}>
        <div className="flex justify-center">
          <input
            className="border rounded-md text-2xl font-semibold w-full xl:mx-32 px-2 py-1 text-center bg-base-100 shadow outline-none focus:placeholder:opacity-0"
            type="text"
            name="title"
            placeholder="Form title"
            required
          />
        </div>

        <div className="flex xl:mx-32 justify-between gap-8 text-neutral-content py-4">
          <button
            className="border-2 border-neutral-content bg-neutral w-full px-10 py-1 rounded font-bold hover:bg-base-content"
            type="button"
            onClick={() => setAddQuestionModal(true)}
          >
            Add question
          </button>

          <button
            className="border-2 border-neutral-content bg-neutral w-full px-10 py-1 rounded font-bold hover:bg-base-content"
            type="button"
            onClick={() => setRemoveQuestionMode(!removeQuestionMode)}
          >
            Remove question
          </button>
        </div>

        <div className="xl:mx-32 flex flex-col gap-2 mt-6">
          {questions.map((question) => (
            <div
              key={question.id}
              className="flex justify-between bg-base-300 rounded-lg md:w-[60%]"
            >
              <div className="flex flex-col gap-2 p-2">
                <h2 className="text-lg">
                  Question: <b>{question.title}</b>
                </h2>
                <p className="text">
                  Answer type: <b>{question.type}</b>
                </p>
              </div>

              {removeQuestionMode && (
                <button
                  className="bg-red-500 rounded-lg w-[20%] text-neutral flex justify-center items-center hover:bg-red-800 hover:text-neutral-content transition"
                  type="button"
                  onClick={() => removeQuestion(question.id)}
                >
                  <HiXCircle size={64} />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between gap-8 xl:mx-32 text-center">
          <SubmitButton />

          <Link
            className="border-2 text-neutral-content text-2xl border-neutral-content bg-neutral w-full mt-6 py-5 rounded font-bold hover:bg-base-content"
            href="/"
          >
            Cancel
          </Link>
        </div>
      </form>

      {addQuestionModal && (
        <form
          action={createQuestion}
          className="absolute inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center"
        >
          <div className="bg-base-200 rounded-lg p-4">
            <h1 className="text-2xl font-semibold text-center mb-3">
              Create Question
            </h1>

            <div className="flex flex-col">
              <input
                className="border rounded-md text-lg font-semibold w-full px-2 py-1 text-center bg-base-100 shadow outline-none focus:placeholder:opacity-0"
                type="text"
                name="title"
                placeholder="Question title"
                required
              />
            </div>

            <div className="flex gap-2 justify-between text-neutral-content mt-4">
              <button
                className="border-2 border-neutral-content bg-neutral w-full px-10 py-1 rounded font-bold hover:bg-base-content"
                type="submit"
              >
                Create
              </button>
              <button
                className="border-2 border-neutral-content bg-neutral w-full px-10 py-1 rounded font-bold hover:bg-base-content"
                type="button"
                onClick={() => setAddQuestionModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
    </main>
  );
}
