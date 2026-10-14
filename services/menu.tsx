/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchGraphQL } from "../lib/graphql-client";

const MENU_QUERY = `
    query GetMenu {
      menuItems(where: { location: PRIMARY }) {
        nodes {
          id
          label
          uri
          url
          parentId
        }
      }
    }
  `;

export async function getPrimaryMenu() {
  const data = await fetchGraphQL<{ menuItems: any }>(MENU_QUERY);
  return data.menuItems.nodes;
}
