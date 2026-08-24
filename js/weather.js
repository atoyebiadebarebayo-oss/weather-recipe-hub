// Function to fetch weather based on latitude and longitude
async function fetchWeatherByCoords(lat, lon) {
    const cityNameElement = document.getElementById('city-name');
    const tempElement = document.getElementById('temp');
    const suggestionText = document.getElementById('suggestion-text');

    try {
        cityNameElement.textContent = "Fetching weather...";

        // Open-Meteo API endpoint
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const tempC = Math.round(data.current_weather.temperature);
        const weatherCode = data.current_weather.weathercode;

        // Update Header UI
        cityNameElement.textContent = "Your Location";
        tempElement.textContent = `${tempC}°C`;

        // Weather-based meal recommendation logic
        getMealRecommendation(tempC, weatherCode);

    } catch (error) {
        console.error("Error fetching weather:", error);
        cityNameElement.textContent = "Location Unavailable";
        suggestionText.textContent = "Could not fetch weather. Showing popular recipes instead!";
    }
}

// Function to translate weather/temperature into meal ideas
function getMealRecommendation(temp, code) {
    const suggestionText = document.getElementById('suggestion-text');

    if (temp < 20) {
        suggestionText.textContent = `It's pretty chilly out there (${temp}°C)! How about some hot soup, hearty stews, or warm comfort meals?`;
    } else if (temp >= 20 && temp < 28) {
        suggestionText.textContent = `Nice weather today (${temp}°C)! Perfect day for chicken recipes, pasta, or seafood.`;
    } else {
        suggestionText.textContent = `It's hot outside (${temp}°C)! We recommend light salads, fresh fruit dishes, or cool smoothies.`;
    }
}

// Function to request user location from browser
function getUserLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByCoords(latitude, longitude);
            },
            (error) => {
                console.warn("Geolocation denied or failed. Falling back to default city.");
                // Default fallback coords (e.g., Lagos: 6.5244, 3.3792)
                fetchWeatherByCoords(6.5244, 3.3792);
            }
        );
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}