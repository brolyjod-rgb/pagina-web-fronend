function getRecipeId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function loadRecipes() {
    return JSON.parse(localStorage.getItem("recipes") || "[]");
}

function renderRecipe(recipe) {

    const container = document.getElementById("recipeContainer");

    container.innerHTML = `
        <div class="recipe-detail-card">

            <img class="recipe-detail-image" src="${recipe.image}" alt="${recipe.title}">

            <h1 class="recipe-detail-title">${recipe.title}</h1>

            <div class="recipe-detail-meta">
                <span>⏱️ ${recipe.time}</span>
                <span>👥 ${recipe.servings} porciones</span>
                <span>🔥 ${recipe.calories} kcal</span>
            </div>

            <h2>📋 Ingredientes</h2>
            <ul class="recipe-detail-list">
                ${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}
            </ul>

            <h2>👨‍🍳 Preparación</h3>
            <ol class="recipe-detail-list">
                ${recipe.steps.map(s => `<li>${s}</li>`).join("")}
            </ol>

            <h2>💬 Descripción</h2>
            <p>${recipe.description}</p>

        </div>
    `;
}

(function initRecipePage() {
    const id = getRecipeId();
    if (!id) {
        alert("No se encontró la receta");
        return;
    }

    const recipes = loadRecipes();
    const recipe = recipes.find(r => r.id == id);

    if (!recipe) {
        alert("La receta no existe");
        return;
    }

    renderRecipe(recipe);
})();
