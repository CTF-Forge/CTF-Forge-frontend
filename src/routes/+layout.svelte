<script>
	import '../app.css';
	import { user } from '../lib/store.js';
  	import Toast from '../lib/components/Toast.svelte';

	let { children } = $props();

	function handleLogout() {
		user.set(null);
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
	}
</script>

<Toast />

<nav class="bg-gray-800 text-white p-4">
	<div class="container mx-auto flex justify-between">
		<div class="flex">
			<img class="icon" src="/icon.png" >
			<a href="/" class="font-bold">CTFForge</a>
		</div>
		<div>
			<a href="/" class="px-4">Challenges</a>
			{#if $user}
				<button on:click={handleLogout} class="px-4">Logout</button>
			{:else}
				<a href="/login" class="px-4">Login</a>
				<a href="/register" class="px-4">Register</a>
			{/if}
		</div>
	</div>
</nav>

<main class="container mx-auto p-4">
	{@render children()}
</main>

<style>
	img.icon {
		width: 100px;
		margin-right: 2rem;
	}
	div.flex {
		display: flex;
		align-items: center;
	}
</style>