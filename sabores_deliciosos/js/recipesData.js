const recipes = [];

function loadRecipes() {
    const data = localStorage.getItem("recipesData");
    if (data) {
        return JSON.parse(data);
    }
    return [];
}

function saveRecipe(recipe) {
    const currentRecipes = loadRecipes();
    recipe.id = Date.now();
    recipe.isFavorite = false;
    currentRecipes.push(recipe);
    localStorage.setItem("recipesData", JSON.stringify(currentRecipes));
}

function getAllRecipes() {
    return loadRecipes();
}

function getRecipeById(id) {
    const all = loadRecipes();
    return all.find(r => r.id === id);
}

function updateRecipe(id, updatedRecipe) {
    const currentRecipes = loadRecipes();
    const index = currentRecipes.findIndex(r => r.id === id);
    if (index !== -1) {
        currentRecipes[index] = { ...currentRecipes[index], ...updatedRecipe };
        localStorage.setItem("recipesData", JSON.stringify(currentRecipes));
        return true;
    }
    return false;
}

function deleteRecipe(id) {
    let currentRecipes = loadRecipes();
    currentRecipes = currentRecipes.filter(r => r.id !== id);
    localStorage.setItem("recipesData", JSON.stringify(currentRecipes));
}
