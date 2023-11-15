<script>
	export let data;

	let nam = data?.user?.name || 'not logged in';
</script>

<h1>profile</h1>
<h1>{nam}</h1>
<form action="?/logout" method="POST">
	<button type="submit"> <a class="underline" href="/logout">logout</a></button>
</form>
<br />
<a class="underline" href="/login">login</a>
<br />
{#if data?.washer}
	<a data-sveltekit-preload-data="off" class="underline" href="/washer">washer dashboard</a>
{/if}
