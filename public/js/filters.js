const priceWrapper = document.querySelector('#price-filters');
const tagWrapper = document.querySelector('#tag-list');
const starWrapper = document.querySelector('#star-filter');
const priceFilterButtons = document.getElementsByClassName('price-filter-button');
const tagFilterButtons = document.getElementsByClassName('tag-filter-button');
const starFilterButtons = document.getElementsByClassName('star-filter-button');

function filterBySearch() {
    //solution from: https://stackoverflow.com/questions/43821938/search-div-for-text
    var input = document.getElementById('search-bar');
    var filter = input.value.toLowerCase();
    var restaurants = document.getElementsByClassName('restaurant');

    for (i = 0; i < restaurants.length; i++) {
        if (restaurants[i].innerText.toLowerCase().includes(filter)) {
            restaurants[i].style.display = 'flex';
        } else {
            restaurants[i].style.display = 'none';
        }
    }
}

function filterByButton(arr) {
    var restaurants = document.getElementsByClassName('restaurant');



}



