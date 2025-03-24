

-- Creating table for user data
CREATE TABLE user_data (
    user_id INT PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    user_email VARCHAR(50) UNIQUE NOT NULL,
    user_country VARCHAR(50),
    user_bio VARCHAR(500)
);

-- Inserting user data
INSERT INTO user_data (user_id, user_name, user_email, user_country, user_bio) VALUES
(1, 'Alex Johnson', 'alexj@example.com', 'UK', 'I am a software engineer passionate about AI and emerging technologies'),
(2, 'Maria Lopez', 'maria.lopez23@example.com', 'Spain', 'I am a digital nomad who loves photography and exploring new cuisines'),
(3, 'Liam O’Connor', 'liam.oconnor@example.com', 'Ireland', 'I am a musician who enjoys writing songs inspired by different cultures');

-- Creating table for saved countries
CREATE TABLE saved_countries (
    country_id SERIAL PRIMARY KEY,
    country_image_url VARCHAR(2083),
    country_name VARCHAR(50) UNIQUE NOT NULL,
    country_code VARCHAR(10) NOT NULL,
    country_population INT,
    country_capital VARCHAR(50),
    country_region VARCHAR(50)
);

-- Creating a table to track saved countries per user
CREATE TABLE user_saved_countries (
    user_id INT,
    country_id INT,
    PRIMARY KEY (user_id, country_id),
    FOREIGN KEY (user_id) REFERENCES user_data(user_id) ON DELETE CASCADE,
    FOREIGN KEY (country_id) REFERENCES saved_countries(country_id) ON DELETE CASCADE
);

-- Creating a table to track the number of times a country is clicked
CREATE TABLE click_count (
    click_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    country_name VARCHAR(50) NOT NULL,
    country_code VARCHAR(10) NOT NULL,
    country_count INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES user_data(user_id) ON DELETE CASCADE
);

-- Inserting click count data
INSERT INTO click_count (user_id, country_name, country_code, country_count) VALUES
(2, 'United States', 'USA', 3),
(3, 'Canada', 'CAN', 5),
(1, 'Mexico', 'MEX', 7);

-- Query to get the selected user's saved countries and details
SELECT u.user_name, s.country_name, s.country_population, s.country_capital, s.country_region
FROM user_data AS u
JOIN user_saved_countries AS usc ON u.user_id = usc.user_id
JOIN saved_countries AS s ON s.country_id = usc.country_id
WHERE u.user_id = 1;

-- Query to get the number of clicks for each country clicked by a user
SELECT * FROM click_count WHERE country_name = 'United States';
SELECT * FROM click_count WHERE country_name = 'Canada';
SELECT * FROM click_count WHERE country_name = 'Mexico';
