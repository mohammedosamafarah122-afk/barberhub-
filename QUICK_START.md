# Quick Start Guide - BarberHub Supabase Deployment

## 🚀 5-Minute Setup

### Step 1: Create Supabase Project (2 minutes)
1. Go to https://app.supabase.com
2. Click "New Project"
3. Fill in:
   - Name: `BarberHub`
   - Password: (create a strong password)
   - Region: (choose nearest to you)
4. Click "Create new project"

### Step 2: Set Up Database (1 minute)
1. In your Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click "New Query"
3. Open the `database-schema.sql` file from this project
4. Copy ALL the SQL code
5. Paste into the Supabase SQL editor
6. Click **RUN** button
7. You should see "Success" message

### Step 3: Create Storage Buckets (1 minute)
1. Click **Storage** in left sidebar
2. Click "New bucket"
3. Create first bucket:
   - Name: `shop-logos`
   - Public: ✅ Check this box
   - Click "Create bucket"
4. Click "New bucket" again
5. Create second bucket:
   - Name: `gallery-images`
   - Public: ✅ Check this box
   - Click "Create bucket"

### Step 4: Get Your Credentials (30 seconds)
1. Click **Settings** (gear icon) in left sidebar
2. Click **API** section
3. You'll see two things you need:
   - **Project URL** (looks like: https://xxxxx.supabase.co)
   - **anon public key** (long string of characters)
4. Keep this page open!

### Step 5: Configure Your App (30 seconds)
1. In your project folder, find `supabase-config.js`
2. Open it in a text editor
3. Replace these two lines:
   ```javascript
   const SUPABASE_URL = 'https://xxxxx.supabase.co'; // Paste your Project URL
   const SUPABASE_ANON_KEY = 'your-key-here'; // Paste your anon public key
   ```
4. Save the file

### Step 6: Add Supabase Manager (30 seconds)
Update your HTML files to include the Supabase manager script.

In `index.html`, find the line:
```html
<script src="shop-data.js"></script>
```

Replace it with:
```html
<script src="supabase-shop-manager.js"></script>
```

Do the same for `shop.html` and `dashboard.html`.

### Step 7: Test Locally
1. Open `index.html` in your browser
2. Try registering a new shop
3. Check if it appears in your Supabase dashboard under **Table Editor** > **shops**

## ✅ You're Done!

Your BarberHub is now connected to Supabase!

## 📤 Deploy to Hosting

### Option A: Vercel (Recommended)
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "New Project"
4. Click "Import Git Repository" or drag-drop your folder
5. Click "Deploy"
6. Done! You'll get a URL like: `your-app.vercel.app`

### Option B: Netlify
1. Go to https://netlify.com
2. Sign up
3. Drag and drop your project folder onto the page
4. Done! You'll get a URL like: `your-app.netlify.app`

### Option C: GitHub Pages
1. Create a GitHub account if you don't have one
2. Create a new repository
3. Upload all your files
4. Go to Settings > Pages
5. Select your branch (usually `main`)
6. Click Save
7. Done! URL: `yourusername.github.io/repository-name`

## 🔧 Troubleshooting

### "Can't connect to Supabase"
- Check if your `SUPABASE_URL` and `SUPABASE_ANON_KEY` are correct
- Make sure there are no extra spaces or quotes
- Open browser console (F12) to see error messages

### "Can't create shop"
- Make sure you ran the `database-schema.sql` in Supabase SQL Editor
- Check if tables exist: Go to Supabase > Table Editor
- Should see: shops, services, bookings, users tables

### "Images not uploading"
- Make sure storage buckets are created
- Make sure buckets are set to **Public**
- Check bucket names match: `shop-logos` and `gallery-images`

### "Authentication not working"
- In Supabase, go to Authentication > Providers
- Make sure Email provider is enabled
- Check email templates are configured

## 📚 Next Steps

Once deployed:
1. Share your URL with barbershops
2. They can register and create their shops
3. Customers can find shops and book appointments
4. Shop owners can manage bookings from the dashboard

## 🆘 Need Help?

Check these resources:
- **Full deployment guide**: See `DEPLOYMENT_GUIDE.md`
- **Supabase docs**: https://supabase.com/docs
- **Database schema**: See `database-schema.sql`

## 🔐 Security Note

⚠️ **Important**: 
- Never commit `supabase-config.js` with real credentials to Git
- The file is already in `.gitignore`
- Use `supabase-config.example.js` as a template
- For production, use environment variables

---

**Ready to go live? Follow Option A, B, or C above to deploy! 🎉**

