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
    $('#submit-response').css('display', 'none');

    $('#logo').ready(function() {
        const username = sessionStorage.getItem('munch-account-username');
        console.log(`munch-account-username: ${username}`);
    });

    $('#login-form').submit(async function(event) {
        event.preventDefault();
        const responseMessage = $('#submit-response');

        try {
            const formData = new FormData(event.target);
            const strData = JSON.stringify(Object.fromEntries(formData));
            console.log(strData)
            let response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: strData,
            });
            
            if (!response.ok)
                throw new Error('Network response was not ok');

            const responseData = await response.json();
            if (responseData.login_status !== 'successful')
                return;

            const username = responseData['username'];
            sessionStorage.setItem('munch-account-username', username);

            const userType = JSON.parse(strData)['user-type'];
            if (userType === 'user')
                window.location.href = window.location.href;

            else if (userType === 'admin')
                window.location.href = `/${username}/restaurant`;

        } catch(error) {
            responseMessage.text('Login failed. Please try again.');
            console.error(error)
            $('#submit-response').css('display', 'block');
        }
    });

});

function enableProfilePicture() {
    document.getElementById("profile-picture").style.display = "block";
}
