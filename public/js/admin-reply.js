import database from '../../../db/database.js'

let documents;

function reply(reviewNum){
    var descriptionID = "review-description-" + reviewNum; 
    var responseID = "owner-response-" + reviewNum;

    var description = document.getElementById(descriptionID).innerHTML;
    var responseId = document.getElementById(responseID).value;

    
    console.log('\n\n---------- UPDATE MANY ----------');


    database.collections['users'].updateOne({ name: 'JOSH HUTCHERSON' }, { name: 'Josh Hutcherson' });
    documents = database.collections['users'].find({ name: 'Josh Hutcherson' });
    console.log(documents);

    console.log(description);
    console.log(responseId);
    
}

