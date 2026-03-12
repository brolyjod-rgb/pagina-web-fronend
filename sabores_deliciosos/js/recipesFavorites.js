function getFavorites() {
    const all = loadRecipes();
    return all.filter(r => r.isFavorite);
}

function addFavorite(recipeId) {
    const currentRecipes = loadRecipes();
    const recipe = currentRecipes.find(r => r.id === recipeId);
    if (recipe) {
        recipe.isFavorite = true;
        localStorage.setItem("recipesData", JSON.stringify(currentRecipes));
        return true;
    }
    return false;
}

function removeFavorite(recipeId) {
    const currentRecipes = loadRecipes();
    const recipe = currentRecipes.find(r => r.id === recipeId);
    if (recipe) {
        recipe.isFavorite = false;
        localStorage.setItem("recipesData", JSON.stringify(currentRecipes));
        return true;
    }
    return false;
}

function isFavorite(recipeId) {
    const recipe = getRecipeById(recipeId);
    return recipe ? recipe.isFavorite : false;
}

function toggleFavoriteStatus(recipeId) {
    const recipe = getRecipeById(recipeId);
    if (recipe) {
        recipe.isFavorite = !recipe.isFavorite;
        updateRecipe(recipeId, { isFavorite: recipe.isFavorite });
        return recipe.isFavorite;
    }
    return false;
}
