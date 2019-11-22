const $searchInput = document.getElementById('navbar-search-input');
const $searchResults = document.getElementById('search-results');

const searchState = query => {
  fetch(`https://kitsu.io/api/edge/anime?&page[limit]=5&filter[text]=${query}`)
    .then(response => response.json())
    .then(responseBody => {
      $searchResults.innerHTML = '';
      outputHTML(responseBody.data);
    });
};

const outputHTML = results => {
  if (results.length !== 0) {
    results.forEach(result => {
      const html = `
      <a href="/anime/${result.id}" class="dropdown-item">
        <div class="row">
          <div class="col-md-2 border-right">
            <img src="${result.attributes.posterImage.original}" height=70 width=55 />
          </div>
          <div class="col-md-10 search-item">
            <span class="h5">
              ${result.attributes.canonicalTitle}
            </span>
          </div>
        </div>
      </a>
      `;
      $searchResults.innerHTML += html;
    });
  }
};

$searchInput.addEventListener('input', () => searchState($searchInput.value));
