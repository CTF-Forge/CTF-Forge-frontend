<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let { data } = $props();
  const { challenge } = data;

  onMount(() => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      goto('/login');
    }
  });
</script>

{#if challenge}
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">{challenge.title}</h1>
    <div class="border p-4 rounded-lg shadow-md">
      <p class="text-gray-600">{challenge.category}</p>
      <p class="mt-2">{challenge.description}</p>
      <div class="mt-4 flex justify-between items-center">
        <span class="font-bold">{challenge.score} points</span>
      </div>
    </div>
  </div>
{:else}
  <p>Loading challenge...</p>
{/if}