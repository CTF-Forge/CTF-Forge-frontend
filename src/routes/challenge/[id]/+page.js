import { error, redirect } from '@sveltejs/kit';

export async function load({ fetch, params }) {
  const accessToken = localStorage.getItem('access_token');

  if (!accessToken) {
    throw redirect(307, '/login');
  }

  try {
    const res = await fetch(`https://ctf-forge-backend.onrender.com/api/challenges/${params.id}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!res.ok) {
      if (res.status === 401) {
        throw redirect(307, '/login');
      }
      throw error(res.status, 'Failed to fetch challenge');
    }

    const challenge = await res.json();
    return { challenge };

  } catch (e) {
    if (e.status === 307) {
      throw e; // re-throw the redirect
    }
    throw error(500, 'Internal Server Error');
  }
}