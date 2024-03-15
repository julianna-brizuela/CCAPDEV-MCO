const reviewForm = document.forms.reviewForm;

async function reply(reviewNum){
    var descriptionID = "review-description-" + reviewNum; 
    var reviewerID = "reviewer-name-" + reviewNum;
    var responseID = "owner-response-" + reviewNum;
    var dateID = "date-of-review-" + reviewNum;
    var ratingID = "rating-" + reviewNum;

    var restaurant = document.getElementById("restaurant-name").innerHTML;
    var reviewer = document.getElementById(reviewerID).innerHTML;
    var rating = document.getElementById(ratingID).innerHTML;
    var responseDate = document.getElementById(dateID).innerHTML;
    var description = document.getElementById(descriptionID).innerHTML;
    var ownerResponse = document.getElementById(responseID).value;

 
    let data = new FormData(reviewForm);
    data = Object.fromEntries(data);

    data['restaurant'] = restaurant;
    data['reviewer_name'] = reviewer;
    data['review_rating'] = rating;
    data['date_of_review'] = responseDate;
    data['review_description'] = description;
    data['owner_response'] = ownerResponse;

    // console.log(restaurant);
    // console.log(reviewer);
    // console.log(rating);
    // console.log(responseDate);
    // console.log(description);
    // console.log(ownerResponse);
    const objectOrder = {
        'restaurant': null,
        'reviewer_name': null,
        'review_rating': null,
        'date_of_review': null,
        'review_description': null,
        'owner_response': null
    }

    data = Object.assign(objectOrder, data);
    const jstring = JSON.stringify(data); 

    console.log(data);
    console.log("jstring:");
    console.log(jstring);
    try {
        const review = await fetch("/admin/:username", {
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
}

// document.addEventListener("DOMContentLoaded", function() {
//     // Function to handle the button click
//     function handleClick(event) {
//         event.preventDefault(); // Prevents the default behavior (page reload) of the button click
//         console.log("Button clicked!");
        
//     }

//     // Attach the handleClick function to the button click event
//     const submitButton = document.getElementById("button-0");
//     submitButton.addEventListener("click", handleClick);
// });


