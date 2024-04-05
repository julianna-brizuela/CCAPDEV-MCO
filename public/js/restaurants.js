const writeAReview = document.getElementById("write-review");
const errorMessage = document.getElementById("error-message");
let data;

//solution from here: https://stackoverflow.com/questions/61563079/is-it-possible-to-access-a-handlebar-variable-through-an-external-js-file?noredirect=1&lq=1
window.addEventListener('load', () => {
    data = {
        isLoggedIn: window.isLoggedIn,
        routeparameter: window.routeparameter
    };
})

writeAReview?.addEventListener("click", async(e) => {
    e.preventDefault();
    console.log(data)

    if (data.isLoggedIn) {
        console.log(data.routeparameter)
        window.location.href = '/' + data.routeparameter + '/writeareview';
    } else {
        errorMessage.style.display = "block"
        console.log("not logged in")
    }
}); 