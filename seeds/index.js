const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30);
        const c = new Campground({
            author: '62fc714bed9da9fb881627b1',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dqzonxntk/image/upload/v1661134861/YelpCamp/pkgyt5c2mde1uvrfibek.jpg',
                    filename: 'YelpCamp/pkgyt5c2mde1uvrfibek',
                }
            ],
            geometry: {
                type: 'Point',
                coordinates: [127.062991, 37.506964]
            },
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem molestiae quas distinctio tempora earum officiis soluta tempore facere unde autem sapiente architecto delectus blanditiis eveniet, incidunt dicta quod recusandae at?',
            price
        });
        await c.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});