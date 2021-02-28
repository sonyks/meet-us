<script>
	import Header from './UI/Header.svelte';
	import MeetupGrid from './Meetups/MeetupGrid.svelte';

	const meetups = [
		{
			id: 'm1',
			title: 'Coding Bootcamp',
			subtitle: 'Learn to code in 2 hours',
			description: 'dasfasfas faasf ',
			imageUrl: 'https://i.imgur.com/lKJiT77.png',
			address: '27th Nerd Road, 4, 24315 New York',
			contactEmail: 'code@test.com'
		},
		{
			id: 'm2',
			title: 'Swim Together',
			subtitle: 'Let\'s have some swimming',
			description: '122 swim',
			imageUrl: 'https://i.imgur.com/oEUksmz.png',
			address: '29th Nerd Road, 4, 24315 New York',
			contactEmail: 'code1@test.com'
		}
	]
</script>

<style>
	#meetups {
		margin-top: 5rem;
	}
</style>

<Header />

<MeetupGrid 
	{meetups}/>