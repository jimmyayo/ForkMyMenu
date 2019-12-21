import Search from './models/Search';
import * as searchView from './views/searchView';
import { element } from './views/base';


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

    // search for recipes
    await state.search.getResults();

    // render results on UI
    searchView.renderResults(state.search.recipes);
    
  }
}

element.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
})

//state.search.getResults();