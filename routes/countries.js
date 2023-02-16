import Country from '../models/country.js'
import express from 'express'
const router = express.Router()

router.get(`/`, async (req, res) => {
    const countryList = await Country.find()

    if (!countryList) {
        res.status(500).json({ success: false })
    }
    res.status(200).send(countryList)
})

router.post('/', async (req, res) => {
    let countro = new Country({
        country: req.body.country,
        name: req.body.name,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    })
    countro = await countro.save()

    if (!countro) return res.status(400).send('the country cannot be created!')

    res.send(countro)
})

router.put('/edit-country/:id', async (req, res) => {
    const countro = await Country.findByIdAndUpdate(
        req.params.id,
        {
            country: req.body.country,
            name: req.body.name,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        },
        { new: true }
    )

    if (!countro) return res.status(400).send('the country cannot be Updated!')
    console.log(countro)

    res.send(countro)
})

router.delete('/delete-country/:id', (req, res) => {
    Country.findByIdAndRemove(req.params.id)
        .then((country) => {
            if (country) {
                return res.status(200).json({ success: true, message: 'the country is deleted!' })
            } else {
                return res.status(404).json({ success: false, message: 'country not found!' })
            }
        })
        .catch((err) => {
            return res.status(500).json({ success: false, error: err })
        })
})

export default router
