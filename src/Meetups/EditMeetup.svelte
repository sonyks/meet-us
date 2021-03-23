<script>
    import { createEventDispatcher } from "svelte";
	import TextInput from '../UI/TextInput.svelte';
	import Button from '../UI/Button.svelte';
    import Modal from '../UI/Modal.svelte';
    import {notEmpty, isValidEmail} from '../helpers/validation';

    let title = '';
	let subtitle = '';
	let address = '';
	let email = '';
	let description = '';
	let imageUrl = '';

    const dispatch = createEventDispatcher();

    function submitForm() {
        dispatch('save', {
            title: title,
            subtitle: subtitle,
            address: address,
            email: email,
            description: description,
            imageUrl: imageUrl
        });
    }

    function cancel() {
        dispatch('cancel');
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
            valid={notEmpty(submitForm)} 
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
        <Button type="button" on:click={submitForm}>Save</Button>
    </div>
</Modal>
