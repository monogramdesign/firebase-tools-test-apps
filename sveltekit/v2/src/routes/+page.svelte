<script lang="ts">
	import { page } from "$app/state";
  console.log(page.data);
</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<p>{page.data.message}</p>
