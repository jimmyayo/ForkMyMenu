import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { element, renderLoader, clearLoader } from './views/base';


//**** SEARCH CONTROLLER ****//

// ** Global state object ** //
// - Search object
// - Current recipe
// - Shopping list object
// - Liked recipes
const state = {};

const SearchController = async function () {
  // get query from view
  const query = searchView.getInput();

  if (query) {
    state.search = new Search(query);
    // Prepare UI for displaying results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(element.searchResults);

    // search for recipes
    try {
      await state.search.getResults();

      // render results on UI
      clearLoader();
      searchView.renderResults(state.search.recipes, 1);
    } catch (error) {
      console.log(error);
      alert('Error searching for recipes');
      clearLoader();
    }

  }
}

element.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  SearchController();
});

element.searchResultsPaging.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const gotoPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.recipes, gotoPage, 10);
  }
})




//**** RECIPE CONTROLLER ****//

const RecipeController = async () => {
  // Get recipeID from URL
  const id = window.location.hash.replace('#', '');
  if (id) {
    // Prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(element.recipe);

    // instantiate new Recipe
    state.recipe = new Recipe(id);

    // highlight selected recipe
    if (state.search) searchView.highlightSelectedRecipe(id);

    // get Recipe data
    try {
      await state.recipe.getRecipe();
      // calculate servings, cooking time
      state.recipe.getCookingTime();
      state.recipe.getServings();
      state.recipe.parseIngredients();

      // render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe);
    } catch (error) {
      console.log(error);
      alert('error retrieving recipe for id: ' + id);
    }
  }
}

window.addEventListener('hashchange', RecipeController);
window.addEventListener('load', RecipeController);

// handle recipe button clics
element.recipe.addEventListener('click', e => {
  console.log(e.target);
  if (e.target.matches('.btn-decrease, btn-decrease *')) {
    // decrase button clicked
    if (state.recipe.servings > 1) 
      state.recipe.updateServings('dec');
      recipeView.updateServings(state.recipe);
  } else if (e.target.matches('.btn-increase, btn-increase *')) {
    // increase button clicked
    state.recipe.updateServings('inc');
    recipeView.updateServings(state.recipe);
  }
  
  console.log(state.recipe);
})