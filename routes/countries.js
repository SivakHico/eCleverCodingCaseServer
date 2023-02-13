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

router.put('/:id', async (req, res) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon || category.icon,
            color: req.body.color
        },
        { new: true }
    )

    if (!category) return res.status(400).send('the category cannot be created!')

    res.send(category)
})

router.delete('/:id', (req, res) => {
    Category.findByIdAndRemove(req.params.id)
        .then((category) => {
            if (category) {
                return res.status(200).json({ success: true, message: 'the category is deleted!' })
            } else {
                return res.status(404).json({ success: false, message: 'category not found!' })
            }
        })
        .catch((err) => {
            return res.status(500).json({ success: false, error: err })
        })
})

export default router
