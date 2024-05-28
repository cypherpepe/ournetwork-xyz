import { siteMetadata } from "@/constants";
import { getPost } from "@/lib/content";
import { convertToHumanReadableFormat } from "@/lib/utils";
import styles from "@/styles/Post.module.css";
import type { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata({ params }): Promise<Metadata> {
  const postSlug = params.postSlug;
  const post = await getPost(postSlug);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "website",
      title: post.title,
      description: post.excerpt,
      siteName: siteMetadata.name,
      images: [`${post.feature_image}`],
    },
  };
}

export default async function Post({ params }) {
  const postSlug = params.postSlug;
  let post: any = null;

  try {
    post = await getPost(postSlug);
  } catch (error) {
    console.error("Error fetching post:", error);
  }

  if (!post) {
    return <div>Post unavailable</div>;
  }

  return (
    <main className="font-sans">
      <div className={`${styles.container}`}>
        <article className={`${styles.article}`}>
          {post.title && <h1>{post.title}</h1>}
          {post.excerpt && <div className="text-xl text-gray-300">{post.excerpt}</div>}
          {post.published_at && <p className="text-xs">{convertToHumanReadableFormat(post.published_at)}</p>}
          {post.feature_image && <img src={post.feature_image} alt={post.title} />}
          {post.html && <div dangerouslySetInnerHTML={{ __html: post.html }} />}
        </article>
      </div>
    </main>
  );
}
