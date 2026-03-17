// js/recipes.js
import { supabase } from "./supabaseClient.js";

document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("recipesContainer");
    if (!container) return;

    const { data: recipes, error } = await supabase
        .from("Recetas_deliciosas")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
        container.innerHTML = "<p>No se pudieron cargar las recetas ❌</p>";
        return;
    }

    if (!recipes || recipes.length === 0) {
        container.innerHTML = `<p class="empty-state">No hay recetas guardadas aún.</p>`;
        return;
    }

    container.innerHTML = recipes.map(recipe => {

        // Convertir strings a arrays
        const ingredientsArray =
            typeof recipe.ingredients === "string"
                ? recipe.ingredients.split("\n")
                : recipe.ingredients;

        const stepsArray =
            typeof recipe.steps === "string"
                ? recipe.steps.split("\n")
                : recipe.steps;

        return `
        <div class="recipe-card">
            <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
            <h2>${recipe.title}</h2>
            <p><strong>Categoría:</strong> ${recipe.category}</p>
            <p><strong>Tiempo:</strong> ${recipe.time}</p>
            <p><strong>Porciones:</strong> ${recipe.servings}</p>
            <p><strong>Calorías:</strong> ${recipe.calories}</p>

            <p><strong>Ingredientes:</strong><br>${ingredientsArray.join("<br>")}</p>
            <p><strong>Pasos:</strong><br>${stepsArray.join("<br>")}</p>

            <p>${recipe.description}</p>
        </div>
        `;
    }).join("");
});
