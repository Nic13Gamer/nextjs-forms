import { QuestionType } from '../create-form/create-form';

export default function Question({ question }: { question: QuestionType }) {
  return (
    <div className="p-4">
      <h2 className="text-lg flex justify-between">
        {question.title}:<span className="text-red-600 font-semibold">*</span>
      </h2>

      <input
        className="border rounded-md text w-full px-2 py-1 bg-base-100 shadow outline-none focus:placeholder:opacity-0"
        type="text"
        name={question.id.toString()}
        placeholder="..."
        required
      />
    </div>
  );
}
