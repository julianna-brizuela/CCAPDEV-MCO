const reviewsCollection = require('./reviews.js');

const documents = [
    {
        restaurant_name: 'Botejyu', 
        location: 'Sta. Rosa, Laguna', 
        address:'Space no. M-38 BLDG-2, Solenad 2, Nuvali, Sto. Domingo of Sta. Rosa', 
        phone_number:'+63 917 154 6384', 
        description: 'Botejyu is an authentic Japanese restaurant, specializing in okonomiyaki and okosoba.', 
        tags: ['Japanese', 'Ramen', 'Okonomiyaki'], 
        price: '₱₱₱', 
        menu: 'botejyumenu.pdf', 
        images: ['botejyu1.jpg', 'botejyu2.jpg','botejyu3.jpg','botejyu4.jpg','botejyu5.jpg'], 
        resto_reviews: reviewsCollection.find({ restaurant: 'Botejyu' }),
        rating: 4.3,
        review_num:3,
        star: ['star','star','star','star','blank-star']
    },
    {
        restaurant_name: 'The Wholesome Table', 
        location: 'Salcedo, Makati', 
        address:'Salcedo, Makati | Infinity Tower Ground Floor, LP Leviste Street Salcedo Village Makati, 1227 Metro Manila Philippines', 
        phone_number:'(02) 8848 7777', 
        description: 'The Wholesome Table is an organic restaurant that serves comfort food.', 
        tags: ['Fusion Cuisine', 'Vegan-Friendly', 'Italian'], 
        price: '₱₱', 
        menu: 'wholesometablemenu.pdf', 
        images: ['wholesometable1.jpg', 'wholesometable2.jpg','wholesometable3.jpg','wholesometable4.jpg','wholesometable5.jpg'], 
        resto_reviews: reviewsCollection.find({ restaurant: 'The Wholesome Table' }),
        rating: 4,
        review_num:3,
        star: ['star','star','star','star','blank-star']
    },
    {
        restaurant_name: 'Manam', 
        location: 'Alabang, Muntinlupa', 
        address:'Molito Complex Madrigal Ave, Ayala Alabang, Muntinlupa, 1780 Metro Manila', 
        phone_number:'(02) 8256 3621', 
        description: 'A homegrown brand by The Moment Group, serving Filipino comfort fare in classics and twists.', 
        tags: ['Filipino', 'Asian'], 
        price: '₱₱', 
        menu: 'manammenu.pdf', 
        images: ['manam1.jpg', 'manam2.jpg','manam3.jpg','manam4.jpg','manam5.jpg'], 
        resto_reviews: reviewsCollection.find({ restaurant: 'Manam' }),
        rating: 4,
        review_num:3,
        star: ['star','star','star','star','blank-star']
    },
    {
        restaurant_name: 'King Bee', 
        location: 'Sta. Rosa, Laguna', 
        address: 'Sta. Rosa Estate, Brgy. Don Jose, Santa Rosa, Luzon 4026 Philippines', 
        phone_number:'(04) 9302 5065', 
        description: 'King Bee offers authentic Chinese foods and the best dining experience from dimsum to their bestsellers like chicken, pork, beef and fish.', 
        tags: ['Cantonese', 'Asian', 'Chinese'], 
        price: '₱₱', 
        menu: 'kingbeemenu.pdf', 
        images: ['kingbee1.jpg', 'kingbee2.jpg','kingbee3.jpg','kingbee4.jpg','kingbee5.jpg'], 
        resto_reviews: reviewsCollection.find({ restaurant: 'King Bee' }),
        rating: 4.6,
        review_num:3,
        star: ['star','star','star','star','half-star']
    },
    {
        restaurant_name: 'UCC Clockwork', 
        location: 'Sta. Rosa, Laguna', 
        address: 'Bldg. G, Nuvali, Ayala Malls Solenad, Don Jose, Santa Rosa, 4026 Laguna', 
        phone_number:'+63 926 793 8270', 
        description: 'Awaken Your Senses. Indulge Your Cravings. At UCC Café, we\'re passionate about crafting extraordinary coffee experiences. Step into our welcoming space, where the aroma of freshly brewed coffee envelops you, and every sip takes you on a journey of flavor. From our carefully curated selection of specialty coffees to our mouthwatering menu options, we invite you to savor moments of pure bliss throughout your day. With a commitment to community and a dedication to exceptional service, Brew Haven is your haven for unforgettable coffee moments. Join us and discover a world of coffee that goes beyond expectations.', 
        tags: ['Japanese', 'Asian', 'Cafe'], 
        price: '₱₱', 
        menu: 'uccmenu.pdf', 
        images: ['ucc1.jpg', 'ucc2.jpg','ucc3.jpg','ucc4.jpg','ucc5.jpg'], 
        resto_reviews: reviewsCollection.find({ restaurant: 'UCC Clockwork' }),
        rating: 4.6,
        review_num:3,
        star: ['star','star','star','star','half-star']
    },
];

const Collection = require('../collection.js');
const collection = new Collection('restaurants');

for (const document of documents) {
    collection.insertOne(document);
}

console.log(reviewsCollection.find({ restaurant: 'UCC Clockwork' }));

module.exports = collection;
