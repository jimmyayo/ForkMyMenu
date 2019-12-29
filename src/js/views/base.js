export const element = {
  searchInput: document.querySelector('.search__field'),
  searchForm: document.querySelector('.search'),
  searchResultList: document.querySelector('.results__list'),
  searchResults: document.querySelector('.results'),
  searchResultsPaging: document.querySelector('.results__pages'),
  recipe: document.querySelector('.recipe'),
  shoppingList: document.querySelector('.shopping__list')
}

export const elementStrings = {
  loader: 'loader'
}

export const renderLoader = containerElement => {
  const loader = `
    <div class="loader">
      <svg>
        <use href="img/icons.svg#icon-cw"></use>
      </svg>
    </div>
  `;

  containerElement.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
  const loader = document.querySelector(`.${elementStrings.loader}`);
  if (loader) {
    loader.parentElement.removeChild(loader);
  }
}
