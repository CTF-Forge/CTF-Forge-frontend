import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
  try {
    const res = await fetch(`https://ctf-forge-backend.onrender.com/api/public/challenges/${params.id}`);

    if (!res.ok) {
      throw error(res.status, 'Failed to fetch challenge');
    }

    const challenge = await res.json();
    return { challenge };

  } catch (e) {
    throw error(500, 'Internal Server Error');
  }
}