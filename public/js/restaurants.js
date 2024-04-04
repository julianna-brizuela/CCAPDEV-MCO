const writeAReview = document.getElementById("write-review");
const errorMessage = document.getElementById("error-message");

writeAReview?.addEventListener("click", async(e) => {
    //session id stored in the cookies
    e.preventDefault();
    console.log("hello")
    try { 
        await fetch('/:restaurant/writeareview')
        .then(response => {
            if (!response.ok) {
                console.log("ruh rowh")
            }
            return response.json();
        })
        .then(data => {
            console.log(data.loggedIn)
            if (!data.loggedIn) {
                $('#error-message').show();
                console.log("not logged in")
            } if (data.loggedIn) {
                console.log(data.restaurant_route)
                window.location.href = '/' + data.restaurant_route + '/writeareview';
            }
            
        })
        
    } catch (err) {
        console.log(err)
    }
}); 