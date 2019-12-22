import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { element, renderLoader, clearLoader } from './views/base';


//**** SEARCH CONTROLLER ****//

// ** Global state object ** //
// - Search object
// - Current recipe
// - Shopping list object
// - Liked recipes
const state = {};

const controlSearch = async function() {
  // get query from view
  const query = searchView.getInput();
  console.log(query);

  if (query) {
    state.search = new Search(query);
    // Prepare UI for displaying results
    searchView.clearInput();
    searchView.clearResults(); 
    renderLoader(element.searchResults);

    // search for recipes
    await state.search.getResults();

    // render results on UI
    clearLoader();
    searchView.renderResults(state.search.recipes, 1);
    
  }
}

element.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

element.searchResultsPaging.addEventListener('click', e=> {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const gotoPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.recipes, gotoPage, 10);
  }
})




//**** RECIPE CONTROLLER ****//
const r = new Recipe(35477);
r.getRecipe();
console.log(r);