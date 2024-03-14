// Event listener callbacks
function openLoginForm() {
    $('#login-form-modal').css('display', 'block');
}

function closeLoginForm() {
    $('#login-form-modal').css('display', 'none');
}

function openSignupForm() {
    $('#signup-form-modal').css('display', 'block');
}

function closeSignupForm() {
    $('#signup-form-modal').css('display', 'block');
}

// Request listener callbacks
$("#login-form").submit(async event => {
    event.preventDefault();

    // const formData = 
});