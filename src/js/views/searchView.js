import { element } from './base';

export const getInput = () => element.searchInput.value;

export const clearInput = () => {
  element.searchInput.value = '';
}

export const clearResults = () => {
  element.searchResultList.innerHTML = '';
}

// will shorten recipe title if it's too long followed by '...'
const shortenRecipeTitle = (title, limit = 18) => {
  const newTitle = [];

  if (title.length > limit) {
    title.split(' ').reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;

    }, 0);

    return `${newTitle.join(' ')} ...`;
  }

  return title;
}

const renderRecipe = recipe => {
  const markup = `
  <li>
    <a class="results__link results__link--active" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${shortenRecipeTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
  </li>`;
  element.searchResultList.insertAdjacentHTML('beforeend', markup);
}


// type: 'prev' or 'next'
const createButton = (page, type) => `
  <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
    </svg>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
  </button>
`;

const renderButtons = (page, totalResults, itemsPerPage) => {
  const pages = Math.ceil(totalResults / itemsPerPage);
  let button;

  if (page === 1) {
    // Next page button only
    button = createButton(page, 'next');
  } else if (page < pages) {
    // Both prev and next buttons
    button = `
      ${createButton(page, 'prev')}
      ${createButton(page, 'next')}
    `
  } else if (page === pages) {
    // Prev page button only
    button = createButton(page, 'prev');
  }

  element.searchResultsPaging.insertAdjacentHTML('afterbegin', button);
}

export const renderResults = (recipes, page = 2, itemsPerPage = 10) => {
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;

  recipes.slice(start, end).forEach(renderRecipe);

  // render paging controls
  renderButtons(page, recipes.length, itemsPerPage);
}

