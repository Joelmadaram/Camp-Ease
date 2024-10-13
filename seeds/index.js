const mongoose = require('mongoose');
const { citiesArray } = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/camp-ease', {
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * descriptors.length, places.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const randomNum = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10 
        const camp = new Campground({
            author: '66ba816f5bc0270af465bb7f', 
            location: `${citiesArray[randomNum].city}, ${citiesArray[randomNum].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis, velit id sollicitudin consectetur, mauris ipsum vulputate massa, ac convallis ligula tellus id est. Sed ullamcorper, eros at ornare consectetur, mauris nulla consectetur neque, vitae tempor ligula nisl vel est. Sed non dolor vel justo tincidunt pulvinar. Nulla facilisi. Donec consectetur, velit id ultricies consectetur, erat massa pharetra ex, et consectetur",
            price,
            geometry: {
              type: 'Point',
              coordinates: [
                citiesArray[randomNum].longitude,
                citiesArray[randomNum].latitude
              ]
            },
            images: [
                    {
                      url: 'https://res.cloudinary.com/dxdbd7e0q/image/upload/v1723847755/Camp%20Ease%20Project/jijzzqxoejczc1cnfh4j.jpg',
                      filename: 'Camp Ease Project/jijzzqxoejczc1cnfh4j',
                    },
                    {
                      url: 'https://res.cloudinary.com/dxdbd7e0q/image/upload/v1723847756/Camp%20Ease%20Project/jue4vslyn6tszlo9pnwr.jpg',
                      filename: 'Camp Ease Project/jue4vslyn6tszlo9pnwr',
                    },
                    {
                      url: 'https://res.cloudinary.com/dxdbd7e0q/image/upload/v1723847756/Camp%20Ease%20Project/e8qcnxiw7bmaonf5ivrw.jpg',
                      filename: 'Camp Ease Project/e8qcnxiw7bmaonf5ivrw',
                    }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})