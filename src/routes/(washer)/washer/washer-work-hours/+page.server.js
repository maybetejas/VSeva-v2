import PocketBase from 'pocketbase';
import { PUBLIC_DB_URL } from '$env/static/public'
import { redirect } from '@sveltejs/kit';
import { workHours } from '$lib/utils.js';

export async function load({ locals }) {
    const pb = new PocketBase(PUBLIC_DB_URL);
    
    const record = await pb.collection('washers').getOne(locals.washer.id);
    let ws;


    if (record) {
        ws = record.workHours;
        console.log(ws);
    } else {
        ws = workHours; 
    }

    return {
        ws,
    };
}


export const actions = {
    saveWorkHours: async ({ locals, request }) => {
        const formData = await request.formData();
        const workHours = formData.get('work');
        const data = { 
            workHours,
        }
        const pb = new PocketBase(PUBLIC_DB_URL);
        await pb.collection('washers').update(locals?.washer?.id, data);
        throw redirect(302, '/washer')
    }
}