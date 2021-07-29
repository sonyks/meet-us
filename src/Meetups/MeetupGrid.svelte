<script>
    import MeetupItem from './MeetupItem.svelte';
    import MeetupFilter from './MeetupFilter.svelte';
    import Button from '../UI/Button.svelte';
    import { createEventDispatcher } from 'svelte';
    import { flip } from 'svelte/animate';
    import { scale } from 'svelte/transition';

    const dispatch = createEventDispatcher();

    export let meetups;

    let favsOnly = false;

    $: filteredMeetups = favsOnly ? meetups.filter(m => m.isFavorite) : meetups;

    function setFilter(event) {
        favsOnly = event.detail === 1;
    }
</script>

<style>
	#meetups {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    #meetup-controls {
        margin: 1rem;
        display: flex;
        justify-content: space-between;
    }

    #no-meetups {
        margin: 1rem;
    }

    @media (min-width: 758px) {
        #meetups {
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>

<section id="meetup-controls">
    <MeetupFilter on:select={setFilter}/>

    <Button on:click={() => dispatch('add')}>New Meetup</Button>
</section>

{#if filteredMeetups.length === 0}
    <p id="no-meetups">No meetups found, you can start adding some.</p>
{/if}
<section id="meetups">

	{#each filteredMeetups as meetup (meetup.id)}
    <div animate:flip={{duration: 300}} transition:scale>
        <MeetupItem 
        id={meetup.id}
        title={meetup.title}
        subtitle={meetup.subtitle}
        imageUrl={meetup.imageUrl}
        description={meetup.description}
        address={meetup.address}
        email={meetup.email} 
        isFavorite={meetup.isFavorite} 
        on:show-details 
        on:edit/>
    </div>
		
	{/each}
</section>