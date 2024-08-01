const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relationshipDemo', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Mongoose Connection Open!")
    })
    .catch(err => {
        console.log("Mongoose Connection Error: ")
        console.log(err)
    })

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [
        {
            _id: {_id: false},
            street: String,
            city: String,
            state: String,
            country: String
        }
    ]
})

const User = mongoose.model('User', userSchema);

const makeUser = async () => {
    const u = new User({
        first: 'Jasper',
        last: 'Richard',
    })
    u.addresses.push({
        street: '123 Main St',
        city: 'San Francisco',
        state: 'CA',
        country: 'USA'
    })
    const res = await u.save()
    console.log(res)
}

const addAddress = async (id) => {
    const user = await User.findById(id)
    user.addresses.push({
        street: '456 Elm St',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA'
    })
    const res = await user.save()
    console.log(res)
}

addAddress('66aaa96a8620e6a7c39dc8e4')