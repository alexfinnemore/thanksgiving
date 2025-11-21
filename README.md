# Friendsgiving 2025 Invitation

A retro "Day of the Tentacle" style web invitation for Friendsgiving.

## Features

- **Retro Pixel Art UI**: Styled like a classic LucasArts adventure game.
- **RSVP System**: Guests can RSVP, add a +1, and choose if they are coming early to cook.
- **Dish Selection**: A rotating carousel of dishes. Shows how many people are already bringing a specific item.
- **Custom Dishes**: Guests can add their own dish if it's not on the list.
- **Diapers Option**: Special option for non-cooks!
- **Mobile Optimized**: Looks great on phones.

## Deployment

### Vercel (Recommended)

1.  Push this repository to GitHub.
2.  Import the project into Vercel.
3.  Deploy!

### Database Setup (Important)

Currently, the app uses an **in-memory** database for demonstration purposes. This means RSVPs will be lost if the server restarts (which happens frequently on Vercel serverless functions).

To make it persistent:

1.  **Create a Vercel Postgres Database**:
    - Go to your Vercel project dashboard -> Storage -> Create -> Postgres.
    - Connect it to your project.
    - Pull the env vars (`.env.local`).

2.  **Update `src/app/api/rsvp/route.ts`**:
    - Replace the in-memory array with SQL queries.
    - Example:
      ```ts
      import { sql } from '@vercel/postgres';
      
      // GET
      const { rows } = await sql`SELECT * FROM rsvps`;
      
      // POST
      await sql`INSERT INTO rsvps (name, dish, plus_one, come_early) VALUES (...)`;
      ```

## Development

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Run the dev server:
    ```bash
    npm run dev
    ```
3.  Open [http://localhost:3000](http://localhost:3000).
