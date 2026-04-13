-- Create Database
CREATE DATABASE IF NOT EXISTS artisbay_db;
USE artisbay_db;

-- Car Lots Table
CREATE TABLE IF NOT EXISTS car_lots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lotId VARCHAR(50) UNIQUE NOT NULL,
    year INT NOT NULL,
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    mileage VARCHAR(50),
    grade VARCHAR(10),
    transmission VARCHAR(50),
    auctionHouse VARCHAR(100),
    thumbnail TEXT,
    auctionDate DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bike Lots Table
CREATE TABLE IF NOT EXISTS bike_lots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lotId VARCHAR(50) UNIQUE NOT NULL,
    year INT NOT NULL,
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    mileage VARCHAR(50),
    grade VARCHAR(10),
    transmission VARCHAR(50),
    auctionHouse VARCHAR(100),
    thumbnail TEXT,
    auctionDate DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Data for Cars
INSERT IGNORE INTO car_lots (lotId, year, make, model, mileage, grade, transmission, auctionHouse, thumbnail, auctionDate) VALUES
('USS-241122-01', 2021, 'Toyota', 'Prius', '22,400 km', '4.5', 'Hybrid e-CVT', 'USS Tokyo', 'https://images.unsplash.com/photo-1593414220166-085ca8021451?w=600&h=400&fit=crop', '2025-11-24'),
('USS-241122-02', 2019, 'Honda', 'CR-V', '45,200 km', '4.0', 'AT', 'USS Nagoya', 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?w=600&h=400&fit=crop', '2025-11-25'),
('USS-241122-03', 2020, 'Nissan', 'Skyline', '15,000 km', '5.0', 'AT', 'USS Yokohama', 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&h=400&fit=crop', '2025-11-26'),
('USS-241122-04', 2018, 'Honda', 'Civic', '32,000 km', '4.5', 'MT', 'USS Osaka', 'https://images.unsplash.com/photo-1606225453000-8461757827e7?w=600&h=400&fit=crop', '2025-11-27'),
('USS-241122-05', 2022, 'Toyota', 'Land Cruiser', '5,000 km', 'S', 'AT', 'USS Tokyo', 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600&h=400&fit=crop', '2025-11-28'),
('USS-241122-06', 2020, 'Toyota', 'Camry', '12,000 km', '4.5', 'AT', 'USS Tokyo', 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&h=400&fit=crop', '2025-11-29');

-- Seed Data for Bikes
INSERT IGNORE INTO bike_lots (lotId, year, make, model, mileage, grade, transmission, auctionHouse, thumbnail, auctionDate) VALUES
('USS-B-001', 2022, 'Honda', 'CB400 Super Four', '2,000 km', '5', '6MT', 'USS Tokyo', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&h=400&fit=crop', '2025-11-30');
