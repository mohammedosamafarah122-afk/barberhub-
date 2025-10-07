// Supabase-based Shop Manager
// This replaces the local storage shop-data.js with Supabase database operations

class SupabaseShopManager {
    constructor() {
        this.supabase = window.supabaseClient;
        this.currentShop = null;
    }

    // Get all shops
    async getAllShops() {
        try {
            const { data, error } = await this.supabase
                .from('shops')
                .select(`
                    *,
                    services (*)
                `)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Error fetching shops:', error);
            return [];
        }
    }

    // Get a specific shop by ID
    async getShop(shopId) {
        try {
            const { data, error } = await this.supabase
                .from('shops')
                .select(`
                    *,
                    services (*)
                `)
                .eq('id', shopId)
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error fetching shop:', error);
            return null;
        }
    }

    // Create a new shop
    async createShop(shopData) {
        try {
            // Insert shop
            const { data: shop, error: shopError } = await this.supabase
                .from('shops')
                .insert([{
                    name: shopData.name,
                    owner: shopData.owner,
                    email: shopData.email,
                    phone: shopData.phone || '',
                    address: shopData.address || '',
                    description: shopData.description || '',
                    logo: shopData.logo || '',
                    primary_color: shopData.primaryColor || '#d4af37',
                    secondary_color: shopData.secondaryColor || '#1a1a1a',
                    accent_color: shopData.accentColor || '#8b7355'
                }])
                .select()
                .single();

            if (shopError) throw shopError;

            // Insert default services if provided
            if (shopData.services && shopData.services.length > 0) {
                const servicesWithShopId = shopData.services.map(service => ({
                    shop_id: shop.id,
                    name: service.name,
                    description: service.description || '',
                    price: service.price,
                    duration: service.duration,
                    icon: service.icon || 'fa-cut'
                }));

                const { error: servicesError } = await this.supabase
                    .from('services')
                    .insert(servicesWithShopId);

                if (servicesError) throw servicesError;
            }

            return await this.getShop(shop.id);
        } catch (error) {
            console.error('Error creating shop:', error);
            throw error;
        }
    }

    // Update shop information
    async updateShop(shopId, updates) {
        try {
            const { data, error } = await this.supabase
                .from('shops')
                .update({
                    name: updates.name,
                    phone: updates.phone,
                    address: updates.address,
                    description: updates.description,
                    logo: updates.logo,
                    primary_color: updates.primaryColor,
                    secondary_color: updates.secondaryColor,
                    accent_color: updates.accentColor
                })
                .eq('id', shopId)
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error updating shop:', error);
            throw error;
        }
    }

    // Add a service to a shop
    async addService(shopId, service) {
        try {
            const { data, error } = await this.supabase
                .from('services')
                .insert([{
                    shop_id: shopId,
                    name: service.name,
                    description: service.description || '',
                    price: service.price,
                    duration: service.duration,
                    icon: service.icon || 'fa-cut'
                }])
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error adding service:', error);
            throw error;
        }
    }

    // Update a service
    async updateService(serviceId, updates) {
        try {
            const { data, error } = await this.supabase
                .from('services')
                .update({
                    name: updates.name,
                    description: updates.description,
                    price: updates.price,
                    duration: updates.duration,
                    icon: updates.icon
                })
                .eq('id', serviceId)
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error updating service:', error);
            throw error;
        }
    }

    // Delete a service
    async deleteService(serviceId) {
        try {
            const { error } = await this.supabase
                .from('services')
                .delete()
                .eq('id', serviceId);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error deleting service:', error);
            throw error;
        }
    }

    // Get services for a shop
    async getServices(shopId) {
        try {
            const { data, error } = await this.supabase
                .from('services')
                .select('*')
                .eq('shop_id', shopId);

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Error fetching services:', error);
            return [];
        }
    }

    // Create a booking
    async createBooking(bookingData) {
        try {
            const { data, error } = await this.supabase
                .from('bookings')
                .insert([{
                    shop_id: bookingData.shopId,
                    service_id: bookingData.serviceId,
                    customer_name: bookingData.customerName,
                    customer_email: bookingData.customerEmail,
                    customer_phone: bookingData.customerPhone,
                    booking_date: bookingData.date,
                    booking_time: bookingData.time,
                    notes: bookingData.notes || '',
                    status: 'pending'
                }])
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error creating booking:', error);
            throw error;
        }
    }

    // Get bookings for a shop
    async getBookings(shopId, filters = {}) {
        try {
            let query = this.supabase
                .from('bookings')
                .select(`
                    *,
                    services (name, price, duration)
                `)
                .eq('shop_id', shopId)
                .order('booking_date', { ascending: true })
                .order('booking_time', { ascending: true });

            if (filters.date) {
                query = query.eq('booking_date', filters.date);
            }

            if (filters.status) {
                query = query.eq('status', filters.status);
            }

            const { data, error } = await query;

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Error fetching bookings:', error);
            return [];
        }
    }

    // Update booking status
    async updateBookingStatus(bookingId, status) {
        try {
            const { data, error } = await this.supabase
                .from('bookings')
                .update({ status })
                .eq('id', bookingId)
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error updating booking:', error);
            throw error;
        }
    }

    // Search shops
    async searchShops(searchTerm) {
        try {
            const { data, error } = await this.supabase
                .from('shops')
                .select(`
                    *,
                    services (*)
                `)
                .or(`name.ilike.%${searchTerm}%,address.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Error searching shops:', error);
            return [];
        }
    }

    // Upload image to Supabase Storage
    async uploadImage(file, bucket, path) {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
            const filePath = `${path}/${fileName}`;

            const { data, error } = await this.supabase.storage
                .from(bucket)
                .upload(filePath, file);

            if (error) throw error;

            // Get public URL
            const { data: urlData } = this.supabase.storage
                .from(bucket)
                .getPublicUrl(filePath);

            return urlData.publicUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    }

    // Authenticate user
    async signUp(email, password, shopData) {
        try {
            // Create auth user
            const { data: authData, error: authError } = await this.supabase.auth.signUp({
                email: email,
                password: password
            });

            if (authError) throw authError;

            // Create shop
            shopData.email = email;
            const shop = await this.createShop(shopData);

            // Create user record
            const { error: userError } = await this.supabase
                .from('users')
                .insert([{
                    id: authData.user.id,
                    email: email,
                    shop_id: shop.id,
                    role: 'owner'
                }]);

            if (userError) throw userError;

            return { user: authData.user, shop };
        } catch (error) {
            console.error('Error signing up:', error);
            throw error;
        }
    }

    // Sign in user
    async signIn(email, password) {
        try {
            const { data, error } = await this.supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) throw error;

            // Get user's shop
            const { data: userData, error: userError } = await this.supabase
                .from('users')
                .select('shop_id')
                .eq('id', data.user.id)
                .single();

            if (userError) throw userError;

            const shop = await this.getShop(userData.shop_id);

            return { user: data.user, session: data.session, shop };
        } catch (error) {
            console.error('Error signing in:', error);
            throw error;
        }
    }

    // Sign out
    async signOut() {
        try {
            const { error } = await this.supabase.auth.signOut();
            if (error) throw error;
        } catch (error) {
            console.error('Error signing out:', error);
            throw error;
        }
    }

    // Get current session
    async getSession() {
        try {
            const { data, error } = await this.supabase.auth.getSession();
            if (error) throw error;
            return data.session;
        } catch (error) {
            console.error('Error getting session:', error);
            return null;
        }
    }
}

// Initialize the manager
const supabaseShopManager = new SupabaseShopManager();

// Make it globally available
window.supabaseShopManager = supabaseShopManager;

