/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchGraphQL } from "../lib/graphql-client";

const ALL_HOMEPAGE_QUERY = `
  query HomePage {
    pageBy(uri: "/") {
      id
      title
      home_acf {
        homeCarrousel {
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
              creationPhoto{
                sourceUrl
                altText
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
            }
          }
        }
        homeHighlightingEvent {
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
        homeCreations{
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
        homeCreationsIllustration{
          sourceUrl
          altText
        }
        homeMembers{
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
    }
  }
`;

export async function getHomePage() {
  const data = await fetchGraphQL<{ pageBy: any }>(ALL_HOMEPAGE_QUERY);
  return data.pageBy;
}
