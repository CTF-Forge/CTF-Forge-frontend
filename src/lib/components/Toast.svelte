<script>
  import { toast } from '$lib/store';

  const bgColors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  };
</script>

{#if $toast.show}
  <div class="fixed top-5 left-1/2 -translate-x-1/2 p-4 rounded-lg text-white z-50 {bgColors[$toast.type] || bgColors.info}">
    {$toast.message}
  </div>
{/if}