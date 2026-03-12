function renderRecipes(recipesList, containerId = "recipesGrid") {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (recipesList.length === 0) {
        container.style.display = "none";
        const emptyState = document.getElementById("emptyState");
        if (emptyState) emptyState.style.display = "flex";
        return;
    }
    
    container.style.display = "grid";
    const emptyState = document.getElementById("emptyState");
    if (emptyState) emptyState.style.display = "none";
    
    container.innerHTML = recipesList.map(recipe => createRecipeCard(recipe)).join("");
    
    document.querySelectorAll(".recipe-card").forEach(card => {
        card.addEventListener("click", (e) => {
            if (!e.target.closest(".btn-favorite")) {
                const id = parseInt(card.dataset.id);
                openRecipeModal(id);
            }
        });
    });
    
    document.querySelectorAll(".btn-favorite").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = parseInt(btn.closest(".recipe-card").dataset.id);
            toggleFavorite(id, btn);
        });
    });
}

function createRecipeCard(recipe) {
    const favoriteIcon = recipe.isFavorite ? "â¤ï¸" : "ðŸ¤";
    return `
        <article class="recipe-card" data-id="${recipe.id}">
            <div class="recipe-card-image">
                <img src="${recipe.image}" alt="${recipe.title}" loading="lazy">
                <span class="recipe-card-category">${recipe.category}</span>
                <button class="btn-favorite mini" aria-label="Agregar a favoritos">${favoriteIcon}</button>
            </div>
            <div class="recipe-card-content">
                <h3 class="recipe-card-title">${recipe.title}</h3>
                <p class="recipe-card-description">${recipe.description.substring(0, 80)}...</p>
                <div class="recipe-card-meta">
                    <span class="meta-item">â±ï¸ ${recipe.time}</span>
                    <span class="meta-item">ðŸ‘¥ ${recipe.servings}</span>
                    <span class="meta-item">ðŸ”¥ ${recipe.calories} kcal</span>
                </div>
            </div>
        </article>
    `;
}

function openRecipeModal(recipeId) {
    const recipe = getRecipeById(recipeId);
    if (!recipe) return;
    
    document.getElementById("modalImage").src = recipe.image;
    document.getElementById("modalCategory").textContent = recipe.category;
    document.getElementById("modalTitle").textContent = recipe.title;
    document.getElementById("modalTime").textContent = recipe.time;
    document.getElementById("modalServings").textContent = recipe.servings + " personas";
    document.getElementById("modalCalories").textContent = recipe.calories + " kcal";
    document.getElementById("modalRating").textContent = "4.8";
    
    const ingredientsList = document.getElementById("modalIngredients");
    ingredientsList.innerHTML = recipe.ingredients.map(ing => "<li>" + ing + "</li>").join("");
    
    const stepsList = document.getElementById("modalSteps");
    stepsList.innerHTML = recipe.steps.map((step, index) => "<li><strong>Paso " + (index + 1) + ":</strong> " + step + "</li>").join("");
    
    document.getElementById("modalDescription").textContent = recipe.description;
    
    const btnFavorite = document.getElementById("btnFavorite");
    btnFavorite.textContent = recipe.isFavorite ? "Quitado de Favoritos" : "Agregar a Favoritos";
    btnFavorite.onclick = () => toggleFavorite(recipeId, btnFavorite);
    
    document.getElementById("btnShare").onclick = () => shareRecipe(recipe);
    
    const modal = document.getElementById("recipeModal");
    if (modal) {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
    }
}

function closeModal() {
    const modal = document.getElementById("recipeModal");
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "";
    }
}

function toggleFavorite(recipeId, btnElement) {
    const currentRecipes = loadRecipes();
    const recipeIndex = currentRecipes.findIndex(r => r.id === recipeId);
    
    if (recipeIndex !== -1) {
        currentRecipes[recipeIndex].isFavorite = !currentRecipes[recipeIndex].isFavorite;
        localStorage.setItem("recipesData", JSON.stringify(currentRecipes));
        
        if (btnElement) {
            btnElement.textContent = currentRecipes[recipeIndex].isFavorite 
                ? "Quitado de Favoritos" 
                : "Agregar a Favoritos";
        }
        
        updateFavoriteButtons(recipeId, currentRecipes[recipeIndex].isFavorite);
        showToast(currentRecipes[recipeIndex].isFavorite ? "Agregado a favoritos" : "Removido de favoritos");
        
        if (window.location.pathname.includes("favorites.html")) {
            renderFavoritesPage();
        }
    }
}

function updateFavoriteButtons(recipeId, isFavorite) {
    document.querySelectorAll(".recipe-card[data-id='" + recipeId + "'] .btn-favorite").forEach(btn => {
        btn.textContent = isFavorite ? "â¤ï¸" : "ðŸ¤";
    });
}

function shareRecipe(recipe) {
    const shareData = {
        title: recipe.title,
        text: "Mira esta receta: " + recipe.title,
        url: window.location.href
    };
    
    if (navigator.share) {
        navigator.share(shareData).catch(() => {});
    } else {
        navigator.clipboard.writeText(recipe.title + "\n\n" + recipe.description + "\n\n" + window.location.href);
        showToast("Enlace copiado al portapapeles");
    }
}

function showToast(message) {
    const toast = document.getElementById("toast");
    if (toast) {
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 3000);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("recipeModal");
    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });
    }
    
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });
});
