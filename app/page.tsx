import { getAllPosts } from '@/lib/content';
import ProfileHeader from '@/components/ProfileHeader';
import PostGrid from '@/components/PostGrid';

export default async function Home() {
  const posts = await getAllPosts();
  return (
    <main className="max-w-[1800px] mx-auto px-4 sm:px-16 lg:px-36">
      <ProfileHeader />
      <PostGrid posts={posts} />
    </main>
  );
}
