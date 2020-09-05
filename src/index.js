import './styles.css';
import renderMarkup from './js/renderMarkup';
import fetchCountries from './js/fetchCountries';
import { alert, error, Stack } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

const searchInput = document.querySelector('.search-input');
const countriesList = document.querySelector('.countries-list');
const countryWrp = document.querySelector('.country-wrp');
const debounce = require('lodash.debounce');

searchInput.addEventListener('input', debounce(searchInputHandler, 500));

function searchInputHandler(e) {
  const target = e.target;
  const query = target.value;
  countriesList.innerHTML = ' ';
  countryWrp.innerHTML = ' ';
  if (query.length > 1) {
    fetchCountries(query)
      .then(data => {
        if (data.length > 0 && data.length <= 10) {
          renderMarkup(data);
        } else if (data.length > 10) {
        }
      })
      .catch(err => console.log(err));
  }
}

const myStack = new Stack({
  dir1: 'down',
  dir2: 'left',
  firstpos1: 90,
  firstpos2: 90,
});

error({
  text: 'Too many matches found. Please enter a more specific query!',
  stack: myStack,
});

alert({
  text: "Notice that's positioned in its own stack.",
  stack: new Stack({
    dir1: 'down',
    dir2: 'right', // Position from the top left corner.
    firstpos1: 90,
    firstpos2: 90, // 90px from the top, 90px from the left.
  }),
});
