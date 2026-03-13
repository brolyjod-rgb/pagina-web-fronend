document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("addRecipeForm");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            // --- Obtener valores del formulario ---
            const ingredients = document.getElementById("ingredients").value
                .trim()
                .split("\n")
                .map(i => i.trim())
                .filter(i => i !== "");

            const steps = document.getElementById("steps").value
                .trim()
                .split("\n")
                .map(s => s.trim())
                .filter(s => s !== "");

            const imageURL = document.getElementById("image").value.trim();
            const finalImage = imageURL !== "" 
                ? imageURL 
                : "/sabores_deliciosos/images/default-recipe.jpg";

            const newRecipe = {
                id: Date.now(),
                title: document.getElementById("title").value.trim(),
                category: document.getElementById("category").value,
                time: document.getElementById("time").value.trim(),
                servings: document.getElementById("servings").value.trim(),
                calories: document.getElementById("calories").value.trim(),
                image: finalImage,
                ingredients,
                steps,
                description: document.getElementById("description").value.trim(),
                isFavorite: false,
                createdAt: new Date().toISOString()
            };

            // --- Guardar receta ---
            saveRecipe(newRecipe);

            showToast("Receta guardada exitosamente 👌");

            // --- Limpiar formulario ---
            form.reset();

            // 🔥 IMPORTANTE 🔥
            // Redirigir a la página de detalle de la receta
            window.location.href = `/sabores_deliciosos/html/recipe.html?id=${newRecipe.id}`;
        });
    }
});


// --- Guardar en localStorage ---
function saveRecipe(recipe) {
    const stored = JSON.parse(localStorage.getItem("recipes") || "[]");
    stored.push(recipe);
    localStorage.setItem("recipes", JSON.stringify(stored));
}


// --- Toast visual ---
function showToast(message) {
    const toast = document.getElementById("toast");
    if (toast) {
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 3000);
    }
}
