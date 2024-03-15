$(document).ready(function() {
    const username = sessionStorage.getItem('munch-account-username');
    console.log(username);

    if (username === null) {
        $('#write-review').removeAttr('href');
        $('#write-review').on('click', function(event) {
            event.preventDefault();
            $('#error-message').show();
        });
    }
       
});