const reviewForm = document.forms.reviewForm;

async function reply(reviewID){

    var responseID = "owner-response-" + reviewID;
    var ownerResponse = document.getElementById(responseID).value;

    let data = {};
    data['reviewID'] = reviewID;
    data['owner_response'] = ownerResponse;
    const jstring = JSON.stringify(data); 

   try {
        console.log(1)
        const review = await fetch("/:username/restaurant", {
            method: 'POST',
            body: jstring,
            headers: {
                'Content-Type': 'application/json'
            }
        });    
        console.log(2)
        if (review.status == 200) {
            location.reload(); 
        } else {
            const message = `An error has occured. Status code: ${review.status}`;
            alert(message);
            console.log(message);
        }
        
    } catch (err) {
        console.error(err);
    }

}