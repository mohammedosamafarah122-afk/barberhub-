# BarberHub - Multi-Tenant Barber Platform

A modern, multi-tenant platform for barber shops to create their own online presence, manage bookings, and connect with customers.

## 🌟 Features

- **Multi-Tenant Architecture**: Each barber shop gets their own unique shop with custom branding
- **Online Booking System**: 24/7 booking with automatic confirmations
- **Admin Dashboard**: Full-featured dashboard for shop owners to manage their business
- **Customer Management**: Track customers and their booking history
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- **Secure Authentication**: Powered by Supabase Auth
- **Real-time Database**: All data synced with Supabase PostgreSQL
- **Image Storage**: Upload shop logos and gallery images
- **Custom Branding**: Each shop has unique colors, logo, and styling

## 🎨 Shop Features

Each shop includes:
- Custom shop page with unique branding
- Service catalog with pricing
- Photo gallery showcase
- Online booking form with date/time selection
- Contact information and location
- About section

## 🔧 Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Hosting**: Can be deployed to Vercel, Netlify, or GitHub Pages
- **Database**: PostgreSQL via Supabase
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage

## 📦 Project Structure

```
BarberHub/
├── index.html                  # Main platform landing page
├── shop.html                   # Individual shop page template
├── dashboard.html              # Shop owner admin dashboard
├── styles.css                  # Main platform styles
├── shop-styles.css             # Shop page styles
├── dashboard-styles.css        # Dashboard styles
├── script.js                   # Main platform JavaScript
├── shop-script.js              # Shop page JavaScript
├── dashboard-script.js         # Dashboard JavaScript
├── shop-data.js                # Local data manager (backup)
├── supabase-config.js          # Supabase configuration
├── supabase-shop-manager.js    # Supabase data operations
├── database-schema.sql         # Database schema for Supabase
├── QUICK_START.md              # 5-minute setup guide
├── DEPLOYMENT_GUIDE.md         # Comprehensive deployment guide
└── README.md                   # This file
```

## 🚀 Quick Start

### For Local Development (No Database)
1. Open `index.html` in your browser
2. Data is stored in browser local storage
3. Perfect for testing and development

### For Production with Supabase
Follow the **QUICK_START.md** guide (5 minutes):
1. Create Supabase project
2. Run database schema
3. Configure credentials
4. Deploy to hosting

## 📖 Documentation

- **Quick Start**: `QUICK_START.md` - Get up and running in 5 minutes
- **Full Deployment Guide**: `DEPLOYMENT_GUIDE.md` - Comprehensive setup instructions
- **Database Schema**: `database-schema.sql` - Complete database structure

## 🎯 Getting Started

### Step 1: Clone or Download
```bash
git clone <your-repo-url>
cd BarberHub
```

### Step 2: Configure Supabase
1. Copy `supabase-config.example.js` to `supabase-config.js`
2. Add your Supabase credentials
3. See `QUICK_START.md` for details

### Step 3: Deploy
Choose your hosting platform:
- **Vercel** (Recommended): https://vercel.com
- **Netlify**: https://netlify.com
- **GitHub Pages**: Enable in repository settings

## 🔐 Security

- Row Level Security (RLS) enabled on all tables
- Authentication required for shop management
- Public read access for shop listings and bookings
- Secure credential management with environment variables
- `.gitignore` configured to prevent credential leaks

## 📱 Responsive Design

- Mobile-first approach
- Tablet optimization
- Desktop enhancement
- Touch-friendly interface
- Fast loading times

## 🎨 Customization

Each shop can customize:
- Shop name and logo
- Primary, secondary, and accent colors
- Services and pricing
- Gallery images
- About section content
- Contact information

## 🛠️ Development

### Local Testing
1. Open `index.html` in a web browser
2. Use browser dev tools (F12) for debugging
3. Check console for any errors

### Database Changes
1. Edit `database-schema.sql`
2. Run in Supabase SQL Editor
3. Test thoroughly before production

### Adding Features
1. Update HTML structure
2. Add CSS styling
3. Implement JavaScript logic
4. Update Supabase manager if needed

## 📊 Database Schema

### Tables
- **shops**: Store information
- **services**: Shop services and pricing
- **bookings**: Customer appointments
- **users**: Shop owner accounts

### Storage Buckets
- **shop-logos**: Shop logo images
- **gallery-images**: Shop gallery photos

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 💡 Use Cases

Perfect for:
- Barber shops wanting online presence
- Hair salons with multiple stylists
- Beauty professionals
- Grooming services
- Personal care businesses

## 🎓 Learning Resources

- [Supabase Documentation](https://supabase.com/docs)
- [JavaScript MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

## 📞 Support

For issues or questions:
1. Check `QUICK_START.md` for common setup issues
2. Review `DEPLOYMENT_GUIDE.md` for detailed instructions
3. Check browser console for error messages
4. Review Supabase dashboard logs

## 🎉 Credits

Built with modern web technologies and powered by Supabase.

---

**Ready to deploy? Start with QUICK_START.md! 🚀**
