import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const baseURL = process.env.API_BASE_URL || 'http://localhost:3001/api';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const response = await axios.get(`${baseURL}/location/${id}`);
        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        console.error(`Error fetching location ${id}:`, error);
        return NextResponse.json({ message: `Error fetching location ${id}` }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const body = await request.json();
        const response = await axios.patch(`${baseURL}/location/${id}`, body);
        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        console.error(`Error updating location ${id}:`, error);
        return NextResponse.json({ message: `Error updating location ${id}` }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        await axios.delete(`${baseURL}/location/${id}`);
        return NextResponse.json({ message: `Location ${id} deleted` }, { status: 200 });
    } catch (error) {
        console.error(`Error deleting location ${id}:`, error);
        return NextResponse.json({ message: `Error deleting location ${id}` }, { status: 500 });
    }
}
