/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchGraphQL } from "../lib/graphql-client";

const ALL_THEATRES_QUERY = `
    query {
        theatres {
            nodes {
                id
                title
                slug
            }
        }
    }
`;

const THEATRE_BY_SLUG_QUERY = `
  query ($slug: ID!){
    theatre(id: $slug, idType: SLUG) {
      id
      title
      slug
     
    }
  }
`;

export async function getAllTheatres() {
  const data = await fetchGraphQL<{ theatres: { nodes: any[] } }>(
    ALL_THEATRES_QUERY,
  );
  return data.theatres.nodes;
}

export async function getTheatreBySlug(slug: string) {
  const data = await fetchGraphQL<{ theatre: any }>(THEATRE_BY_SLUG_QUERY, {
    slug,
  });
  return data.theatre;
}
