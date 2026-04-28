import { getAllPosts, getPost } from '@/lib/content';
import PostModal from '@/components/PostModal';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function InterceptedPostModal({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  return <PostModal post={post} />;
}
