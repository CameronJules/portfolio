import CommentBlock from './CommentBlock';

function formatEditorialDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;

  const currentYear = new Date().getFullYear();
  const postYear = parsed.getFullYear();

  const base = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
  }).format(parsed);

  return postYear < currentYear ? `${base} ${postYear}` : base;
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
      <header className="border-b border-neutral-300 pb-4 -mx-7 px-7 md:-mx-8 md:px-8">
        <h1
          className="text-[11pt] leading-[1.2] text-neutral-900 font-semibold"
          style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        >
          {title}
        </h1>
        {description ? (
          <p
            className="mt-2 text-[11pt] leading-[1] text-neutral-800"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            {description}
          </p>
        ) : null}
        <p
          className="mt-2 text-[10pt] leading-none text-neutral-400"
          style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        >
          {formatEditorialDate(date)}
        </p>
      </header>
      <p
        className="pt-3 pb-0 text-[9.5pt] text-neutral-400"
        style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
      >
        comments
      </p>
      <div className="pt-0">
        {sections.map((s, i) => (
          <CommentBlock key={i} heading={s.heading} contentHtml={s.contentHtml} />
        ))}
      </div>
    </div>
  );
}
