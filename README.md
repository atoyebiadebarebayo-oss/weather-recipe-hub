# 🌤️ Weather & Recipe Hub

A responsive, API-driven web application that detects the user's current location weather and suggests matching meals, while allowing full recipe searches and local bookmarking.

---

## 🚀 Live Demo

[View Live Site on Netlify](https://weather-recipe-hub.netlify.app)

---

## ✨ Features

* **Live Weather Integration:** Uses the browser Geolocation API and Open-Meteo API to fetch real-time local temperatures.
* **Smart Meal Suggestions:** Recommends appropriate meals dynamically based on outdoor temperature conditions.
* **Recipe Search & Discovery:** Queries TheMealDB API to display recipe cards with category, origin, and image preview.
* **Detailed Recipe Modal:** Displays full ingredients list and step-by-step preparation instructions in a popup modal interface.
* **Favorites System:** Uses browser `localStorage` to persist bookmarked recipes across sessions.
* **Fully Responsive:** Custom CSS media queries designed for seamless viewing across desktop, tablet, and mobile devices.

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3 (Flexbox & CSS Grid)
* **Scripting:** Vanilla JavaScript (ES6+, Async/Await, DOM Manipulation)
* **APIs:** 
  * [Open-Meteo API](https://open-meteo.com/) (Weather data)
  * [TheMealDB API](https://www.themealdb.com/api.php) (Recipe database)
* **State Management:** Browser `localStorage`
* **Hosting:** Netlify

---

## 📁 Project Structure

```text
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   ├── app.js
│   ├── recipe.js
│   ├── storage.js
│   └── weather.js
├── index.html
└── README.md
