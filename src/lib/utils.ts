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
