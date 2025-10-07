# BarberHub - Supabase Deployment Guide

## Prerequisites
1. A Supabase account (sign up at https://supabase.com)
2. Git installed on your computer
3. Basic knowledge of SQL and JavaScript

## Step 1: Create a Supabase Project

1. Go to https://app.supabase.com
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: BarberHub (or your preferred name)
   - **Database Password**: Create a strong password (save it securely)
   - **Region**: Choose the closest region to your users
5. Click "Create new project"
6. Wait for the project to be set up (usually takes 1-2 minutes)

## Step 2: Set Up the Database

1. In your Supabase project dashboard, click on the **SQL Editor** icon in the left sidebar
2. Click "New Query"
3. Copy the entire contents of `database-schema.sql` file
4. Paste it into the SQL editor
5. Click "Run" to execute the SQL commands
6. You should see a success message confirming tables were created

## Step 3: Configure Authentication

1. Click on **Authentication** in the left sidebar
2. Go to **Providers** tab
3. Enable **Email** provider (it's usually enabled by default)
4. Configure email templates if desired:
   - Go to **Email Templates**
   - Customize "Confirm signup", "Magic Link", etc.

## Step 4: Set Up Storage (for images)

1. Click on **Storage** in the left sidebar
2. Click "Create a new bucket"
3. Create the following buckets:
   - **Name**: `shop-logos`
   - **Public**: Yes (check the box)
   - Click "Create bucket"
4. Create another bucket:
   - **Name**: `gallery-images`
   - **Public**: Yes
   - Click "Create bucket"

## Step 5: Configure Your Application

1. In your Supabase dashboard, click on **Settings** (gear icon)
2. Go to **API** section
3. Copy the following credentials:
   - **Project URL** (looks like: https://xxxxx.supabase.co)
   - **anon public** API key (the long string under "Project API keys")

4. Open the `supabase-config.js` file in your project
5. Replace the placeholders:
   ```javascript
   const SUPABASE_URL = 'https://your-project-id.supabase.co';
   const SUPABASE_ANON_KEY = 'your-anon-key-here';
   ```

## Step 6: Add Supabase SDK to Your HTML Files

Add the Supabase JavaScript client library to your HTML files. Add this line in the `<head>` section BEFORE your other script tags:

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="supabase-config.js"></script>
```

Update the following files:
- `index.html`
- `shop.html`
- `dashboard.html`

## Step 7: Deploy Your Website

You have several options for hosting your frontend:

### Option A: Vercel (Recommended)
1. Go to https://vercel.com
2. Sign up/login with GitHub
3. Click "New Project"
4. Import your Git repository or upload your project files
5. Deploy!

### Option B: Netlify
1. Go to https://netlify.com
2. Sign up/login
3. Drag and drop your project folder
4. Deploy!

### Option C: GitHub Pages
1. Create a GitHub repository
2. Push your code to the repository
3. Go to repository Settings > Pages
4. Select your branch and save
5. Your site will be live at `https://yourusername.github.io/repository-name`

## Step 8: Test Your Application

1. Visit your deployed website
2. Try registering a new shop
3. Login to the dashboard
4. Create some services
5. Test the booking functionality

## Environment Variables (Production)

For production, it's recommended to use environment variables instead of hardcoding credentials:

1. In Vercel/Netlify:
   - Go to project settings
   - Add environment variables:
     - `VITE_SUPABASE_URL`: Your Supabase URL
     - `VITE_SUPABASE_ANON_KEY`: Your anon key

2. Update your `supabase-config.js`:
   ```javascript
   const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'YOUR_FALLBACK_URL';
   const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_FALLBACK_KEY';
   ```

## Security Notes

⚠️ **Important Security Considerations:**

1. **Never commit** your actual Supabase credentials to Git
2. Use environment variables in production
3. Add `supabase-config.js` to `.gitignore` if it contains real credentials
4. Row Level Security (RLS) is already enabled in the schema
5. Review and adjust RLS policies based on your specific requirements

## Troubleshooting

### Database Connection Issues
- Verify your Supabase URL and API key are correct
- Check browser console for errors
- Ensure your Supabase project is active

### Authentication Issues
- Verify email provider is enabled in Supabase dashboard
- Check email templates are configured
- Look for auth errors in browser console

### Image Upload Issues
- Ensure storage buckets are created and set to public
- Verify bucket names match those in your code
- Check file size limits (Supabase free tier: 1GB storage)

## Next Steps

Once deployed, consider:
1. Setting up custom domain
2. Configuring email notifications
3. Adding analytics
4. Setting up automated backups
5. Implementing rate limiting
6. Adding more advanced features

## Support

For Supabase-specific issues:
- Documentation: https://supabase.com/docs
- Community: https://github.com/supabase/supabase/discussions

## Need Help?

If you encounter any issues during deployment, check:
1. Browser console for JavaScript errors
2. Supabase logs in your project dashboard
3. Network tab in browser dev tools to see API calls

