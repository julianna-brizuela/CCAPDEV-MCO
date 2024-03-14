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

// DOM Event Handlers
$('#logo').ready(function() {
    const userId = sessionStorage.getItem('userId');
    console.log(userId);
});

$('#submit-response').ready(function() {
    $('#submit-response').css('display', 'none');
});

$("#login-form").submit(async event => {
    event.preventDefault();
    const responseMessage = $('#submit-response');
    const formData = new FormData(event.target);

    try {
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

        sessionStorage.setItem('userId', responseData['userID']);
        window.location.href = '/';

    } catch(error) {
        responseMessage.text('Login failed. Please try again.');
        $('#submit-response').css('display', 'block');
    }
});