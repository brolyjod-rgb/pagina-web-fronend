document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("recipesGrid");
    if (!container) return;

    loadRecipes();

    function loadRecipes() {
        const recipes = JSON.parse(localStorage.getItem("recipes")) || [];

        container.innerHTML = "";

        if (recipes.length === 0) {
            container.innerHTML = `
                <p class="empty-state">No hay recetas aún. Agrega una nueva.</p>
            `;
            return;
        }

        recipes.forEach(recipe => {
            const card = document.createElement("div");
            card.classList.add("recipe-card");

            card.innerHTML = `
                <div class="recipe-card-image">
                    <img src="${recipe.image}" alt="Imagen de receta">
                    <span class="recipe-card-category">${recipe.category}</span>
                </div>

                <div class="recipe-card-content">
                    <h3 class="recipe-card-title">${recipe.title}</h3>
                    <p class="recipe-card-description">${recipe.description}</p>

                    <div class="recipe-card-meta">
                        <span>⏱ ${recipe.time}</span>
                        <span>🔥 ${recipe.calories} cal</span>
                    </div>
                </div>
            `;

            // Click → abrir receta
            card.addEventListener("click", () => {
                window.location.href = `/sabores_deliciosos/html/recipe.html?id=${recipe.id}`;
            });

            container.appendChild(card);
        });
    }
});
