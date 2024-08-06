const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/relationshipDemo', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Mongoose Connection Open!")
    })
    .catch(err => {
        console.log("Mongoose Connection Error: ")
        console.log(err)
    })

const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter']
    }
}); 

const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
})

const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);

// Product.insertMany([
//     {name: 'Water Melon', price: 4.99, season: 'Summer'},
//     {name: 'coconut water', price: 5.99, season: 'Summer'}, 
//     {name: 'dragon fruit', price: 6.99, season: 'Fall'}
// ])

// const makeFarm = async () => {
//     const farm = new Farm({ name: 'Full Belly Farms', city: 'Guinda, CA' });
//     const melon = await Product.findOne({ name: 'Water Melon' });
//     farm.products.push(melon)
//     await farm.save();
//     console.log(farm);
// }

// makeFarm();

const addProduct = async () => {
    const farm = await Farm.findOne({ name: 'Full Belly Farms'});
    const coconut = await Product.findOne({ name: 'coconut water' });
    farm.products.push(coconut);
    await farm.save();
    console.log(farm);
}

Farm.findOne({name: 'Full Belly Farms'}).then((farm) => console.log(farm))
