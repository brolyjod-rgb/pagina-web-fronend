document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("addRecipeForm");

    if (!form) return;

    form.addEventListener("submit", (e) => {
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
            id: Date.now(),
            title: document.getElementById("title").value.trim(),
            category: document.getElementById("category").value,
            time: document.getElementById("time").value.trim(),
            servings: document.getElementById("servings").value,
            calories: document.getElementById("calories").value,
            image: document.getElementById("image").value.trim() || "../images/default-recipe.jpg",
            ingredients,
            steps,
            description: document.getElementById("description").value.trim(),
            createdAt: new Date().toISOString()
        };

        const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        recipes.push(newRecipe);
        localStorage.setItem("recipes", JSON.stringify(recipes));

        const toast = document.getElementById("toast");
        if (toast) {
            toast.textContent = "Receta guardada exitosamente 👌";
            toast.classList.add("show");
            setTimeout(() => toast.classList.remove("show"), 3000);
        }

        form.reset();
        window.location.href = "recipes.html";
    });
});
