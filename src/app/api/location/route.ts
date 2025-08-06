import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const baseURL = process.env.API_BASE_URL || 'http://localhost:3001/api';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const cityName = searchParams.get('cityName');

    if (!cityName) {
        return NextResponse.json({ message: 'Missing required query parameter: cityName' }, { status: 400 });
    }

    try {
        const response = await axios.get(`${baseURL}/location`, { params: { cityName } });
        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        console.error('Error fetching locations:', error);
        return NextResponse.json({ message: 'Error fetching locations' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const response = await axios.post(`${baseURL}/location`, body);
        return NextResponse.json(response.data, { status: 201 });
    } catch (error) {
        console.error('Error saving locations:', error);
        return NextResponse.json({ message: 'Error saving locations' }, { status: 500 });
    }
}
