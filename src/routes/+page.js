import { error } from '@sveltejs/kit';

export async function load({ fetch }) {
  try {
    const res = await fetch('http://localhost:8080/api/public/challenges');

    if (!res.ok) {
      throw error(res.status, 'Failed to fetch challenges');
    }

    const challenges = await res.json();
    return { challenges };

  } catch (e) {
    throw error(500, 'Internal Server Error');
  }
}
