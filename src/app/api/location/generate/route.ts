import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const baseURL = process.env.API_BASE_URL || 'http://localhost:3001/api';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const response = await axios.post(`${baseURL}/location/generate`, body);
        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        console.error('Error generating description:', error);
        return NextResponse.json({ message: 'Error generating description' }, { status: 500 });
    }
}
