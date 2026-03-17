// js/recipes.js
import { supabase } from "./supabaseClient.js";

document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("recipesContainer");
    if (!container) return;

    // === CARGAR RECETAS DESDE SUPABASE ===
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

    container.innerHTML = recipes
        .map(recipe => {
            // Convertir texto a arrays
            const ingredients = (recipe.ingredients || "").split("\n");
            const steps = (recipe.steps || "").split("\n");
            
            return `
                <div class="recipe-card">
                    <img src="${recipe.image || '../images/default-recipe.jpg'}" 
                         alt="${recipe.title}" 
                         class="recipe-image">

                    <h2>${recipe.title}</h2>

                    <p><strong>Categoría:</strong> ${recipe.category || "N/A"}</p>
                    <p><strong>Tiempo:</strong> ${recipe.time || "N/A"}</p>
                    <p><strong>Porciones:</strong> ${recipe.servings || "N/A"}</p>
                    <p><strong>Calorías:</strong> ${recipe.calories || "N/A"}</p>

                    <p><strong>Ingredientes:</strong><br>${ingredients.join("<br>")}</p>
                    <p><strong>Pasos:</strong><br>${steps.join("<br>")}</p>

                    <p>${recipe.description || ""}</p>
                </div>
            `;
        })
        .join("");
});
