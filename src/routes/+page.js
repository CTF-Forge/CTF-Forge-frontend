import { error } from '@sveltejs/kit';

export async function load({ fetch }) {
  try {
        const res = await fetch('https://ctf-forge-backend.onrender.com/api/public/challenges');

    if (!res.ok) {
      throw error(res.status, 'Failed to fetch challenges');
    }

    const challenges = await res.json();
    return { challenges };

  } catch (e) {
    throw error(500, 'Internal Server Error');
  }
}
