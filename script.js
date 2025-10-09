// Platform JavaScript
let currentUser = null;
let currentShop = null;

// Initialize platform
document.addEventListener('DOMContentLoaded', function() {
    // Auth gate: if no user session and on platform page, redirect to index (auth landing)
    const isPlatformPage = /platform\.html$/i.test(window.location.pathname);
    const isDiscoverPage = /discover\.html$/i.test(window.location.pathname);
    const isShopPage = /shop\.html$/i.test(window.location.pathname);
    const isIndexPage = /index\.html$/i.test(window.location.pathname) || window.location.pathname === '/' || window.location.pathname.endsWith('/');
    const hasSession = !!localStorage.getItem('barberhub_user');
    
    // Redirect to index if no session and trying to access platform
    if (!hasSession && (isPlatformPage)) {
        window.location.replace('index.html');
        return;
    }

    // If logged in and on index, go to platform
    if (hasSession && isIndexPage && !isDiscoverPage && !isShopPage) {
        window.location.replace('platform.html');
        return;
    }

    initializePlatform();
    loadShopsFromManager();
});

// Platform initialization
function initializePlatform() {
    // Mobile navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar && window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        } else if (navbar) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        }
    });

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Message sent successfully! We will get back to you soon.', 'success');
            this.reset();
        });
    }
}

// Modal functions
function showLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function showRegisterModal(plan = '') {
    document.getElementById('registerModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    if (plan) {
        const select = document.querySelector('#registerModal select');
        if (select) {
            select.value = plan;
        }
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

function switchAuthModal() {
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    
    if (loginModal.style.display === 'block') {
        loginModal.style.display = 'none';
        registerModal.style.display = 'block';
    } else {
        registerModal.style.display = 'none';
        loginModal.style.display = 'block';
    }
}

// Authentication handlers
function handleLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = event.target.querySelector('input[type="email"]').value;
    const password = event.target.querySelector('input[type="password"]').value;
    
    // Simulate login
    if (email && password) {
        currentUser = {
            id: 1,
            name: 'John Barber',
            email: email,
            role: 'owner'
        };
        
        // Get the user's shop from shop manager
        const userShops = shopManager.getAllShops().filter(shop => shop.owner === currentUser.name);
        currentShop = userShops.length > 0 ? userShops[0] : shopManager.getShop(1);
        
        // Store user session
        localStorage.setItem('barberhub_user', JSON.stringify(currentUser));
        localStorage.setItem('barberhub_current_shop', JSON.stringify(currentShop));
        
        showNotification('Login successful! Entering platform...', 'success');
        setTimeout(() => {
            window.location.href = 'platform.html';
        }, 800);
    } else {
        showNotification('Please fill in all fields', 'error');
    }
}

function handleRegister(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = event.target.querySelector('input[type="text"]').value;
    const email = event.target.querySelector('input[type="email"]').value;
    const password = event.target.querySelector('input[type="password"]').value;
    const shopName = event.target.querySelectorAll('input[type="text"]')[1].value;
    const location = event.target.querySelectorAll('input[type="text"]')[2].value;
    const plan = event.target.querySelector('select').value;
    
    // Basic validation
    if (!name || !email || !password || !shopName || !location || !plan) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Create user
    currentUser = {
        id: Date.now(),
        name: name,
        email: email,
        role: 'owner'
    };
    
    // Create shop with default services and branding
    const shopData = {
        name: shopName,
        owner: name,
        email: email,
        phone: '(555) 123-4567',
        address: location,
        description: `Welcome to ${shopName}! We provide professional barber services with attention to detail and customer satisfaction.`,
        logo: generateDefaultLogo(shopName),
        colorScheme: generateColorScheme(shopName),
        services: generateDefaultServices(shopName),
        hours: {
            monday: "9:00 AM - 7:00 PM",
            tuesday: "9:00 AM - 7:00 PM",
            wednesday: "9:00 AM - 7:00 PM",
            thursday: "9:00 AM - 7:00 PM",
            friday: "9:00 AM - 8:00 PM",
            saturday: "8:00 AM - 6:00 PM",
            sunday: "10:00 AM - 5:00 PM"
        },
        rating: 0,
        reviewCount: 0,
        socialMedia: {
            facebook: "",
            instagram: "",
            twitter: ""
        }
    };
    
    // Create shop using shop manager
    currentShop = shopManager.createShop(shopData);
    
    // Store user session
    localStorage.setItem('barberhub_user', JSON.stringify(currentUser));
    localStorage.setItem('barberhub_current_shop', JSON.stringify(currentShop));
    
    showNotification('Account created! Entering platform...', 'success');
    setTimeout(() => {
        window.location.href = 'platform.html';
    }, 800);
}

// Generate default logo based on shop name
function generateDefaultLogo(shopName) {
    const initials = shopName.split(' ').map(word => word[0]).join('').toUpperCase();
    const colors = ['#d4af37', '#007cff', '#8b4513', '#e74c3c', '#27ae60', '#9b59b6'];
    const color = colors[shopName.length % colors.length];
    
    return `data:image/svg+xml;base64,${btoa(`
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" fill="${color}" rx="50"/>
            <text x="50" y="50" text-anchor="middle" dy="0.35em" fill="white" font-family="Arial, sans-serif" font-size="24" font-weight="bold">${initials}</text>
        </svg>
    `)}`;
}

// Generate color scheme based on shop name
function generateColorScheme(shopName) {
    const schemes = [
        { primary: "#d4af37", secondary: "#f4d03f", background: "#1a1a1a", text: "#333333" },
        { primary: "#007cff", secondary: "#4da6ff", background: "#f8f9fa", text: "#333333" },
        { primary: "#8b4513", secondary: "#a0522d", background: "#2c1810", text: "#f5f5f5" },
        { primary: "#e74c3c", secondary: "#ff6b6b", background: "#2c1810", text: "#f5f5f5" },
        { primary: "#27ae60", secondary: "#2ecc71", background: "#f8f9fa", text: "#333333" },
        { primary: "#9b59b6", secondary: "#bb8fce", background: "#f8f9fa", text: "#333333" }
    ];
    
    return schemes[shopName.length % schemes.length];
}

// Generate default services based on shop name
function generateDefaultServices(shopName) {
    const baseId = Date.now();
    const serviceSets = [
        [
            { id: baseId + 1, name: "Classic Haircut", price: 25, duration: 45, description: "Traditional barber haircut with precision styling" },
            { id: baseId + 2, name: "Beard Trim", price: 15, duration: 30, description: "Expert beard trimming and shaping" },
            { id: baseId + 3, name: "Hot Towel Shave", price: 30, duration: 40, description: "Traditional hot towel shave with premium products" },
            { id: baseId + 4, name: "Premium Package", price: 45, duration: 75, description: "Complete grooming experience" }
        ],
        [
            { id: baseId + 1, name: "Modern Fade", price: 30, duration: 50, description: "Contemporary fade with precision blending" },
            { id: baseId + 2, name: "Beard Sculpting", price: 20, duration: 35, description: "Artistic beard shaping and styling" },
            { id: baseId + 3, name: "Hair Styling", price: 15, duration: 25, description: "Professional hair styling and finishing" },
            { id: baseId + 4, name: "Complete Makeover", price: 55, duration: 90, description: "Full transformation with cut, style, and beard work" }
        ],
        [
            { id: baseId + 1, name: "Traditional Cut", price: 20, duration: 40, description: "Classic barber cut with traditional techniques" },
            { id: baseId + 2, name: "Straight Razor Shave", price: 25, duration: 35, description: "Traditional straight razor shave with hot towels" },
            { id: baseId + 3, name: "Mustache Trim", price: 10, duration: 20, description: "Precise mustache trimming and styling" },
            { id: baseId + 4, name: "Gentleman's Package", price: 40, duration: 70, description: "Complete traditional grooming experience" }
        ]
    ];
    
    return serviceSets[shopName.length % serviceSets.length];
}

// Shop search functionality
function searchShops() {
    const searchTerm = document.getElementById('locationSearch')?.value || '';
    if (!searchTerm.trim()) {
        // allow empty to show all
    }
    const shopsGrid = document.getElementById('shopsGrid');
    if (!shopsGrid) return;

    const ratingMin = parseFloat(document.getElementById('ratingFilter')?.value || '0');
    const svcFilters = Array.from(document.querySelectorAll('.svc-filter:checked')).map(el => el.value.toLowerCase());

    const all = shopManager.getAllShops();
    const filtered = all.filter(shop => {
        const matchesText = !searchTerm || shop.name.toLowerCase().includes(searchTerm.toLowerCase()) || shop.address.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRating = (shop.rating || 0) >= ratingMin;
        const hasServices = svcFilters.length === 0 || (shop.services || []).some(s => svcFilters.some(f => s.name.toLowerCase().includes(f)));
        return matchesText && matchesRating && hasServices;
    });

    if (filtered.length === 0) {
        shopsGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No shops found</h3>
                <p>Adjust filters or search terms and try again</p>
                <button class="btn btn-primary" onclick="loadShopsFromManager()">Show All Shops</button>
            </div>
        `;
        return;
    }

    shopsGrid.innerHTML = filtered.map(shop => `
        <div class="shop-card" style="border-left: 4px solid ${shop.colorScheme.primary}">
            <div class="shop-header">
                <div class="shop-avatar" style="background: linear-gradient(45deg, ${shop.colorScheme.primary}, ${shop.colorScheme.secondary})">
                    ${shop.logo ? `<img src="${shop.logo}" alt="${shop.name}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">` : '<i class="fas fa-cut"></i>'}
                </div>
                <div class="shop-info">
                    <h3>${shop.name}</h3>
                    <p>${shop.address.split(',')[1]?.trim() || shop.address}</p>
                </div>
            </div>
            <div class="shop-rating">
                <div class="stars">${generateStars(shop.rating)}</div>
                <span class="rating-text">${shop.rating} (${shop.reviewCount} reviews)</span>
            </div>
            <div class="shop-description">
                <p>${shop.description}</p>
            </div>
            <div class="shop-services">
                <h4>Services</h4>
                <div class="service-tags">
                    ${shop.services.slice(0, 3).map(service => `<span class="service-tag">${service.name}</span>`).join('')}
                    ${shop.services.length > 3 ? `<span class="service-tag">+${shop.services.length - 3} more</span>` : ''}
                </div>
            </div>
            <div class="shop-actions">
                <button class="btn btn-primary btn-sm" onclick="viewShop(${shop.id})" style="background: ${shop.colorScheme.primary}">View Shop</button>
                <button class="btn btn-outline btn-sm" onclick="bookAppointment(${shop.id})" style="border-color: ${shop.colorScheme.primary}; color: ${shop.colorScheme.primary}">Book Now</button>
            </div>
        </div>
    `).join('');
}

// Load shops from shop manager
function loadShopsFromManager() {
    const shopsGrid = document.getElementById('shopsGrid');
    if (!shopsGrid) return;

    const shops = shopManager.getAllShops();
    shopsGrid.innerHTML = shops.map(shop => `
        <div class="shop-card" style="border-left: 4px solid ${shop.colorScheme.primary}">
            <div class="shop-header">
                <div class="shop-avatar" style="background: linear-gradient(45deg, ${shop.colorScheme.primary}, ${shop.colorScheme.secondary})">
                    ${shop.logo ? `<img src="${shop.logo}" alt="${shop.name}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">` : '<i class="fas fa-cut"></i>'}
                </div>
                <div class="shop-info">
                    <h3>${shop.name}</h3>
                    <p>${shop.address.split(',')[1]?.trim() || shop.address}</p>
                </div>
            </div>
            <div class="shop-rating">
                <div class="stars">${generateStars(shop.rating)}</div>
                <span class="rating-text">${shop.rating} (${shop.reviewCount} reviews)</span>
            </div>
            <div class="shop-description">
                <p>${shop.description}</p>
            </div>
            <div class="shop-services">
                <h4>Services</h4>
                <div class="service-tags">
                    ${shop.services.slice(0, 3).map(service => `<span class="service-tag">${service.name}</span>`).join('')}
                    ${shop.services.length > 3 ? `<span class="service-tag">+${shop.services.length - 3} more</span>` : ''}
                </div>
            </div>
            <div class="shop-actions">
                <button class="btn btn-primary btn-sm" onclick="viewShop(${shop.id})" style="background: ${shop.colorScheme.primary}">View Shop</button>
                <button class="btn btn-outline btn-sm" onclick="bookAppointment(${shop.id})" style="border-color: ${shop.colorScheme.primary}; color: ${shop.colorScheme.primary}">Book Now</button>
            </div>
        </div>
    `).join('');
}

// Generate star rating display
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return '★'.repeat(fullStars) + 
           (hasHalfStar ? '☆' : '') + 
           '☆'.repeat(emptyStars);
}

// Shop actions
function viewShop(shopId) {
    // Get shop data to ensure it exists
    const shop = shopManager.getShop(shopId);
    if (!shop) {
        showNotification('Shop not found', 'error');
        return;
    }
    
    // Redirect to shop page with shop ID
    window.location.href = `shop.html?id=${shopId}`;
}

function bookAppointment(shopId) {
    // Get shop data to ensure it exists
    const shop = shopManager.getShop(shopId);
    if (!shop) {
        showNotification('Shop not found', 'error');
        return;
    }
    
    // Redirect to shop booking page
    window.location.href = `shop.html?id=${shopId}#booking`;
}

// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
document.head.appendChild(style);

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

console.log('BarberHub Platform loaded successfully! 🚀');