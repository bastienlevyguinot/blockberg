# Supabase Setup Guide

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Fill in your project details
5. Wait for the project to be set up

## Step 2: Run the Database Schema

1. In your Supabase project, go to the **SQL Editor**
2. Open the file `backend-main/db/trade-posts.sql`
3. Copy the entire SQL content
4. Paste it into the Supabase SQL Editor
5. Click **Run** to create all tables, indexes, and sample data

## Step 3: Get Your API Credentials

1. Go to **Project Settings** (gear icon in sidebar)
2. Click on **API** section
3. Copy the following values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon/public key** (looks like `eyJhbGciOiJIUzI1...`)

## Step 4: Configure Environment Variables

1. In the `frontend-main` folder, rename `.env.example` to `.env`
2. Update the values:
   ```env
   PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## Step 5: Run the Frontend

```bash
cd frontend-main
npm run dev
```

Your landing page will now display trades from the Supabase database!

## Database Structure

The system uses 3 main tables:

- **trade_posts**: Stores closed trading positions with all trade data
- **trade_comments**: Stores comments on trades
- **trade_likes**: Stores likes on trades

## Adding Real Trades

Trades can be added to the database in two ways:

1. **Automatically**: Set up an event listener to monitor blockchain events
2. **Manually**: Users can submit their closed positions through the UI

See the backend documentation for more details on implementing trade submission.
