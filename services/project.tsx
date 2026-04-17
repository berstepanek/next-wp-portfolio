/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchGraphQL } from "../lib/graphql-client";

const ALL_PROJECTS_QUERY = `
  query {
    projects(
      first: 20
      where: {
        orderby: { field: DATE, order: ASC }
      }
    ){
      nodes {
        id
        title
        slug
        projectAcf{
          projectName
          projectIsonline
        }
        
      }
    }
  }
`;

const PROJECT_BY_SLUG_QUERY = `
  query ($slug: ID!){
    project(id: $slug, idType: SLUG) {
      id
      title
      slug
      projectAcf{
        projectIsonline
        projectTitle
        projectGallery{
          id
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }         
        }
      }
    }
  }
`;

export async function getAllProjects() {
  const data = await fetchGraphQL<{ projects: { nodes: any[] } }>(
    ALL_PROJECTS_QUERY,
  );

  return data.projects;
}

export async function getProjectBySlug(slug: string) {
  const data = await fetchGraphQL<{ project: any }>(PROJECT_BY_SLUG_QUERY, {
    slug,
  });
  return data.project;
}
