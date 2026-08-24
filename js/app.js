document.addEventListener('DOMContentLoaded', () => {
    // 1. Fetch initial weather and location
    getUserLocation();

    // 2. Load default recipes on startup
    fetchRecipes('salad'); // Default search matching 28°C weather

    // 3. Setup Location Button
    const locationBtn = document.getElementById('location-btn');
    if (locationBtn) {
        locationBtn.addEventListener('click', getUserLocation);
    }

    // 4. Setup Search Form Submission
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                fetchRecipes(query);
            }
        });
    }
});