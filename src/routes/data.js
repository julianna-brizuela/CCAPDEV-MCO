let reviews = [
    {
        restaurant: "Botejyu",
        reviewer_name: "Josh Hutcherson",
        review_rating: 5,
        date_of_review: "05/02/2023",
        review_description: "Good place to go to satisfy your Japanese food cravings.<br><br>It's inside Solenad, Nuvali so parking is not a problem. They still accept customer after 8:30pm unlike the other Japanese resto beside them which by the way was our first choice.<br><br>Food is great and reasonably priced. Will go back and try other items in the menu."
    }, 
    {
        restaurant: "Botejyu",
        reviewer_name: "Sensei Wu Baby",
        review_rating: 4,
        date_of_review: "07/20/2023",
        review_description: "Rice bowl meals for ₱350 that came at a considerable portion, while not exactly cheap, is reasonable.<br><br>Parking: Can be quite a wait to find parking at peak hours on the weekends."
    },
    {
        restaurant: "Botejyu",
        reviewer_name: "Mewing Cat",
        review_rating: 4,
        date_of_review: "08/01/2023",
        review_description: "Good value for money. Authentic and prepared fresh. Just wish they had more sushi options. If dining for the first time, try anything with the char siu pork!"
    },
    {
        restaurant: "The Wholesome Table",
        reviewer_name: "Josh Hutcherson",
        review_rating: 4,
        date_of_review: "08/19/2023",
        review_description: "Fantastic spot for a healthy brunch! The toasties were wonderfully crunchy and full of flavor, although a tad heavy on the rock salt. The salad, dressed with a delightful strawberry vinaigrette, showcased a blend of fresh, delectable greens. While the pumpkin soup leaned towards the healthier side (slightly on the bland side, if I may add) the attentive service was consistent as usual. Looking forward to returning for more of their nutritious brunch options."
    }, 
    {
        restaurant: "The Wholesome Table",
        reviewer_name: "Sensei Wu Baby",
        review_rating: 4,
        date_of_review: "07/12/2023",
        review_description: "I recently dined at The Wholesome Table and I'm happy to give it a solid 4 stars. The food was generally good across the board. The chicken inasal was a standout, being tender and flavorful.<br><br>However, there was a slight disappointment with the pork chops. The portion size seemed a bit reduced compared to what I expected. The pizza, pasta, and salmon bowl were decent but didn't particularly stand out in the same way as the chicken inasal.<br><br>Service at The Wholesome Table was commendable. The staff was attentive and friendly, but be prepared for a bit of a wait for your food. It's worth it, though, for the quality of the meal.<br><br>The ambiance of the restaurant is truly impressive. The interior, with its combination of wood, live trees, and plants, creates a welcoming and refreshing atmosphere. It's a great environment that complements the wholesome theme of the restaurant.<br><br>In summary, The Wholesome Table offers a good dining experience with some standout dishes and a beautiful setting. It's a place I'd recommend for anyone looking for a meal that feels both healthy and satisfying."
    },
    {
        restaurant: "The Wholesome Table",
        reviewer_name: "Mewing Cat",
        review_rating: 4,
        date_of_review: "01/25/2023",
        review_description: "This place is a fantastic spot for dining, with exceptionally accommodating staff. My friends and I visited over the weekend, and we were pleased to find that the place is roomy and not overcrowded. The atmosphere exudes a calming vibe, making it an ideal spot for a coffee break. The menu leans towards healthier options with a focus on vegetables. I particularly enjoyed the Hummus and the Superfood Salad. I'm eagerly looking forward to our next visit."
    },
    {
        restaurant: "Manam",
        reviewer_name: "Josh Hutcherson",
        review_rating: 3,
        date_of_review: "03/10/2023",
        review_description: "This was a smaller branch than the one at The Podium.<br><br>I always had a great experience with the food with Manam. Although, what was that floating dark thing in the service water. I am wondering how sanitary this place was.<br><br>Service was terrible. The person assigned to us didn't even want to have eye-to-eye contact. We ordered hot water with lemon together with our meal but it didn't come until after asking the person who took our bill.<br><br>The restaurant was bright and airy but it was cramped and very noisy."
    }, 
    {
        restaurant: "Manam",
        reviewer_name: "Sensei Wu Baby",
        review_rating: 4,
        date_of_review: "03/16/2023",
        review_description: "Good food and quick service!<br><br>I think everything in the menu tastes good. I can't recommend a particular dish cause everything is worth a try. ❤️❤️❤️ <br><br>Kudos to the waitress, Ma'am Joei, for delivering a great service experience and taking our orders in a professional manner despite looking exhausted from her shift. Management should commend her.<br><br>The flip side, the comfort room needs to be improved. I wouldnt touch anything inside."
    },
    {
        restaurant: "Manam",
        reviewer_name: "Mewing Cat",
        review_rating: 5,
        date_of_review: "04/13/2023",
        review_description: "Manam everywhere is really nice! but i ate twice in manam molito, aside from the dishes, its very delicious, their staff are all approachable they always ask if you're good or if you need anything. 🤍 super nice! highly recommended! must try ang mga shakes! especially “choc-nut shake” super solid desserts! my top 1 talaga is their crispy palabok next is kare kare."
    },
    {
        restaurant: "King Bee",
        reviewer_name: "Josh Hutcherson",
        review_rating: 5,
        date_of_review: "04/14/2023",
        review_description: "Great Chinese food. All orders we had was very good in my opinion.<br><br>Favorites are the kunchay dumplings, beef noodle soup, and sharksfin dumpling (fried)."
    }, 
    {
        restaurant: "King Bee",
        reviewer_name: "Sensei Wu Baby",
        review_rating: 5,
        date_of_review: "06/27/2023",
        review_description: "One of the best Chinese resto in the area, and they also offer a vegetarian menu.<br><br>Ordered Hofan, Mapo Tofu, Salt & Pepper Tofu and Birds eye dimsum. They also have complimentary hot tea that goes well with the dimsum.<br><br>Best to visit as a group because of their family size servings. I come back and eat here with my family every now and then."
    },
    {
        restaurant: "King Bee",
        reviewer_name: "Mewing Cat",
        review_rating: 4,
        date_of_review: "09/09/2023",
        review_description: "This place is a fantastic spot for dining, with exceptionally accommodating staff. My friends and I visited over the weekend, and we were pleased to find that the place is roomy and not overcrowded. The atmosphere exudes a calming vibe, making it an ideal spot for a coffee break. The menu leans towards healthier options with a focus on vegetables. I particularly enjoyed the Hummus and the Superfood Salad. I'm eagerly looking forward to our next visit."
    },
    {
        restaurant: "UCC Clockwork",
        reviewer_name: "Josh Hutcherson",
        review_rating: 4,
        date_of_review: "10/28/2023",
        review_description: "Food - I really like the Judy on the Rocks drink but too bad it was not available in two other UCC branches I have tried. The food menu is premium prices but offers healthy options.<br><br>Service - Staff takes orders correctly but like other short-staffed cafe, they might take longer to attend to your immediate need.<br><br>Ambiance - This branch has both indoor and al fresco seats. Has no in-store toilet. There are too much merchandise ok display."
    }, 
    {
        restaurant: "UCC Clockwork",
        reviewer_name: "Sensei Wu Baby",
        review_rating: 5,
        date_of_review: "11/05/2023",
        review_description: "We arrived at 7:45am for our coffee break. They informed us that they will open at 8am. We are willing to wait because they have a good outdoor seating with fans.<br><br>We tried the Kori Kohi and asked the sugar syrup to be removed. It's frozen coffee served with milk, (maybe similar to iced latte but better experience) their coffee is good not too strong.<br><br>We also tried the “germany” it's Coldbrew topped with vanilla ice cream 😋😋 it's so good! I enjoyed it a lot.<br><br>Their staff can explain the menu well so of you have questions just ask them."
    },
    {
        restaurant: "UCC Clockwork",
        reviewer_name: "Mewing Cat",
        review_rating: 5,
        date_of_review: "11/22/2023",
        review_description: "UCC Clockwork in Nuvali Santa Rosa has now reopened after the pandemic. They have quite an extensive selection for coffee as well as a menu that includes main dishes. Their cakes are also a must try. They have more seats located outside if you coming in a large group."
    },
];

let restaurants = [
    {
        restaurant_name: "Botejyu", 
        location: "Sta. Rosa, Laguna", 
        address:"Space no. M-38 BLDG-2, Solenad 2, Nuvali, Sto. Domingo of Sta. Rosa", 
        phone_number:"+63 917 154 6384", 
        description: "Botejyu is an authentic Japanese restaurant, specializing in okonomiyaki and okosoba.", 
        tags: ["Japanese", "Ramen", "Okonomiyaki"], 
        price: "₱₱₱", 
        menu: "botejyumenu.pdf", 
        images: ["botejyu1.jpg", "botejyu2.jpg","botejyu3.jpg","botejyu4.jpg","botejyu5.jpg"], 
        resto_reviews: [reviews[0], reviews[1], reviews[2]],
        rating: 4.3,
        review_num:3,
        star: ["star","star","star","star","blank-star"],
        map_link: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15468.978442286172!2d121.0566135!3d14.238948!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd7da0f1d4f6e9%3A0x9eb79c89e5e3895e!2sBotejyu%20Ayala%20Malls%20Solenad!5e0!3m2!1sen!2sph!4v1708076830088!5m2!1sen!2sph"
    },
    {
        restaurant_name: "The Wholesome Table", 
        location: "Salcedo, Makati", 
        address:"Salcedo, Makati | Infinity Tower Ground Floor, LP Leviste Street Salcedo Village Makati, 1227 Metro Manila Philippines", 
        phone_number:"(02) 8848 7777", 
        description: "The Wholesome Table is an organic restaurant that serves comfort food.", 
        tags: ["Fusion Cuisine", "Vegan-Friendly", "Italian"], 
        price: "₱₱", 
        menu: "wholesometablemenu.pdf", 
        images: ["wholesometable1.jpg", "wholesometable2.jpg","wholesometable3.jpg","wholesometable4.jpg","wholesometable5.jpg"], 
        resto_reviews: [reviews[3], reviews[4], reviews[5]],
        rating: 4,
        review_num:3,
        star: ["star","star","star","star","blank-star"],
        map_link: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15446.685486773113!2d121.0252846!3d14.5607759!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c90706584b91%3A0x65c52d44b537dc62!2sThe%20Wholesome%20Table%20Salcedo!5e0!3m2!1sen!2sph!4v1708076619292!5m2!1sen!2sph"
        
    },
    {
        restaurant_name: "Manam", 
        location: "Alabang, Muntinlupa", 
        address:"Molito Complex Madrigal Ave, Ayala Alabang, Muntinlupa, 1780 Metro Manila", 
        phone_number:"(02) 8256 3621", 
        description: "A homegrown brand by The Moment Group, serving Filipino comfort fare in classics and twists.", 
        tags: ["Filipino", "Asian"], 
        price: "₱₱", 
        menu: "manammenu.pdf", 
        images: ["manam1.jpg", "manam2.jpg","manam3.jpg","manam4.jpg","manam5.jpg"], 
        resto_reviews: [reviews[6], reviews[7], reviews[8]],
        rating: 4,
        review_num:3,
        star: ["star","star","star","star","blank-star"],
        map_link: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15456.192933856557!2d121.0265372!3d14.4243831!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d10b28e488cb%3A0xe54f8aa0b470fa5d!2sManam%20Caf%C3%A9!5e0!3m2!1sen!2sph!4v1708077005775!5m2!1sen!2sph"
    },
    {
        restaurant_name: "King Bee", 
        location: "Sta. Rosa, Laguna", 
        address: "Sta. Rosa Estate, Brgy. Don Jose, Santa Rosa, Luzon 4026 Philippines", 
        phone_number:"(04) 9302 5065", 
        description: "King Bee offers authentic Chinese foods and the best dining experience from dimsum to their bestsellers like chicken, pork, beef and fish.", 
        tags: ["Cantonese", "Asian", "Chinese"], 
        price: "₱₱", 
        menu: "kingbeemenu.pdf", 
        images: ["kingbee1.jpg", "kingbee2.jpg","kingbee3.jpg","kingbee4.jpg","kingbee5.jpg"], 
        resto_reviews: [reviews[9], reviews[10], reviews[11]],
        rating: 4.6,
        review_num:3,
        star: ["star","star","star","star","half-star"],
        map_link: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15468.425994037885!2d121.0615841!3d14.2470093!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd7d3f5adce0eb%3A0xe7ebec9b55fdd237!2sKing%20Bee%20%7C%20Santa%20Rosa!5e0!3m2!1sen!2sph!4v1708077728233!5m2!1sen!2sph"
    },
    {
        restaurant_name: "UCC Clockwork", 
        location: "Sta. Rosa, Laguna", 
        address: "Bldg. G, Nuvali, Ayala Malls Solenad, Don Jose, Santa Rosa, 4026 Laguna", 
        phone_number:"+63 926 793 8270", 
        description: "Awaken Your Senses. Indulge Your Cravings. At UCC Café, we're passionate about crafting extraordinary coffee experiences. Step into our welcoming space, where the aroma of freshly brewed coffee envelops you, and every sip takes you on a journey of flavor. From our carefully curated selection of specialty coffees to our mouthwatering menu options, we invite you to savor moments of pure bliss throughout your day. With a commitment to community and a dedication to exceptional service, Brew Haven is your haven for unforgettable coffee moments. Join us and discover a world of coffee that goes beyond expectations.", 
        tags: ["Japanese", "Asian", "Cafe"], 
        price: "₱₱", 
        menu: "uccmenu.pdf", 
        images: ["ucc1.jpg", "ucc2.jpg","ucc3.jpg","ucc4.jpg","ucc5.jpg"], 
        resto_reviews: [reviews[12], reviews[13], reviews[14]],
        rating: 4.6,
        review_num:3,
        star: ["star","star","star","star","half-star"],
        map_link:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3867.262426696296!2d121.05419771136005!3d14.237907786149087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd7defb24ebea9%3A0x51bfc358671a8786!2sUCC%20Clockwork!5e0!3m2!1sen!2sph!4v1708078019706!5m2!1sen!2sph"
    }
];

let tags = ["Japanese", "Ramen", "Okonomiyaki", "Fusion Cuisine", "Vegan-Friendly", "Italian", "Filipino", "Asian", "Cantonese", "Chinese", "Cafe"];

let admins = [
    {
        username: "JaneDoe",
        name: "Jane Doe",
        email: "jane_doe@gmail.com",
        password: "123!",
        restaurant_name: "Botejyu"
    },
    {
        username: "Leon Kennedy",
        name: "Leon Kennedy",
        email: "leon_kennedy@gmail.com",
        password: "asdfghjkl",
        restaurant_name: "UCC Clockwork"
    },
    {
        username: "Gwen Stacy",
        name: "Gwen Stacy",
        email: "gwen_stacy@gmail.com",
        password: "qwerty1",
        restaurant_name: "The Wholesome Table"
    },
    {
        username: "Barry Benson",
        name: "Barry Benson",
        email: "barry_benson@gmail.com",
        password: "21bzzz",
        restaurant_name: "King Bee"
    }
];

module.exports = {
    admins,
    restaurants,
    reviews,
    tags,
};