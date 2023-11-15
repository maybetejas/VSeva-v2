<script>
	export let data;
</script>

<div class="h-full">
	<h1>{data?.washer?.name}</h1>
	{#if !data?.washer?.workHours}
		<h1>PLease set your wokr hours to get orders</h1>
		<a href="/washer/washer-work-hours">go</a>
	{/if}
	{#if !data?.washer?.address}
		<h1>PLease set your address to get orders</h1>
		<a href="/set-location-washer">go</a>
	{/if}
	{#if !data?.washer?.anchor}
		<h1>PLease set anchor to get orders</h1>
		<a href="/set-location-washer">go</a>
	{/if}
</div>
