<script>
	import Header from './UI/Header.svelte';
	import MeetupGrid from './Meetups/MeetupGrid.svelte';
	import EditMeetup from "./Meetups/EditMeetup.svelte";
	import MeetupDetail from "./Meetups/MeetupDetail.svelte";
	import meetups from './Meetups/meetups-store';
	import { onMount } from 'svelte';

	let editMode = undefined;
	let editedId = undefined;
	let page = 'overview';
	let pageData = {};

	function saveMeetup() {
		editMode = null;
	}

	function cancelEdit() {
		editMode = null;
		editedId = null;
	}

	function showDetails(event) {
		page = 'details';
		pageData.id = event.detail;
	}

	function closeDetails() {
		page = 'overview';
		pageData = {};
	}

	function startEdit(event) {
		editMode = 'edit';
		editedId = event.detail;
	}

	onMount(() => {
		fetch("https://svelte-course-f4db3-default-rtdb.europe-west1.firebasedatabase.app/meetups.json")
		.then(res => {
                if (!res.ok) {
                    throw new Error('Fetching meetups failed, please try again');
                }
                return res.json();
		})
		.then(data => {
			const loadedMeetups = [];
			for (const key in data) {
				loadedMeetups.push({
					...data[key],
					id: key,
				});
			}
			meetups.setMeetups(loadedMeetups);
		})
		.catch(err => {
			console.log(err);
		})
	});
</script>

<style>
	main {
		margin-top: 5rem;
	}

</style>

<Header />

<main>
	{#if page === 'overview'}
	  {#if editMode === 'edit'}
		<EditMeetup on:save={saveMeetup} on:cancel={cancelEdit} />
	  {/if}
	  <MeetupGrid meetups={$meetups} on:show-details={showDetails} on:edit={startEdit} on:add={() => editMode = 'edit'}/>
	{:else}
	  <MeetupDetail id={pageData.id} on:close={closeDetails} />
	{/if}
  </main>