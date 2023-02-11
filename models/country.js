import mongoose from 'mongoose'

const countryListSchema = mongoose.Schema({
    country: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        unique: true
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    }
})

const Country = mongoose.model('Country', countryListSchema)

export default Country
