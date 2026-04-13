/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchGraphQL } from "../lib/graphql-client";

const ALL_MEMBERS_QUERY = `
  query {
    members(
      first: 20
      where: {
        orderby: { field: DATE, order: ASC }
      }
    ){
      nodes {
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
`;

const MEMBER_BY_SLUG_QUERY = `
  query ($slug: ID!){
    member(id: $slug, idType: SLUG) {
      id
      title
      slug
      member_acf{
        memberName
        memberIsonline
        memberCivility
        memberCompetencesMan
        memberCompetencesWomen
        memberSpectacles {
          ... on Creation {
            id
            title
            slug
            uri
            creation_acf{
              creationShortdescription
              creationAffiche{
                sourceUrl
                altText
              }
              creationDates{
                creationDatesDay
                creationDatesHour
                creationDatesLieu
              }
            }  
          }
        }
        memberPhoto {
          sourceUrl
          altText
        }
        memberGallery {
          sourceUrl
          altText
          title
          mediaDetails {
            width
            height
          }
        }
        memberOrigine
        memberAge
        memberSize
        memberWeight
        memberHair
        memberEyes
        memberShoesize
        memberPhone
        memberEmail
        memberFormation{
          memberFormationIntitule
          memberFormationDate
          memberFormationInfos
        }
        memberTheatre{
          memberTheatreIntitule
          memberTheatreDate
          memberTheatreRole
          memberTheatreAuthor
          memberTheatreMetteurenscene
          memberTheatreInfos
        }
        memberCinema{
          memberCinemaIntitule
          memberCinemaDate
          memberCinemaInfos
        }
        memberTelevision{
          memberTelevisionIntitule
          memberTelevisionDate
          memberTelevisionInfos
        }
        memberLangues
        memberSports
        memberMusiques
      }
    }
  }
`;

export async function getAllMembers() {
  const data = await fetchGraphQL<{ members: { nodes: any[] } }>(
    ALL_MEMBERS_QUERY,
  );

  return data.members.nodes.filter((elt: any) => {
    return elt.member_acf.memberIsonline;
  });
}

export async function getMemberBySlug(slug: string) {
  const data = await fetchGraphQL<{ member: any }>(MEMBER_BY_SLUG_QUERY, {
    slug,
  });
  return data.member;
}
