/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchGraphQL } from "../lib/graphql-client";

const ACF_CREATIONS_PAGE = `
  query CreationsPage {
    pageBy(uri: "/creations") {
      id
      title
      creations_page_acf {
        creationsPageHighlightingEvent {
          ... on Creation {
            id
            title
            slug
            creation_acf{
              creationIsonline
              creationDisplayauthor
              creationAuthor
              creationTitle
              creationTitleAdaptation
              creationShortdescription
              creationDescription
              creationAffiche{
                sourceUrl
                altText
              }
              creationPhoto{
                sourceUrl
                altText
              }
              creationBandeannonce{
                mediaItemUrl
                title
                mimeType
                fileSize
              }
              creationBookingLink
              creationDates{
                creationDatesDay
                creationDatesHour
                creationDatesLieu
              }
            }
          }
        }
        creationsPageList{
          ... on Creation {
            id
            title
            slug
            creation_acf{
              creationAffiche{
                sourceUrl
                altText
              }
              creationShortdescription
              creationBookingLink
              creationDates{
                creationDatesDay
                creationDatesHour
                creationDatesLieu
              }
            }
          }
        }
      }
    }
  }
`;

const ALL_CREATIONS_QUERY = `
    query {
        creations (where: { notIn: ["cG9zdDoyMjA"] }) {
            nodes {
              id
              title
              slug
              creation_acf{
                creationIsonline
                creationAffiche{
                  sourceUrl
                  altText
                }
                creationShortdescription
                creationBookingLink
                creationDates{
                  creationDatesDay
                  creationDatesHour
                  creationDatesLieu
                }
              }
            }
        }
    }
`;

const CREATION_BY_SLUG_QUERY = `
  query ($slug: ID!){
    creation(id: $slug, idType: SLUG) {
      id
      title
      slug
      creation_acf{
        creationIsonline
        creationDisplayauthor
        creationAuthor
        creationTitle
        creationTitleAdaptation
        creationShortdescription
        creationDescription
        creationPhoto{
          sourceUrl
          altText
        }
        creationAffiche{
          sourceUrl
          altText
        }
        creationGallery{
          id
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }         
        }
        creationBandeannonce{
          mediaItemUrl
          title
          mimeType
          fileSize
        }
        creationVideo01{
          mediaItemUrl
          title
          mimeType
          fileSize
        }
        creationVideo02{
          mediaItemUrl
          title
          mimeType
          fileSize
        }
        creationTheatre{
          ... on Theatre {
              id
              title
              slug
              theatre_acf{
                theatreName
                theatreAddress
                theatreCity
                theatrePostalcode
              }
          }
        }
        creationBookingLink
        creationDates{
          creationDatesDay
          creationDatesHour
          creationDatesLieu
        }
        creationRoles{
          creationRolesName
          creationRolesActor{
            ... on Member {
              id
              title
              slug
              member_acf{
                memberName
                memberIsonline
                memberCivility
                memberCompetencesMan
                memberCompetencesWomen
                memberPhoto {
                  sourceUrl
                  altText
                }
              }
            }
          }
        }
        creationEquipes{
          creationEquipesFunction
          creationEquipesName
          creationEquipesMember{
            ... on Member {
              id
              title
              slug
              member_acf{
                memberName
                memberIsonline
                memberPhoto {
                  sourceUrl
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function getCreationsPageAcf() {
  const data = await fetchGraphQL<{ pageBy: any }>(ACF_CREATIONS_PAGE);
  return data.pageBy;
}

export async function getAllCreations() {
  const data = await fetchGraphQL<{ creations: { nodes: any[] } }>(
    ALL_CREATIONS_QUERY,
  );
  return data.creations.nodes.filter((elt: any) => {
    return elt.creation_acf.creationIsonline;
  });
}

export async function getCreationBySlug(slug: string) {
  const data = await fetchGraphQL<{ creation: any }>(CREATION_BY_SLUG_QUERY, {
    slug,
  });
  return data.creation;
}
