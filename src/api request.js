import axios from 'axios';
import Notiflix from 'notiflix';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '39700113-57f0657e380db4916121e89b7';

const selectors = {
  formEl: document.querySelector('.search-form'),
  inputEl: document.querySelector('input'),
  loadMoreBtn: document.querySelector('.load-more'),
  photoCard: document.querySelector('.photo-cards-block'),
};

async function apiRequest(requestValue, page) {
  try {
    const response = await axios.get(
      `?key=${API_KEY}&q=${requestValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
    );

    return response.data;
  } catch (error) {
    console.error(error);
    Notiflix.Notify.failure(`${error.message}`, { fontSize: '16px' });
  }
}

export { selectors, apiRequest };
