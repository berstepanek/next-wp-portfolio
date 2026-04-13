/* eslint-disable @typescript-eslint/no-explicit-any */
const WP_GRAPHQL_ENDPOINT = process.env
  .NEXT_PUBLIC_WP_GRAPHQL_ENDPOINT as string;

export async function fetchGraphQL<T>(
  query: string,
  variables: Record<string, any> = {},
): Promise<T> {
  const res = await fetch(WP_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    // Important pour SSG/ISR côté serveur
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`GraphQL error: ${res.statusText}`);
  }

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("GraphQL returned errors");
  }

  return json.data;
}
