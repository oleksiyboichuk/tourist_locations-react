import { NextResponse } from 'next/server';
import axios from 'axios';

const baseURL = process.env.API_BASE_URL || 'http://localhost:3001/api';

export async function GET() {
    try {
        const response = await axios.get(`${baseURL}/cities`);
        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        console.error('Error fetching cities:', error);
        return NextResponse.json({ message: 'Error fetching cities' }, { status: 500 });
    }
}
