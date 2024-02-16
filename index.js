function openLoginForm() {
    document.getElementById("login-form").style.display = "block";
}

function closeLoginForm() {
    document.getElementById("login-form").style.display = "none";
}

function openSignupForm() {
    document.getElementById("signup-form").style.display = "block";
}

function closeSignupForm() {
    document.getElementById("signup-form").style.display = "none";
}

// function redirectToUserOrAdmin() {
//     if (document.getElementById("login-admin").checked) {
//         window.location.href = "admin.html";
//     } else if (document.getElementById("login-user").checked) {
//         window.location.href = "test.html"; // same here
//     }
// }

function redirectToUserOrAdmin(event) {
    event.preventDefault();
    if (document.getElementById("login-admin").checked) {
        window.location.href = "admin.html";
    } else if (document.getElementById("login-user").checked) {
        document.querySelector(".action-buttons").style.display = "none";
        document.querySelector(".profile-picture").style.display = "block";
    }
}

function logout(){
    window.location.href = "index.html"
}

function removeRestaurant(){
    window.location.href = "removeRestaurant.html" // placeholder
}

function editRestaurantInfo(){
    window.location.href="editRestaurant.html"
}

function addRestaurant(){
    window.location.href="addRestaurant.html";
}