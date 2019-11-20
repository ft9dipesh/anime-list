// import { getAnime } from './getAnime';

const $carouselIndicators = document.querySelector('.carousel-indicators');
const $carouselInner = document.querySelector('.carousel-inner');

let style = document.createElement('style');

getAnime(
  {
    current: true
  },
  (error, anime) => {
    if (error) {
      return console.log(error);
    }
    anime.data.forEach((series, index) => {
      style.innerHTML += `
        .carousel-image-${index + 1} {
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(49, 49, 59, 0.8)), url("${
            series.attributes.posterImage.original
          }"); background-size: cover; background-position-y: center;"
        }
      `;
      document.head.insertAdjacentElement('beforeend', style);

      const carouselListHTML = `
        <li class="${
          index === 0 ? 'active' : ''
        }" data-target='#myCarousel' data-slide-to='${index}'>
      `;
      const carouselItemHTML = `
        <div class="carousel-item carousel-image-${index + 1} ${
        index === 0 ? 'active' : ''
      }" ><div class="carousel-caption d-none d-sm-block mb-2 text-center"><h2 class="h3">${
        series.attributes.canonicalTitle
      }</h2></div></div>
      `;
      $carouselIndicators.insertAdjacentHTML('beforeend', carouselListHTML);
      $carouselInner.insertAdjacentHTML('beforeend', carouselItemHTML);

      // console.log(encodeURI(series.attributes.posterImage.original));
    });
  }
);
