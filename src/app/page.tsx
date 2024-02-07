'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { providerAction } from './aciton';
import { useState } from 'react';
import { debounce } from '@/lib/utils';
import Link from 'next/link';

const FormSchema = z.object({
  providerInfo: z.string().min(2, {
    message: 'Search text must be at least 2 characters.',
  }),
});

interface AutocompleteSearchProps {
  field: any; // or specify the type of field if you have it
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [autocompleteResults, setAutocompleteResults] = useState<string[]>([]);

  const handleChange = debounce(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSearchTerm(value);

      // Make an API call to fetch autocomplete results based on the search term
      try {
        const response = await fetch(
          `http://localhost:3000/providers?search=${encodeURIComponent(value)}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch autocomplete results');
        }
        const data: string[] = await response.json();
        setAutocompleteResults(data);
      } catch (error) {
        console.error('Error fetching autocomplete results:', error);
      }
    },
    100,
    false
  );

  const handleInputClear = () => {
    setSearchTerm('');
    setAutocompleteResults([]);
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      providerInfo: '',
    },
  });

  return (
    <div className="w-full mt-10 flex justify-center">
      <Form {...form}>
        <form
          action={providerAction}
          className="space-y-6 flex items-start gap-4"
        >
          <div className="w-[300px]">
            <FormField
              control={form.control}
              name="providerInfo"
              render={({ field }) => (
                <FormItem>
                  <FormControl
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') handleInputClear();
                    }}
                  >
                    <Input placeholder="Type here" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {autocompleteResults.length > 0 && (
              <ul className="mt-[1px] w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                {autocompleteResults.map((result: any, index) => (
                  <li key={index} className="cursor-pointer hover:bg-gray-100">
                    <Link
                      replace={true}
                      className="block px-4 py-2"
                      href={`http://localhost:3001/providers/${result.id}`}
                    >
                      {result.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Button size={'lg'} type="submit">
            Search
          </Button>
        </form>
      </Form>
    </div>
  );
}
