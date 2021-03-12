<script>
	import Header from './UI/Header.svelte';
	import MeetupGrid from './Meetups/MeetupGrid.svelte';
	import EditMeetup from "./Meetups/EditMeetup.svelte";
	import Button from './UI/Button.svelte';

	let meetups = [
		{
			id: 'm1',
			title: 'Coding Bootcamp',
			subtitle: 'Learn to code in 2 hours',
			description: 'dasfasfas faasf ',
			imageUrl: 'https://i.imgur.com/lKJiT77.png',
			address: '27th Nerd Road, 4, 24315 New York',
			contactEmail: 'code@test.com',
			isFavorite: false,
		},
		{
			id: 'm2',
			title: 'Swim Together',
			subtitle: 'Let\'s have some swimming',
			description: '122 swim',
			imageUrl: 'https://i.imgur.com/oEUksmz.png',
			address: '29th Nerd Road, 4, 24315 New York',
			contactEmail: 'code1@test.com',
			isFavorite: false,
		}
	];

	let editMode = undefined;

	function addMeetup(event) {
		const newMeetup = {
			id: Math.random().toString(),
			title: event.detail.title,
			subtitle: event.detail.subtitle,
			description: event.detail.description,
			imageUrl: event.detail.imageUrl,
			address: event.detail.address,
			contactEmail: event.detail.email
		}

		meetups = [newMeetup, ...meetups];
		editMode = null;
	}

	function toggleFavorite(event) {
		const id = event.detail;
		const updatedMeetup = { ...meetups.find(m => m.id === id) };
		updatedMeetup.isFavorite = !updatedMeetup.isFavorite;

		const meetupIndex = meetups.findIndex(m => m.id === id);
		const updatedMeetups = [...meetups];
		updatedMeetups[meetupIndex] = updatedMeetup;

		meetups = updatedMeetups;
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
	<div class="meetup-controls">
		<Button caption="New Meetup" on:click="{() => editMode = 'add'}"></Button>
	</div>
	{#if editMode === 'add'}
		<EditMeetup on:save="{addMeetup}"/>
	{/if}
	<MeetupGrid 
		{meetups} on:toggle-favorite="{toggleFavorite}"/>
</main>