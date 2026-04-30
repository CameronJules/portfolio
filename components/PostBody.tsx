import CommentBlock from './CommentBlock';

function formatEditorialDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  }).format(parsed);
}

function stripImages(html: string): string {
  return html
    .replace(/<img[^>]*\/?>/gi, '')
    .replace(/<p[^>]*>\s*<\/p>/gi, '')
    .trim();
}

function parseSections(html: string): { heading: string; contentHtml: string }[] {
  const segments = html.split(/(<h2[^>]*>[\s\S]*?<\/h2>)/);
  const sections: { heading: string; contentHtml: string }[] = [];

  for (let i = 1; i < segments.length; i += 2) {
    const heading = segments[i].replace(/<[^>]+>/g, '').trim();
    const contentHtml = stripImages((segments[i + 1] ?? '').trim());
    if (heading) sections.push({ heading, contentHtml });
  }

  return sections;
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
  const sections = parseSections(contentHtml);

  return (
    <div className="h-full overflow-y-auto px-7 py-6 md:px-8 md:py-7">
      <header className="border-b border-neutral-300 pb-2">
        <h1
          className="text-[11pt] leading-[1.2] text-neutral-900 font-semibold pb-1"
          style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
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
      <p
        className="pt-3 pb-1 text-[9.5pt] text-neutral-400"
        style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
      >
        comments
      </p>
      <div className="pt-2">
        {sections.map((s, i) => (
          <CommentBlock key={i} heading={s.heading} contentHtml={s.contentHtml} />
        ))}
      </div>
    </div>
  );
}
