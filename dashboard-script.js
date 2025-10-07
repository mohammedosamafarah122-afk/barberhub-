// Dashboard JavaScript
let currentSection = 'dashboard';
let bookings = [];
let customers = [];
let services = [];
let currentShop = null;

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    loadShopData();
    initializeDashboard();
    loadSampleData();
    setupEventListeners();
});

// Load shop data from session
function loadShopData() {
    const savedShop = localStorage.getItem('barberhub_current_shop');
    if (savedShop) {
        currentShop = JSON.parse(savedShop);
        updateShopInfo();
    } else {
        // Fallback to first available shop
        currentShop = shopManager.getShop(1);
        if (currentShop) {
            updateShopInfo();
        }
    }
}

// Update shop information in dashboard
function updateShopInfo() {
    if (!currentShop) return;

    // Update shop name and location
    const shopNameElement = document.getElementById('shopName');
    const shopLocationElement = document.getElementById('shopLocation');
    const userNameElement = document.getElementById('userName');
    
    if (shopNameElement) shopNameElement.textContent = currentShop.name;
    if (shopLocationElement) shopLocationElement.textContent = currentShop.address.split(',')[1]?.trim() || currentShop.address;
    if (userNameElement) userNameElement.textContent = currentShop.owner;

    // Update page title
    document.title = `${currentShop.name} - Dashboard`;

    // Apply shop branding
    const root = document.documentElement;
    root.style.setProperty('--primary-color', currentShop.colorScheme.primary);
    root.style.setProperty('--secondary-color', currentShop.colorScheme.secondary);
}

// Dashboard initialization
function initializeDashboard() {
    // Sidebar navigation
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.getAttribute('data-section');
            showSection(section);
        });
    });

    // Sidebar toggle for mobile
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024 && !sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });
}

// Show section
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Update menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });

    const activeItem = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }

    // Update page title
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle) {
        pageTitle.textContent = getSectionTitle(sectionId);
    }

    currentSection = sectionId;

    // Load section-specific data
    loadSectionData(sectionId);
}

// Get section title
function getSectionTitle(sectionId) {
    const titles = {
        'dashboard': 'Dashboard',
        'bookings': 'Bookings',
        'customers': 'Customers',
        'services': 'Services',
        'schedule': 'Schedule',
        'analytics': 'Analytics',
        'settings': 'Settings'
    };
    return titles[sectionId] || 'Dashboard';
}

// Load section-specific data
function loadSectionData(sectionId) {
    switch (sectionId) {
        case 'bookings':
            loadBookings();
            break;
        case 'customers':
            loadCustomers();
            break;
        case 'services':
            loadServices();
            break;
        case 'schedule':
            loadSchedule();
            break;
        case 'analytics':
            loadAnalytics();
            break;
    }
}

// Setup event listeners
function setupEventListeners() {
    // Settings tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.getAttribute('data-tab');
            switchTab(tab);
        });
    });

    // Filter changes
    const filterSelects = document.querySelectorAll('.filter-select');
    filterSelects.forEach(select => {
        select.addEventListener('change', () => {
            applyFilters();
        });
    });

    // Customer search
    const customerSearch = document.getElementById('customerSearch');
    if (customerSearch) {
        customerSearch.addEventListener('input', () => {
            filterCustomers();
        });
    }
}

// Load sample data
function loadSampleData() {
    // Sample bookings
    bookings = [
        {
            id: 1,
            customer: 'Mike Johnson',
            service: 'Haircut & Styling',
            date: '2024-12-20',
            time: '14:30',
            status: 'confirmed',
            price: 25
        },
        {
            id: 2,
            customer: 'David Smith',
            service: 'Beard Trim',
            date: '2024-12-20',
            time: '15:15',
            status: 'pending',
            price: 15
        },
        {
            id: 3,
            customer: 'Robert Brown',
            service: 'Hot Towel Shave',
            date: '2024-12-20',
            time: '16:00',
            status: 'confirmed',
            price: 30
        },
        {
            id: 4,
            customer: 'James Wilson',
            service: 'Premium Package',
            date: '2024-12-21',
            time: '10:00',
            status: 'confirmed',
            price: 45
        }
    ];

    // Sample customers
    customers = [
        {
            id: 1,
            name: 'Mike Johnson',
            email: 'mike@email.com',
            phone: '(555) 123-4567',
            totalBookings: 12,
            lastVisit: '2024-12-15',
            avatar: 'MJ'
        },
        {
            id: 2,
            name: 'David Smith',
            email: 'david@email.com',
            phone: '(555) 234-5678',
            totalBookings: 8,
            lastVisit: '2024-12-10',
            avatar: 'DS'
        },
        {
            id: 3,
            name: 'Robert Brown',
            email: 'robert@email.com',
            phone: '(555) 345-6789',
            totalBookings: 15,
            lastVisit: '2024-12-18',
            avatar: 'RB'
        }
    ];

    // Sample services
    services = [
        {
            id: 1,
            name: 'Haircut & Styling',
            price: 25,
            duration: 45,
            description: 'Professional haircuts with precision styling'
        },
        {
            id: 2,
            name: 'Beard Trim',
            price: 15,
            duration: 30,
            description: 'Expert beard trimming and shaping'
        },
        {
            id: 3,
            name: 'Hot Towel Shave',
            price: 30,
            duration: 40,
            description: 'Traditional hot towel shave'
        },
        {
            id: 4,
            name: 'Premium Package',
            price: 45,
            duration: 75,
            description: 'Complete grooming experience'
        }
    ];
}

// Load bookings
function loadBookings() {
    const tableBody = document.getElementById('bookingsTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = bookings.map(booking => `
        <tr>
            <td>${booking.customer}</td>
            <td>${booking.service}</td>
            <td>${formatDate(booking.date)} at ${formatTime(booking.time)}</td>
            <td><span class="booking-status ${booking.status}">${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span></td>
            <td>$${booking.price}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editBooking(${booking.id})">Edit</button>
                <button class="btn btn-sm btn-secondary" onclick="cancelBooking(${booking.id})">Cancel</button>
            </td>
        </tr>
    `).join('');
}

// Load customers
function loadCustomers() {
    const customersGrid = document.getElementById('customersGrid');
    if (!customersGrid) return;

    customersGrid.innerHTML = customers.map(customer => `
        <div class="customer-card">
            <div class="customer-header">
                <div class="customer-avatar">${customer.avatar}</div>
                <div class="customer-info">
                    <h4>${customer.name}</h4>
                    <p>${customer.email}</p>
                </div>
            </div>
            <div class="customer-stats">
                <div class="customer-stat">
                    <div class="number">${customer.totalBookings}</div>
                    <div class="label">Bookings</div>
                </div>
                <div class="customer-stat">
                    <div class="number">${formatDate(customer.lastVisit)}</div>
                    <div class="label">Last Visit</div>
                </div>
            </div>
        </div>
    `).join('');
}

// Load services
function loadServices() {
    const servicesGrid = document.getElementById('servicesGrid');
    if (!servicesGrid) return;

    servicesGrid.innerHTML = services.map(service => `
        <div class="service-card">
            <div class="service-header">
                <div class="service-name">${service.name}</div>
                <div class="service-price">$${service.price}</div>
            </div>
            <div class="service-duration">${service.duration} minutes</div>
            <p>${service.description}</p>
            <div class="service-actions">
                <button class="btn btn-sm btn-primary" onclick="editService(${service.id})">Edit</button>
                <button class="btn btn-sm btn-secondary" onclick="deleteService(${service.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Load schedule
function loadSchedule() {
    const scheduleGrid = document.getElementById('scheduleGrid');
    if (!scheduleGrid) return;

    // Generate calendar for current week
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const timeSlots = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

    let calendarHTML = '';
    for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        
        calendarHTML += `
            <div class="calendar-day ${i === today.getDay() ? 'today' : ''}">
                <div class="day-number">${days[i]} ${date.getDate()}</div>
                ${timeSlots.map(time => `
                    <div class="time-slot" onclick="bookTimeSlot('${date.toISOString().split('T')[0]}', '${time}')">
                        ${time}
                    </div>
                `).join('')}
            </div>
        `;
    }

    scheduleGrid.innerHTML = calendarHTML;
}

// Load analytics
function loadAnalytics() {
    // Analytics data would be loaded here
    console.log('Loading analytics data...');
}

// Modal functions
function openBookingModal() {
    document.getElementById('bookingModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function openCustomerModal() {
    showNotification('Customer modal would open here', 'info');
}

function openServiceModal() {
    showNotification('Service modal would open here', 'info');
}

function openScheduleModal() {
    showNotification('Schedule modal would open here', 'info');
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Booking handlers
function handleBookingSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    // Create new booking
    const newBooking = {
        id: bookings.length + 1,
        customer: formData.get('customer') || 'New Customer',
        service: formData.get('service') || 'Haircut & Styling',
        date: formData.get('date') || new Date().toISOString().split('T')[0],
        time: formData.get('time') || '14:00',
        status: 'confirmed',
        price: 25
    };
    
    bookings.push(newBooking);
    showNotification('Booking created successfully!', 'success');
    closeModal('bookingModal');
    
    // Reload bookings if on bookings page
    if (currentSection === 'bookings') {
        loadBookings();
    }
}

// Service actions
function editService(serviceId) {
    showNotification(`Edit service ${serviceId}`, 'info');
}

function deleteService(serviceId) {
    if (confirm('Are you sure you want to delete this service?')) {
        services = services.filter(service => service.id !== serviceId);
        loadServices();
        showNotification('Service deleted successfully!', 'success');
    }
}

// Booking actions
function editBooking(bookingId) {
    showNotification(`Edit booking ${bookingId}`, 'info');
}

function cancelBooking(bookingId) {
    if (confirm('Are you sure you want to cancel this booking?')) {
        bookings = bookings.filter(booking => booking.id !== bookingId);
        loadBookings();
        showNotification('Booking cancelled successfully!', 'success');
    }
}

// Schedule actions
function bookTimeSlot(date, time) {
    showNotification(`Book time slot: ${date} at ${time}`, 'info');
}

function previousWeek() {
    showNotification('Previous week', 'info');
}

function nextWeek() {
    showNotification('Next week', 'info');
}

// Settings tabs
function switchTab(tabId) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = document.querySelector(`[data-tab="${tabId}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    const activeContent = document.getElementById(tabId);
    if (activeContent) {
        activeContent.classList.add('active');
    }
}

// Filter functions
function applyFilters() {
    if (currentSection === 'bookings') {
        loadBookings();
    }
}

function filterCustomers() {
    const searchTerm = document.getElementById('customerSearch').value.toLowerCase();
    const filteredCustomers = customers.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchTerm)
    );
    
    const customersGrid = document.getElementById('customersGrid');
    if (customersGrid) {
        customersGrid.innerHTML = filteredCustomers.map(customer => `
            <div class="customer-card">
                <div class="customer-header">
                    <div class="customer-avatar">${customer.avatar}</div>
                    <div class="customer-info">
                        <h4>${customer.name}</h4>
                        <p>${customer.email}</p>
                    </div>
                </div>
                <div class="customer-stats">
                    <div class="customer-stat">
                        <div class="number">${customer.totalBookings}</div>
                        <div class="label">Bookings</div>
                    </div>
                    <div class="customer-stat">
                        <div class="number">${formatDate(customer.lastVisit)}</div>
                        <div class="label">Last Visit</div>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

// View my shop function
function viewMyShop() {
    if (!currentShop) {
        showNotification('No shop data available', 'error');
        return;
    }
    
    // Open shop page in new tab
    window.open(`shop.html?id=${currentShop.id}`, '_blank');
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        showNotification('Logging out...', 'info');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
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

console.log('Dashboard loaded successfully! 📊');
