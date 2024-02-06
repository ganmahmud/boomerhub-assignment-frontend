import { Provider, constructEmbeddedMapUrl } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

async function getProviderById(providerId: string) {
  const res = await fetch(`${process.env.API_ENDPOINT}/${providerId}`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page({ params }: any) {
  const {
    name,
    address,
    phone,
    type,
    capacity,
    state,
    county,
    city,
    zipCode,
    mapUrl,
    ProviderImage,
  }: Provider = await getProviderById(params.providerId);

  return (
    <div>
      <h1 className="mb-5 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {name}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <p className="font-medium">Type: {type}</p>
          <p className="font-medium">Capacity: {capacity}</p>
          <address className="font-medium not-italic">
            Address: {address}
          </address>
          <ul>
            <li>State: {state.name}</li>
            <li>County: {county.name}</li>
            <li>City: {city.name}</li>
            <li>Zip Code: {zipCode.code}</li>
          </ul>
          <p className="font-medium">Phone: {phone}</p>
        </div>
      </div>

      <section className="flex items-center justify-between">
        {ProviderImage && ProviderImage.length > 0 && (
          <Carousel className="w-full max-w-lg">
            <CarouselContent>
              {ProviderImage.map((img, index) => (
                <CarouselItem key={index}>
                  <Image
                    className="object-cover h-full"
                    placeholder={"empty"}
                    width={512}
                    height={512}
                    src={`${process.env.S3_ENDPOINT}/${img.url}`}
                    alt={`The Delaney at Georgetown Village Image ${index + 1}`}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-black text-white" />
            <CarouselNext className="bg-black text-white" />
          </Carousel>
        )}

        <iframe
          width={600}
          height={365}
          src={constructEmbeddedMapUrl(mapUrl)}
          aria-hidden="false"
        ></iframe>
      </section>
    </div>
  );
}
