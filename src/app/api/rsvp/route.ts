import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// Fallback in-memory store
let rsvpsInMemory: any[] = [];

export async function GET() {
    try {
        // Try to query the database
        const { rows } = await sql`CREATE TABLE IF NOT EXISTS rsvps (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      dish VARCHAR(255),
      dish_id VARCHAR(255),
      plus_one BOOLEAN,
      come_early BOOLEAN,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

        const result = await sql`SELECT * FROM rsvps ORDER BY timestamp DESC`;
        return NextResponse.json({ rsvps: result.rows });
    } catch (error) {
        console.warn('Database connection failed, using in-memory store:', error);
        console.log('Current In-Memory RSVPs:', JSON.stringify(rsvpsInMemory, null, 2));
        return NextResponse.json({ rsvps: rsvpsInMemory });
    }
}

export async function POST(request: Request) {
    const body = await request.json();

    try {
        await sql`INSERT INTO rsvps (name, dish, dish_id, plus_one, come_early) 
              VALUES (${body.name}, ${body.dish}, ${body.dishId}, ${body.plusOne}, ${body.comeEarly})`;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.warn('Database write failed, using in-memory store:', error);

        const newRsvp = {
            id: Date.now().toString(),
            ...body,
            timestamp: new Date().toISOString(),
        };
        rsvpsInMemory.push(newRsvp);

        return NextResponse.json({ success: true, rsvp: newRsvp });
    }
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    try {
        await sql`DELETE FROM rsvps WHERE id = ${id}`;
        return NextResponse.json({ success: true });
    } catch (error) {
        console.warn('Database delete failed, using in-memory store:', error);
        rsvpsInMemory = rsvpsInMemory.filter(r => r.id !== id);
        return NextResponse.json({ success: true });
    }
}

export async function PUT(request: Request) {
    const body = await request.json();
    const { id, name, dish, dishId, plusOne, comeEarly } = body;

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    try {
        await sql`UPDATE rsvps 
              SET name = ${name}, dish = ${dish}, dish_id = ${dishId}, plus_one = ${plusOne}, come_early = ${comeEarly}
              WHERE id = ${id}`;
        return NextResponse.json({ success: true });
    } catch (error) {
        console.warn('Database update failed, using in-memory store:', error);
        const index = rsvpsInMemory.findIndex(r => r.id === id);
        if (index !== -1) {
            rsvpsInMemory[index] = { ...rsvpsInMemory[index], ...body };
        }
        return NextResponse.json({ success: true });
    }
}
