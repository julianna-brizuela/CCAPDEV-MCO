$(document).ready(function() {
    const username = sessionStorage.getItem('munch-account-username');
    console.log(username);

    if (username === null) 
        $('#write-review').removeAttr('href');

});