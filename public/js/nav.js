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
    $('#signup-form-modal').css('display', 'none');
}

// DOM Event Handlers
$(document).ready(function() {

    $('#logo').ready(function() {
        const userId = sessionStorage.getItem('munch_auth_userID');
        console.log(`munch_auth_userID: ${userId}`);
    });
    
    $('#submit-response').ready(function() {
        $('#submit-response').css('display', 'none');
    });
    
    $('#login-form').submit(async function(event) {
        event.preventDefault();
        const responseMessage = $('#submit-response');

        try {
            const formData = new FormData(event.target);
            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(Object.fromEntries(formData)),
            });
    
            if (!response.ok)
                throw new Error('Network response was not ok');
            
            const responseData = await response.json();
            if (responseData.login_status !== 'successful')
                return;
    
            sessionStorage.setItem('munch_auth_userID', responseData['userID']);

            if (formData['user-type'] === 'user')
                window.location.href = window.location.href;
            
            else if (formData['user-type'] === 'admin') {
                // await fetch(`${}/restaurant`);
            }

    
        } catch(error) {
            responseMessage.text('Login failed. Please try again.');
            $('#submit-response').css('display', 'block');
        }
    });
    
});
