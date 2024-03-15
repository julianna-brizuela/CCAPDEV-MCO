const reviewBtn = document.getElementById("submit-button");
const reviewForm = document.forms.reviewForm;

function getLoginStatus() {
    return 0
}

function getReviewRating() {

}

reviewBtn?.addEventListener("click", async(e) => {
    e.preventDefault;
    console.log("click");

    let data = new FormData(reviewForm);
    data = Object.fromEntries(data);
    
    let review_date = new Date();
    review_date = (review_date.getMonth() + 1) + "/" + review_date.getDate() + "/" + review_date.getFullYear();
    data["date_of_review"] = review_date;
    data["restaurant"] = document.getElementById("content-header").innerText;
    data["review_rating"] = 5  //change soon

    if (getLoginStatus()) {
        //how to retrieve user?
    } else {
        data["reviewer_name"] = "Anonymous"
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