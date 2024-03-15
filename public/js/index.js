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

function redirectToUserOrAdmin(event) {
    event.preventDefault();
    document.querySelector(".action-buttons").style.display = "none";
    document.querySelector("#picture").style.display = "block";

    if (document.getElementById("login-admin").checked) {
        document.getElementById("picture").action="admin.html"
    } else if (document.getElementById("login-user").checked) {
        document.getElementById("picture").action="user.html"
    }
}

function redirectToAdmin(){
    window.location.href="admin.html";
}

function logout(){
    window.location.href = "index.html";
}

function removeRestaurant(){
    window.location.href = "removeRestaurant.html"; // placeholder
}

function editRestaurantInfo(editRestaurantUrl){
    window.location.href = editRestaurantUrl;
}

function addRestaurant(){
    window.location.href="addRestaurant.html";
}

function enableProfilePicture() {
    document.getElementById("profile-picture").style.display = "block";
}