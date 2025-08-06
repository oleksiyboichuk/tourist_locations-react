import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const baseURL = process.env.API_BASE_URL || 'http://localhost:3001/api';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const cityName = searchParams.get('cityName');
    const query = searchParams.get('query');
    const next = searchParams.get('next') || '';

    if (!cityName || !query) {
        return NextResponse.json({ message: 'Missing required query parameters: cityName and query' }, { status: 400 });
    }

    try {
        const response = await axios.get(`${baseURL}/search`, {
            params: { cityName, query, next },
        });
        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        console.error('Error searching locations:', error);
        return NextResponse.json({ message: 'Error searching locations' }, { status: 500 });
    }
}
