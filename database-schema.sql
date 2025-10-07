-- BarberHub Database Schema for Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create shops table
CREATE TABLE shops (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    owner TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    address TEXT,
    description TEXT,
    logo TEXT,
    primary_color TEXT DEFAULT '#d4af37',
    secondary_color TEXT DEFAULT '#1a1a1a',
    accent_color TEXT DEFAULT '#8b7355',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create services table
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shop_id UUID REFERENCES shops(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    duration INTEGER NOT NULL, -- in minutes
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create bookings table
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shop_id UUID REFERENCES shops(id) ON DELETE CASCADE,
    service_id UUID REFERENCES services(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    status TEXT DEFAULT 'pending', -- pending, confirmed, cancelled, completed
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create users table (for shop owners)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    shop_id UUID REFERENCES shops(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'owner', -- owner, admin
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for better query performance
CREATE INDEX idx_services_shop_id ON services(shop_id);
CREATE INDEX idx_bookings_shop_id ON bookings(shop_id);
CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_shops_email ON shops(email);

-- Create Row Level Security (RLS) policies
ALTER TABLE shops ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Shops policies
CREATE POLICY "Shops are viewable by everyone" 
    ON shops FOR SELECT 
    USING (true);

CREATE POLICY "Shop owners can update their shop" 
    ON shops FOR UPDATE 
    USING (auth.uid()::text = (SELECT id::text FROM users WHERE users.shop_id = shops.id));

CREATE POLICY "Anyone can create a shop" 
    ON shops FOR INSERT 
    WITH CHECK (true);

-- Services policies
CREATE POLICY "Services are viewable by everyone" 
    ON services FOR SELECT 
    USING (true);

CREATE POLICY "Shop owners can manage their services" 
    ON services FOR ALL 
    USING (auth.uid()::text = (SELECT id::text FROM users WHERE users.shop_id = services.shop_id));

-- Bookings policies
CREATE POLICY "Shop owners can view their bookings" 
    ON bookings FOR SELECT 
    USING (auth.uid()::text = (SELECT id::text FROM users WHERE users.shop_id = bookings.shop_id));

CREATE POLICY "Anyone can create a booking" 
    ON bookings FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Shop owners can update their bookings" 
    ON bookings FOR UPDATE 
    USING (auth.uid()::text = (SELECT id::text FROM users WHERE users.shop_id = bookings.shop_id));

-- Users policies
CREATE POLICY "Users can view their own data" 
    ON users FOR SELECT 
    USING (auth.uid()::text = id::text);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_shops_updated_at BEFORE UPDATE ON shops
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

