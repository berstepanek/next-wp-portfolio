/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchGraphQL } from "../lib/graphql-client";

const GLOBAL_STYLESHEET_QUERY = `
  query GlobalStylesheet {
    globalStylesheet
    }
`;

export async function getGlobalStylesheet() {
  const data = await fetchGraphQL<{ globalStylesheet: any }>(
    GLOBAL_STYLESHEET_QUERY,
  );

  return `@scope (#cms-container) {\n${data.globalStylesheet}\n}`;
}
