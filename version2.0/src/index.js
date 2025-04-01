const express = require('express');
const app = express();
const pool = require('./db');
app.use(express.json());

app.post('/add-user', async (req, res) => {
    const { name, email } = req.body;
    await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);
    res.send('User added');
});

app.get('/countries', async (req, res) => {
    const result = await pool.query('SELECT * FROM saved_countries');
    res.json(result.rows);
});

app.post('/save-country', async (req, res) => {
    const { user_id, country_name } = req.body;
    await pool.query('INSERT INTO saved_countries (user_id, country_name) VALUES ($1, $2)', [user_id, country_name]);
    res.send('Country saved');
});

app.get('/countries/:continent', async (req, res) => {
    const { continent } = req.params;
    const result = await pool.query('SELECT * FROM saved_countries WHERE continent = $1', [continent]);
    res.json(result.rows);
});

app.post('/save-country', async (req, res) => {
    const { user_id, country_name } = req.body;
    await pool.query('INSERT INTO saved_countries (user_id, country_name) VALUES ($1, $2)', [user_id, country_name]);
    res.send('Country saved');
});

async function getCountryCount(country_name) {
    const result = await pool.query('SELECT count FROM country_count WHERE country_name = $1', [country_name]);
    return result.rows[0]?.count || 0;
}

async function incrementCountryCount(country_name) {
    await pool.query('UPDATE country_count SET count = count + 1 WHERE country_name = $1', [country_name]);
}