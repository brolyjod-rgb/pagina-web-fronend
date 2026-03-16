// addRecipe.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("addRecipeForm");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
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
            image: document.getElementById("image").value.trim() || "../images/default-recipe.jpg",
            ingredients,
            steps,
            description: document.getElementById("description").value.trim(),
            createdAt: new Date().toISOString()
        };

        // ===== GUARDAR EN BACKEND =====
        try {
            const response = await fetch("http://localhost:3000/api/recipes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newRecipe)
            });

            if (!response.ok) throw new Error("Error al guardar receta en el servidor");

            // Mostrar toast
            const toast = document.getElementById("toast");
            if (toast) {
                toast.textContent = "Receta guardada exitosamente 👌";
                toast.classList.add("show");
                setTimeout(() => toast.classList.remove("show"), 3000);
            }

            // Limpiar formulario y redirigir
            form.reset();
            window.location.href = "recipes.html";

        } catch (error) {
            console.error(error);
            const toast = document.getElementById("toast");
            if (toast) {
                toast.textContent = "No se pudo guardar la receta ❌";
                toast.classList.add("show");
                setTimeout(() => toast.classList.remove("show"), 3000);
            }
        }
    });
});
