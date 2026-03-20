document.addEventListener("DOMContentLoaded", () => {
    initializeApp();
});

function initializeApp() {
    loadRecipes();
    
    const recipesGrid = document.getElementById("recipesGrid");
    if (recipesGrid && window.location.pathname.includes("recipes.html")) {
        renderRecipes(getAllRecipes());

        // 🔍 Activamos el filtro solo en recipes.html
        activateSearchFilter();
    }
    
    
    if (window.location.pathname.includes("favorites.html")) {
        renderFavoritesPage();
    }
    
    setupEventListeners();
}

function setupEventListeners() {
    const modalClose = document.querySelector(".modal-close");
    if (modalClose) {
        modalClose.addEventListener("click", closeModal);
    }
}

function renderFavoritesPage() {
    const favorites = getFavorites();
    const container = document.getElementById("recipesGrid");
    
    if (container) {
        if (favorites.length === 0) {
            container.style.display = "none";
            const emptyState = document.getElementById("emptyState");
            if (emptyState) {
                emptyState.style.display = "flex";
                emptyState.querySelector("h2").textContent = "No tienes favoritos aun";
                emptyState.querySelector("p").textContent = "Explora recetas y agrega las que mas te gusten";
            }
        } else {
            container.style.display = "grid";
            const emptyState = document.getElementById("emptyState");
            if (emptyState) emptyState.style.display = "none";
            renderRecipes(favorites);
        }
    }
}

/* =========================================================
   🔍 Filtro de búsqueda integrado para recipes.html
   ========================================================= */
function activateSearchFilter() {
    const searchInput = document.getElementById("searchInput");
    if (!searchInput) return;

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase().trim();

        const allRecipes = getAllRecipes();

        const filtered = allRecipes.filter(recipe => {
            const title = (recipe.title || "").toLowerCase();
            const description = (recipe.description || "").toLowerCase();
            return title.includes(query) || description.includes(query);
        });

        renderRecipes(filtered);
    });
}
