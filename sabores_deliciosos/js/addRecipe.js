document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("addRecipeForm");
    
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const ingredientsText = document.getElementById("ingredients").value.trim();
            const stepsText = document.getElementById("steps").value.trim();
            
            const ingredients = ingredientsText.split("\n").map(i => i.trim()).filter(i => i.length > 0);
            const steps = stepsText.split("\n").map(s => s.trim()).filter(s => s.length > 0);
            
            const newRecipe = {
                id: Date.now(),
                title: document.getElementById("title").value.trim(),
                category: document.getElementById("category").value,
                time: document.getElementById("time").value,
                servings: document.getElementById("servings").value,
                calories: document.getElementById("calories").value,
                image: document.getElementById("image").value.trim() || "../images/default-recipe.jpg",
                ingredients: ingredients,
                steps: steps,
                description: document.getElementById("description").value.trim(),
                isFavorite: false,
                createdAt: new Date().toISOString()
            };
            
            saveRecipe(newRecipe);
            showToast("Receta guardada exitosamente");
            form.reset();
            window.location.href = "recipes.html";
        });
    }
});

function showToast(message) {
    const toast = document.getElementById("toast");
    if (toast) {
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 3000);
    }
}
