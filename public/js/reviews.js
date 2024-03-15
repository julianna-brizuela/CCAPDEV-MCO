const submitReview = document.getElementById("submit-button");
const reviewForm = document.forms.reviewForm;
const ratingBtnWrapper = document.getElementById("rating-buttons");
const ratingBtns = document.getElementsByClassName("star-button");

let review_rating = 0

function getLoginStatus() {
    return 0
}

ratingBtnWrapper.addEventListener("click", (event) => {
    event.preventDefault;
    const isButton = event.target.tagName === 'BUTTON';

    //if a button within the wrapper has been clicked
    if (isButton) {
        const computedStyle = window.getComputedStyle(event.target);
        const backgroundPosition = computedStyle.getPropertyValue('background-position');
        
        for (i = 0; i < ratingBtns.length; i++) {
            console.log(ratingBtns[i].style.backgroundPosition);

            //if the star has not been pressed, highlight 0-i
            if (ratingBtns[i]==event.target && backgroundPosition === "10.5% 50%") {
                ratingBtns[i].style.backgroundPosition = "0px 50%";
                

                for (let j = 0; j < i; j++) {
                    ratingBtns[j].style.backgroundPosition = "0px 50%";
                }

                review_rating = i+1;

                break;
                
            } else if (ratingBtns[i]==event.target && backgroundPosition === "0px 50%") {
                for (let x = i; x < ratingBtns.length; x++) {
                    ratingBtns[x].style.backgroundPosition = "10.5% 50%";
                }
                review_rating = i;
                break;
            }
            
        }

    }
})

submitReview?.addEventListener("click", async(e) => {
    const username = sessionStorage.getItem('munch-account-username');
    username
    e.preventDefault;

    let data = new FormData(reviewForm);
    data = Object.fromEntries(data);
    
    let review_date = new Date();
    review_date = (review_date.getMonth() + 1) + "/" + review_date.getDate() + "/" + review_date.getFullYear();
    data["date_of_review"] = review_date;
    data["restaurant"] = document.getElementById("content-header").innerText;
    data["review_rating"] = review_rating  //change soon

    if (getLoginStatus()) {
        //how to retrieve user?
    } else {
        data["reviewer_name"] = username;
    }

    data["owner_response"] = ""

    const objectOrder = {
        'restaurant': null,
        'reviewer_name': null,
        'review_rating': null,
        'date_of_review': null,
        'review_description': null,
    }

    data = Object.assign(objectOrder, data);
    const jstring = JSON.stringify(data); 

    try {
        const review = await fetch('/:restaurant/writeareview', {
            method: 'POST',
            body: jstring,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    
        if (review.status == 200) {
            location.reload(); // refresh the page
        } else {
            const message = `An error has occured. Status code: ${review.status}`;
            alert(message);
            console.log(message);
        }
    } catch (err) {
        console.error(err);
        }
    
    
    
});