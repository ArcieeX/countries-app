-- will need user form data 
CREATE TABLE user_data (
    user_id PRIMARY KEY INT
    user_name
    user_email
    user_country
    user_bio
)

INSERT INTO user_data (user_id ,user_name, user_email, user_country, user_bio) VALUES
(01,'Alex Johnson', 'alexj@example.com', 'UK', 'I am a software engineer passionate about AI and emerging technologies'),
(02,'Maria Lopez', 'maria.lopez23@example.com', 'Spain', 'I am a digital nomad who loves photography and exploring new cuisines'),
(03,'Liam O’Connor', 'liam.oconnor@example.com', 'Ireland', 'I am a musician who enjoys writing songs inspired by different cultures');


-- only country data that users choose to save when  button is clicked and saved to page

CREATE TABLE saved_countries (
    country_ID SERIAL PRIMARY KEY,
    country_image_url VARCHAR(2083),
    country_name VARCHAR(50),
    country_code VARCHAR(50),
    country_population INT,
    country_capital VARCHAR(50),
    country_region VARCHAR(50),
);
-- the amount of times user clicks on each country

CREATE TABLE user_click_amount (
    click_ID SERIAL PRIMARY KEY,
    user_id VARCHAR(50),
    country_name VARCHAR(50),
    country_code VARCHAR(50),
    country_count INT
);

INSERT INTO user_clicks (user_id, country_name, country_code, country_count) VALUES
(02,'United States', 'USA', 3),
(03,'Canada', 'CAN', 5),
(01,'Mexico', 'MEX', 7)

database-schema.sql