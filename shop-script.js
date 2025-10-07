// Shop JavaScript
let selectedService = null;
let selectedDate = null;
let selectedTime = null;
let currentStep = 1;
let currentShop = null;

// Initialize shop
document.addEventListener('DOMContentLoaded', function() {
    console.log('Shop page initializing...');
    initializeShop();
    loadShopData();
    
    // Wait for shop data to load before setting up booking
    setTimeout(() => {
        loadTimeSlots();
        setupBookingForm();
    }, 200);
});

// Shop initialization
function initializeShop() {
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

    // Gallery lightbox
    setupGalleryLightbox();
}

// Load shop data based on URL parameter
function loadShopData() {
    const urlParams = new URLSearchParams(window.location.search);
    const shopId = urlParams.get('id');
    
    if (shopId) {
        currentShop = shopManager.getShop(shopId);
        if (currentShop) {
            applyShopBranding();
            updateShopContent();
            console.log('Shop loaded:', currentShop.name);
        } else {
            showNotification('Shop not found', 'error');
            // Redirect to main platform
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    } else {
        // Default shop if no ID provided
        currentShop = shopManager.getShop(1);
        if (currentShop) {
            applyShopBranding();
            updateShopContent();
            console.log('Default shop loaded:', currentShop.name);
        } else {
            showNotification('No shops available', 'error');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    }
}

// Apply shop branding to the page
function applyShopBranding() {
    if (!currentShop) return;

    // Update page title
    document.title = `${currentShop.name} - Professional Barber Services`;

    // Apply color scheme
    const root = document.documentElement;
    root.style.setProperty('--primary-color', currentShop.colorScheme.primary);
    root.style.setProperty('--secondary-color', currentShop.colorScheme.secondary);
    root.style.setProperty('--background-color', currentShop.colorScheme.background);
    root.style.setProperty('--text-color', currentShop.colorScheme.text);

    // Update shop name in navigation
    const navLogo = document.querySelector('.nav-logo span');
    if (navLogo) {
        navLogo.textContent = currentShop.name;
    }

    // Update shop logo in navigation
    const navLogoIcon = document.querySelector('.nav-logo i');
    if (navLogoIcon && currentShop.logo) {
        navLogoIcon.style.display = 'none';
        const logoImg = document.createElement('img');
        logoImg.src = currentShop.logo;
        logoImg.style.width = '30px';
        logoImg.style.height = '30px';
        logoImg.style.borderRadius = '50%';
        navLogoIcon.parentNode.insertBefore(logoImg, navLogoIcon);
    }
}

// Update shop content with shop data
function updateShopContent() {
    if (!currentShop) return;

    // Update hero section
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.textContent = `${currentShop.name} - Professional Barber Services`;
    }

    // Update about section title
    const aboutSectionHeader = document.querySelector('.about .section-header h2');
    if (aboutSectionHeader) {
        aboutSectionHeader.textContent = `About ${currentShop.name}`;
    }

    // Update about section subtitle
    const aboutSectionSubtitle = document.querySelector('.about .section-header p');
    if (aboutSectionSubtitle) {
        aboutSectionSubtitle.textContent = 'Your trusted destination for premium grooming services';
    }

    // Update about section main heading
    const aboutHeading = document.querySelector('.about-text h3');
    if (aboutHeading) {
        aboutHeading.textContent = `Welcome to ${currentShop.name}`;
    }

    // Update about text description
    const aboutText = document.querySelector('.about-text p');
    if (aboutText) {
        aboutText.textContent = currentShop.description;
    }

    // Update services section
    updateServicesSection();

    // Update contact information
    updateContactInfo();

    // Update footer
    updateFooterInfo();
}

// Update services section with shop services
function updateServicesSection() {
    if (!currentShop || !currentShop.services) {
        console.error('No shop or services data available');
        return;
    }

    const servicesGrid = document.querySelector('.services-grid');
    if (!servicesGrid) {
        console.error('Services grid not found');
        return;
    }

    console.log('Updating services for shop:', currentShop.name);
    console.log('Services:', currentShop.services);

    servicesGrid.innerHTML = currentShop.services.map((service, index) => {
        const icons = ['fa-cut', 'fa-user-tie', 'fa-spa', 'fa-magic', 'fa-gem', 'fa-crown'];
        const icon = icons[index % icons.length];
        
        return `
            <div class="service-card">
                <div class="service-icon">
                    <i class="fas ${icon}"></i>
                </div>
                <h3>${service.name}</h3>
                <p>${service.description}</p>
                <div class="service-price">$${service.price}</div>
                <div class="service-duration">${service.duration} min</div>
            </div>
        `;
    }).join('');
}

// Update contact information
function updateContactInfo() {
    if (!currentShop) return;

    // Update contact details
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        const icon = item.querySelector('i');
        if (icon) {
            if (icon.classList.contains('fa-phone')) {
                item.querySelector('span').textContent = currentShop.phone;
            } else if (icon.classList.contains('fa-envelope')) {
                item.querySelector('span').textContent = currentShop.email;
            } else if (icon.classList.contains('fa-map-marker-alt')) {
                item.querySelector('span').textContent = currentShop.address;
            }
        }
    });

    // Update footer
    const footerLogo = document.querySelector('.footer-logo span');
    if (footerLogo) {
        footerLogo.textContent = currentShop.name;
    }
}

// Update footer information
function updateFooterInfo() {
    if (!currentShop) return;

    const footerSections = document.querySelectorAll('.footer-section p');
    footerSections.forEach(section => {
        const icon = section.querySelector('i');
        if (icon) {
            if (icon.classList.contains('fa-phone')) {
                section.innerHTML = `<i class="fas fa-phone"></i> ${currentShop.phone}`;
            } else if (icon.classList.contains('fa-envelope')) {
                section.innerHTML = `<i class="fas fa-envelope"></i> ${currentShop.email}`;
            } else if (icon.classList.contains('fa-map-marker-alt')) {
                section.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${currentShop.address}`;
            }
        }
    });
}

// Setup booking form
function setupBookingForm() {
    if (!currentShop) return;

    // Update service selection with shop services
    updateServiceSelection();

    // Wait for DOM to update before adding event listeners
    setTimeout(() => {
        // Service selection
        const serviceOptions = document.querySelectorAll('.service-option');
        serviceOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Remove previous selection
                serviceOptions.forEach(opt => opt.classList.remove('selected'));
                
                // Add selection to clicked option
                option.classList.add('selected');
                
                // Store selected service data
                selectedService = {
                    name: option.querySelector('h4').textContent,
                    price: option.getAttribute('data-price'),
                    duration: option.getAttribute('data-duration')
                };
            });
        });
    }, 100);

    // Date selection
    const dateInput = document.getElementById('bookingDate');
    if (dateInput) {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
        
        dateInput.addEventListener('change', (e) => {
            selectedDate = e.target.value;
            loadTimeSlots();
        });
    }

    // Form submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }
}

// Update service selection with shop services
function updateServiceSelection() {
    if (!currentShop || !currentShop.services) return;

    const serviceSelection = document.querySelector('.service-selection');
    if (!serviceSelection) return;

    serviceSelection.innerHTML = currentShop.services.map(service => `
        <div class="service-option" data-service="${service.id}" data-price="${service.price}" data-duration="${service.duration}">
            <div class="service-info">
                <h4>${service.name}</h4>
                <p>${service.description}</p>
                <div class="service-meta">
                    <span class="duration">${service.duration} min</span>
                    <span class="price">$${service.price}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Load time slots
function loadTimeSlots() {
    const timeGrid = document.getElementById('timeGrid');
    if (!timeGrid) return;

    const timeSlots = [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
        '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
    ];

    // Simulate some unavailable slots
    const unavailableSlots = ['10:00', '14:00', '15:30'];

    timeGrid.innerHTML = timeSlots.map(time => {
        const isUnavailable = unavailableSlots.includes(time);
        return `
            <div class="time-slot ${isUnavailable ? 'unavailable' : ''}" data-time="${time}">
                ${formatTime(time)}
            </div>
        `;
    }).join('');

    // Add event listeners to time slots
    setTimeout(() => {
        document.querySelectorAll('.time-slot:not(.unavailable)').forEach(slot => {
            slot.addEventListener('click', function() {
                selectTimeSlot(this.getAttribute('data-time'));
            });
        });
    }, 100);
}

// Select time slot
function selectTimeSlot(time) {
    // Remove previous selection
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });

    // Add selection to clicked slot
    document.querySelectorAll('.time-slot').forEach(slot => {
        if (slot.getAttribute('data-time') === time) {
            slot.classList.add('selected');
        }
    });

    selectedTime = time;
}

// Booking form steps
function nextStep() {
    if (validateCurrentStep()) {
        if (currentStep < 4) {
            // Hide current step
            document.getElementById(`step${currentStep}`).classList.remove('active');
            
            // Show next step
            currentStep++;
            document.getElementById(`step${currentStep}`).classList.add('active');
            
            // Update step indicators
            updateStepIndicators();
            
            // Update summary if on last step
            if (currentStep === 4) {
                updateBookingSummary();
            }
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        // Hide current step
        document.getElementById(`step${currentStep}`).classList.remove('active');
        
        // Show previous step
        currentStep--;
        document.getElementById(`step${currentStep}`).classList.add('active');
        
        // Update step indicators
        updateStepIndicators();
    }
}

// Validate current step
function validateCurrentStep() {
    switch (currentStep) {
        case 1:
            if (!selectedService) {
                showNotification('Please select a service', 'error');
                return false;
            }
            return true;
        case 2:
            if (!selectedDate || !selectedTime) {
                showNotification('Please select date and time', 'error');
                return false;
            }
            return true;
        case 3:
            const name = document.querySelector('#step3 input[type="text"]').value;
            const email = document.querySelector('#step3 input[type="email"]').value;
            const phone = document.querySelector('#step3 input[type="tel"]').value;
            
            if (!name || !email || !phone) {
                showNotification('Please fill in all required fields', 'error');
                return false;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return false;
            }
            
            return true;
        default:
            return true;
    }
}

// Update step indicators
function updateStepIndicators() {
    document.querySelectorAll('.step').forEach((step, index) => {
        const stepNumber = index + 1;
        if (stepNumber <= currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

// Update booking summary
function updateBookingSummary() {
    if (selectedService) {
        document.getElementById('selectedService').textContent = selectedService.name;
        document.getElementById('selectedPrice').textContent = `$${selectedService.price}`;
        document.getElementById('selectedDuration').textContent = `${selectedService.duration} minutes`;
    }
    
    if (selectedDate) {
        const date = new Date(selectedDate);
        document.getElementById('selectedDate').textContent = date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }
    
    if (selectedTime) {
        document.getElementById('selectedTime').textContent = formatTime(selectedTime);
    }
}

// Handle booking submission
function handleBookingSubmit(event) {
    event.preventDefault();
    
    // Get customer details
    const name = document.querySelector('#step3 input[type="text"]').value;
    const email = document.querySelector('#step3 input[type="email"]').value;
    const phone = document.querySelector('#step3 input[type="tel"]').value;
    const notes = document.querySelector('#step3 textarea').value;
    
    // Create booking object
    const booking = {
        id: Date.now(),
        customer: {
            name: name,
            email: email,
            phone: phone
        },
        service: selectedService,
        date: selectedDate,
        time: selectedTime,
        notes: notes,
        status: 'confirmed',
        createdAt: new Date().toISOString()
    };
    
    // Simulate booking submission
    showNotification('Booking confirmed! You will receive a confirmation email shortly.', 'success');
    
    // Reset form
    resetBookingForm();
    
    // In a real application, this would send the booking to the server
    console.log('Booking submitted:', booking);
}

// Reset booking form
function resetBookingForm() {
    // Reset selections
    selectedService = null;
    selectedDate = null;
    selectedTime = null;
    currentStep = 1;
    
    // Reset form
    document.getElementById('bookingForm').reset();
    
    // Reset steps
    document.querySelectorAll('.booking-step').forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById('step1').classList.add('active');
    
    // Reset step indicators
    updateStepIndicators();
    
    // Reset service selections
    document.querySelectorAll('.service-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Reset time slots
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
}

// Setup gallery lightbox
function setupGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            createLightbox(item);
        });
    });
}

function createLightbox(item) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <div class="lightbox-image">
                ${item.innerHTML}
            </div>
        </div>
    `;
    
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    document.body.appendChild(lightbox);
    
    // Close lightbox
    lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
        lightbox.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => lightbox.remove(), 300);
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => lightbox.remove(), 300);
        }
    });
}

// Utility functions
function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
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

// Add CSS animations for notifications and lightbox
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
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
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
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 30px;
        cursor: pointer;
        z-index: 10001;
    }
    
    .lightbox-image {
        background: linear-gradient(45deg, #d4af37, #f4d03f);
        border-radius: 15px;
        padding: 40px;
        color: #000;
        text-align: center;
        font-size: 1.5rem;
        font-weight: 600;
        min-width: 300px;
        min-height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;
document.head.appendChild(style);

console.log('Shop page loaded successfully! ✂️');
