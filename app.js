//NodeJS Project Building Challenge - Scaler
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.static('public'));
require('dotenv').config();

app.get('/weather', async (req, res) => {
    try {
        const { city } = req.query;
        if (!city) {
            return res.status(400).json({ error: 'City name is required' });
        }
        const apiKey = process.env.WEATHER_API_KEY; 
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await axios.get(apiUrl);
        const weatherData = {
            city: response.data.name,
            temperature: response.data.main.temp,
            description: response.data.weather[0].description
        };
        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error.response.data);
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
