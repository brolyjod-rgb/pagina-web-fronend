document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("addRecipeForm");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            // Obtener datos del formulario
            const ingredients = document.getElementById("ingredients").value
                .split("\n")
                .map(i => i.trim())
                .filter(i => i);

            const steps = document.getElementById("steps").value
                .split("\n")
                .map(s => s.trim())
                .filter(s => s);

            const newRecipe = {
                id: Date.now(),
                title: document.getElementById("title").value.trim(),
                category: document.getElementById("category").value,
                time: document.getElementById("time").value.trim(),
                servings: document.getElementById("servings").value,
                calories: document.getElementById("calories").value,
                image: document.getElementById("image").value.trim() || "/sabores_deliciosos/images/default-recipe.jpg",
                ingredients,
                steps,
                description: document.getElementById("description").value.trim(),
                isFavorite: false,
                createdAt: new Date().toISOString()
            };

            saveRecipe(newRecipe);
            showToast("Receta guardada exitosamente 👌");

            form.reset();

            // Redirigir a recetas
            window.location.href = "/sabores_deliciosos/html/recipes.html";
        });
    }
});

/* =======================
   GUARDAR EN LOCALSTORAGE
==========================*/
function saveRecipe(recipe) {
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    recipes.push(recipe);
    localStorage.setItem("recipes", JSON.stringify(recipes));
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
}
