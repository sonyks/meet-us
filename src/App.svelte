<script>
	import Header from './UI/Header.svelte';
	import MeetupGrid from './Meetups/MeetupGrid.svelte';
	import EditMeetup from "./Meetups/EditMeetup.svelte";
	import MeetupDetail from "./Meetups/MeetupDetail.svelte";
	import Button from './UI/Button.svelte';
	import meetups from './Meetups/meetups-store';

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
</script>

<style>
	main {
		margin-top: 5rem;
	}

	.meetup-controls {
		margin: 1rem;
	}
</style>

<Header />

<main>
	{#if page === 'overview'}
	  <div class="meetup-controls">
		<Button on:click={() => (editMode = 'edit')}>New Meetup</Button>
	  </div>
	  {#if editMode === 'edit'}
		<EditMeetup on:save={saveMeetup} on:cancel={cancelEdit} />
	  {/if}
	  <MeetupGrid meetups={$meetups} on:show-details={showDetails} on:edit={startEdit}/>
	{:else}
	  <MeetupDetail id={pageData.id} on:close={closeDetails} />
	{/if}
  </main>