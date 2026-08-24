// Function to fetch recipes by keyword search
async function fetchRecipes(query = '') {
    const recipeGrid = document.getElementById('recipe-grid');
    recipeGrid.innerHTML = '<p class="loading">Searching recipes...</p>';

    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();

        if (data.meals) {
            displayRecipes(data.meals);
        } else {
            recipeGrid.innerHTML = `<p>No recipes found for "${query}". Try searching for something else!</p>`;
        }
    } catch (error) {
        console.error("Error fetching recipes:", error);
        recipeGrid.innerHTML = '<p>Failed to load recipes. Please check your connection.</p>';
    }
}

// Function to render recipe cards inside the grid
function displayRecipes(meals) {
    const recipeGrid = document.getElementById('recipe-grid');
    recipeGrid.innerHTML = ''; // Clear existing content

    meals.forEach(meal => {
        const card = document.createElement('div');
        card.classList.add('recipe-card');
        card.dataset.id = meal.idMeal;

        card.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="recipe-card-body">
                <h3 class="recipe-card-title">${meal.strMeal}</h3>
                <p><strong>Category:</strong> ${meal.strCategory}</p>
                <p><strong>Origin:</strong> ${meal.strArea}</p>
            </div>
        `;

        // Click event to fetch and display recipe details in modal
        card.addEventListener('click', () => fetchRecipeDetails(meal.idMeal));
        recipeGrid.appendChild(card);
    });
}

// Function to fetch full recipe details by ID for modal
async function fetchRecipeDetails(id) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        const meal = data.meals[0];

        openRecipeModal(meal);
    } catch (error) {
        console.error("Error fetching recipe details:", error);
    }
}

// Function to render modal contents and show it
function openRecipeModal(meal) {
    const modal = document.getElementById('recipe-modal');
    const modalBody = document.getElementById('modal-body');

    // Extract non-empty ingredients and measurements
    let ingredientsList = '';
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '') {
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        }
    }

    modalBody.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width: 100%; height: 220px; object-fit: cover; border-radius: 8px; margin: 10px 0;">
        <h3>Ingredients</h3>
        <ul>${ingredientsList}</ul>
        <h3 style="margin-top: 15px;">Instructions</h3>
        <p>${meal.strInstructions}</p>
    `;

    modal.classList.remove('hidden');
}

// Close Modal Handler
document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('recipe-modal').classList.add('hidden');
});

function displayRecipes(meals) {
    const recipeGrid = document.getElementById('recipe-grid');
    recipeGrid.innerHTML = ''; 

    meals.forEach(meal => {
        const card = document.createElement('div');
        card.classList.add('recipe-card');
        card.dataset.id = meal.idMeal;

        const favorited = isFavorited(meal.idMeal);

        card.innerHTML = `
            <div style="position: relative;">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <button class="fav-btn" data-id="${meal.idMeal}" style="position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.8); border: none; border-radius: 50%; padding: 8px 10px; cursor: pointer;">
                    <i class="${favorited ? 'fa-solid' : 'fa-regular'} fa-heart" style="color: ${favorited ? '#ef4444' : '#64748b'};"></i>
                </button>
            </div>
            <div class="recipe-card-body">
                <h3 class="recipe-card-title">${meal.strMeal}</h3>
                <p><strong>Category:</strong> ${meal.strCategory}</p>
                <p><strong>Origin:</strong> ${meal.strArea}</p>
            </div>
        `;

        // Card click opens modal (unless clicking the heart button)
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.fav-btn')) {
                fetchRecipeDetails(meal.idMeal);
            }
        });

        // Favorite button click handler
        const favBtn = card.querySelector('.fav-btn');
        favBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = meal.idMeal;
            const icon = favBtn.querySelector('i');

            if (isFavorited(id)) {
                removeFavorite(id);
                icon.className = 'fa-regular fa-heart';
                icon.style.color = '#64748b';
            } else {
                saveFavorite(id);
                icon.className = 'fa-solid fa-heart';
                icon.style.color = '#ef4444';
            }
        });

        recipeGrid.appendChild(card);
    });
}