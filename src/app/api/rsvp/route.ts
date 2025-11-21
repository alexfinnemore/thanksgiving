import { NextResponse } from 'next/server';

// In a real app, use Vercel Postgres or KV
// This is a temporary in-memory store
let rsvps: any[] = [];

export async function GET() {
    return NextResponse.json({ rsvps });
}

export async function POST(request: Request) {
    const body = await request.json();

    const newRsvp = {
        id: Date.now().toString(),
        ...body,
        timestamp: new Date().toISOString(),
    };

    rsvps.push(newRsvp);

    return NextResponse.json({ success: true, rsvp: newRsvp });
}
