'use strict';

let gallery = [];


function Image(data) {
  this.image_url = data.image_url;
  this.title = data.title;
  this.description = data.description;
  this.keyword = data.keyword;
  this.horns = data.horns;
  gallery.push(this);
}


function clickHandler(event){
  event.preventDefault();
  $('.horns').hide();
  let rex = `.${event.target.value}`;
  $(rex).show();

}

$('select').on('change', clickHandler);


Image.prototype.addValuesToPhotoTemplate = function(){
  let template = $('#photo-template').html();
  let $newSection = $('<article></article>');
  $newSection.html(template);
  $newSection.attr('class', 'horns');
  $newSection.find('img').attr('src', this.image_url);
  $newSection.find('h2').text(this.title);
  $newSection.find('p').text(this.description);
  $newSection.attr('keyword', this.keyword);
  $newSection.attr('horns', this.horns);
  $('main').append($newSection);

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


let pageNumber = 'page-1';


function pageChanger(event){
  event.preventDefault();
  pageNumber = event.target.value;
  let oldMonster = $('article').not('#photo-template');
  let oldKeyword = $('option');
  $(oldMonster).remove();
  $(oldKeyword).remove();
  querypage();
}

$('.next').on('click', pageChanger);


function querypage() {
  $.ajax(`./data/${pageNumber}.json`, {method: 'GET', dataType: 'JSON'})
    .then( (data) => {
      data.forEach((value) => {
        new Image(value).addValuesToPhotoTemplate();
      });
      // gallery.forEach( value => {
      // });
      addValuesToDropdown();
    });
};

querypage();


function sortNames(event){
  event.preventDefault();
  gallery.sort((a ,b) => {
    if (b.title < a.title) {
      return -1;
    }
  });
}

$('.sortNames').on('click', sortNames);

// function sortHorns(event){
//   event.preventDefault();
//   pageNumber = event.target.value;
//   let oldMonster = $('article').not('#photo-template');
//   let oldKeyword = $('option');
//   $(oldMonster).remove();
//   $(oldKeyword).remove();
//   querypage();
// }

// $('.sortHorns').on('click', sortHorns);