const reviewsCollection = require('./reviews.js');

function average(document) {
    const len = document.length;
    const arr = document
    let avg = 0
    for (let i = 0; i < len; i++) {
        avg = avg + arr[i].review_rating
    }

    avg = avg/len

    return parseFloat(avg.toPrecision(2))
}

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
        rating: average(reviewsCollection.find({ restaurant: 'Botejyu' })),
        review_num: reviewsCollection.find({ restaurant: 'Botejyu' }).length,
        star: ['star','star','star','star','blank-star'],
        map_link: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15468.978442286172!2d121.0566135!3d14.238948!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd7da0f1d4f6e9%3A0x9eb79c89e5e3895e!2sBotejyu%20Ayala%20Malls%20Solenad!5e0!3m2!1sen!2sph!4v1708076830088!5m2!1sen!2sph'

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
        rating: average(reviewsCollection.find({ restaurant: 'The Wholesome Table' })),
        review_num:reviewsCollection.find({ restaurant: 'The Wholesome Table' }).length,
        star: ['star','star','star','star','blank-star'],
        map_link: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15446.685486773113!2d121.0252846!3d14.5607759!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c90706584b91%3A0x65c52d44b537dc62!2sThe%20Wholesome%20Table%20Salcedo!5e0!3m2!1sen!2sph!4v1708076619292!5m2!1sen!2sph'

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
        rating: average(reviewsCollection.find({ restaurant: 'Manam' })),
        review_num:reviewsCollection.find({ restaurant: 'Manam' }).length,
        star: ['star','star','star','star','blank-star'],
        map_link: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15456.192933856557!2d121.0265372!3d14.4243831!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d10b28e488cb%3A0xe54f8aa0b470fa5d!2sManam%20Caf%C3%A9!5e0!3m2!1sen!2sph!4v1708077005775!5m2!1sen!2sph'

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
        rating: average(reviewsCollection.find({ restaurant: 'King Bee' })),
        review_num:reviewsCollection.find({ restaurant: 'King Bee' }).length,
        star: ['star','star','star','star','half-star'],
        map_link: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15468.425994037885!2d121.0615841!3d14.2470093!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd7d3f5adce0eb%3A0xe7ebec9b55fdd237!2sKing%20Bee%20%7C%20Santa%20Rosa!5e0!3m2!1sen!2sph!4v1708077728233!5m2!1sen!2sph'

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
        rating: average(reviewsCollection.find({ restaurant: 'UCC Clockwork'})),
        review_num:reviewsCollection.find({ restaurant: 'UCC Clockwork' }).length,
        star: ['star','star','star','star','half-star'],
        map_link:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3867.262426696296!2d121.05419771136005!3d14.237907786149087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd7defb24ebea9%3A0x51bfc358671a8786!2sUCC%20Clockwork!5e0!3m2!1sen!2sph!4v1708078019706!5m2!1sen!2sph'

    },
];

const Collection = require('../collection.js');
const collection = new Collection('restaurants');

for (const document of documents) {
    collection.insertOne(document);
}

module.exports = collection;
