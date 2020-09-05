import './styles.css';
import '@pnotify/core/dist/BrightTheme.css';
import renderMarkup from './js/renderMarkup';
import fetchCountries from './js/fetchCountries';

import { debounce } from 'lodash';

import { error, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';
defaultModules.set(PNotifyMobile, {});

const searchInput = document.querySelector('.search-input');
const countriesList = document.querySelector('.countries-list');
const countryWrp = document.querySelector('.country-wrp');

searchInput.addEventListener('input', debounce(searchInputHandler, 500));

function searchInputHandler(e) {
  const query = e.target.value;
  countriesList.innerHTML = ' ';
  countryWrp.innerHTML = ' ';
  if (query.length > 1) {
    fetchCountries(query)
      .then(data => {
        if (data.length > 0 && data.length <= 10) {
          renderMarkup(data);
        } else if (data.length > 10) {
          error('Too many matches found. Please enter a more specific query!');
        }
      })
      .catch(err => console.log(err));
  }
}
