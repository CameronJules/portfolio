function formatEditorialDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  }).format(parsed);
}

export default function PostBody({
  title,
  description,
  date,
  contentHtml,
}: {
  title: string;
  description: string;
  date: string;
  contentHtml: string;
}) {
  return (
    <div className="h-full overflow-y-auto px-7 py-6 md:px-8 md:py-7">
      <header className="border-b border-neutral-300 pb-4">
        <h1
          className="text-[12pt] leading-[1.2] text-neutral-900 pb-1"
          style={{ fontFamily: 'Georgia, Times New Roman, serif' }}
        >
          {title}
        </h1>
        {description ? (
          <p
            className="mt-1 text-[11pt] leading-[1] text-neutral-500 pb-2"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            {description}
          </p>
        ) : null}
        <p
          className="mt-2 text-[10pt] leading-none text-neutral-500"
          style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        >
          {formatEditorialDate(date)}
        </p>
      </header>
      <div
        className="post-body pt-2"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </div>
  );
}
