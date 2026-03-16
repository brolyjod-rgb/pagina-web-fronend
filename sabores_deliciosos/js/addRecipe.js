// addRecipe.js
import { supabase } from "./supabaseClient.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("addRecipeForm");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const ingredients = document.getElementById("ingredients").value
            .split("\n")
            .map(i => i.trim())
            .filter(i => i);

        const steps = document.getElementById("steps").value
            .split("\n")
            .map(s => s.trim())
            .filter(s => s);

        const newRecipe = {
            title: document.getElementById("title").value.trim(),
            category: document.getElementById("category").value,
            time: document.getElementById("time").value.trim(),
            servings: parseInt(document.getElementById("servings").value),
            calories: parseInt(document.getElementById("calories").value),
            image: document.getElementById("image").value.trim() || "../images/default-recipe.jpg",
            ingredients,
            steps,
            description: document.getElementById("description").value.trim(),
            created_at: new Date().toISOString()
        };

        try {
            const { data, error } = await supabase
                .from("recipes")
                .insert([newRecipe]);

            if (error) throw error;

            const toast = document.getElementById("toast");
            if (toast) {
                toast.textContent = "Receta guardada exitosamente 👌";
                toast.classList.add("show");
                setTimeout(() => toast.classList.remove("show"), 3000);
            }

            form.reset();
            window.location.href = "recipes.html";

        } catch (err) {
            console.error(err);
            const toast = document.getElementById("toast");
            if (toast) {
                toast.textContent = "No se pudo guardar la receta ❌";
                toast.classList.add("show");
                setTimeout(() => toast.classList.remove("show"), 3000);
            }
        }
    });
});
