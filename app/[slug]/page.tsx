import { getAllPages, getPageBySlug } from "@/services/pages";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { VARIABLES_WEB_SITE } from "@/lib/variables";

type Props = {
  params: { slug: string };
};

export const revalidate = 60;

export async function generateStaticParams() {
  const pages = await getAllPages();
  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return {};
  }

  const variables = VARIABLES_WEB_SITE;
  return {
    title: `${variables.name} — ${page.title}`,
    description: `${page.title} — ${variables.name}`,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <article className="py-24">
      <div className="flex justify-center">
        <div className="w-full max-w-screen-md">
          <h1
            className="text-3xl font-bold"
            dangerouslySetInnerHTML={{ __html: page.title }}
          />

          <div
            className="mt-8 prose"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </div>
    </article>
  );
}
