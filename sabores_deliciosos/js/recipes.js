// recipes.js
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("recipesContainer");
    if (!container) return;

    // ===== CARGAR RECETAS DESDE BACKEND =====
    async function loadRecipes() {
        try {
            const response = await fetch("http://localhost:3000/api/recipes");
            if (!response.ok) throw new Error("Error al cargar recetas desde el servidor");

            const recipes = await response.json();

            if (recipes.length === 0) {
                container.innerHTML = "<p>No hay recetas guardadas aún.</p>";
                return;
            }

            container.innerHTML = recipes.map(recipe => `
                <div class="recipe-card">
                    <img src="${recipe.image || '../images/default-recipe.jpg'}" alt="${recipe.title}" class="recipe-image">
                    <h2>${recipe.title}</h2>
                    <p><strong>Categoría:</strong> ${recipe.category}</p>
                    <p><strong>Tiempo:</strong> ${recipe.time}</p>
                    <p><strong>Porciones:</strong> ${recipe.servings}</p>
                    <p><strong>Calorías:</strong> ${recipe.calories}</p>
                    <p><strong>Ingredientes:</strong><br>${recipe.ingredients.join("<br>")}</p>
                    <p><strong>Pasos:</strong><br>${recipe.steps.join("<br>")}</p>
                    <p>${recipe.description}</p>
                </div>
            `).join("");

        } catch (error) {
            console.error(error);
            container.innerHTML = "<p>No se pudieron cargar las recetas ❌</p>";
        }
    }

    loadRecipes();
});
