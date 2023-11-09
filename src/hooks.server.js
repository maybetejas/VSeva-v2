import PocketBase from 'pocketbase';
import { PUBLIC_DB_URL } from '$env/static/public';
import { redirect } from '@sveltejs/kit';


export async function handle({ event, resolve }) {

    const session = event.cookies.get('session');

    if (!session) {
        // if there is no session load page as normal
        return await resolve(event)
    }
    
    
    const pb = new PocketBase(PUBLIC_DB_URL);
    const user = await pb.collection('users').getFirstListItem(`userAuthToken="${session}"`);


    if (user) {
        event.locals.user = {
            id: user.id,
            name: user.name,
            contact: user.contact,
            address: user.address,
            washer: user.washer,
        }
    }

    if (user.washer) {
        try {
            // Attempt to get the washer entry by user ID
            const washer = await pb.collection('washers').getFirstListItem(`userId="${user.id}"`);
            event.locals.washer = {
                id: washer.id,
                name: washer.name,
                address: washer.address,
                contact: washer.contact,
                workHours: washer.workHours,
                anchor: washer.anchor,
            }
        } catch (error) {
                // If washer entry doesn't exist, create a new entry
                const newWasher = {
                    name: user.name,
                    contact: user.contact,
                    userId: user.id,
                };
                await pb.collection('washers').create(newWasher);
        }
    }
    

    return await resolve(event)
}

