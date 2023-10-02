import { selectors } from './api request';

async function creatingMarkup(arrays) {
  arrays.map(array => {
    const {
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    } = array;

    selectors.photoCard.insertAdjacentHTML(
      'beforeend',
      `<div class="photo-card">
         <a href="${largeImageURL}" class="gallery-link">
         <img src="${webformatURL}" alt="${tags}" loading="lazy" width="250" height="250"  />
         </a>
         <div class="info">
           <p class="info-item">
             <b>Likes</b>${likes}
           </p>
                  <p class="info-item">
             <b>Views</b>${views}
           </p>
           <p class="info-item">
             <b>Comments</b>${comments}
           </p>
           <p class="info-item">
             <b>Downloads</b>${downloads}
           </p>
         </div>
       </div>`
    );
  });

}

export { creatingMarkup };
