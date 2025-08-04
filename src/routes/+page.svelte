<script>
	let { data } = $props();
</script>

<div class="container mx-auto p-4">
	<h1 class="text-2xl font-bold mb-4">Challenges</h1>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each data.challenges as challenge}
			<div class="border p-4 rounded-lg shadow-md">
				<h2 class="text-xl font-semibold">{challenge.title}</h2>
				<p class="text-gray-600">{challenge.category}</p>
				<p class="mt-2">{challenge.description}</p>
				<div class="mt-4 flex justify-between items-center">
					<span class="font-bold">{challenge.score} points</span>
					{#if challenge.is_solved}
						<span class="text-green-500 font-bold">Solved</span>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
