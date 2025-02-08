import { fail, redirect } from '@sveltejs/kit';
import bcrypt from "bcryptjs";
import { dbFunctions } from '$lib/db/database.js';

export function load({ params, url }) {
    const email = url.searchParams.get('email');
    const token = url.searchParams.get('token');
}