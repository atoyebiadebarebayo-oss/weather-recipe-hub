// Retrieve saved recipe IDs from localStorage
function getFavorites() {
    const favorites = localStorage.getItem('recipe_favorites');
    return favorites ? JSON.parse(favorites) : [];
}

// Save a recipe ID to favorites
function saveFavorite(recipeId) {
    const favorites = getFavorites();
    if (!favorites.includes(recipeId)) {
        favorites.push(recipeId);
        localStorage.setItem('recipe_favorites', JSON.stringify(favorites));
    }
}

// Remove a recipe ID from favorites
function removeFavorite(recipeId) {
    let favorites = getFavorites();
    favorites = favorites.filter(id => id !== recipeId);
    localStorage.setItem('recipe_favorites', JSON.stringify(favorites));
}

// Check if a recipe is currently favorited
function isFavorited(recipeId) {
    const favorites = getFavorites();
    return favorites.includes(recipeId);
}