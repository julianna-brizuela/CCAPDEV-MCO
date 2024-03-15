const documents = [
    {   
        restaurant: "Botejyu",
        reviewer_name: "Josh Hutcherson",
        reviewer_pfp: 'profile-pic-1.jpg',
        review_rating: 5,
        date_of_review: "05/02/2023",
        review_description: "Good place to go to satisfy your Japanese food cravings.<br><br>It's inside Solenad, Nuvali so parking is not a problem. They still accept customer after 8:30pm unlike the other Japanese resto beside them which by the way was our first choice.<br><br>Food is great and reasonably priced. Will go back and try other items in the menu.",
        owner_response: "I love you Josh Hutcherson"
    }, 
    {
        restaurant: "Botejyu",
        reviewer_name: "Sensei Wu Baby",
        reviewer_pfp: 'profile-pic-2.jpg',
        review_rating: 4,
        date_of_review: "07/20/2023",
        review_description: "Rice bowl meals for ₱350 that came at a considerable portion, while not exactly cheap, is reasonable.<br><br>Parking: Can be quite a wait to find parking at peak hours on the weekends.",
        owner_response: ""
    },
    {
        restaurant: "Botejyu",
        reviewer_name: "Mewing Cat",
        reviewer_pfp: 'profile-pic-3.jpg',
        review_rating: 4,
        date_of_review: "08/01/2023",
        review_description: "Good value for money. Authentic and prepared fresh. Just wish they had more sushi options. If dining for the first time, try anything with the char siu pork!",
        owner_response: "sige sabi mo e"
    },
    {
        restaurant: "The Wholesome Table",
        reviewer_name: "Josh Hutcherson",
        reviewer_pfp: 'profile-pic-1.jpg',
        review_rating: 4,
        date_of_review: "08/19/2023",
        review_description: "Fantastic spot for a healthy brunch! The toasties were wonderfully crunchy and full of flavor, although a tad heavy on the rock salt. The salad, dressed with a delightful strawberry vinaigrette, showcased a blend of fresh, delectable greens. While the pumpkin soup leaned towards the healthier side (slightly on the bland side, if I may add) the attentive service was consistent as usual. Looking forward to returning for more of their nutritious brunch options.",
        owner_response: ""
    }, 
    {
        restaurant: "The Wholesome Table",
        reviewer_name: "Sensei Wu Baby",
        reviewer_pfp: 'profile-pic-2.jpg',
        review_rating: 4,
        date_of_review: "07/12/2023",
        review_description: "I recently dined at The Wholesome Table and I'm happy to give it a solid 4 stars. The food was generally good across the board. The chicken inasal was a standout, being tender and flavorful.<br><br>However, there was a slight disappointment with the pork chops. The portion size seemed a bit reduced compared to what I expected. The pizza, pasta, and salmon bowl were decent but didn't particularly stand out in the same way as the chicken inasal.<br><br>Service at The Wholesome Table was commendable. The staff was attentive and friendly, but be prepared for a bit of a wait for your food. It's worth it, though, for the quality of the meal.<br><br>The ambiance of the restaurant is truly impressive. The interior, with its combination of wood, live trees, and plants, creates a welcoming and refreshing atmosphere. It's a great environment that complements the wholesome theme of the restaurant.<br><br>In summary, The Wholesome Table offers a good dining experience with some standout dishes and a beautiful setting. It's a place I'd recommend for anyone looking for a meal that feels both healthy and satisfying.",
        owner_response: ""
    },
    {
        restaurant: "The Wholesome Table",
        reviewer_name: "Mewing Cat",
        reviewer_pfp: 'profile-pic-3.jpg',
        review_rating: 4,
        date_of_review: "01/25/2023",
        review_description: "This place is a fantastic spot for dining, with exceptionally accommodating staff. My friends and I visited over the weekend, and we were pleased to find that the place is roomy and not overcrowded. The atmosphere exudes a calming vibe, making it an ideal spot for a coffee break. The menu leans towards healthier options with a focus on vegetables. I particularly enjoyed the Hummus and the Superfood Salad. I'm eagerly looking forward to our next visit.",
        owner_response: ""
    },
    {
        restaurant: "Manam",
        reviewer_name: "Josh Hutcherson",
        reviewer_pfp: 'profile-pic-1.jpg',
        review_rating: 3,
        date_of_review: "03/10/2023",
        review_description: "This was a smaller branch than the one at The Podium.<br><br>I always had a great experience with the food with Manam. Although, what was that floating dark thing in the service water. I am wondering how sanitary this place was.<br><br>Service was terrible. The person assigned to us didn't even want to have eye-to-eye contact. We ordered hot water with lemon together with our meal but it didn't come until after asking the person who took our bill.<br><br>The restaurant was bright and airy but it was cramped and very noisy.",
        owner_response: ""
    }, 
    {
        restaurant: "Manam",
        reviewer_name: "Sensei Wu Baby",
        reviewer_pfp: 'profile-pic-2.jpg',
        review_rating: 4,
        date_of_review: "03/16/2023",
        review_description: "Good food and quick service!<br><br>I think everything in the menu tastes good. I can't recommend a particular dish cause everything is worth a try. ❤️❤️❤️ <br><br>Kudos to the waitress, Ma'am Joei, for delivering a great service experience and taking our orders in a professional manner despite looking exhausted from her shift. Management should commend her.<br><br>The flip side, the comfort room needs to be improved. I wouldnt touch anything inside.",
        owner_response: ""
    },
    {
        restaurant: "Manam",
        reviewer_name: "Mewing Cat",
        reviewer_pfp: 'profile-pic-3.jpg',
        review_rating: 5,
        date_of_review: "04/13/2023",
        review_description: "Manam everywhere is really nice! but i ate twice in manam molito, aside from the dishes, its very delicious, their staff are all approachable they always ask if you're good or if you need anything. 🤍 super nice! highly recommended! must try ang mga shakes! especially “choc-nut shake” super solid desserts! my top 1 talaga is their crispy palabok next is kare kare.",
        owner_response: ""
    },
    {
        restaurant: "King Bee",
        reviewer_name: "Josh Hutcherson",
        reviewer_pfp: 'profile-pic-1.jpg',
        review_rating: 5,
        date_of_review: "04/14/2023",
        review_description: "Great Chinese food. All orders we had was very good in my opinion.<br><br>Favorites are the kunchay dumplings, beef noodle soup, and sharksfin dumpling (fried).",
        owner_response: ""
    }, 
    {
        restaurant: "King Bee",
        reviewer_name: "Sensei Wu Baby",
        reviewer_pfp: 'profile-pic-2.jpg',
        review_rating: 5,
        date_of_review: "06/27/2023",
        review_description: "One of the best Chinese resto in the area, and they also offer a vegetarian menu.<br><br>Ordered Hofan, Mapo Tofu, Salt & Pepper Tofu and Birds eye dimsum. They also have complimentary hot tea that goes well with the dimsum.<br><br>Best to visit as a group because of their family size servings. I come back and eat here with my family every now and then.",
        owner_response: ""
    },
    {
        restaurant: "King Bee",
        reviewer_name: "Mewing Cat",
        reviewer_pfp: 'profile-pic-3.jpg',
        review_rating: 4,
        date_of_review: "09/09/2023",
        review_description: "This place is a fantastic spot for dining, with exceptionally accommodating staff. My friends and I visited over the weekend, and we were pleased to find that the place is roomy and not overcrowded. The atmosphere exudes a calming vibe, making it an ideal spot for a coffee break. The menu leans towards healthier options with a focus on vegetables. I particularly enjoyed the Hummus and the Superfood Salad. I'm eagerly looking forward to our next visit.",
        owner_response: ""
    },
    {
        restaurant: "UCC Clockwork",
        reviewer_name: "Josh Hutcherson",
        reviewer_pfp: 'profile-pic-1.jpg',
        review_rating: 4,
        date_of_review: "10/28/2023",
        review_description: "Food - I really like the Judy on the Rocks drink but too bad it was not available in two other UCC branches I have tried. The food menu is premium prices but offers healthy options.<br><br>Service - Staff takes orders correctly but like other short-staffed cafe, they might take longer to attend to your immediate need.<br><br>Ambiance - This branch has both indoor and al fresco seats. Has no in-store toilet. There are too much merchandise ok display.",
        owner_response: ""
    }, 
    {
        restaurant: "UCC Clockwork",
        reviewer_name: "Sensei Wu Baby",
        reviewer_pfp: 'profile-pic-2.jpg',
        review_rating: 5,
        date_of_review: "11/05/2023",
        review_description: "We arrived at 7:45am for our coffee break. They informed us that they will open at 8am. We are willing to wait because they have a good outdoor seating with fans.<br><br>We tried the Kori Kohi and asked the sugar syrup to be removed. It's frozen coffee served with milk, (maybe similar to iced latte but better experience) their coffee is good not too strong.<br><br>We also tried the “germany” it's Coldbrew topped with vanilla ice cream 😋😋 it's so good! I enjoyed it a lot.<br><br>Their staff can explain the menu well so of you have questions just ask them.",
        owner_response: ""
    },
    {
        restaurant: "UCC Clockwork",
        reviewer_name: "Mewing Cat",
        reviewer_pfp: 'profile-pic-3.jpg',
        review_rating: 5,
        date_of_review: "11/22/2023",
        review_description: "UCC Clockwork in Nuvali Santa Rosa has now reopened after the pandemic. They have quite an extensive selection for coffee as well as a menu that includes main dishes. Their cakes are also a must try. They have more seats located outside if you coming in a large group.",
        owner_response: ""
    },
];

const Collection = require('../collection.js');
const collection = new Collection('reviews');

for (const document of documents) {
    collection.insertOne(document);
}

module.exports = collection;
