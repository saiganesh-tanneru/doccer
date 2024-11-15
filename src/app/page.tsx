import { DocCard } from "@/components/doc-card";
import { fetchDocs } from "./utils/docs";
import { DocsSort } from "@/components/docs-sort";
import { DocsSearch } from "@/components/docs-search";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

type HomeProps = {
  searchParams: SearchParams;
};
export default async function Home(props: HomeProps) {
  const searchParams = await props.searchParams;
  const order = searchParams.order as string;
  const search = (searchParams.search ?? "") as string;

  const docs = await fetchDocs({ order, search });

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-md mx-auto w-full">
        <DocsSearch />
      </div>
      <div className="flex items-center justify-between gap-6 mb-6">
        <h2 className="text-xl font-bold">Docs</h2>
        <div className="flex items-center gap-4">
          <DocsSort />
        </div>
      </div>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {docs.map((doc) => (
          <li key={doc.id}>
            <DocCard doc={doc} />
          </li>
        ))}
      </ul>
    </div>
  );
}
