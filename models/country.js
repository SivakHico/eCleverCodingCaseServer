import mongoose from 'mongoose'

const countryListSchema = mongoose.Schema({
    country: {
        type: String,
       
    },
    name: {
        type: String,
       
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
