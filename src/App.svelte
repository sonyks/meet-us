<script>
	import Header from './UI/Header.svelte';
	import MeetupGrid from './Meetups/MeetupGrid.svelte';
	import TextInput from './UI/TextInput.svelte';
	import Button from './UI/Button.svelte';

	let meetups = [
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
	];

	let title = '';
	let subtitle = '';
	let address = '';
	let email = '';
	let description = '';
	let imageUrl = '';

	function addMeetup() {
		const newMeetup = {
			id: Math.random().toString(),
			title,
			subtitle,
			description,
			imageUrl,
			address,
			contactEmail: email
		}

		meetups = [newMeetup, ...meetups];
	}
</script>

<style>
	main {
		margin-top: 5rem;
	}

	form {
		width: 30rem;
		max-width: 90%;
		margin: auto;
	}
</style>

<Header />

<main>
	<form on:submit|preventDefault="{addMeetup}">
		<TextInput id="title" controlType="text" label="Title" value={title} on:input="{(event) => title = event.target.value}"/>
		<TextInput id="subtitle" controlType="text" label="Subtitle" value={subtitle} on:input="{(event) => subtitle = event.target.value}"/>	
		<TextInput id="address" controlType="text" label="Address" value={address} on:input="{(event) => address = event.target.value}"/>
		<TextInput id="imageUrl" controlType="text" label="Image URL" value={imageUrl} on:input="{(event) => imageUrl = event.target.value}"/>	
		<TextInput id="email" controlType="email" label="Email" value={email} on:input="{(event) => email = event.target.value}"/>	
		<TextInput id="description" controlType="textarea" rows="3" label="Description" value={description} on:input="{(event) => description = event.target.value}"/>
		
		<Button type="submit" caption="Save" />
	</form>
	<MeetupGrid 
		{meetups}/>
</main>