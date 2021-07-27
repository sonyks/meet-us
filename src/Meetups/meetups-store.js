import { writable } from 'svelte/store';

const meetups = writable([
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
]);

const customMeetupsStore = {
  subscribe: meetups.subscribe,
  addMeetup: (meetupData) => {
        const newMeetup = {
            ...meetupData,
            id: Math.random().toString(),
            isFavorite: false
        }
        meetups.update(items => {
            return [newMeetup, ...items];
        })
    },
    updateMeetup: (id, meetupData) => {
        meetups.update(items => {
            const meetupIndex = items.findIndex(i => i.id === id);
            const updatedMeetup = { ...items[meetupIndex], ...meetupData };
            const updatedMeetups = [...items];
            updatedMeetups[meetupIndex] = updatedMeetup;

            return updatedMeetups;
        });
    },
    removeMeetup: (id) => {
        meetups.update(items => {
            return items.filter(i => i.id !== id);
        })
    },
    toggleFavorite: (id) => {
        meetups.update(items => {
            const updatedMeetup = { ...items.find(m => m.id === id) };
            updatedMeetup.isFavorite = !updatedMeetup.isFavorite;

            const meetupIndex = items.findIndex(m => m.id === id);
            const updatedMeetups = [...items];
            updatedMeetups[meetupIndex] = updatedMeetup;

            return updatedMeetups;
        });
	}
};

export default customMeetupsStore;