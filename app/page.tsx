import { getAllPosts } from '@/lib/content';
import ProfileHeader from '@/components/ProfileHeader';
import PostGrid from '@/components/PostGrid';

export default async function Home() {
  const posts = await getAllPosts();
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <ProfileHeader />
      <PostGrid posts={posts} />
    </main>
  );
}
