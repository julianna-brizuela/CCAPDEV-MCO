const submitReview = document.getElementById("submit-button");
const reviewForm = document.forms.reviewForm;
const ratingBtnWrapper = document.getElementById("rating-buttons");
const ratingBtns = document.getElementsByClassName("star-button");

let review_rating = 0

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
    e.preventDefault;

    /*
    review object has the following format:
    - restaurant (objectID)
    - reviewer (objectID)
    - review_rating (int)
    - date of review (string)
    - review_description (string)
    - owner response (string)
    - image (string)
    */

    //retrieve data from the form and turn it into an object
    let review = new FormData(reviewForm);
    review = Object.fromEntries(review);

    let date_of_review = new Date();
    date_of_review = (date_of_review.getMonth() + 1) + "/" + date_of_review.getDate() + "/" + date_of_review.getFullYear();
    review["date_of_review"] = date_of_review

    review["restaurant"] = document.getElementById("content-header").innerText;
    review["review_rating"] = review_rating
    review["owner_response"] = ""
    

    const jstring = JSON.stringify(review); 

    try {
        const review = await fetch('/:restaurant/writeareview', {
            method: 'POST',
            body: jstring,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (review.status == 200) {
            setTimeout(function(){
                location.reload();
            }, 1000); // 3000 milliseconds = 3 seconds
        } else {
            const message = `An error has occured. Status code: ${review.status}`;
            alert(message);
            console.log(message);
        }
    } catch (err) {
        console.error(err);
    }   
});
