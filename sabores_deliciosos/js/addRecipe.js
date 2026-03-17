// js/addRecipe.js
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
        };

        const { error } = await supabase
            .from("Recetas_deliciosas")
            .insert([newRecipe]);

        const toast = document.getElementById("toast");

        if (error) {
            console.error(error);
            toast.textContent = "❌ Error al guardar";
        } else {
            toast.textContent = "👌 Receta guardada";
            form.reset();
            setTimeout(() => window.location.href = "recipes.html", 1000);
        }

        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 3000);
    });
});
