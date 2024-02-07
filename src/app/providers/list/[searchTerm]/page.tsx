import Breadcrumb from '@/components/ui/breadcrumb';
import { Provider } from '@/lib/utils';
import Link from 'next/link';

async function getProvidersByTerm(searchTerm: string) {
  const res = await fetch(
    `${process.env.API_ENDPOINT}/providers?search=${searchTerm}`
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return await res.json();
}

export default async function Page({ params }: any) {
  const providerList: Provider[] = await getProvidersByTerm(params.searchTerm);
  return (
    <div>
      <Breadcrumb currentPath="Search" contentName={params.searchTerm} />

      <section className="mt-6 flex flex-col gap-4">
        {providerList.map((provider: Provider, index) => {
          return (
            <Link
              href={`/providers/${provider.id}`}
              key={index}
              className="flex w-1/2 items-center gap-10 hover:bg-gray-300 p-3 shadow shadow-lg border border-gray-200"
            >
              <aside>
                <h1 className="font-extrabold">{provider.name}</h1>
                <p className="font-bold block">{provider.type}</p>
                <p className="block font-semibold">{provider.capacity}</p>
              </aside>

              <aside>
                <address className="not-italic">{provider.address}</address>
                <div className="flex items-center">
                  <p>{provider.state.name}</p>
                  <p>{provider.county.name}</p>
                </div>
                <div className="flex items-center">
                  <p>{provider.city.name}</p>
                  <p>{provider.zipCode.code}</p>
                </div>
              </aside>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
