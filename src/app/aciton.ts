'use server';

import { redirect } from 'next/navigation';

export async function providerAction(data: FormData) {
  redirect(`/providers/list/${data.get('providerInfo')}`);
}
