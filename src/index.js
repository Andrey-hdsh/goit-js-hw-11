import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { selectors, apiRequest } from './api request';
import { creatingMarkup } from './creating_markup';


selectors.loadMoreBtn.style.display = 'none';
let page = 1;
let totalImages = 0;
const inputValue = selectors.inputEl.value;
let lightbox;

selectors.formEl.addEventListener('submit', handlerForm);

function handlerForm(event) {
  event.preventDefault();
  page = 1;
  const inputValue = selectors.inputEl.value;

  if (inputValue === '') {
    return Notiflix.Notify.failure('Please enter your search query!', {
      fontSize: '16px',
    });
  }

  document.body.classList.remove('bkg-img');

  apiRequest(inputValue, page)
    .then(response => {
      totalImages = response.totalHits;
      if (response.totalHits === 0) {
        selectors.photoCard.innerHTML = '';
        selectors.loadMoreBtn.style.display = 'none';
        document.body.classList.add('bkg-img');

        Notiflix.Notify.failure(
          'No photos found for this topic. Try changing your query.',
          { fontSize: '16px' }
        );
        return;
        }
        
        
      selectors.photoCard.innerHTML = '';
      creatingMarkup(response.hits);
      selectors.loadMoreBtn.style.display = 'block';
      lightbox = new simpleLightbox('.gallery-link', {
        captionsData: 'alt',
        captionDelay: 250,
      });

      lightbox.refresh();

      if (response.totalHits < 40) {
        selectors.loadMoreBtn.style.display = 'none';
        setTimeout(function () {
          Notiflix.Notify.success(
            "We're sorry, but you've reached the end of search results.",
            { fontSize: '16px' }
          );
        }, 1000);
      }
    })
    .catch(error => console.error(error));

  selectors.loadMoreBtn.addEventListener('click', displayNextImages);
}

function displayNextImages() {
  page += 1;

  apiRequest(inputValue, page)
    .then(response => {
      const uploadedPictures = page * 40;
      const remainingImages = totalImages - uploadedPictures;

      if (remainingImages > 0) {
        creatingMarkup(response.hits);
        lightbox = new simpleLightbox('.gallery-link', {
          captionsData: 'alt',
          captionDelay: 250,
        });

        lightbox.refresh();

        const { height: cardHeight } = document
          .querySelector('.photo-cards-block')
          .firstElementChild.getBoundingClientRect();

        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });

        Notiflix.Notify.success(`Hooray! We found ${remainingImages} images.`);
      }

      if (remainingImages <= 40) {
        selectors.loadMoreBtn.style.display = 'none';
        Notiflix.Notify.success(
          "We're sorry, but you've reached the end of search results.",
          { fontSize: '16px' }
        );
      }
    })
    .catch(error => {
      console.error(error);
    });
}
