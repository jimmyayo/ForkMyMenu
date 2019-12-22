import Search from './models/Search';
import * as searchView from './views/searchView';
import { element, renderLoader, clearLoader } from './views/base';


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
    searchView.renderResults(state.search.recipes);
    
  }
}

element.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

element.searchResultsPaging.addEventListener('click', e=> {
  const btn = e.target.closest('.btn-inline');
})
