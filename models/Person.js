// Require mongoose
const mongoose = require ('mongoose')

// Create schema
const schema = mongoose.Schema

const personSchema = new schema({
    name: {
        type: String,
        required: True
    },
    age: Number,
    favoriteFoods: {
        type:[String]
    }
})



module.exports = Person =mongoose.model('Person', personSchema);