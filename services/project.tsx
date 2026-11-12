/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchGraphQL } from "../lib/graphql-client";

// Champs SCF exposés par WPGraphQL for ACF (v2) :
// - image   -> AcfMediaItemConnectionEdge  => { node { ... } }
// - galerie -> AcfMediaItemConnection      => { nodes [ ... ] }
const MEDIA_FIELDS = `
  id
  sourceUrl
  altText
  mediaDetails {
    width
    height
  }
`;

export const PROJECT_ACF_FIELDS = `
  projectAcf {
    projectName
    projectTitle
    projectDescription
    projectIsOnline
    projectImage {
      node { ${MEDIA_FIELDS} }
    }
    projectGallery {
      nodes { ${MEDIA_FIELDS} }
    }
  }
`;

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
        uri
        ${PROJECT_ACF_FIELDS}
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
      uri
      ${PROJECT_ACF_FIELDS}
    }
  }
`;

/**
 * Aplatit les connexions WPGraphQL for ACF v2 pour garder la forme
 * utilisée par les composants : projectImage.sourceUrl, projectGallery[].
 */
export function normalizeProject(project: any) {
  if (!project?.projectAcf) return project;
  const acf = project.projectAcf;
  return {
    ...project,
    projectAcf: {
      ...acf,
      projectImage: acf.projectImage?.node ?? null,
      projectGallery: acf.projectGallery?.nodes ?? [],
    },
  };
}

export async function getAllProjects() {
  const data = await fetchGraphQL<{ projects: { nodes: any[] } }>(
    ALL_PROJECTS_QUERY,
  );

  return data.projects.nodes.map(normalizeProject);
}

export async function getProjectBySlug(slug: string) {
  const data = await fetchGraphQL<{ project: any }>(PROJECT_BY_SLUG_QUERY, {
    slug,
  });
  return normalizeProject(data.project);
}
