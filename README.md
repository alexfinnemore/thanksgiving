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

### Database Setup (Recommended)

The app is pre-configured to use **Vercel Postgres**. If you don't set it up, it will automatically fall back to an in-memory database (data is lost on restart).

**To set up the real database:**

1.  Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Select your project.
3.  Click on the **Storage** tab.
4.  Click **Create Database** -> **Postgres**.
5.  Give it a name (e.g., `thanksgiving-db`) and click **Create**.
6.  Once created, click **Connect Project** and select this project.
7.  Vercel will automatically add the necessary environment variables (`POSTGRES_URL`, etc.) to your deployment.
8.  **Redeploy** your app (or push a new commit) for the changes to take effect.

That's it! The app will automatically detect the database, create the table, and start saving RSVPs there.

**Why Vercel Postgres over Google Sheets?**
- **Zero Config:** It's built into Vercel. No API keys, service accounts, or complex OAuth setups.
- **Reliable:** It's a real SQL database, much faster and more robust than a spreadsheet.
- **Free Tier:** Vercel's free tier is generous enough for this event.

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
