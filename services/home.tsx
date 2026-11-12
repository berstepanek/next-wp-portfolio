/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchGraphQL } from "../lib/graphql-client";
import { normalizeProject, PROJECT_ACF_FIELDS } from "./project";

// homeHighlight / homeProjects -> AcfContentNodeConnection => { nodes [ ... ] }
const ALL_HOMEPAGE_QUERY = `
  query HomePage {
    pageBy(uri: "/") {
      id
      title
      content
      homeAcf {
        homeHighlight {
          nodes {
            ... on Project {
              id
              title
              uri
              slug
              ${PROJECT_ACF_FIELDS}
            }
          }
        }
        homeProjects {
          nodes {
            ... on Project {
              id
              title
              uri
              slug
              ${PROJECT_ACF_FIELDS}
            }
          }
        }
      }
    }
  }
`;

export async function getHomePage() {
  const data = await fetchGraphQL<{ pageBy: any }>(ALL_HOMEPAGE_QUERY);
  const page = data.pageBy;
  if (!page?.homeAcf) return page;

  const { homeHighlight, homeProjects } = page.homeAcf;
  const highlight = homeHighlight?.nodes?.[0];

  return {
    ...page,
    homeAcf: {
      ...page.homeAcf,
      // Mise en avant : un seul projet attendu par la page d'accueil
      homeHighlight: highlight ? normalizeProject(highlight) : null,
      homeProjects: (homeProjects?.nodes ?? []).map(normalizeProject),
    },
  };
}
