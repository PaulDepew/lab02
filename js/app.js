'use strict';

let gallery = [];

function Image(image_url, title, description, keyword, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  gallery.push(this);
}

// Image.prototype.render = () => {
//   $('#photo-template').append(`
//     <h2>${this.title}</h2>
//     <img src="${this.image_url}" alt="${this.keyword}"></img>
//     <p>${this.description}</p>
//     `);
// };

function clickHandler(event){
  event.preventDefault();
  $('.horns').hide();
  let rex = `.${event.target.value}`;
  $(rex).show();

}

$('select').on('change', clickHandler);


const addValuesToPhotoTemplate = (item) => {
  $('#photo-template').append(`
    <article class="horns ${item.keyword}">
    <h2>${item.title}</h2>
    <img src="${item.image_url}" alt="${item.keyword}"></img>
    <p>${item.description}</p>
    </article>
    `);
};

const addValuesToDropdown = () => {
  let filteredArray = [];
  gallery.forEach((words) => {
    if (!filteredArray.includes(words.keyword))
      filteredArray.push(words.keyword);
  });
  filteredArray.forEach((displayedWords) => {
    let correctWords = `<option value="${displayedWords}">${displayedWords}</option>`;

    $('select').append(correctWords);

  });

};

// event handler => let number - on click change number to whatever number clicked (page-1 on default)
// $.ajax(`data/${number}.json`).then( data => {

$.ajax("data/page-1.json").then( data => {
  data.forEach((value) => {
    new Image(value.image_url, value.title, value.description, value.keyword, value.horns);
  });
  gallery.forEach( value => {
    addValuesToPhotoTemplate(value);
  });
  addValuesToDropdown();
});
