import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Provider = {
  id: number;
  name: string;
  address: string;
  phone: string;
  type: string;
  capacity: number;
  mapUrl: string;
  state: {
    name: string;
  };
  county: {
    name: string;
  };
  city: {
    name: string;
  };
  zipCode: {
    code: string;
  };
  ProviderImage: {
    url: string;
  }[];
};

export function constructEmbeddedMapUrl(googleMapsUrl: string): string {
  const placeIndex = googleMapsUrl.indexOf("place/");
  if (placeIndex === -1) {
    throw new Error("Invalid Google Maps URL");
  }
  const address = googleMapsUrl.substring(placeIndex + "place/".length);
  return `https://maps.google.com/maps?q=${encodeURIComponent(
    address
  )}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
}

export function debounce<F extends (...args: Parameters<F>) => ReturnType<F>>(
  fn: F,
  wait = 100,
  immediate = true
): (...args: Parameters<F>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<F>) {
    if (timeout) {
      clearTimeout(timeout);
    }

    if (immediate && !timeout) {
      fn(...args);
    }

    timeout = setTimeout(() => {
      fn(...args);
    }, wait);
  };
}
