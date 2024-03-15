

function filterBySearch() {
    //solution from: https://stackoverflow.com/questions/43821938/search-div-for-text
    var input = document.getElementById("search-bar");
    var filter = input.value.toLowerCase();
    var restaurants = document.getElementsByClassName("restaurant");

    for (i = 0; i < restaurants.length; i++) {
        if (restaurants[i].innerText.toLowerCase().includes(filter)) {
            restaurants[i].style.display = "flex";
        } else {
            restaurants[i].style.display = "none";
        }
    }
}

function filterByButton() {
    var restaurants = document.getElementsByClassName("restaurant");

    

}

