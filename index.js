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

function redirectToUserOrAdmin() {
    if (document.getElementById("login-admin").checked) {
        window.location.href = "test.html"; // pa change na langg
    } else if (document.getElementById("login-user").checked) {
        window.location.href = "test.html"; // same here
    }
}