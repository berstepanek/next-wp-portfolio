/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPrimaryMenu } from "@/services/menu";
import { Link } from "next-view-transitions";

export default async function Menu() {
  const items = await getPrimaryMenu();

  return (
    <ul className="flex gap-x-2">
      {items.map((item: any) => (
        <li key={item.id}>
          <Link
            className="font-title text-slate-700"
            href={item.uri}
            rel="home"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
