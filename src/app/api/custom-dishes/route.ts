import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Create table if it doesn't exist
        await sql`
            CREATE TABLE IF NOT EXISTS custom_dishes (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            )
        `;

        const { rows } = await sql`SELECT * FROM custom_dishes ORDER BY created_at DESC`;
        return NextResponse.json({ dishes: rows });
    } catch (error) {
        console.error('Error fetching custom dishes:', error);
        return NextResponse.json({ dishes: [] });
    }
}

export async function POST(request: Request) {
    try {
        const { name } = await request.json();

        if (!name || name.trim() === '') {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        // Check if dish already exists
        const { rows: existing } = await sql`
            SELECT * FROM custom_dishes WHERE LOWER(name) = LOWER(${name.trim()})
        `;

        if (existing.length > 0) {
            // Return existing dish
            return NextResponse.json({ dish: existing[0] });
        }

        // Insert new custom dish
        const { rows } = await sql`
            INSERT INTO custom_dishes (name)
            VALUES (${name.trim()})
            RETURNING *
        `;

        return NextResponse.json({ dish: rows[0] });
    } catch (error) {
        console.error('Error creating custom dish:', error);
        return NextResponse.json({ error: 'Failed to create custom dish' }, { status: 500 });
    }
}
