$(document).ready(function(){
    $('#submit-search').click(function(event){
        event.preventDefault(); // Prevent default form submission behavior
        var searchValue = $('#search-bar').val();
        console.log(searchValue); 
        console.log("hi");
        window.location.href = "/search?key=" + encodeURIComponent(searchValue);
    });
});