'use strict';

import movies from './movies.js';



const movieContainer = document.querySelector('.movie-container');
const searchInput = document.querySelector('#user-input');
const suggsuggestionBox = document.querySelector('.suggestion-box');
const searchButton = document.querySelector('#search-btn');

function showTitle(index){
  let movie = movies[index];
  let genres = movie.genre.join('</span> <span>');
  movieContainer .innerHTML = `
    <div class="picture-box">
      <img src="${movie.poster}" alt="${movie.title}">
    </div>
    <div class="movie-description">
      <h3>${movie.title}</h3>
      <p>${movie.description}</p>
      <p><span>${genres}</span></p>
    </div>`;
}

function searchTitles(keyword) {
  let matchingTitles = 
  movies.filter(movie => movie.title.toLowerCase().includes(keyword.toLowerCase()));
  matchingTitles = matchingTitles.map(movie => movie.title);
  return matchingTitles.length > 5 ? matchingTitles.splice(0, 5) : matchingTitles;
}

searchInput.addEventListener('input', showSuggestions);//triggers on input change

function showSuggestions() {
  if (searchInput.value.length < 3) { //input length must be at least 3
    suggsuggestionBox.innerHTML = ''; //clear list
    return;
  }
  const matchList = searchTitles(searchInput.value);
  let htmlList = '';
  matchList.forEach(match => {
    htmlList += `<li>${match}</li>`
  })
  htmlList = `<ul>${htmlList}</ul>`;
  suggsuggestionBox.innerHTML = htmlList;
  const listItems = document.querySelectorAll('li');
  listItems.forEach(listItem => {
    listItem.addEventListener('click', () => {
      searchInput.value = listItem.innerText;
      suggsuggestionBox.innerHTML = '';
    })
  })
}

searchButton.addEventListener('click', () => {
  let movie = movies.find(movie => movie.title.toLowerCase().trim() === searchInput.value.toLowerCase().trim());
  showTitle(movies.indexOf(movie));
  suggsuggestionBox.innerHTML = '';
})