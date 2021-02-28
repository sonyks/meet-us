<script>
    import MeetupItem from './MeetupItem.svelte';
    export let meetups;
</script>

<style>
	section {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    @media (min-width: 758px) {
        section {
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>

<section >
	{#each meetups as meetup}
		<MeetupItem 
			title={meetup.title}
			subtitle={meetup.subtitle}
			imageUrl={meetup.imageUrl}
			description={meetup.description}
			address={meetup.address}
			email={meetup.email} />
	{/each}
</section>