'use client';

import { useState } from 'react';

function toPascalCase(str: string): string {
  return str
    .replace(/<[^>]+>/g, '')
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
}

function splitBlocks(html: string): [string, string] {
  const match = html.match(/^(<(?:p|ul|ol)[^>]*>[\s\S]*?<\/(?:p|ul|ol)>)/);
  if (!match) return [html, ''];
  const first = match[1];
  const rest = html.slice(first.length).trim();
  return [first, rest];
}

function unwrapParagraph(html: string): string {
  return html.replace(/^<p[^>]*>([\s\S]*?)<\/p>$/, '$1');
}

export default function CommentBlock({
  heading,
  contentHtml,
}: {
  heading: string;
  contentHtml: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const username = toPascalCase(heading);
  const [first, rest] = splitBlocks(contentHtml);
  const hasMore = rest.length > 0;
  const firstInline = unwrapParagraph(first);

  return (
    <div className="py-2.5 border-b border-neutral-100 last:border-0 text-[11pt] leading-[1.4] pb-6">
      <p>
        <span
          className="font-bold text-neutral-900 mr-1"
          style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        >
          {username}
        </span>
        <span
          className="text-neutral-800"
          style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          dangerouslySetInnerHTML={{ __html: firstInline }}
        />
        {hasMore && !expanded && (
          <button
            onClick={() => setExpanded(true)}
            className="ml-1 text-neutral-400 text-[10.5pt] hover:text-neutral-500 transition-colors"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            more
          </button>
        )}
      </p>
      {expanded && (
        <div
          className="post-comment-rest"
          dangerouslySetInnerHTML={{ __html: rest }}
        />
      )}
    </div>
  );
}
