<script>
    import { createEventDispatcher } from "svelte";
	import TextInput from '../UI/TextInput.svelte';
	import Button from '../UI/Button.svelte';

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
</script>

<style>
    form {
		width: 30rem;
		max-width: 90%;
		margin: auto;
	}
</style>

<form on:submit|preventDefault="{submitForm}">
    <TextInput id="title" controlType="text" label="Title" value={title} on:input="{(event) => title = event.target.value}"/>
    <TextInput id="subtitle" controlType="text" label="Subtitle" value={subtitle} on:input="{(event) => subtitle = event.target.value}"/>	
    <TextInput id="address" controlType="text" label="Address" value={address} on:input="{(event) => address = event.target.value}"/>
    <TextInput id="imageUrl" controlType="text" label="Image URL" value={imageUrl} on:input="{(event) => imageUrl = event.target.value}"/>	
    <TextInput id="email" controlType="email" label="Email" value={email} on:input="{(event) => email = event.target.value}"/>	
    <TextInput id="description" controlType="textarea" rows="3" label="Description" value={description} on:input="{(event) => description = event.target.value}"/>
    
    <Button type="submit" caption="Save" />
</form>