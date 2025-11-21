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
