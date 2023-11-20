import { QuestionType } from '@/components/create-form/CreateForm';
import { Form, FormResponse } from '@prisma/client';

type FormResponseType = {
  questionId: string;
  answer: string;
};

export default function FormResponse({
  form,
  response,
}: {
  form: Form;
  response: FormResponse;
}) {
  const questions = JSON.parse(form?.questions) as QuestionType[];
  const responseArray = JSON.parse(response.response) as FormResponseType[];

  return (
    <div className="rounded-lg bg-base-300 p-4">
      {questions.map((q) => (
        <p key={q.id}>
          {q.title}:{' '}
          <span className="font-semibold">
            {
              responseArray.find((r) => {
                return r.questionId === q.id.toString();
              })?.answer
            }
          </span>
        </p>
      ))}
    </div>
  );
}
