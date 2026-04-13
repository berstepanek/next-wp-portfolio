/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchGraphQL } from "../lib/graphql-client";

const ALL_POSTS_QUERY = `
  query AllPosts {
    posts(first: 10) {
      nodes {
        id
        title
        slug
        date
        excerpt
      }
    }
  }
`;

const POST_BY_SLUG_QUERY = `
  query PostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      content
      date
      slug
    }
  }
`;

export async function getAllPosts() {
  const data = await fetchGraphQL<{ posts: { nodes: any[] } }>(ALL_POSTS_QUERY);
  return data.posts.nodes;
}

export async function getPostBySlug(slug: string) {
  const data = await fetchGraphQL<{ post: any }>(POST_BY_SLUG_QUERY, { slug });
  return data.post;
}
