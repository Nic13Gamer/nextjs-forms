import Link from 'next/link';

type FormProps = {
  id: string;
  title: string;
  createdAt: Date;
};

export default function Form({ id, title, createdAt }: FormProps) {
  return (
    <>
      <Link
        href={`form/${id}`}
        className="rounded bg-neutral px-2 py-1 flex flex-col gap-2 text-neutral-content hover:bg-base-content"
      >
        <h1 className="text-xl">{title}</h1>

        <p className="text-sm hidden md:block">
          Created at: <strong>{createdAt.toUTCString()}</strong>
        </p>
      </Link>
    </>
  );
}
