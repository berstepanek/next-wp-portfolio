/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchGraphQL } from "../lib/graphql-client";

const MENU_QUERY = `
    query MainMenu {
      menu(id: "main-menu", idType: SLUG) {
        menuItems {
          nodes {
            id
            label
            url
            path
          }
        }
      }
    }
  `;

export async function getPrimaryMenu() {
  const data = await fetchGraphQL(MENU_QUERY);
  return data;
}
