<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { showToast } from '$lib/store';

  let { data } = $props();
  const { challenge } = data;
  let flag = '';
  let message = '';

  onMount(() => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      goto('/login');
    }
  });

  async function submitFlag() {
    console.log(flag);
    console.log(JSON.stringify({ flag }))
    const accessToken = localStorage.getItem('access_token');
    const challengeId = $page.params.id;
    const res = await fetch(`https://ctf-forge-backend.onrender.com/api/challenges/${challengeId}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ flag })
    });

    const result = await res.json();
    console.log(result);

    if (res.ok) {
      if (result.correct) {
        showToast('Correct!', 'success');
        goto('/'); // 正解したらホーム画面に遷移
      } else {
        showToast('Failed!', 'error');
      }
      message = result.message;
    } else {
      showToast(result.error || 'An unknown error occurred.', 'error');
    }
  }
</script>

{#if challenge}
  <div class="container mx-auto p-4">
    <a href="/" class="text-blue-500 hover:underline">&larr; Back to Challenges</a>
    <h1 class="text-2xl font-bold mb-4 mt-4">{challenge.title}</h1>
    <div class="border p-4 rounded-lg shadow-md">
      <p class="text-gray-600">{challenge.category}</p>
      <p class="mt-2">{challenge.description}</p>
      <div class="mt-4 flex justify-between items-center">
        <span class="font-bold">{challenge.score} points</span>
      </div>
    </div>

    <div class="mt-8">
      <form on:submit|preventDefault={submitFlag}>
        <div class="flex items-center">
          <input type="text" bind:value={flag} placeholder="Enter your flag" class="border rounded-l-lg p-2 w-full">
          <button type="submit" class="bg-blue-500 text-white rounded-r-lg p-2">Submit</button>
        </div>
      </form>
      {#if message}
        <p class="mt-4 text-green-500">{message}</p>
      {/if}
    </div>
  </div>
{:else}
  <p>Loading challenge...</p>
{/if}