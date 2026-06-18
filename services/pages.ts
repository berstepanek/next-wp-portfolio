/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchGraphQL } from "../lib/graphql-client";

const ALL_PAGES_QUERY = `
  query AllPages {
    pages(first: 100) {
      nodes {
        id
        title
        slug
      }
    }
  }
`;

const PAGE_BY_SLUG_QUERY = `
  query PageBySlug($slug: ID!) {
    page(id: $slug, idType: URI) {
      id
      title
      content
      slug
    }
  }
`;

export async function getAllPages() {
  const data = await fetchGraphQL<{ pages: { nodes: any[] } }>(ALL_PAGES_QUERY);
  return data.pages.nodes;
}

export async function getPageBySlug(slug: string) {
  const data = await fetchGraphQL<{ page: any }>(PAGE_BY_SLUG_QUERY, { slug });
  return data.page;
}
