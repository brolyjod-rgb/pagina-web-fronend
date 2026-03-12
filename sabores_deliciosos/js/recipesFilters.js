document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const filterButtons = document.querySelectorAll(".filter-btn");
    
    let currentFilter = "all";
    let searchQuery = "";
    
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            applyFilters();
        });
    }
    
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentFilter = btn.dataset.filter;
            applyFilters();
        });
    });
    
    function applyFilters() {
        let filtered = getAllRecipes();
        
        if (currentFilter !== "all") {
            filtered = filtered.filter(r => r.category === currentFilter);
        }
        
        if (searchQuery) {
            filtered = filtered.filter(r => 
                r.title.toLowerCase().includes(searchQuery) ||
                r.description.toLowerCase().includes(searchQuery) ||
                r.ingredients.some(i => i.toLowerCase().includes(searchQuery))
            );
        }
        
        renderRecipes(filtered);
        updateStats(filtered);
    }
    
    function updateStats(filtered) {
        const totalRecipesEl = document.getElementById("totalRecipes");
        if (totalRecipesEl) totalRecipesEl.textContent = getAllRecipes().length;
        
        const categories = [...new Set(getAllRecipes().map(r => r.category))];
        const totalCategoriesEl = document.getElementById("totalCategories");
        if (totalCategoriesEl) totalCategoriesEl.textContent = categories.length;
        
        const userRecipes = getAllRecipes().filter(r => r.isFavorite);
        const totalUserRecipesEl = document.getElementById("totalUserRecipes");
        if (totalUserRecipesEl) totalUserRecipesEl.textContent = userRecipes.length;
        
        const totalFavoritesEl = document.getElementById("totalFavorites");
        if (totalFavoritesEl) totalFavoritesEl.textContent = userRecipes.length;
    }
    
    updateStats();
});
