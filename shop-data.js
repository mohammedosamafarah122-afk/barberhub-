// Shop Data Management System
class ShopManager {
    constructor() {
        this.shops = this.loadShops();
        this.currentShop = null;
    }

    // Load shops from localStorage or create default shops
    loadShops() {
        const savedShops = localStorage.getItem('barberhub_shops');
        if (savedShops) {
            return JSON.parse(savedShops);
        }
        
        // Create default shops with unique branding
        return [
            {
                id: 1,
                name: "Elite Barber Shop",
                owner: "John Smith",
                email: "john@elitebarber.com",
                phone: "(555) 123-4567",
                address: "123 Main Street, New York, NY 10001",
                description: "Traditional barbering with modern style. We specialize in classic cuts, beard grooming, and hot towel shaves.",
                logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjZDRhZjM3Ii8+CjxwYXRoIGQ9Ik01MCAyMEMzMC4yIDIwIDE1IDM1LjIgMTUgNTVTMzAuMiA5MCA1MCA5MFM4NSA3NC44IDg1IDU1UzY5LjggMjAgNTAgMjBaIiBmaWxsPSIjMDAwIi8+CjxwYXRoIGQ9Ik00MCA0MEw2MCA0MEw2MCA2MEw0MCA2MFoiIGZpbGw9IiNkNGFmMzciLz4KPC9zdmc+",
                colorScheme: {
                    primary: "#d4af37",
                    secondary: "#f4d03f",
                    background: "#1a1a1a",
                    text: "#333333"
                },
                services: [
                    {
                        id: 101,
                        name: "Classic Haircut",
                        price: 30,
                        duration: 45,
                        description: "Traditional barber haircut with precision styling"
                    },
                    {
                        id: 102,
                        name: "Beard Trim & Style",
                        price: 20,
                        duration: 30,
                        description: "Professional beard trimming and shaping"
                    },
                    {
                        id: 103,
                        name: "Hot Towel Shave",
                        price: 35,
                        duration: 40,
                        description: "Traditional hot towel shave with premium products"
                    },
                    {
                        id: 104,
                        name: "Elite Package",
                        price: 60,
                        duration: 90,
                        description: "Complete grooming experience with haircut, beard trim, and styling"
                    }
                ],
                hours: {
                    monday: "9:00 AM - 7:00 PM",
                    tuesday: "9:00 AM - 7:00 PM",
                    wednesday: "9:00 AM - 7:00 PM",
                    thursday: "9:00 AM - 7:00 PM",
                    friday: "9:00 AM - 8:00 PM",
                    saturday: "8:00 AM - 6:00 PM",
                    sunday: "10:00 AM - 5:00 PM"
                },
                rating: 4.8,
                reviewCount: 156,
                socialMedia: {
                    facebook: "https://facebook.com/elitebarber",
                    instagram: "https://instagram.com/elitebarber",
                    twitter: "https://twitter.com/elitebarber"
                }
            },
            {
                id: 2,
                name: "Modern Cuts Studio",
                owner: "Mike Johnson",
                email: "mike@moderncuts.com",
                phone: "(555) 234-5678",
                address: "456 Brooklyn Ave, Brooklyn, NY 11201",
                description: "Contemporary barbering with a focus on modern styles and trends. We stay ahead of the curve with the latest techniques.",
                logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMDA3Y2ZmIi8+CjxwYXRoIGQ9Ik01MCAxMEMyNy45IDEwIDEwIDI3LjkgMTAgNTBTMjcuOSA5MCA1MCA5MFM5MCA3Mi4xIDkwIDUwUzcyLjEgMTAgNTAgMTBaIiBmaWxsPSIjZmZmIi8+CjxwYXRoIGQ9Ik0zMCAzMEw3MCAzMEw3MCA3MEwzMCA3MFoiIGZpbGw9IiMwMDdjZmYiLz4KPC9zdmc+",
                colorScheme: {
                    primary: "#007cff",
                    secondary: "#4da6ff",
                    background: "#f8f9fa",
                    text: "#333333"
                },
                services: [
                    {
                        id: 201,
                        name: "Modern Fade",
                        price: 35,
                        duration: 50,
                        description: "Contemporary fade with precision blending"
                    },
                    {
                        id: 202,
                        name: "Beard Sculpting",
                        price: 25,
                        duration: 35,
                        description: "Artistic beard shaping and styling"
                    },
                    {
                        id: 203,
                        name: "Hair Styling",
                        price: 20,
                        duration: 25,
                        description: "Professional hair styling and finishing"
                    },
                    {
                        id: 204,
                        name: "Complete Makeover",
                        price: 70,
                        duration: 100,
                        description: "Full transformation with cut, style, and beard work"
                    }
                ],
                hours: {
                    monday: "10:00 AM - 8:00 PM",
                    tuesday: "10:00 AM - 8:00 PM",
                    wednesday: "10:00 AM - 8:00 PM",
                    thursday: "10:00 AM - 8:00 PM",
                    friday: "10:00 AM - 9:00 PM",
                    saturday: "9:00 AM - 7:00 PM",
                    sunday: "11:00 AM - 6:00 PM"
                },
                rating: 4.6,
                reviewCount: 89,
                socialMedia: {
                    facebook: "https://facebook.com/moderncuts",
                    instagram: "https://instagram.com/moderncuts",
                    twitter: "https://twitter.com/moderncuts"
                }
            },
            {
                id: 3,
                name: "Classic Barbers",
                owner: "Robert Brown",
                email: "robert@classicbarbers.com",
                phone: "(555) 345-6789",
                address: "789 Manhattan Blvd, Manhattan, NY 10018",
                description: "Traditional barbering since 1950. We preserve the classic art of barbering with old-world techniques and modern comfort.",
                logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjOGI0NTEzIi8+CjxwYXRoIGQ9Ik01MCAxNUMyOS4xIDE1IDEyIDMyLjEgMTIgNTNTMjkuMSA5MSA1MCA5MVM4OCA3My45IDg4IDUzUzY5LjkgMTUgNTAgMTVaIiBmaWxsPSIjZmZmIi8+CjxwYXRoIGQ9Ik0zNSAzNUw2NSAzNUw2NSA2NUwzNSA2NVoiIGZpbGw9IiM4YjQ1MTMiLz4KPC9zdmc+",
                colorScheme: {
                    primary: "#8b4513",
                    secondary: "#a0522d",
                    background: "#2c1810",
                    text: "#f5f5f5"
                },
                services: [
                    {
                        id: 301,
                        name: "Traditional Cut",
                        price: 25,
                        duration: 40,
                        description: "Classic barber cut with traditional techniques"
                    },
                    {
                        id: 302,
                        name: "Straight Razor Shave",
                        price: 30,
                        duration: 35,
                        description: "Traditional straight razor shave with hot towels"
                    },
                    {
                        id: 303,
                        name: "Mustache Trim",
                        price: 15,
                        duration: 20,
                        description: "Precise mustache trimming and styling"
                    },
                    {
                        id: 304,
                        name: "Gentleman's Package",
                        price: 50,
                        duration: 75,
                        description: "Complete traditional grooming experience"
                    }
                ],
                hours: {
                    monday: "8:00 AM - 6:00 PM",
                    tuesday: "8:00 AM - 6:00 PM",
                    wednesday: "8:00 AM - 6:00 PM",
                    thursday: "8:00 AM - 6:00 PM",
                    friday: "8:00 AM - 7:00 PM",
                    saturday: "8:00 AM - 5:00 PM",
                    sunday: "Closed"
                },
                rating: 4.9,
                reviewCount: 203,
                socialMedia: {
                    facebook: "https://facebook.com/classicbarbers",
                    instagram: "https://instagram.com/classicbarbers",
                    twitter: "https://twitter.com/classicbarbers"
                }
            }
        ];
    }

    // Save shops to localStorage
    saveShops() {
        localStorage.setItem('barberhub_shops', JSON.stringify(this.shops));
    }

    // Get shop by ID
    getShop(id) {
        return this.shops.find(shop => shop.id === parseInt(id));
    }

    // Get all shops
    getAllShops() {
        return this.shops;
    }

    // Create new shop
    createShop(shopData) {
        const newShop = {
            id: Date.now(),
            ...shopData,
            rating: 0,
            reviewCount: 0,
            services: shopData.services || [],
            hours: shopData.hours || {},
            socialMedia: shopData.socialMedia || {},
            colorScheme: shopData.colorScheme || {
                primary: "#d4af37",
                secondary: "#f4d03f",
                background: "#1a1a1a",
                text: "#333333"
            }
        };
        
        this.shops.push(newShop);
        this.saveShops();
        return newShop;
    }

    // Update shop
    updateShop(id, updates) {
        const shopIndex = this.shops.findIndex(shop => shop.id === parseInt(id));
        if (shopIndex !== -1) {
            this.shops[shopIndex] = { ...this.shops[shopIndex], ...updates };
            this.saveShops();
            return this.shops[shopIndex];
        }
        return null;
    }

    // Delete shop
    deleteShop(id) {
        this.shops = this.shops.filter(shop => shop.id !== parseInt(id));
        this.saveShops();
    }

    // Search shops
    searchShops(query) {
        const searchTerm = query.toLowerCase();
        return this.shops.filter(shop => 
            shop.name.toLowerCase().includes(searchTerm) ||
            shop.address.toLowerCase().includes(searchTerm) ||
            shop.description.toLowerCase().includes(searchTerm)
        );
    }

    // Get shop services
    getShopServices(shopId) {
        const shop = this.getShop(shopId);
        return shop ? shop.services : [];
    }

    // Add service to shop
    addService(shopId, service) {
        const shop = this.getShop(shopId);
        if (shop) {
            // Ensure services array exists
            if (!shop.services) {
                shop.services = [];
            }
            
            const newService = {
                id: Date.now(),
                ...service
            };
            shop.services.push(newService);
            this.saveShops();
            return newService;
        }
        return null;
    }

    // Update service
    updateService(shopId, serviceId, updates) {
        const shop = this.getShop(shopId);
        if (shop) {
            const serviceIndex = shop.services.findIndex(service => service.id === serviceId);
            if (serviceIndex !== -1) {
                shop.services[serviceIndex] = { ...shop.services[serviceIndex], ...updates };
                this.saveShops();
                return shop.services[serviceIndex];
            }
        }
        return null;
    }

    // Delete service
    deleteService(shopId, serviceId) {
        const shop = this.getShop(shopId);
        if (shop) {
            shop.services = shop.services.filter(service => service.id !== serviceId);
            this.saveShops();
            return true;
        }
        return false;
    }

    // Generate shop URL
    generateShopUrl(shopId) {
        return `shop.html?id=${shopId}`;
    }

    // Apply shop branding to page
    applyShopBranding(shop) {
        if (!shop) return;

        // Update page title
        document.title = `${shop.name} - Professional Barber Services`;

        // Update favicon (if logo is provided)
        if (shop.logo) {
            const favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
            favicon.rel = 'icon';
            favicon.href = shop.logo;
            document.head.appendChild(favicon);
        }

        // Apply color scheme
        const root = document.documentElement;
        root.style.setProperty('--primary-color', shop.colorScheme.primary);
        root.style.setProperty('--secondary-color', shop.colorScheme.secondary);
        root.style.setProperty('--background-color', shop.colorScheme.background);
        root.style.setProperty('--text-color', shop.colorScheme.text);

        // Update shop name in navigation
        const navLogo = document.querySelector('.nav-logo span');
        if (navLogo) {
            navLogo.textContent = shop.name;
        }

        // Update shop logo in navigation
        const navLogoIcon = document.querySelector('.nav-logo i');
        if (navLogoIcon && shop.logo) {
            navLogoIcon.style.display = 'none';
            const logoImg = document.createElement('img');
            logoImg.src = shop.logo;
            logoImg.style.width = '30px';
            logoImg.style.height = '30px';
            logoImg.style.borderRadius = '50%';
            navLogoIcon.parentNode.insertBefore(logoImg, navLogoIcon);
        }
    }
}

// Initialize shop manager
const shopManager = new ShopManager();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ShopManager;
}
