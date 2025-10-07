# Deploy BarberHub to GitHub Pages

## 🚀 Quick Deployment Guide

### Step 1: Prepare Your Project

1. Make sure all your files are ready
2. Your `supabase-config.js` should have your Supabase credentials (but won't be committed thanks to `.gitignore`)

### Step 2: Create GitHub Repository

#### Option A: Using GitHub Website
1. Go to https://github.com
2. Click the **+** icon (top right) → **New repository**
3. Fill in:
   - **Repository name**: `barberhub` (or your preferred name)
   - **Description**: "Multi-tenant barber platform"
   - **Public** or **Private**: Choose based on your preference
   - ❌ **Don't** initialize with README (we already have one)
4. Click **Create repository**

#### Option B: Using GitHub Desktop
1. Download GitHub Desktop: https://desktop.github.com
2. Install and sign in with your GitHub account
3. Click **File** → **New repository**
4. Fill in the details and click **Create repository**

### Step 3: Push Your Code to GitHub

#### Using Command Line (Git)

Open Command Prompt or PowerShell in your project folder:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: BarberHub platform"

# Add your GitHub repository as remote
# Replace USERNAME and REPOSITORY with your details
git remote add origin https://github.com/USERNAME/REPOSITORY.git

# Push to GitHub
git branch -M main
git push -u origin main
```

#### Using GitHub Desktop

1. Open GitHub Desktop
2. Click **File** → **Add local repository**
3. Select your BarberHub folder
4. Click **Publish repository**
5. Choose public or private
6. Click **Publish repository**

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Wait 1-2 minutes for deployment

### Step 5: Get Your Live URL

After deployment completes:
- Your site will be at: `https://USERNAME.github.io/REPOSITORY/`
- GitHub will show the URL in the Pages section
- Click the URL to visit your live site!

## 📋 Before You Deploy - Important!

### Configure Supabase for GitHub Pages

1. **Copy the example config**:
   ```bash
   # Make sure you have supabase-config.js with your real credentials
   # It won't be committed (protected by .gitignore)
   ```

2. **Update Supabase Auth Settings**:
   - Go to your Supabase Dashboard
   - Click **Authentication** → **URL Configuration**
   - Add your GitHub Pages URL to **Site URL**:
     ```
     https://USERNAME.github.io/REPOSITORY/
     ```
   - Add to **Redirect URLs**:
     ```
     https://USERNAME.github.io/REPOSITORY/**
     ```

### Handle Configuration for GitHub Pages

Since `.gitignore` prevents `supabase-config.js` from being uploaded, you need to handle credentials differently for GitHub Pages.

**Option 1: Public Repository with Client-Side Config**
Create a file called `supabase-config.js` in your repository with your credentials. Since this is a client-side app, the anon key is meant to be public anyway.

**Option 2: Use GitHub Actions (Advanced)**
Set up GitHub Secrets and use Actions to inject credentials during build.

## 🔧 Recommended: Make Config Public-Safe

GitHub Pages serves static files, so you'll need your `supabase-config.js` to be in the repository. The good news: Supabase's **anon key** is designed to be public-facing and is safe to expose.

1. **Remove** `supabase-config.js` from `.gitignore`:
   
   Edit `.gitignore` and remove or comment out this line:
   ```
   # supabase-config.js
   ```

2. **Add your credentials** to `supabase-config.js`:
   ```javascript
   const SUPABASE_URL = 'https://your-project.supabase.co';
   const SUPABASE_ANON_KEY = 'your-anon-public-key-here';
   
   const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
   window.supabaseClient = supabase;
   ```

3. **Commit and push**:
   ```bash
   git add .
   git commit -m "Add Supabase configuration"
   git push
   ```

**Note**: The anon key is designed for browser use and is protected by Row Level Security (RLS) policies. Your database is still secure!

## 🧪 Test Your Deployment

After deployment:

1. Visit your GitHub Pages URL
2. Open browser console (F12)
3. Check for errors
4. Try these actions:
   - Register a new shop
   - Login
   - View a shop
   - Create a booking
5. Check Supabase dashboard to verify data is being saved

## 🔄 Updating Your Site

Whenever you make changes:

```bash
# Add changes
git add .

# Commit with a message
git commit -m "Description of your changes"

# Push to GitHub
git push

# GitHub Pages will automatically redeploy (takes 1-2 minutes)
```

## 🛠️ Troubleshooting

### "Site not found" or 404 errors
- Wait 2-3 minutes after enabling Pages
- Check that the branch and folder are correctly selected
- Make sure `index.html` is in the root folder

### "Can't connect to Supabase"
- Verify your `supabase-config.js` has correct credentials
- Check browser console for specific errors
- Ensure Supabase project is active
- Add GitHub Pages URL to Supabase Auth settings

### Images not loading
- Make sure image files are committed to Git
- Check image paths are correct (case-sensitive!)
- Use relative paths (e.g., `Screenshot 2025-10-07 182953.png`)

### CSS/JS not loading
- Check file paths in HTML files
- Ensure all CSS and JS files are committed
- Clear browser cache (Ctrl+Shift+R)

### Authentication issues
- Add GitHub Pages URL to Supabase Auth redirect URLs
- Check that email provider is enabled in Supabase
- Review Supabase Auth logs

## 🎯 Best Practices

1. **Commit frequently** with descriptive messages
2. **Test locally** before pushing to GitHub
3. **Keep credentials secure** (even though anon key is public-safe)
4. **Use branches** for experimental features
5. **Monitor Supabase logs** for errors

## 📱 Custom Domain (Optional)

Want a custom domain like `www.yourbarberhub.com`?

1. Purchase a domain from:
   - Namecheap: https://namecheap.com
   - Google Domains: https://domains.google
   - GoDaddy: https://godaddy.com

2. In your repository:
   - Go to **Settings** → **Pages**
   - Enter your custom domain
   - Click **Save**

3. Configure DNS:
   - Add these DNS records at your domain provider:
     ```
     Type: A
     Name: @
     Value: 185.199.108.153
     
     Type: A
     Name: @
     Value: 185.199.109.153
     
     Type: A
     Name: @
     Value: 185.199.110.153
     
     Type: A
     Name: @
     Value: 185.199.111.153
     
     Type: CNAME
     Name: www
     Value: USERNAME.github.io
     ```

4. Wait for DNS propagation (can take up to 24 hours)

## 📊 Monitoring Your Site

- **GitHub Insights**: See visitor stats in your repository
- **Supabase Dashboard**: Monitor database usage and API calls
- **Google Analytics**: Add tracking code for detailed analytics

## 🎉 You're Live!

Your BarberHub is now accessible to anyone with your GitHub Pages URL!

Share it with:
- Barber shops who want to join
- Customers looking for barber services
- Friends and family for testing

## 📞 Need Help?

- GitHub Pages Docs: https://docs.github.com/pages
- Git Tutorial: https://git-scm.com/docs/gittutorial
- GitHub Desktop Guide: https://docs.github.com/desktop

---

**Ready to go live? Follow the steps above! 🚀**

