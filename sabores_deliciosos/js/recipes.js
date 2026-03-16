// recipes.js
import { supabase } from "./supabaseClient.js";

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("recipesContainer");
    if (!container) return;

    async function loadRecipes() {
        try {
            const { data: recipes, error } = await supabase
                .from("recipes")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;

            if (!recipes || recipes.length === 0) {
                container.innerHTML = `<p class="empty-state">No hay recetas guardadas aún. Agrega una nueva.</p>`;
                return;
            }

            recipes.forEach(recipe => {
                const card = document.createElement("div");
                card.classList.add("recipe-card");

                card.innerHTML = `
                    <img src="${recipe.image || '../images/default-recipe.jpg'}" alt="${recipe.title}" class="recipe-image">
                    <h2>${recipe.title}</h2>
                    <p><strong>Categoría:</strong> ${recipe.category}</p>
                    <p><strong>Tiempo:</strong> ${recipe.time}</p>
                    <p><strong>Porciones:</strong> ${recipe.servings}</p>
                    <p><strong>Calorías:</strong> ${recipe.calories}</p>
                    <p><strong>Ingredientes:</strong><br>${recipe.ingredients.join("<br>")}</p>
                    <p><strong>Pasos:</strong><br>${recipe.steps.join("<br>")}</p>
                    <p>${recipe.description}</p>
                `;

                container.appendChild(card);
            });

        } catch (err) {
            console.error(err);
            container.innerHTML = "<p>No se pudieron cargar las recetas ❌</p>";
        }
    }

    loadRecipes();
});
