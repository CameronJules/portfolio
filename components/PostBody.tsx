export default function PostBody({ title, contentHtml }: { title: string; contentHtml: string }) {
  return (
    <div className="p-8 overflow-y-auto h-full">
      <h1 className="text-3xl font-bold mb-8">{title}</h1>
      <div
        className="post-body"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </div>
  );
}
