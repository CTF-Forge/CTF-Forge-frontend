<script>
	import '../app.css';
	import { user } from '../lib/store.js';

	let { children } = $props();

	function handleLogout() {
		user.set(null);
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
	}
</script>

<nav class="bg-gray-800 text-white p-4">
	<div class="container mx-auto flex justify-between">
		<a href="/" class="font-bold">CTFLab</a>
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
