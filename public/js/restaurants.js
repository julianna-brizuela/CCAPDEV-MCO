$(document).ready(function() {
    const username = sessionStorage.getItem('munch-account-username');
    console.log(username);

    if (!username) 
        $('#write-review').css('display', 'hidden');

});

console.log('SDKJAHFKLJ')