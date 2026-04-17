/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchGraphQL } from "../lib/graphql-client";

const ALL_HOMEPAGE_QUERY = `
  query HomePage {
    pageBy(uri: "/") {
      id
      title
      content
    }
  }
`;

export async function getHomePage() {
  const data = await fetchGraphQL<{ pageBy: any }>(ALL_HOMEPAGE_QUERY);
  return data.pageBy;
}
