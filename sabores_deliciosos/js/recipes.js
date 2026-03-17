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

        // Detectar si es video o imagen
        let mediaElement = "";

        const url = recipe.image || "";

        // --- VALIDACIÓN DE VIDEO ---
        const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");
        const isTikTok = url.includes("tiktok.com");
        const isFacebook = url.includes("facebook.com") || url.includes("fb.watch");

        if (isYouTube) {
            // Convertir a formato embed
            let videoId = "";
            if (url.includes("watch?v=")) videoId = url.split("watch?v=")[1];
            if (url.includes("youtu.be/")) videoId = url.split("youtu.be/")[1];

            mediaElement = `
                <iframe width="100%" height="250"
                    src="https://www.youtube.com/embed/${videoId}"
                    frameborder="0"
                    allowfullscreen>
                </iframe>`;
        }
        else if (isTikTok) {
            mediaElement = `
                <blockquote class="tiktok-embed" cite="${url}" data-video-id=""
                    style="max-width: 100%; min-width: 100%;">
                    <a href="${url}" target="_blank">Ver video en TikTok</a>
                </blockquote>`;
        }
        else if (isFacebook) {
            mediaElement = `
                <a href="${url}" target="_blank" class="video-link">
                    ▶ Ver video de Facebook
                </a>`;
        }
        else {
            // Asumimos imagen normal
            mediaElement = `<img src="${url}" alt="${recipe.title}" class="recipe-image">`;
        }

        return `
        <div class="recipe-card">

            ${mediaElement}

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
