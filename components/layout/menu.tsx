/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPrimaryMenu } from "@/services/menu";
import { Link } from "next-view-transitions";

export default async function Menu() {
  const items = await getPrimaryMenu();

  return (
    <nav>
      {items.map((item: any) => (
        <Link
          key={item.id}
          className="font-title text-slate-700"
          href={item.uri}
          rel="home"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
