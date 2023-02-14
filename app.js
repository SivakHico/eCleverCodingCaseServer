import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import fetch from 'node-fetch'
import country from './models/country.js'
import countriesRoutes from './routes/countries.js'
const PORT = process.env.PORT || 3300
const API = process.env.API_URL
const connectDB = process.env.CONNECT_DB
const app = express()

app.use(cors())
app.options('*', cors())

app.use(express.json())
app.use(morgan('tiny'))

app.use('/', countriesRoutes)

const getdata = async () => {
    const response = await fetch(API)
    const data = await response.json()
    const countryList = data.map((item) => {
        return {
            country: item.name.common,
            name: item?.capital?.[0],
            latitude: item?.capitalInfo?.latlng?.[0],
            longitude: item?.capitalInfo?.latlng?.[1]
        }
    })
    console.log(countryList)
    try {
        const count = await country.countDocuments()
        if (count > 0) {
            await country.deleteMany()
            console.log('Data Deleted')
        }
        await country.insertMany(countryList)
        console.log('Data Inserted')
    } catch (err) {
        if (err.code === 11000) {
            console.log('Data already inserted')
        } else {
            console.log(err)
        }
    }
}

mongoose
    .connect(connectDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'eclever'
    })
    .then(() => {
        console.log('DataBase Connection is Ready!')
    })
    .catch((err) => {
        console.log(err)
    })

app.listen(PORT, () => {
    console.log(`The Server is running now on port ${PORT}`)
})
getdata()
