import fetchCountries from './js/fetchCountries';
import countryTemplate from './templates/country.hbs';
import debounce from 'lodash.debounce';
import error from './js/notify';
import '@pnotify/core/dist/Material.css';

// refs
// const formInputRef = document.querySelector('.form-input'); // др.вар. - очистка инпута
const inputRef = document.getElementById('searchQuery');
const cardContainerRef = document.querySelector('.js-container');

inputRef.addEventListener('input', debounce(onInput, 500));

function makeMarkup(array) {
  if (array.length > 10) {
    cardContainerRef.innerHTML = '';
    error({
      text: 'слишком много совпадений, продолжи ввод',
      type: 'error',
      autoOpen: 'false',
      width: '400px',
      delay: 3000,
      animation: 'fade',
    });
    return;
  } else if (array.length >= 2 && array.length <= 10) {
    let items = array
      .map(country => {
        return `<li>${country.name}</li>`;
      })
      .join('');

    cardContainerRef.innerHTML = `<ul>${items}</ul>`;
  } else if (array.length === 1) {
    const markup = countryTemplate(array[0]);
    cardContainerRef.innerHTML = markup;
  }
}

function onInput(e) {
  e.preventDefault();
  const searchQuery = inputRef.value;
  if (searchQuery === '') {
    return;
  }

  fetchCountries(searchQuery)
    .then(makeMarkup)
    .catch(error => {
      cardContainerRef.innerHTML = '';
      inputRef.value = '';
    });
}
