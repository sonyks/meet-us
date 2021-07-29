<script>
    import { createEventDispatcher } from "svelte";
	import TextInput from '../UI/TextInput.svelte';
	import Button from '../UI/Button.svelte';
    import Modal from '../UI/Modal.svelte';
    import {notEmpty, isValidEmail} from '../helpers/validation';
    import meetups from './meetups-store';

    export let id = null;

    let title = '';
	let subtitle = '';
	let address = '';
	let email = '';
	let description = '';
	let imageUrl = '';
    let formIsValid = false;

    if (id) {
        const unsubscribe = meetups.subscribe(items => {
            const selectedMeetup = items.find(i => i.id === id);
            title = selectedMeetup.title;
            subtitle = selectedMeetup.subtitle;
            address = selectedMeetup.address;
            email = selectedMeetup.contactEmail;
            description = selectedMeetup.description;
            imageUrl = selectedMeetup.imageUrl;
        });

        unsubscribe();
    }

    const dispatch = createEventDispatcher();

    $: formIsValid = notEmpty(title) 
        && notEmpty(subtitle) 
        && notEmpty(address)
        && isValidEmail(email)
        && notEmpty(description)
        && notEmpty(imageUrl);

    function submitForm() {
        const meetupData = {
			title,
			subtitle,
			description,
			imageUrl,
			address,
			contactEmail: email
		}

        if (id) {
            meetups.updateMeetup(id, meetupData);
        } else {
            fetch("https://svelte-course-f4db3-default-rtdb.europe-west1.firebasedatabase.app/meetups.json", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({...meetupData, isFavorite: false}),
            }).then(res => {
                if (!res.ok) {
                    throw new Error('An error occured, please try again');
                }
                return res.json();
            })
            .then(data => {
                meetups.addMeetup({
                        ...meetupData,
                        isFavorite: false,
                        id: data.name,
                    });
            })
            .catch(err => {
                console.log(err);
            });
        }	

        dispatch('save');
    }

    function cancel() {
        dispatch('cancel');
    }

    function deleteMeetup() {
        meetups.removeMeetup(id);
        dispatch('save');
    }
</script>

<style>
    form {
		width: 100%;
	}
</style>

<Modal title="Edit Meetup Data" on:cancel>
    <form on:submit|preventDefault="{submitForm}">
        <TextInput id="title" 
            controlType="text" 
            label="Title" 
            value={title} 
            valid={notEmpty(title)} 
            validityMessage="Please enter a valid title" 
            on:input="{(event) => title = event.target.value}"
            />
        <TextInput id="subtitle" 
            controlType="text" 
            label="Subtitle" 
            value={subtitle} 
            on:input="{(event) => subtitle = event.target.value}"
            valid={notEmpty(subtitle)} 
            validityMessage="Please enter a valid subtitle"/>	
        <TextInput id="address" 
            controlType="text" 
            label="Address" 
            value={address} 
            on:input="{(event) => address = event.target.value}"
            valid={notEmpty(address)} 
            validityMessage="Please enter a valid address"/>
        <TextInput id="imageUrl" 
            controlType="text" 
            label="Image URL" 
            value={imageUrl} 
            on:input="{(event) => imageUrl = event.target.value}"
            valid={notEmpty(imageUrl)} 
            validityMessage="Please enter a valid Image Url"/>	
        <TextInput id="email" 
            controlType="email" 
            label="Email" 
            value={email} 
            on:input="{(event) => email = event.target.value}"
            valid={isValidEmail(email)} 
            validityMessage="Please enter a valid email"/>	
        <TextInput id="description" 
            controlType="textarea" 
            rows="3" 
            label="Description" 
            value={description} on:input="{(event) => description = event.target.value}"
            valid={notEmpty(description)} 
            validityMessage="Please enter a valid description"/>
    </form>

    <div slot="footer">
        <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
        <Button type="button" on:click={submitForm} disabled={!formIsValid}>Save</Button>
        {#if id}
        <Button type="button" on:click={deleteMeetup}>Delete</Button>
        {/if}
    </div>
</Modal>
